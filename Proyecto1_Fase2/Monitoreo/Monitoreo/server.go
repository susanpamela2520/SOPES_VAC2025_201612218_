package main

import "github.com/gofiber/fiber/v2"

func hello(c *fiber.Ctx) error {
	return c.Status(fiber.StatusOK).JSON("Hola amigos !!")
}

func showRam(c *fiber.Ctx) error {
	value := getRam()
	return c.Status(fiber.StatusOK).JSON(value)
}

func showCpu(c *fiber.Ctx) error {
	value := getCpu()
	return c.Status(fiber.StatusOK).JSON(value)
}

func showProcess(c *fiber.Ctx) error {
	value := getProcess()
	return c.Status(fiber.StatusOK).JSON(value)
}

func initServer() {
	app := fiber.New()

	app.Get("/", hello)
	app.Get("/ram", showRam)
	app.Get("/cpu", showCpu)
	app.Get("/process", showProcess)

	app.Listen(":3000")
}
