import mongoose, { ConnectOptions } from "mongoose"
import winston from "winston"

const initDB = async () => {
  const uri = process.env.MONGO_URI || ""
  try {
    const options = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    } as ConnectOptions
    const conn = await mongoose.connect(uri, options)

    winston.info(`Connected to ${conn.connection.host}...`)
  } catch (error) {
    winston.error(error)
    process.exit(1)
  }
}

export { initDB }
