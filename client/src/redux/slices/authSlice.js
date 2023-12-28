import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../../config/axiosInstance'
import toast from 'react-hot-toast'

const initialState={
    isLoggedIn:localStorage.getItem("isLoggedIn")  || false,
    role:localStorage.getItem("role") || "",
    data:JSON.parse(localStorage.getItem("data"))|| {}
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

export const updateProfile=createAsyncThunk("/auth/updateProfile",async (data)=>{
    try {
        const response=axiosInstance.put(`user/update/${data[0]}`,data[1])

        toast.promise(response,{
            loading:'Wait! updating your account',
            success:(data)=>{
                return data?.data?.message;
            },
            error:'Faild to update your account'
        })
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})


export const getUserData=createAsyncThunk("/auth/getData",async (dta)=>{
    try {
        const response=axiosInstance.get("user/me")
        return (await response).data;
    } catch (error) {
        toast.error(error?.message)
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

export const logout=createAsyncThunk("/auth/logout",async ()=>{
    try {
        const response=axiosInstance.get("user/logout")

        toast.promise(response,{
            loading:'Wait! logging out your account',
            success:(data)=>{
                return data?.data?.message;
            },
            error:'Faild to logout your account'
        })
        return await response;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const changePassword=createAsyncThunk("/auth/chnagePassword",async (userPassword)=>{
    try {
        const response=axiosInstance.post("user/change-password",userPassword)

        toast.promise(response,{
            loading:'Loading....',
            success:(data)=>{
                return data?.data?.message;
            },
            error:'Faild to change password'
        })
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const forgetPassword=createAsyncThunk("/auth/forgotPassword",async (email)=>{
    try {
        const response=axiosInstance.post("user/reset",{email})

        toast.promise(response,{
            loading:'Loading....',
            success:(data)=>{
                return data?.data?.message;
            },
            error:'Faild to send verification email'
        })
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const resetPassword=createAsyncThunk("/user/reset",async (data)=>{
    try {
        const response=axiosInstance.post(`/user/reset/${data.resetToken}`,{
            password:data.password
        })

        toast.promise(response,{
            loading:'Resetting....',
            success:(data)=>{
                return data?.data?.message;
            },
            error:'Faild to reset password'
        })
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})









const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(login.fulfilled,(state,action)=>{

            const user = action.payload?.data?.user;

            if (user) {
              localStorage.setItem('data', JSON.stringify(user));
              localStorage.setItem('isLoggedIn', true);
              localStorage.setItem('role', user.role);
    
              state.isLoggedIn = true;
              state.role = user.role;
              state.data = user;
            }
        })
        .addCase(logout.fulfilled,(state)=>{
            localStorage.clear()
            state.isLoggedIn=false
            state.role=""
            state.data={}

        })
        .addCase(getUserData.fulfilled,(state,action)=>{
            if(!action?.payload?.user) return;
            localStorage.setItem("data",JSON.stringify(action?.payload?.user))
            localStorage.setItem("isLoggedIn",true)
            localStorage.setItem("role",action?.payload?.user?.role)
            state.isLoggedIn=true;
            state.role=action?.payload?.user?.role
            state.data=action?.payload?.user

        })
    }
})

export default authSlice.reducer;