import { Router } from 'express'
import Teachers from './controllers.js'

const teachers = Router()

// Rutas para usuarios
teachers.get('/', Teachers.getAllTeachers)
teachers.get('/:accountNumber', Teachers.getTeacherByAccountNumber)
teachers.delete('/:accountNumber', Teachers.deleteUser)
teachers.put('/:accountNumber', Teachers.replaceUser)
teachers.patch('/:accountNumber', Teachers.updateUser)

export default teachers
