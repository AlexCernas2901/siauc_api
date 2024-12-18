import mongoose from 'mongoose'

process.loadEnvFile('./src/envs/.env.db')

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD
const dbName = process.env.DB_NAME

const uri = `mongodb+srv://${dbUser}:${dbPassword}@tests.lvjae.mongodb.net/?retryWrites=true&w=majority&appName=${dbName}`

const connectToDB = async () => {
  try {
    await mongoose.connect(uri)
    console.log('Connected to the database')
  } catch (error) {
    console.error('Could not connect to the database', error)
  }
}

export default connectToDB
