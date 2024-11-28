import { Router } from 'express'
import { Schedules } from './controllers.js'

const schedules = Router()

// schedules routes
schedules.get('/', Schedules.getAllSchedules)
schedules.post('/', Schedules.createNewSchedule)

export { schedules }
