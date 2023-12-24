import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'
import { config } from 'dotenv';
config()

import userRoutes from './routes/user.routes.js'
import courseRoutes from './routes/course.routes.js'
import paymentRoutes from './routes/payment.routes.js'
import miscRoutes from './routes/miscellaneous.routes.js'
import errorMiddleware from './middlewares/error.middleware.js'
import morgan from 'morgan'

const app=express()

app.use(express.json())

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    credentials:true
}))

app.use(cookieParser())

app.use(morgan('dev'))

app.use('/ping',(req,res)=>{
    res.send('Pong')
})

//3 route config
app.use('/api/v1/user',userRoutes)
app.use('/api/v1/courses',courseRoutes)
app.use('/api/v1/payments',paymentRoutes)
app.use('/api/v1',miscRoutes)

app.all('*',(req,res)=>{
    res.status(404).send('OOPS !! page not found')
})

app.use(errorMiddleware)

export default app;