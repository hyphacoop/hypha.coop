#!/bin/bash

# This script is a work in progress. 
# It needs to be fine-tuned to work properly without duplicating the image variable in the front matter.
# Directory where your markdown post files are stored
# This script assumes that the markdown files are in the root of the _posts directory
POSTS_DIR="./"

# Directory where images are stored
IMAGES_DIR="/assets/images/social/dripline"

# Loop through each markdown post file
for post in "$POSTS_DIR"/*.md; do
    # Determine the WebP file name from the markdown file name
    webp_file="$(basename "$post" .md).webp"

    # Path to the WebP image to be included in the front matter
    image_path="image: \"$IMAGES_DIR/$webp_file\""

    # Check if the file already contains an 'image:' line
    if grep -q "^image:" "$post"; then
        # The file contains an image line, replace it
        sed -i'' "/^image:/c\\$image_path" "$post"
    else
        # No image line, add one. Ensure it's only added within the front matter
        # Assuming the front matter starts and ends with '---'
        # This sed command inserts the image path after the first line of ---
        sed -i'' "/^---$/a\\
$image_path
" "$post"
    fi

    echo "Updated $post with new image path: $image_path"
done

echo "All markdown files have been updated."
