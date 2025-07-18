import express from 'express'
import dotenv from 'dotenv'
import { connDB } from './config/db.js'
import router from './routes/notesRoutes.js'
import limiter from './middleware/rateLimiter.js'
import cors from 'cors'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001 


connDB()

app.use(cors())

app.use(express.json())

app.use(limiter)

app.use('/api/routes',router)

app.listen(PORT,()=>{
    console.log(`Server is listining on Port: https://localhost:${PORT}`)
})