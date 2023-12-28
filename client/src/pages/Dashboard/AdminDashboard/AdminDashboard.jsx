import React, { useEffect } from 'react';
import HomeLayout from '../../../Layouts/HomeLayout/HomeLayout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllCourses } from '../../../redux/slices/courseSlice';
import { getStatsData } from '../../../redux/slices/statSlice';
import { getPaymentRecord } from '../../../redux/slices/razorPaySlice';

function AdminDashboard() {
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const {allUsersCount,subscribedUsersCount}=useSelector((state)=>state.stat)

  const {allPayments,finalMonths,monthlySalesRecord}=useSelector((state)=>state.razorpay)

  const userData = {
    labels: ["Registered User", "Enrolled User"],
    datasets: [
      {
        label: "User Details",
        data: [allUsersCount, subscribedUsersCount],
        backgroundColor: ["yellow", "green"],
        borderColor: ["yellow", "green"],
        borderWidth: 1,
      },
    ],
  };

  const salesData = {
    labels: [
      "January",
      "Febraury",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    fontColor: "white",
    datasets: [
      {
        label: "Sales / Month",
        data: monthlySalesRecord,
        backgroundColor: ["rgb(255, 99, 132)"],
        borderColor: ["white"],
        borderWidth: 2,
      },
    ],
  };

  const myCourses=useSelector((state)=>state.course.courseList)

  const handleCourseDelete = async (id) => {
   
    const res = await dispatch(deleteCourse(id));
    if (res.payload.success) {
      await dispatch(getAllCourses());
    }
  
};

useEffect(() => {
  (async () => {
    await dispatch(getAllCourses());
    await dispatch(getStatsData());
    await dispatch(getPaymentRecord());
  })();
}, []);

  return (
    <HomeLayout>
      
    </HomeLayout>
  );
}

export default AdminDashboard;

