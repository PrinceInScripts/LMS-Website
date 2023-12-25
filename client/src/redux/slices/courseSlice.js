import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../../config/axiosInstance'
import toast from 'react-hot-toast'
const initialState={
    courseList:[]
}

export const getAllCourses=createAsyncThunk("/course/getAllCourse",async (data)=>{
    try {
        const response=axiosInstance.get("/courses",data)

        toast.promise(response,{
            loading:'Wait! fetching your account',
            success:(data)=>{
                return data?.data?.message;
            },
            error:'Faild to load account'
        })
        return (await response).data.courses;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})


export const createNewCourse=createAsyncThunk("/course/create",async (data)=>{
    try {
        let formData=new FormData();
        formData.append("title",data?.title)
        formData.append("description",data?.description)
        formData.append("category",data?.category)
        formData.append("createdBy",data?.createdBy)
        formData.append("thumbail",data?.thumbail)

        const response=axiosInstance.post("/courses",formData)

        toast.promise(response,{
            loading:'Wait! creating your course',
            success:(data)=>{
                return data?.data?.message;
            },
            error:'Faild to create course'
        })
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})






const courseSlice=createSlice({
    name:"course",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllCourses.fulfilled,(state,action)=>{
            if(action?.payload){
                state.courseList=[...action.payload]
            }
        })
    }
})

export default courseSlice.reducer;