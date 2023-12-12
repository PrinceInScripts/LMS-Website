import app from './app.js'
import connectToDB from './config/db.config.js';
import { config } from 'dotenv';
import cloudinary from 'cloudinary'
config()

const PORT=process.env.PORT || 5000

cloudinary.v2.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key:process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

app.listen(PORT,async ()=>{
   await connectToDB()
    console.log(`App is running at http://localhost:${PORT}`);
})