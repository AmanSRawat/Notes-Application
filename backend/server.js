import express from 'express'
import dotenv from 'dotenv'
import { connDB } from './config/db.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001 

connDB()

app.listen(PORT,()=>{
    console.log(`Server is listining on Port: https://localhost:${PORT}`)
})