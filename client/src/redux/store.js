import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/authSlice';
import courseReducer from './slices/courseSlice';
import razorpayReducer from './slices/razorPaySlice';
import lectureReducer from './slices/lectureSlice';
import statReducer from './slices/statSlice';

const store=configureStore({
    reducer:{
        auth:authReducer,
        course:courseReducer,
        razorpay:razorpayReducer,
        lecture:lectureReducer,
        stat:statReducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false}),
    devTools:true
})

export default store;

