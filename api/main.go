package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	_ "github.com/lib/pq"
	"github.com/sebzz2k2/hls/api/db"
	"github.com/sebzz2k2/hls/api/routes"
)

func main() {
	if err := db.Connect(); err != nil {
		log.Fatal(err)
	}
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowMethods: "GET,POST,PUT,DELETE,OPTIONS",
	}))

	routes.SetupRoutes(app)
	app.Listen(":3000")
}
