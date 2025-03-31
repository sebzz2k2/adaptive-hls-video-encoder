package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/sebzz2k2/hls/api/handlers"
)

func SetupRoutes(app *fiber.App) {
	// routes should be /api/auth
	api := app.Group("/api")
	auth := api.Group("/auth")

	// auth routes
	auth.Post("/login", handlers.Login)
	auth.Post("/register", handlers.Register)
}
