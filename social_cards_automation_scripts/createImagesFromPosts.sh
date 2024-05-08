#!/bin/bash

# This script generates social cards for each markdown post file in the specified directory.
# It uses ImageMagick to create an image with the post title, excerpt, and author.
# The generated images are saved in a separate directory.

# Ensure ImageMagick and cwebp are installed

# This script assumes that the markdown files are in the root of the _posts directory

# Directory where your markdown post files are stored
POSTS_DIR="./"

# Directory where fonts are stored
FONTS_DIR="fonts"

# Directory where images will be saved
IMAGES_DIR="img"

# Create the images directory if it does not exist
mkdir -p "$IMAGES_DIR"

# Function to dynamically adjust text to prevent overflow
adjust_text() {
    local text="$1"
    local max_length=370  # Max pixel width for text
    local font_size=44    # Initial font size
    local adjusted_text="$text"
    local temp_file="temp.png"

    # Use ImageMagick to calculate the width of the rendered text
    while true; do
        convert -background none -fill white -font "$FONTS_DIR/Work_Sans/WorkSans-VariableFont_wght.ttf" -pointsize $font_size label:"$adjusted_text" "$temp_file"
        local text_width=$(identify -format "%w" "$temp_file")
        rm -f "$temp_file"

        if [ $text_width -le $max_length ] || [ $font_size -le 20 ]; then
            break
        fi

        if [ $text_width -gt $max_length ]; then
            font_size=$((font_size - 8))  # Reduce font size to make text fit
        fi
    done

    # Apply more aggressive wrapping if still necessary
    if [ $text_width -gt $max_length ]; then
        adjusted_text=$(echo "$adjusted_text" | fold -w 38 -s)  # Wrap text to fit
    fi

    echo "$adjusted_text"
}

# Loop through each markdown post file
for post in "$POSTS_DIR"/*.md; do
    # Extract the title, excerpt, and author
    title=$(awk '/^title:/{gsub(/^title: /,""); gsub(/'"'"'/,""); print; exit}' "$post")
    excerpt=$(awk '/^excerpt:/{gsub(/^excerpt: /,""); gsub(/'"'"'/,""); print; exit}' "$post")
    author=$(awk '/^author:/{gsub(/^author: /,""); gsub(/'"'"'/,""); print; exit}' "$post")

    # Adjust title and excerpt to prevent overflow
    adjusted_title=$(adjust_text "$title")
    adjusted_excerpt=$(adjust_text "$excerpt")

    # Create an image with the title, excerpt, and branding
    jpg_file="$IMAGES_DIR/$(basename "$post" .md).jpg"
    webp_file="$IMAGES_DIR/$(basename "$post" .md).webp"

    # Create an image with the title, excerpt, and branding
    convert -size 1200x627 xc:"#9900FC" \
            \( -size 900x400 -background none -fill white -font "$FONTS_DIR/Work_Sans/WorkSans-VariableFont_wght.ttf" -pointsize 44 \
               label:"$adjusted_title" -gravity north -geometry +0+100 \) -composite \
            \( -size 900x600 -background none -fill white -font "$FONTS_DIR/Work_Sans/WorkSans-VariableFont_wght.ttf" -pointsize 36 \
               label:"$adjusted_excerpt" -gravity center -geometry +0+280 \) -composite \
            -font "$FONTS_DIR/Work_Sans/WorkSans-VariableFont_wght.ttf" -pointsize 34 -fill white \
            -gravity southeast -annotate +30+30 "$author" \
            "$IMAGES_DIR/$(basename "$post" .md).jpg"

    # Convert JPG to WebP
    cwebp -q 80 "$jpg_file" -o "$webp_file"

done

echo "Social cards generated in $IMAGES_DIR"
