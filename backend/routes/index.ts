import { errorHandler } from "@middlewares/error.middlewares"
import { Express } from "express"

const initRoutes = (app: Express) => {
  app.use("/check", (req, res) => res.send("OK"))
  app.use(errorHandler)
}

export { initRoutes }
