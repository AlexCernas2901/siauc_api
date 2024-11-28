import { Schedule } from './model.js'
import { User } from '../users/model.js'

class Schedules {
  static async getAllSchedules(req, res) {
    try {
      const schedules = await Schedule.find()

      res.status(200).json(schedules)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  static async createNewSchedule(req, res) {
    try {
      const { accountNumber, semesterStart, semesterEnd, days } = req.body

      const foundTeacher = await User.findOne({ accountNumber })

      if (!foundTeacher) {
        return res.status(404).json({ error: 'Teacher not found' })
      }

      const newSchedule = await Schedule.create({
        accountNumber,
        semesterStart,
        semesterEnd,
        days
      })

      res.status(201).json(newSchedule)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
}

export { Schedules }
