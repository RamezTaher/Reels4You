import { errorHandler } from "@middlewares/ErrorMiddleware"
import { Express } from "express"

const initRoutes = (app: Express) => {
  app.use("/check", (req, res) => res.send("OK"))
  app.use(errorHandler)
}

export { initRoutes }
