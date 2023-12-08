const cookieParser=require('cookie-parser')
const express=require('express')
const cors=require('cors')
const userRoutes=require('./routes/user.routes')
const errorMiddleware=require('./middlewares/error.middleware')

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
app.use('/api/v1/user',userRoutes)

app.all('*',(req,res)=>{
    res.status(404).send('OOPS !! page not found')
})

app.use(errorMiddleware)

export default app;