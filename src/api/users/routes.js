import { Router } from 'express'
import Users from './controllers.js'

const users = Router()

// Rutas para usuarios
users.post('/', Users.createUser)

export default users
