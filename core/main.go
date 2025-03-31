package main

import (
	"log"

	"github.com/hibiken/asynq"
	"github.com/sebzz2k2/hls/core/tasks"
)

func main() {
	server := tasks.NewServer()
	mux := asynq.NewServeMux()

	mux.HandleFunc(tasks.EmailTask, tasks.HandleEmailTask)

	if err := server.Run(mux); err != nil {
		log.Fatal(err)
	}
}
