import mongoose from "mongoose"

const connect = async () => {
  try {
    await mongoose.connect(
      process.env.DATABASE_URI as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as mongoose.ConnectOptions
    )
  } catch (error) {
    console.log("failed to connect")
  }
}

export default { connect }
