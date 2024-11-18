import mongoose from 'mongoose'

const attendanceSchema = new mongoose.Schema(
  {
    accountNumber: { type: String, required: true },
    statusIn: {
      type: String,
      enum: ['on-time', 'early', 'late', 'absent'],
      required: true
    },
    statusOut: {
      type: String,
      enum: ['on-time', 'early', 'late', 'absent', 'incomplete', 'in-class']
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default mongoose.model('Attendance', attendanceSchema)
