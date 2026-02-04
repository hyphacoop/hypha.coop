#!/bin/bash

# This script generates social cards for each markdown post file in the specified directory.
# It uses ImageMagick to create an image with the post title, excerpt, and author.
# The generated images are saved in a separate directory.

# Ensure ImageMagick and cwebp are installed

# This script assumes that the markdown files are in the root of the _posts directory

# Directory where your markdown post files are stored
POSTS_DIR="../_posts"

# Directory where fonts are stored
FONTS_DIR="fonts"

# Directory where social card images are saved (dripline folder used by posts)
IMAGES_DIR="../assets/images/social/dripline"

# Directory where post images are stored (relative to repo root)
ASSETS_DIR="../assets/images/posts"

# Create the images directory if it does not exist
mkdir -p "$IMAGES_DIR"

# Replace emojis with text equivalents (ImageMagick doesn't render emojis)
replace_emojis_for_render() {
    local text="$1"
    # Heart emojis → "loves" (for "Hypha ♥️ DASL" / "Hypha ❤️ DASL" series)
    echo "$text" | sed 's/♥️/loves/g; s/❤️/loves/g; s/♥/loves/g; s/❤/loves/g'
}

# Extract first image path from post body (img src or markdown ![]())
# Returns path like assets/images/posts/filename.jpg or empty if none
extract_first_image() {
    local post="$1"
    grep -oE '/?assets/images/posts/[a-zA-Z0-9_.-]+\.(jpg|jpeg|png|webp|gif)' "$post" 2>/dev/null | head -1 | sed 's|^/||'
}

# Function to dynamically adjust text to prevent overflow
adjust_text() {
    local text="$1"
    local max_length="$2"  # Max pixel width for text
    local font_dir="$3"    # Directory for fonts
    local font_file="$4"   # Font file name
    local min_font_size="${5:-20}"  # Minimum font size, default is 20 if not provided

    local font_size=76    # Initial font size
    local adjusted_text="$text"
    local temp_file="temp.png"
    local text_width

    # Use ImageMagick to calculate the width of the rendered text
    while true; do
        if ! convert -background none -fill white -font "$font_dir/$font_file" -pointsize $font_size label:"$adjusted_text" "$temp_file"; then
            echo "Error generating image with convert command."
            return 1
        fi

        text_width=$(identify -format "%w" "$temp_file")
        rm -f "$temp_file"

        if [[ $text_width -le $max_length ]] || [[ $font_size -le $min_font_size ]]; then
            break
        fi

        font_size=$((font_size - 8))  # Reduce font size to make text fit
    done

    # Apply more aggressive wrapping if still necessary
    if [[ $text_width -gt $max_length ]]; then
        local wrap_width=$((max_length / font_size * 2))  # Dynamic wrap width based on font size
        adjusted_text=$(echo "$adjusted_text" | fold -w "$wrap_width" -s)  # Wrap text to fit
    fi

    echo "$adjusted_text"
}


# Loop through each markdown post file
for post in "$POSTS_DIR"/*.md; do
    # Extract the title, excerpt, and author
    title=$(awk '/^title:/{gsub(/^title: /,""); gsub(/'"'"'/,""); gsub(/"/,""); print; exit}' "$post")
    author=$(awk '/^author:/{gsub(/^author: /,""); gsub(/'"'"'/,""); gsub(/"/,""); print; exit}' "$post")
    # Remove parentheticals like (Words), (Design) from author
    author=$(echo "$author" | sed 's/ ([^)]*)//g' | sed 's/  */ /g' | sed 's/^ *\| *$//g')

    # Try to get first image from post body
    first_image_rel=$(extract_first_image "$post")
    first_image_path=""
    if [[ -n "$first_image_rel" ]]; then
        first_image_path="../$first_image_rel"
        [[ ! -f "$first_image_path" ]] && first_image_path=""
    fi

    jpg_file="$IMAGES_DIR/$(basename "$post" .md).jpg"
    webp_file="$IMAGES_DIR/$(basename "$post" .md).webp"

    # Replace emojis for ImageMagick (e.g. ♥️ → "loves")
    title_for_render=$(replace_emojis_for_render "$title")

    if [[ -n "$first_image_path" ]]; then
        # 50/50 layout: alignment based on bottom-of-image to bottom-of-HYPHA margin (50px)
        # Top margin = 50px for both title and image; image right aligns with author right (30px inset)
        adjusted_title=$(adjust_text "$title_for_render" 400 "$FONTS_DIR" "Work_Sans/WorkSans-VariableFont_wght.ttf")

        # Long titles (>55 chars) get 10% smaller font for better fit
        TITLE_FONT_SIZE=56
        LONG_TITLE_CHARS=55
        if [[ ${#title} -gt $LONG_TITLE_CHARS ]]; then
            TITLE_FONT_SIZE=50   # 56 * 0.9 ≈ 50
        fi

        left_half=$(mktemp --suffix=.png)
        right_half=$(mktemp --suffix=.png)

        TOP_MARGIN=50   # matches bottom-of-image to bottom-of-HYPHA distance
        SIDE_MARGIN=30  # bottom margin for HYPHA and author

        # Left half: title block centered, pushed 10% right; text left-aligned within block
        TITLE_W=480
        TITLE_OFFSET=60   # 10% of 600px
        # Title left edge = center(300) + offset(60) - half_width(240) = 120
        HYPHA_LEFT_MARGIN=$(( 300 + TITLE_OFFSET - TITLE_W/2 ))

        convert -size 600x627 xc:"#9900FC" \
                \( -size ${TITLE_W}x500 -background none -fill white -font "$FONTS_DIR/Work_Sans/WorkSans-VariableFont_wght.ttf" -pointsize $TITLE_FONT_SIZE \
                   -gravity west caption:"$adjusted_title" \) -gravity center -geometry +${TITLE_OFFSET}+0 -composite \
                -font "$FONTS_DIR/Work_Sans/WorkSans-Black.ttf" -pointsize 37 -fill white \
                -gravity southwest -annotate +${HYPHA_LEFT_MARGIN}+${SIDE_MARGIN} "HYPHA" \
                "$left_half"

        # Right half: duotone image centered in container (80% - 12% total = 420x439)
        duotone_img=$(mktemp --suffix=.png)
        IMG_W=420
        IMG_H=439
        convert "${first_image_path}[0]" -resize ${IMG_W}x${IMG_H}^ -gravity center -extent ${IMG_W}x${IMG_H} \
                -modulate 100,0 -size 1x256! gradient:"#9900FC"-white -clut "$duotone_img"
        convert -size 600x627 xc:"#9900FC" "$duotone_img" -gravity center -composite "$right_half"
        rm -f "$duotone_img"

        # Author right-aligned with image right (90px from right = image margin)
        if [[ "$author" != "Hypha" ]]; then
            AUTHOR_RIGHT_MARGIN=$(( (600 - IMG_W) / 2 ))   # 90px, matches image right edge
            convert "$right_half" -font "$FONTS_DIR/Work_Sans/WorkSans-VariableFont_wght.ttf" -pointsize 37 -fill white \
                    -gravity southeast -annotate +${AUTHOR_RIGHT_MARGIN}+${SIDE_MARGIN} "$author" "$right_half"
        fi

        convert "$left_half" "$right_half" +append "$jpg_file"
        rm -f "$left_half" "$right_half"
    else
        # Fallback: existing layout (full-width title, no image)
        # Use caption for automatic word wrapping (label doesn't wrap)
        adjusted_title=$(adjust_text "$title_for_render" 900 "$FONTS_DIR" "Work_Sans/WorkSans-VariableFont_wght.ttf")

        if [[ "$author" == "Hypha" ]]; then
            convert -size 1200x627 xc:"#9900FC" \
                    \( -size 900x500 -background none -fill white -font "$FONTS_DIR/Work_Sans/WorkSans-VariableFont_wght.ttf" -pointsize 64 \
                       -gravity center caption:"$adjusted_title" \) -gravity center -composite \
                    -font "$FONTS_DIR/Work_Sans/WorkSans-Black.ttf" -pointsize 37 -fill white \
                    -gravity southwest -annotate +30+30 "HYPHA" \
                    "$jpg_file"
        else
            convert -size 1200x627 xc:"#9900FC" \
                    \( -size 900x500 -background none -fill white -font "$FONTS_DIR/Work_Sans/WorkSans-VariableFont_wght.ttf" -pointsize 64 \
                       -gravity center caption:"$adjusted_title" \) -gravity center -composite \
                    -font "$FONTS_DIR/Work_Sans/WorkSans-Black.ttf" -pointsize 37 -fill white \
                    -gravity southwest -annotate +30+30 "HYPHA" \
                    -font "$FONTS_DIR/Work_Sans/WorkSans-VariableFont_wght.ttf" -pointsize 37 -fill white \
                    -gravity southeast -annotate +30+30 "$author" \
                    "$jpg_file"
        fi
    fi

    # Convert JPG to WebP
    cwebp -q 100 "$jpg_file" -o "$webp_file"

done

# Clean up JPG files, keeping only WebP versions
rm -f "$IMAGES_DIR"/*.jpg

echo "Social cards generated in $IMAGES_DIR"
