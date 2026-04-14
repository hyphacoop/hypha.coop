# Scripts to generate Social Cards from all Dripline post

## Description

This folder contains 2 scripts.

One generates images from a post's title, excerpt and author
The second script adds the 'image' variable pointing to the image in the post's front matter.

## WIP

These scripts are a work in progress. Be sure to read the comments before running these scripts.
You will need to change paths or move the scripts to the adequate folder.
The `editPosts.sh` script now updates the `image` field only within the YAML front matter and avoids duplicate keys.
It still assumes posts live directly in the target directory and that each file already has a valid front matter block.
