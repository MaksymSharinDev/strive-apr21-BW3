import express from 'express'
import mongoose from'mongoose'
import dotenv from 'dotenv'; dotenv.config()
import cors from "cors";

import listEndpoints from 'express-list-endpoints'

import router from './routes/index.js'

const MONGO_HOST = process.env.MONGO_HOST || 'localhost'
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || `mongodb://${MONGO_HOST}:27017/db`
mongoose.connect( DB_CONNECTION_STRING, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})  

const db = mongoose.connection  
console.clear()
db.once('open', () => {  // Check connection
  console.log('Connected to MongoDB')  
})  

db.on('error', (err) => {  // Check for DB errors
  console.log(err)  
})  

// Initialize
const app = express();
const whitelist = [process.env.FRONTEND_URL, process.env.FRONTEND_PROD_URL];
app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        whitelist.indexOf(origin) !== -1 ||
        origin.startsWith(process.env.FRONTEND_PREVIEW_URL)
      ) {
        // origin is in the list therefore it is allowed
        callback(null, true);
      } else {
        // origin is not in the list then --> ERROR
        callback(new Error("Not allowed by cors!"));
      }
    },
  })
);

app.use("/api", router); // Use 'api' as base url

const domainUrl =
  process.env.NODE_ENV === "production"
    ? "http://localhost:5000"
    : "http://localhost:5000";
const HOST = process.env.HOST || "localhost";
app.listen(5000, HOST, () => {
  console.log("Server listening on port 5000");
});
console.table(listEndpoints(app));
