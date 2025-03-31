package tasks

import (
	"context"
	"fmt"

	"github.com/hibiken/asynq"
)

const EmailTask = "email:send"

// CreateTaskEmail generates a task to send an email
func CreateTaskEmail(email string) (*asynq.Task, error) {
	payload := []byte(email)
	return asynq.NewTask(EmailTask, payload), nil
}

// HandleEmailTask processes the email task
func HandleEmailTask(ctx context.Context, t *asynq.Task) error {
	email := string(t.Payload())
	fmt.Println("📩 Sending email to:", email)
	// Simulate email sending (replace with actual logic)
	return nil
}
