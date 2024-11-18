import { Router } from 'express'
import Schedules from './controllers.js'

const schedules = Router()

// Rutas para usuarios
schedules.get('/', Schedules.getAllSchedules)
schedules.post('/', Schedules.createNewSchedule)

export default schedules
