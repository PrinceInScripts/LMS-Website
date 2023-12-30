import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../../config/axiosInstance'
import toast from 'react-hot-toast'
const initialState = {
  courseList: []
}

export const getAllCourses = createAsyncThunk("/course/getAllCourse", async (data) => {
  try {
    const response = axiosInstance.get("/courses", data)

    toast.promise(response, {
      loading: 'Wait! fetching your account',
      success: (data) => {
        return data?.data?.message;
      },
      error: 'Faild to load account'
    })
    return (await response).data.courses;
  } catch (error) {
    toast.error(error?.response?.data?.message)
  }
})


export const createNewCourse = createAsyncThunk("/course/create", async (data) => {
  try {
    let formData = new FormData();
    formData.append("title", data?.title)
    formData.append("description", data?.description)
    formData.append("category", data?.category)
    formData.append("createdBy", data?.createdBy)
    formData.append("thumbail", data?.thumbail)

    const response = axiosInstance.post("/courses", formData)

    toast.promise(response, {
      loading: 'Wait! creating your course',
      success: (data) => {
        return data?.data?.message;
      },
      error: 'Faild to create course'
    })
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message)
  }
})

export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
  try {
    const res = axiosInstance.delete(`courses/${id}`);

    toast.promise(res, {
      loading: "Deleting the course...",
      success: "Courses deleted successfully",
      error: "Failed to delete course",
    });

    const response = await res;

    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const updateCourse = createAsyncThunk("/course/update", async (data) => {
  try {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("createdBy", data.createdBy);
    formData.append("description", data.description);

    const res = axiosInstance.put(`/courses/${data.id}`, {
      title: data.title,
      category: data.category,
      createdBy: data.createdBy,
      description: data.description,
    });
    console.log(res);

    toast.promise(res, {
      loading: "Updating the course...",
      success: "Course updated successfully",
      error: "Failed to update course",
    });

    const response = await res;
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
});





const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      if (action?.payload) {
        state.courseList = [...action.payload]
      }
    })
  }
})

export default courseSlice.reducer;