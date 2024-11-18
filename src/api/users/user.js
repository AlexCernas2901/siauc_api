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
      required: true,
      unique: true
    },
    role: {
      type: String,
      enum: ['admin', 'teacher'],
      default: 'teacher',
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default mongoose.model('User', userSchema)
