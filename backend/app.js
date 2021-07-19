import express from 'express'
import mongoose from'mongoose'
import dotenv from 'dotenv'; dotenv.config()
import { exec } from 'child_process'
import listEndpoints from 'express-list-endpoints'

import router from './routes/index.js'

const MONGO_HOST = process.env.MONGO_HOST || 'localhost'  

mongoose.connect(`mongodb://${MONGO_HOST}:27017/db`, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})  

const db = mongoose.connection  

db.once('open', () => {  // Check connection
  console.log('Connected to MongoDB')  
})  

db.on('error', (err) => {  // Check for DB errors
  console.log(err)  
})  

// Initialize
const app = express()
app.use('/api', router) // Use 'api' as base url
const domainUrl = process.env.NODE_ENV === 'production' ? 'http://localhost:5000' : 'http://localhost:5000'
const HOST = process.env.HOST || 'localhost'  
app.listen(5000, HOST, () => {
  exec('clear')
  console.log('Server listening on port 5000')  
})
console.table( listEndpoints(app) )

