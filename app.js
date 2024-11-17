import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import connectToDB from './src/database/dataBaseConnection.js'

process.loadEnvFile('./src/envs/.env.app')

connectToDB()

const app = express()
const port = process.env.PORT ?? 3000

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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
