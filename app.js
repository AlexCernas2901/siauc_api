import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import connectToDB from './src/database/dataBaseConnection.js'
import users from './src/api/users/routes.js'
import teachers from './src/api/teachers/routes.js'
import schedules from './src/api/schedules/routes.js'
import attendances from './src/api/attendances/routes.js'

process.loadEnvFile('./src/envs/.env.app')

connectToDB()

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.get('/', (req, res) => {
  try {
    res.json({ message: 'Hello from Express server' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.use('/users', users)
app.use('/teachers', teachers)
app.use('/schedules', schedules)
app.use('/attendances', attendances)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
