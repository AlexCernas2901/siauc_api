import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      length: 100,
      required: true
    },
    accountNumber: {
      type: String,
      length: 8,
      unique: true,
      required: true
    },
    uid: {
      type: String,
      length: 8,
      unique: true,
      required: true
    },
    role: {
      type: String,
      enum: ['admin', 'teacher'],
      default: 'teacher',
      required: true
    },
    password: {
      type: String,
      length: 25,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export const User = mongoose.model('User', userSchema)
