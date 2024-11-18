import Attendance from './model.js'
import User from '../users/model.js'
import Schedules from '../schedules/model.js'

class Attendances {
  static async getAllAttendances(req, res) {
    try {
      const attendances = await Attendance.find()

      res.status(200).json(attendances)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  static async getAttendanceByAccountNumber(req, res) {
    try {
      const { accountNumber } = req.params

      const foundAttendance = await Attendance.find({ accountNumber })

      if (!foundAttendance) {
        return res.status(404).json({ error: 'Attendance not found' })
      }

      res.status(200).json(foundAttendance)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  static async check(req, res) {
    try {
      const { uid } = req.body

      // verificar si el maestro existe
      const foundTeacher = await User.findOne({ uid })

      if (!foundTeacher) {
        return res.status(404).json({ error: 'Teacher not found' })
      }

      if (foundTeacher.role !== 'teacher') {
        return res.status(400).json({ error: 'User is not a teacher' })
      }

      const { accountNumber } = foundTeacher

      // verificar si el maestro tiene un horario asignado
      const foundSchedule = await Schedules.findOne({ accountNumber })
      if (!foundSchedule) {
        return res
          .status(404)
          .json({ error: 'Teacher does not have a schedule' })
      }

      const currentDate = new Date()

      // validar que la fecha actual esté dentro del semestre
      if (
        currentDate < foundSchedule.semesterStart ||
        currentDate > foundSchedule.semesterEnd
      ) {
        return res
          .status(400)
          .json({ error: 'Current date is not within the semester' })
      }

      // validar que el día actual tenga clases programadas (lunes a viernes)
      const dayOfWeek = currentDate
        .toLocaleDateString('en-US', { weekday: 'long' })
        .toLowerCase()

      const scheduleForToday = foundSchedule.days[dayOfWeek]

      if (!scheduleForToday) {
        return res.status(400).json({ error: 'No valid schedule for today' })
      }

      const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0))
      const endOfDay = new Date(currentDate.setHours(23, 59, 59, 999))

      const foundAttendance = await Attendance.findOne({
        accountNumber
      })
        .where('createdAt')
        .gte(startOfDay)
        .lte(endOfDay)

      // si ya tiene check-in registrado
      if (foundAttendance) {
        // si ya tiene check-in pero no check-out, registrar hora de salida
        if (foundAttendance.statusOut === 'in-class') {
          const [endHour, endMinute] = scheduleForToday.end
            .split(':')
            .map(Number)

          const scheduleEndTime = new Date(currentDate)
          scheduleEndTime.setHours(endHour, endMinute, 0, 0)

          const endTimeDifference = timeDifference(currentDate, scheduleEndTime)
          const state = timeStatus(endTimeDifference)

          foundAttendance.statusOut = state

          await foundAttendance.save()

          return res.status(200).json({ message: 'Check-out recorded' })
        }

        if (foundAttendance.statusOut !== 'incomplete') {
          return res
            .status(400)
            .json({ error: 'Attendance already recorded for today' })
        }
      } else {
        // si no hay asistencia registrada para hoy, registrar hora de entrada
        const [startHour, startMinute] = scheduleForToday.start
          .split(':')
          .map(Number)

        const scheduleStartTime = new Date(currentDate)
        scheduleStartTime.setHours(startHour, startMinute, 0, 0)

        const startTimeDifference = timeDifference(
          currentDate,
          scheduleStartTime
        )
        const state = timeStatus(startTimeDifference)

        await Attendance.create({
          accountNumber,
          statusIn: state,
          statusOut: 'in-class'
        })

        return res.status(200).json({ message: 'Check-in recorded' })
      }
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
}

// función auxiliar para determinar el estado (temprano, a tiempo, tarde)
const timeStatus = (minutes) => {
  if (minutes < -10) {
    return 'early'
  } else if (minutes >= -10 && minutes <= 10) {
    return 'on-time'
  } else {
    return 'late'
  }
}

// función auxiliar para calcular la diferencia en minutos
const timeDifference = (currentDate, scheduleDate) => {
  return (currentDate - scheduleDate) / (1000 * 60)
}

export default Attendances
