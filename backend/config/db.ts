import mongoose from "mongoose"

const initDB = async () => {
  mongoose.set("strictQuery", false)
  const uri = process.env.MONGO_URI || ""
  try {
    const conn = await mongoose.connect(uri)

    console.log(`Connected to ${conn.connection.host}...`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

export { initDB }
