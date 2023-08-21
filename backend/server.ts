import express from "express"
import bodyParser from "body-parser"
import dotenv from "dotenv"

import { initRoutes } from "@routes/index"
import { initDB } from "@config/db"
import { initCORS } from "@config/cors"

dotenv.config()
const app = express()

console.log(process.env.MONGO_URI)

initDB()
initCORS(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

initRoutes(app)

const PORT = process.env.PORT || 5000

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
