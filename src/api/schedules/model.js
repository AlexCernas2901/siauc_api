import mongoose from 'mongoose'

const scheduleSchema = new mongoose.Schema(
  {
    accountNumber: { type: String, required: true },
    semesterStart: { type: Date, required: true },
    semesterEnd: { type: Date, required: true },
    days: {
      monday: {
        start: { type: String, required: true },
        end: { type: String, required: true }
      },
      tuesday: {
        start: { type: String, required: true },
        end: { type: String, required: true }
      },
      wednesday: {
        start: { type: String, required: true },
        end: { type: String, required: true }
      },
      thursday: {
        start: { type: String, required: true },
        end: { type: String, required: true }
      },
      friday: {
        start: { type: String, required: true },
        end: { type: String, required: true }
      }
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export const Schedule = mongoose.model('Schedule', scheduleSchema)
