import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../../config/axiosInstance'
import toast from 'react-hot-toast'
const initialState={
    isLoggedIn:localStorage.getItem("isLoggedIn")  || false,
    role:localStorage.getItem("role") || "",
    data:localStorage.getItem("data") || {}
}

export const createAccount=createAsyncThunk("/auth/signup",async (data)=>{
    try {
        const response=axiosInstance.post("user/register",data)

        toast.promise(response,{
            loading:'Wait! creating your account',
            success:(data)=>{
                return data?.data?.message;
            },
            error:'Faild to create your account'
        })
        return await response;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})


export const login=createAsyncThunk("/auth/signin",async (data)=>{
    try {
        const response=axiosInstance.post("user/login",data)

        toast.promise(response,{
            loading:'Wait! authenticating your account',
            success:(data)=>{
                return data?.data?.message;
            },
            error:'Faild to authenticate your account'
        })
        return await response;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})




const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(login.fulfilled,(state,action)=>{
            console.log(action);
            localStorage.setItem("data",JSON.stringify(action?.payload?.data))
            localStorage.setItem("isLoggedIn",true)
            localStorage.setItem("role",action?.payload?.data?.user?.role)
            state.isLoggedIn=true
            state.role=action?.payload?.data?.user?.role
            state.data=action?.payload?.data?.user
        })
    }
})

export default authSlice.reducer;