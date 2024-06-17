# Video Upload and HLS Stream Creation Flow

This document explains the process flow for uploading a video, creating an HLS stream using Docker, and managing file paths and keys using MinIO and Redis.

![Process Flow](flow.png)

## Process Flow

1. **Upload Video**
   - The initial step involves uploading a video to the MinIO server.
2. **MinIO Storage**

   - The uploaded video is stored in MinIO, an object storage service.

3. **Redis Hash Table**

   - MinIO stores the file path of the uploaded video in a Redis hash table. This allows for easy retrieval of file paths.

4. **Subscriber Retrieval**

   - A subscriber retrieves the file path from the Redis hash table. This subscriber is responsible for initiating the HLS stream creation process.

5. **Create HLS Stream Using Docker**

   - Using the retrieved file path, a Docker container is utilized to create an HLS stream from the uploaded video. This involves segmenting the video into smaller chunks suitable for streaming.

6. **Upload HLS Folder to MinIO**

   - The resulting HLS stream, which is a folder containing the segmented video files, is uploaded back to MinIO for storage.

7. **Delete Key from Redis**

   - Once the HLS stream creation is completed, the associated key is deleted from Redis to maintain a clean and updated hash table.

   ## How to run

8. Clone the repository
9. Open the terminal and navigate to the project directory and run the following command

```bash
docker compose up
```

3. Open another terminal and run the following command

```bash
bun install
```

4. Now run the following command

```bash
bun index.ts
```

5. Open another terminal and run the following command

```bash
bun subscriber.ts
```

## How to test

1. Open the terminal and navigate to the project directory and run the following command

```bash
curl --request POST \
  --url http://localhost:8080/upload \
  --header 'content-type: multipart/form-data' \
  --form file=@file
```

2. Open a browser and navigate to http://localhost:9001 and you will be prompted to enter minio credentials
   - username: minio
   - password: minio123
3. your video will be uploaded to minio and the subscriber will create an HLS stream and upload it back to minio
