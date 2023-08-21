import express from "express"
import winston from "winston"
import bodyParser from "body-parser"

import { initRoutes } from "@routes/index"
import { initDB } from "@config/db"
import { initCORS } from "@config/cors"

const app = express()

initDB()
initCORS(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

initRoutes(app)

const PORT = process.env.PORT || 5000

app.listen(PORT, () =>
  winston.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
