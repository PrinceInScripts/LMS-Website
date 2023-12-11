import app from './app.js'
import connectToDB from './config/db.config.js';
import { config } from 'dotenv';
config()

const PORT=process.env.PORT || 5000

app.listen(PORT,async ()=>{
   await connectToDB()
    console.log(`App is running at http://localhost:${PORT}`);
})