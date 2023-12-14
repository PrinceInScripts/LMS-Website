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
   
    if(!tokenDetails){
        return next(new AppError('Token is not verifyied, please login',401))
    }

    req.user=tokenDetails

    console.log(req.user);


    next()
}

const authorizedRoles = (...roles)=> (req,res,next)=>{

    const currentRole=req.user.role;

    if(!roles.includes(currentRole)){
        return next(
            new AppError('You do not has permission to access this route',403)
        )
    }
    next();
}

export{
    isLoggedIn,
    authorizedRoles
}

