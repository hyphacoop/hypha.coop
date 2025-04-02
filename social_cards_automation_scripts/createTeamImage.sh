#!/bin/bash

# Directory containing PNG avatars
AVATARS_DIR="../assets/images/avatars"

# Output file
OUTPUT_IMAGE="people.png"

# Output canvas size (16:9 aspect ratio)
OUTPUT_WIDTH=1920
OUTPUT_HEIGHT=1080

# Avatar image size (square)
IMAGE_WIDTH=600 
IMAGE_HEIGHT=600 

# Padding size in pixels
PADDING=200

# Text configuration
TEXT="HYPHA"
FONT_PATH="./fonts/Work_Sans/WorkSans-Black.ttf"
FONT_SIZE=250
TEXT_COLOR="#9900FC"

# Exclude default.png and roo.png, and collect all other PNG files
mapfile -t IMAGE_FILES < <(find "$AVATARS_DIR" -maxdepth 1 -type f -name "*.png" ! -name "default.png" ! -name "roo.png" | sort)

# Check if roo.png exists and append it to the array
if [[ -f "$AVATARS_DIR/roo.png" ]]; then
    IMAGE_FILES+=("$AVATARS_DIR/roo.png")
fi

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
magick montage "${IMAGE_FILES[@]}" -tile "${GRID_SIZE}x" -geometry "${IMAGE_WIDTH}x${IMAGE_HEIGHT}+15+15" \
    -background "#FFFFFF" -bordercolor "#FFFFFF" -border 4 "$TEMP_COLLAGE"

# Calculate the scaled size to fit within 80% of the canvas height (leaving space for text)
COLLAGE_HEIGHT=$((OUTPUT_HEIGHT - 2 * PADDING))
COLLAGE_WIDTH=$((OUTPUT_WIDTH - 2 * PADDING))

# Scale the collage to fit the allocated space
magick "$TEMP_COLLAGE" -resize "${COLLAGE_WIDTH}x${COLLAGE_HEIGHT}"\> "scaled_collage.png"

# Create the final canvas with space for the collage and text
magick -size ${OUTPUT_WIDTH}x${OUTPUT_HEIGHT} xc:"#FFFFFF" \
    "scaled_collage.png" -gravity north -geometry +0+100 -composite \
    -font "$FONT_PATH" -pointsize "$FONT_SIZE" -fill "$TEXT_COLOR" \
    -gravity south -annotate +0+50 "$TEXT" "$OUTPUT_IMAGE"

# Cleanup temp files
rm -f "$TEMP_COLLAGE" "scaled_collage.png"

echo "Collage created: $OUTPUT_IMAGE (16:9 centered with HYPHA text below)"
