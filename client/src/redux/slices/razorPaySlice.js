import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../config/axiosInstance"
import toast from "react-hot-toast"

const initialState={
    key:"",
    subscription_id:"",
    isPaymentVerified:false,
    allPayments:{},
    finalMonths:{},
    monthlySalesRecord:{}
}

export const getRazorPayId=createAsyncThunk("/razorpay/getId",async ()=>{
    try {
        const response=await axiosInstance.get("/payments/razorpay-key")
        return response.data;
    } catch (error) {
        toast.error("Falid to load data")
    }
})

export const purchaseCourseBundle=createAsyncThunk("/purchasecourse",async ()=>{
    try {
        const response=await axiosInstance.post("/payments/subscribe")
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const verifyUserPayment=createAsyncThunk("/verifyPayment",async (data)=>{
    try {
        const response=await axiosInstance.post("/payments/verify",{
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_subscription_id: data.razorpay_subscription_id,
            razorpay_signature_id: data.razorpay_signature_id,

        })
        
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const getPaymentRecord=createAsyncThunk("/paymentrecord",async ()=>{
    try {
        const response= axiosInstance.get("/payments?count=100")
        toast.promise(response,{
            loading:"Getting the payment record",
            success:(data)=>{
                return data?.data?.message
            },
            error:"Failed to get the payment record"
        })
        return (await response).data;
    } catch (error) {
        toast.error("Operation falid")
    }
})
export const cancelCourseBundle=createAsyncThunk("/payments/cancel",async ()=>{
    try {
        const response= axiosInstance.post("/payments/unsubcribe")
        toast.promise(response,{
            loading:"unsubscribe the bundle ",
            success:(data)=>{
                return data?.data?.message
            },
            error:"Failed to unsubscribe"
        })
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

const razorPaySlice=createSlice({
    name:"razorpay",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
         builder
         .addCase(getRazorPayId.fulfilled,(state,action)=>{
            state.key=action?.payload?.key
         })
         .addCase(purchaseCourseBundle.fulfilled,(state,action)=>{
            state.subscription_id=action?.payload?.subscription_id
         })
         .addCase(verifyUserPayment.fulfilled,(state,action)=>{
            toast.success(action?.payload?.message)
            state.isPaymentVerified=action?.payload?.success
         })
         .addCase(verifyUserPayment.rejected,(state,action)=>{
            toast.error(action?.payload?.message)
            state.isPaymentVerified=action?.payload?.success
         })
         .addCase(getPaymentRecord.fulfilled,(state,action)=>{
            state.allPayments=action?.payload?.subscriptions
            state.finalMonths=action?.payload?.finalMonths
            state.monthlySalesRecord=action?.payload?.monthlySalesRecord
         })
         
    }
})

export default razorPaySlice.reducer