#!/bin/bash

set -euo pipefail

# This script assumes markdown posts live directly in the target directory.
POSTS_DIR="${1:-./}"
IMAGES_DIR="/assets/images/social/dripline"

for post in "$POSTS_DIR"/*.md; do
    [ -e "$post" ] || continue

    webp_file="$(basename "$post" .md).webp"
    image_value="$IMAGES_DIR/$webp_file"

    awk -v image_value="$image_value" '
        BEGIN {
            in_frontmatter = 0
            frontmatter_done = 0
            image_written = 0
        }
        NR == 1 && $0 == "---" {
            in_frontmatter = 1
            print
            next
        }
        in_frontmatter && $0 == "---" {
            if (!image_written) {
                print "image: \"" image_value "\""
                image_written = 1
            }
            in_frontmatter = 0
            frontmatter_done = 1
            print
            next
        }
        in_frontmatter && $0 ~ /^image:[[:space:]]*/ {
            if (!image_written) {
                print "image: \"" image_value "\""
                image_written = 1
            }
            next
        }
        {
            print
        }
        END {
            if (!frontmatter_done) {
                exit 2
            }
        }
    ' "$post" > "$post.tmp"

    mv "$post.tmp" "$post"
    echo "Updated $post with image: $image_value"
done

echo "All markdown files have been updated."
