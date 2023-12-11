import {Schema,model} from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema=new Schema({
    fullName:{
        type:String,
        required:[true,"Name is required"],
        minLength:[5,'Name must be at-least 5 charcter'],
        maxlength:[50,'Name must shold be less than 50 characters'],
        lowercase:true,
        trim:true
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        lowercase:true,
        trim:true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please fill in a valid email address',
        ]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minLength:[8,'Password must be atleast 8 charcter'],
        select:false
    },
    role:{
      type:String,
      enum:['USER','ADMIN'],
      default:'USER'
    },
    avatar:{
        public_id:{
            type:String
        },
        secure_url:{
            tpe:String
        }
    },
    forgotPasswordToken:String,
    forgotPasswordExpiry:Date
},{timestamps:true})


userSchema.pre('save',async function(){
    if(!this.isModified('password')){
        return next();
    }
    this.password=await bcrypt.hash(this.password,10)
})

userSchema.methods={
    comaprePassword:async function(plainTextPassword){
        return await bcrypt.compare(plainTextPassword)
    },
    generateJWTToken:function(){
        return jwt.sign(
            {id:this._id,role:this.role,email:this.email,subcription:this.subcription},
            process.env.JWT_SECRET,
            {
                expiresIn:process.env.JWT_EXPIRY
            }
        )
    }
}

const User=model('Users',userSchema);

export default User