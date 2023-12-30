import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../config/axiosInstance"


const initialState ={
    lectures:[]
}


export const getCourseLecture=createAsyncThunk("/course/lecture/get",async (cid)=>{
    try {
        const response=axiosInstance.get(`/courses/${cid}`)
        toast.promise(response,{
            loading:"Fetching course lectures",
            success:"Fetched course lectures",
            error:"Failed load the lectures"
        })

        return (await response).data;
    } catch (error) {
        toast.error(error?.reponse?.data?.message)
    }
})
export const deleteCourseLecture=createAsyncThunk("/course/lecture/delete",async (data)=>{
    try {
        const response=axiosInstance.delete(`/courses?courseId=${data.courseId}&lectureId=${data.lectureId}`)
        toast.promise(response,{
            loading:"Deleting the lectures",
            success:"Lecture deleted lectures",
            error:"Failed to delete lectures"
        })

        return (await response).data;
    } catch (error) {
        toast.error(error?.reponse?.data?.message)
    }
})

export const addCourseLecture=createAsyncThunk("/course/lecture/add",async (data)=>{
    

        const formData=new FormData()
        formData.append("lecture",data.lecture)
        formData.append("title",data.title)
        formData.append("description",data.description)
        try {

        const response=axiosInstance.post(`/courses/${data.id}`,formData)
        toast.promise(response,{
            loading:"Adding course lectures",
            success:"added course lectures",
            error:"Failed to add the lectures"
        })

        return (await response).data;
    } catch (error) {
        toast.error(error?.reponse?.data?.message)
    }
})


const lectureSlice=createSlice({
    name:"lecture",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getCourseLecture.fulfilled,(state,action)=>{
            state.lectures=action?.payload?.lectures;
        })
        .addCase(addCourseLecture.fulfilled,(state,action)=>{
            state.lectures=action?.payload?.course?.lectures;
        })

    }
})


export default lectureSlice.reducer;