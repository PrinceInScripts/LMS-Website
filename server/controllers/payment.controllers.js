import Payment from "../models/payment.models.js"
import User from "../models/user.model.js"
import { razorpay } from "../server.js"
import AppError from "../utlis/appError.js"
import crypto from 'crypto'


//++++++++++++++++++++getRazorpayApiKey Method+++++++++++++++++++++++

export const getRazorpayApiKey=async (req,res,next)=>{
     try {
        res.status(200).json({
            success:true,
            message:'Razorpay api key id',
            key:process.env.RAZORPAY_KEY_ID
        })
     } catch (e) {
        return next(
            new AppError(e.message,500)
        )
     }
}


//++++++++++++++++++++buySubscription Method+++++++++++++++++++++++

export const buySubscription=async (req,res,next)=>{

    try {
        const {id}=req.user

        const user=await User.findById(id)

        if(!user){
            return next(
                new AppError('Unathorized, please login',400)
            )
        }

        if(user.role ==='ADMIN'){
            return next(
                new AppError("Admin cannot purchase a subcription",400)
            )
        }

        const subscription=await razorpay.subscriptions.create({
            plan_id:process.env.RAZORPAY_PLAN_ID,
            customer_notify:1,
            total_count: 12,
        })

        //update user model with subscription

        user.subscription.id=subscription.id;
        user.subscription.status=subscription.status

        await user.save()

        res.status(200).json({
            success:true,
            message:'Subscribed Successfully',
            subscription_id: subscription.id,

        })

    } catch (e) {
       return next(
           new AppError(e.message,500)
       )
    }
}


//++++++++++++++++++++verifySubcription Method+++++++++++++++++++++++

export const verifySubcription=async (req,res,next)=>{
    try {
        const {id}=req.user

        const user=await User.findById(id)

        if(!user){
            return next(
                new AppError('Unathorized, please login',400)
            )
        }

       const {razorpay_payment_id,razorpay_signature,razorpay_subscription_id}=req.body

       const generatedSignature=crypto
                                .createHmac('sha256',process.env.RAZORPAY_SECRET)
                                .update(`${razorpay_payment_id}|${razorpay_subscription_id}`)

        if(generatedSignature !== razorpay_signature){
            return next(
                new AppError('Payment not verified, please try again',400)
            )
        }

        //Record payment details in payment collection

        await Payment.create({
            razorpay_payment_id,
            razorpay_signature,
            razorpay_subscription_id
        })

        //update user record with subcription status

        user.subscription.status='active'

        await user.save()

        res.status(200).json({
            success:true,
            message:'Payment verified succesfully'
        })

    } catch (e) {
       return next(
           new AppError(e.message,500)
       )
    }
}


//++++++++++++++++++++cancelSubcription Method+++++++++++++++++++++++

export const cancelSubcription=async (req,res,next)=>{
    try {
        
        const {id}=req.user

        const user=await User.findById(id)

        if(!user){
            return next(
                new AppError('Unathorized, please login',400)
            )
        }

        if(user.role ==='ADMIN'){
            return next(
                new AppError("Admin cannot cancel the subcription",400)
            )
        }

        const subscriptionId=user.subscription.id

        const subscription=await razorpay.subscriptions.cancel(subscriptionId)

        user.subscription.status=subscription.status

        await user.save()

        res.status(200).json({
            success:true,
            message:'Subscription Cancelled'
        })

    } catch (e) {
       return next(
           new AppError(e.message,500)
       )
    }
}


//++++++++++++++++++++getAllPayments Method+++++++++++++++++++++++

export const getAllPayments=async (req,res,next)=>{
    try {
        

        const {count,skip}=req.query;

        const subscriptions=await razorpay.subscriptions.all({
            count : count ? count : 10,
            skip: skip ? skip : 0
        })
 

        const monthNames=[
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ]

        const finalMonths={
            January: 0,
            February: 0,
            March: 0,
            April: 0,
            May: 0,
            June: 0,
            July: 0,
            August: 0,
            September: 0,
            October: 0,
            November: 0,
            December: 0,
        }

        const monthlyWisePayments=subscriptions.items.map((payment)=>{
            const monthIsNumbers=new Date(payment.start_at*1000)

            return monthNames[monthIsNumbers.getMonth()]
        })

        monthlyWisePayments.map((month)=>{
            Object.keys(finalMonths).forEach((objMonth)=>{
                if(month === objMonth){
                    finalMonths[month] +=1
                }
            })
        });

        const monthlySalesRecord=[]

        Object.keys(finalMonths).forEach((monthName)=>{
            monthlySalesRecord.push(finalMonths[monthName])
        })

        res.status(200).json({
            success:true,
            message:'All payments',
            subscriptions,
            finalMonths,
            monthlySalesRecord
        })

    } catch (e) {
       return next(
           new AppError(e.message,500)
       )
    }
}
