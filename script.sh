#!/bin/bash

ECHO "Running script.sh"

# Define variables
IMAGE_NAME="my-ffmpeg-converter"
DOCKERFILE_DIR="$(pwd)"  # Directory containing the Dockerfile and convert.sh
TEMP_DIR="$(pwd)/temp"   # Directory containing input files
FINAL_DIR="$(pwd)/final" # Directory to store output files

# Create final directory if it doesn't exist
mkdir -p "$FINAL_DIR"

# Build the Docker image
docker build -t "$IMAGE_NAME" "$DOCKERFILE_DIR"

# Run the Docker container with volume mappings
docker run --rm -v "$TEMP_DIR:/app/temp" -v "$FINAL_DIR:/app/final" "$IMAGE_NAME" /app/convert.sh

