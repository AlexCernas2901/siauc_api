const mongoose = require('mongoose')

const attendanceSchema = new mongoose.Schema(
  {
    accountNumber: { type: String, required: true },
    date: { type: Date, required: true },
    statusIn: {
      type: String,
      enum: ['on-time', 'late', 'absent'],
      required: true
    },
    statusOut: {
      type: String,
      enum: ['on-time', 'early', 'absent'],
      required: true
    },
    checkInTime: { type: Date },
    checkOutTime: { type: Date },
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = mongoose.model('Attendance', attendanceSchema)
