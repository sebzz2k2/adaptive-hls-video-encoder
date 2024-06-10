bash 
```
docker run -it -v /home/sebin/Documents/video-encoder/test_media:/app/test_media ffmpeg-test
```

bash 
```
ffmpeg -i /path/to/your/video/file.mp4 \
-c:v libx264 -crf 21 -preset veryfast \
-c:a aac -b:a 128k -ac 2 \
-f hls -hls_time 4 -hls_playlist_type event /output/stream.m3u8
```
