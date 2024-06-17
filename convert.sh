#!/bin/bash

# Input and output directories
INPUT_DIR="/app/temp"
OUTPUT_DIR="/app/final"

# Ensure output directory exists
mkdir -p "$OUTPUT_DIR"

# Function to convert video to HLS and create a master playlist
convert_to_hls() {
    local input_file="$1"
    local output_dir="$2"

    # Create output directory for the current file
    mkdir -p "$output_dir"

    # Generate HLS streams and master playlist using ffmpeg
    ffmpeg -i "$input_file" \
        -vf "scale=w=640:h=360:force_original_aspect_ratio=decrease" \
        -c:a aac -ar 48000 -b:a 128k -c:v h264 -profile:v main -crf 20 -g 48 -keyint_min 48 -sc_threshold 0 \
        -hls_time 10 -hls_playlist_type vod -hls_segment_filename "$output_dir/360p_%03d.ts" -hls_flags independent_segments \
        "$output_dir/360p.m3u8" \
        -vf "scale=w=1280:h=720:force_original_aspect_ratio=decrease" \
        -c:a aac -ar 48000 -b:a 128k -c:v h264 -profile:v main -crf 20 -g 48 -keyint_min 48 -sc_threshold 0 \
        -hls_time 10 -hls_playlist_type vod -hls_segment_filename "$output_dir/720p_%03d.ts" -hls_flags independent_segments \
        "$output_dir/720p.m3u8" \
        -vf "scale=w=1920:h=1080:force_original_aspect_ratio=decrease" \
        -c:a aac -ar 48000 -b:a 128k -c:v h264 -profile:v main -crf 20 -g 48 -keyint_min 48 -sc_threshold 0 \
        -hls_time 10 -hls_playlist_type vod -hls_segment_filename "$output_dir/1080p_%03d.ts" -hls_flags independent_segments \
        "$output_dir/1080p.m3u8" \
        -var_stream_map "v:0,a:0 v:1,a:1 v:2,a:2" \
        -master_pl_name "$output_dir/master.m3u8" \
        -f hls
}

# Iterate over all files in the input directory
for file in "$INPUT_DIR"/*; do
    if [ -f "$file" ]; then
        filename=$(basename -- "$file")
        filename_no_ext="${filename%.*}"
        output_dir="$OUTPUT_DIR/$filename_no_ext"
        convert_to_hls "$file" "$output_dir"
    fi
done

