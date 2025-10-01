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

# Directory where images will be saved
IMAGES_DIR="img"

# Create the images directory if it does not exist
mkdir -p "$IMAGES_DIR"

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

    # Adjust title and excerpt to prevent overflow
    adjusted_title=$(adjust_text "$title" 275 "$FONTS_DIR" "Work_Sans/WorkSans-VariableFont_wght.ttf")

    # Create an image with the title, excerpt, and branding
    jpg_file="$IMAGES_DIR/$(basename "$post" .md).jpg"
    webp_file="$IMAGES_DIR/$(basename "$post" .md).webp"

    # Check if author is "Hypha" and adjust accordingly
    if [[ "$author" == "Hypha" ]]; then
        # If author is Hypha, capitalize to HYPHA and use Black font, no left corner branding
        convert -size 1200x627 xc:"#9900FC" \
                \( -size 900x500 -background none -fill white -font "$FONTS_DIR/Work_Sans/WorkSans-VariableFont_wght.ttf" -pointsize 64 \
                   label:"$adjusted_title" -gravity center \) -geometry +0+60  -composite \
                -font "$FONTS_DIR/Work_Sans/WorkSans-Black.ttf" -pointsize 37 -fill white \
                -gravity southeast -annotate +30+30 "HYPHA" \
                "$IMAGES_DIR/$(basename "$post" .md).jpg"
    else
        # If author is not Hypha, add HYPHA in left corner and keep author name normal weight
        convert -size 1200x627 xc:"#9900FC" \
                \( -size 900x500 -background none -fill white -font "$FONTS_DIR/Work_Sans/WorkSans-VariableFont_wght.ttf" -pointsize 64 \
                   label:"$adjusted_title" -gravity center \) -geometry +0+60  -composite \
                -font "$FONTS_DIR/Work_Sans/WorkSans-Black.ttf" -pointsize 37 -fill white \
                -gravity southwest -annotate +30+30 "HYPHA" \
                -font "$FONTS_DIR/Work_Sans/WorkSans-VariableFont_wght.ttf" -pointsize 37 -fill white \
                -gravity southeast -annotate +30+30 "$author" \
                "$IMAGES_DIR/$(basename "$post" .md).jpg"
    fi

    # Convert JPG to WebP
    cwebp -q 100 "$jpg_file" -o "$webp_file"

done

# Clean up JPG files, keeping only WebP versions
rm -f "$IMAGES_DIR"/*.jpg

echo "Social cards generated in $IMAGES_DIR"
