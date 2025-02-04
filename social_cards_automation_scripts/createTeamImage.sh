#!/bin/bash

# Directory containing PNG avatars
AVATARS_DIR="../assets/images/avatars"

# Output directory
OUTPUT_DIR="../assets/images/social/"
mkdir -p "$OUTPUT_DIR"

# Output file
OUTPUT_IMAGE="${OUTPUT_DIR}/people.webp"

# Output canvas size (16:9 aspect ratio)
OUTPUT_WIDTH=1920
OUTPUT_HEIGHT=1080

# Padding size in pixels
PADDING=225

# Text configuration
TEXT="HYPHA"
FONT_PATH="./fonts/Work_Sans/WorkSans-ExtraBold.ttf"
FONT_SIZE=225
TEXT_COLOR="#9900FC"

# Exclude roo.png and default.png, and collect all other PNG files
mapfile -t IMAGE_FILES < <(find "$AVATARS_DIR" -maxdepth 1 -type f -name "*.png" ! -name "roo.png" ! -name "default.png" | sort)

# Count the number of images
NUM_IMAGES=${#IMAGE_FILES[@]}

# If no images found, exit
if [[ $NUM_IMAGES -eq 0 ]]; then
    echo "No images found (excluding roo.png and default.png)."
    exit 1
fi

# Determine grid size (square root of number of images, rounded up)
GRID_SIZE=$(echo "scale=0; sqrt($NUM_IMAGES)" | bc)
if (( GRID_SIZE * GRID_SIZE < NUM_IMAGES )); then
    GRID_SIZE=$((GRID_SIZE + 1))
fi

echo "Creating a ${GRID_SIZE}x${GRID_SIZE} collage from $NUM_IMAGES images."

# Temporary file for the collage
TEMP_COLLAGE="temp_collage.png"

# Create the grid layout
magick montage "${IMAGE_FILES[@]}" -tile "${GRID_SIZE}x" -geometry +15+15 \
    -background "#FFFFFF" -bordercolor "#FFFFFF" -border 4 "$TEMP_COLLAGE"

# Calculate the scaled size to fit within 80% of the canvas height (leaving space for text)
COLLAGE_HEIGHT=$((OUTPUT_HEIGHT - 2 * PADDING))
COLLAGE_WIDTH=$((OUTPUT_WIDTH - 2 * PADDING))

# Scale the collage to fit the allocated space
magick "$TEMP_COLLAGE" -resize "${COLLAGE_WIDTH}x${COLLAGE_HEIGHT}"\> "scaled_collage.png"

# Create the final canvas with space for the collage and text
magick -size ${OUTPUT_WIDTH}x${OUTPUT_HEIGHT} xc:white \
    "scaled_collage.png" -gravity north -geometry +0+100 -composite \
    -font "$FONT_PATH" -pointsize "$FONT_SIZE" -fill "$TEXT_COLOR" \
    -gravity south -annotate +0+75 "$TEXT" -quality 90 "$OUTPUT_IMAGE"

# Cleanup temp files
rm -f "$TEMP_COLLAGE" "scaled_collage.png"

echo "Collage created: $OUTPUT_IMAGE (16:9 centered with HYPHA text below)"
