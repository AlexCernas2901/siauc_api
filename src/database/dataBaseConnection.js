import mongoose from 'mongoose'
import { dbConfig } from '../config/envConfig.js'

const uri = `mongodb+srv://${dbConfig.dbUser}:${dbConfig.dbPassword}@tests.lvjae.mongodb.net/?retryWrites=true&w=majority&appName=${dbConfig.dbName}`

const connectToDB = async () => {
  try {
    await mongoose.connect(uri)
    console.log('Connected to the database')
  } catch (error) {
    console.error('Could not connect to the database', error)
  }
}

export { connectToDB }
