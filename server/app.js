import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'

const app=express()

app.use(express.json())

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    Credential:true
}))

app.use(cookieParser())

app.use('/ping',(req,res)=>{
    res.send('Pong')
})

//3 route config

app.all('*',(req,res)=>{
    res.status(404).send('OOPS !! page not found')
})

export default app;