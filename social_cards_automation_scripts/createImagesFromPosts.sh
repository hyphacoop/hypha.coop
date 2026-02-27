#!/usr/bin/env bash
set -euo pipefail

# Generates social cards for provided post paths (or all posts if no args),
# writes images to assets/images/social/dripline, and upserts `image:` frontmatter.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
POSTS_DIR="$REPO_ROOT/_posts"
FONTS_DIR="$SCRIPT_DIR/fonts"
IMAGES_DIR="$REPO_ROOT/assets/images/social/dripline"
IMAGE_PREFIX="/assets/images/social/dripline"

mkdir -p "$IMAGES_DIR"

adjust_text() {
  local text="$1"
  local max_length="$2"
  local font_dir="$3"
  local font_file="$4"
  local min_font_size="${5:-20}"

  local font_size=76
  local adjusted_text="$text"
  local temp_file
  temp_file="$(mktemp)"
  local text_width

  while true; do
    if ! convert -background none -fill white -font "$font_dir/$font_file" -pointsize "$font_size" label:"$adjusted_text" "$temp_file"; then
      echo "Failed to render title text" >&2
      rm -f "$temp_file"
      return 1
    fi

    text_width="$(identify -format "%w" "$temp_file")"

    if [[ "$text_width" -le "$max_length" || "$font_size" -le "$min_font_size" ]]; then
      break
    fi

    font_size=$((font_size - 8))
  done

  rm -f "$temp_file"

  if [[ "$text_width" -gt "$max_length" ]]; then
    local wrap_width=$((max_length / font_size * 2))
    adjusted_text="$(echo "$adjusted_text" | fold -w "$wrap_width" -s)"
  fi

  echo "$adjusted_text"
}

upsert_image_frontmatter() {
  local post_file="$1"
  local image_path="$2"
  local tmp_file
  tmp_file="$(mktemp)"

  awk -v image_line="image: \"$image_path\"" '
    BEGIN {in_fm=0; fm_started=0; replaced=0}
    NR==1 && $0=="---" {
      fm_started=1
      in_fm=1
      print
      next
    }
    in_fm==1 {
      if ($0 ~ /^image:[[:space:]]*/) {
        if (replaced==0) {
          print image_line
          replaced=1
        }
        next
      }
      if ($0=="---") {
        if (replaced==0) {
          print image_line
          replaced=1
        }
        print
        in_fm=0
        next
      }
      print
      next
    }
    { print }
    END {
      if (fm_started==0) {
        print "Missing frontmatter in " FILENAME > "/dev/stderr"
        exit 1
      }
    }
  ' "$post_file" > "$tmp_file"

  mv "$tmp_file" "$post_file"
}

declare -a posts
if [[ "$#" -gt 0 ]]; then
  for post in "$@"; do
    if [[ "$post" != /* ]]; then
      posts+=("$REPO_ROOT/$post")
    else
      posts+=("$post")
    fi
  done
else
  while IFS= read -r post; do
    posts+=("$post")
  done < <(find "$POSTS_DIR" -maxdepth 1 -type f -name '*.md' | sort)
fi

if [[ "${#posts[@]}" -eq 0 ]]; then
  echo "No posts to process."
  exit 0
fi

for post in "${posts[@]}"; do
  if [[ ! -f "$post" ]]; then
    echo "Skipping missing post: $post" >&2
    continue
  fi

  title="$(awk '/^title:/{val=$0; sub(/^title:[[:space:]]*/,"",val); if(length(val)>=2 && (c=substr(val,1,1))==substr(val,length(val)) && (c=="\"" || c=="'"'"'")) val=substr(val,2,length(val)-2); print val; exit}' "$post")"
  author="$(awk '/^author:/{val=$0; sub(/^author:[[:space:]]*/,"",val); if(length(val)>=2 && (c=substr(val,1,1))==substr(val,length(val)) && (c=="\"" || c=="'"'"'")) val=substr(val,2,length(val)-2); print val; exit}' "$post")"

  if [[ -z "$title" ]]; then
    echo "Skipping post with no title: $post" >&2
    continue
  fi

  adjusted_title="$(adjust_text "$title" 275 "$FONTS_DIR" "Work_Sans/WorkSans-VariableFont_wght.ttf")"
  slug="$(basename "$post" .md)"
  jpg_file="$IMAGES_DIR/$slug.jpg"
  webp_file="$IMAGES_DIR/$slug.webp"
  image_path="$IMAGE_PREFIX/$slug.webp"

  if [[ "$author" == "Hypha" || -z "$author" ]]; then
    convert -size 1200x627 xc:"#9900FC" \
      \( -size 900x500 -background none -fill white -font "$FONTS_DIR/Work_Sans/WorkSans-VariableFont_wght.ttf" -pointsize 64 \
      label:"$adjusted_title" -gravity center \) -geometry +0+60 -composite \
      -font "$FONTS_DIR/Work_Sans/WorkSans-Black.ttf" -pointsize 37 -fill white \
      -gravity southwest -annotate +30+30 "HYPHA" \
      "$jpg_file"
  else
    convert -size 1200x627 xc:"#9900FC" \
      \( -size 900x500 -background none -fill white -font "$FONTS_DIR/Work_Sans/WorkSans-VariableFont_wght.ttf" -pointsize 64 \
      label:"$adjusted_title" -gravity center \) -geometry +0+60 -composite \
      -font "$FONTS_DIR/Work_Sans/WorkSans-Black.ttf" -pointsize 37 -fill white \
      -gravity southwest -annotate +30+30 "HYPHA" \
      -font "$FONTS_DIR/Work_Sans/WorkSans-VariableFont_wght.ttf" -pointsize 37 -fill white \
      -gravity southeast -annotate +30+30 "$author" \
      "$jpg_file"
  fi

  cwebp -q 100 "$jpg_file" -o "$webp_file" >/dev/null
  rm -f "$jpg_file"
  upsert_image_frontmatter "$post" "$image_path"

  echo "Generated $webp_file and updated $(basename "$post")"
done

echo "Social card generation complete."
