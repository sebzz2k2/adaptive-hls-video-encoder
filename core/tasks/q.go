package tasks

import (
	"github.com/hibiken/asynq"
)

var RedisClient = asynq.RedisClientOpt{Addr: "localhost:6379"}

func NewClient() *asynq.Client {
	return asynq.NewClient(RedisClient)
}

func NewServer() *asynq.Server {
	return asynq.NewServer(RedisClient, asynq.Config{
		Concurrency: 10, // Number of workers
	})
}
