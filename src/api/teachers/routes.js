import { Router } from 'express'
import { Teachers } from './controllers.js'

const teachers = Router()

// teachers routes
teachers.get('/', Teachers.getAllTeachers)
teachers.get('/:accountNumber', Teachers.getTeacherByAccountNumber)
teachers.delete('/:accountNumber', Teachers.deleteTeacher)
teachers.put('/:accountNumber', Teachers.replaceUser)
teachers.patch('/:accountNumber', Teachers.updateUser)

export { teachers }
