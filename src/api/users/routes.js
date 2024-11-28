import { Router } from 'express'
import { Users } from './controllers.js'

const users = Router()

// users routes
users.post('/', Users.createUser)

export { users }
