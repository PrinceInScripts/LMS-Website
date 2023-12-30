import AppError from "../utlis/appError.js"
import jwt from 'jsonwebtoken'


//++++++++++++++++++++isLoggedIn Method+++++++++++++++++++++++

const isLoggedIn = async function(req, res, next) {
    try {
        const { token } = req.cookies;

        if (!token) {
            return next(new AppError('Unauthenticated, please login', 401));
        }

        const tokenDetails = await jwt.verify(token, process.env.JWT_SECRET);

        if (!tokenDetails) {
            return next(new AppError('Token is not verified, please login', 401));
        }

        req.user = tokenDetails;

        next();
    } catch (error) {
        return next(new AppError('Internal Server Error', 500));
    }
};


//++++++++++++++++++++authorizedRoles Method+++++++++++++++++++++++

const authorizedRoles = (...roles)=> (req,res,next)=>{

    const currentRole=req.user.role;

    if(!roles.includes(currentRole)){
        return next(
            new AppError('You do not has permission to access this route',403)
        )
    }
    next();
}


//++++++++++++++++++++authorizedSubscriber Method+++++++++++++++++++++++

const authorizedSubscriber=async (req,res,next)=>{

    const subscriptionStatus="active";
    const currentRole=req.user.role

    if(currentRole !== 'ADMIN' && subscriptionStatus !== 'active'){
        return next(
            new AppError('please subscribe to access this route,403')
        )
    }

    next()
}

export{
    isLoggedIn,
    authorizedRoles,
    authorizedSubscriber
}

