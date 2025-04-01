# Use a minimal Go image
FROM golang:1.21 as builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod tidy

COPY . .

RUN go build -o core-worker main.go

FROM alpine:latest

WORKDIR /app
RUN apt-get update && apt-get install -y ffmpeg
COPY --from=builder /app/core-worker .

# Start the worker
CMD ["/app/core-worker"]