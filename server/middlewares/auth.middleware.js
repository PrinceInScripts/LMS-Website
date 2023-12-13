import AppError from "../utlis/appError.js"
import jwt from 'jsonwebtoken'




const isLoggedIn=async function(req,res,next){

    console.log(req.headers);
    
    const { token } = req.cookies;   

    console.log(token)

    if(!token){
        return next(new AppError('Unauthenticated, please login',401))
    }

    const tokenDetails = jwt.verify(token, process.env.JWT_SECRET);
    console.log(tokenDetails);

    if(!tokenDetails){
        return next(new AppError('Token is not verifyied, please login',401))
    }

    req.user=tokenDetails

    next()
}

export{
    isLoggedIn
}

