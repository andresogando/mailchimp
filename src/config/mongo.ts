import mongoose from 'mongoose'

export async function connectToMongoDB() {
  try {
    return await mongoose.connect(process.env.MONGO_URI)
  } catch (err) {
    console.error(err)
  }
}
