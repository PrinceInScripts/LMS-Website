import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../config/axiosInstance"
import toast from "react-hot-toast";

const initialState={
    allUsersCount:0,
    subscribedUsersCount: 0
}

export const getStatsData=createAsyncThunk("getstat",async ()=>{
    try {
        const response=axiosInstance.get("/admin/stats/users");
        toast.promise(response,{
            loading:"Getting the stats...",
            success:(data)=>{
                return data?.data?.message
            },
            error:"Failed load stats"
        })

        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);

    }
})

const statSlice=createSlice({
    name:"stat",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
      builder.addCase(getStatsData.fulfilled,(state,action)=>{
        state.allUsersCount=action?.payload?.allUsersCount
        state.subscribedUsersCount=action?.payload?.subscribedUsersCount
      })
    }
})

export default statSlice.reducer