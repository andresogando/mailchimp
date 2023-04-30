import mongoose, { Schema } from 'mongoose'

const memberSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
  },
  {
    timestamps: true,
  },
)

export const Member = mongoose.model('Member', memberSchema)
