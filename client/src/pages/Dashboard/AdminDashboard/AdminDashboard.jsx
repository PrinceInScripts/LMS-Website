import React, { useEffect } from 'react';
import HomeLayout from '../../../Layouts/HomeLayout/HomeLayout';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { FaUsers } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { FcSalesPerformance } from "react-icons/fc";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";
import { MdOutlineModeEdit } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteCourse, getAllCourses } from '../../../redux/slices/courseSlice';
import { getStatsData } from '../../../redux/slices/statSlice';
import { getPaymentRecord } from '../../../redux/slices/razorPaySlice';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

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
     <div className="min-h-[90vh] pt-5  text-white">
      <div className='flex flex-col flex-wrap gap-10 mt-20 lg:mt-20'>
      <h1 className="text-center  text-3xl font-semibold text-yellow-500">
          Admin Dashboard
        </h1>
      
      <div className="lg:grid lg:grid-cols-2 gap-5 m-auto mx-10">
        <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
            <div className='w-80 h-80'>
                <Pie data={userData}/>
            </div>

            <div className="grid grid-cols-2 gap-5">
            <div className="flex items-center justify-between py-5 px-5 gap-5 rounded-md shadow-md">
                    <div className='flex flex-col items-center'>
                      <p className='font-semibold'>Registered Users</p>
                      <h3 className='text-4xl font-bold'>{allUsersCount}</h3>
                    </div>     
                    <FaUsers className='text-yellow-500 text-5xl'/>           
              </div>

              <div className="flex items-center justify-between py-5 px-5 gap-5 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Subscribed Users</p>
                  <h3 className="text-4xl font-bold">{subscribedUsersCount}</h3>
                </div>
                <FaUsers className="text-green-500 text-5xl" />
              </div>
            </div>
        </div>

        <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
           <div className="h-80 relative w-full">
              <Bar className="absolute bottom-0 h-80 w-full" data={salesData} />
            </div> 

            <div className="grid grid-cols-2 gap-5">
            <div className="flex items-center justify-between py-5 px-5 gap-5 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Subscriptions Count</p>
                  <h3 className="text-4xl font-bold">{allPayments?.count}</h3>
                </div>
                <FcSalesPerformance className="text-yellow-500 text-5xl" />
              </div>  

              <div className="flex items-center justify-between py-5 px-5 gap-5 rounded-md shadow-md">
              <div className="flex flex-col items-center">
                  <p className="font-semibold">Total Revenue</p>
                  <h3 className="text-4xl font-bold">
                    {allPayments?.count * 499}
                  </h3>
                </div>
                <GiMoneyStack className="text-green-500 text-5xl" />           
              </div>           
            </div>       
        </div>
      </div>


      <div className="mx-[10%] w-[80%] self-center flex flex-col items-center justify-center gap-10 mb-10">
           <div className='flex flex-col lg:flex-row gap-5 w-full items-center lg:justify-between'>
           <h1 className="text-center text-3xl font-semibold">
              Courses Overview
            </h1>

            <button
              onClick={() => {
                navigate("/course/create", {
                  state: {
                    initialCourseData: {
                      newCourse: true,
                      title: "",
                      category: "",
                      createdBy: "",
                      description: "",
                      thumbnail: undefined,
                      previewImage: "",
                    },
                  },
                });
              }}
              className="w-fit bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded py-2 px-4 font-semibold text-lg cursor-pointer"
            >
              Create New Course
            </button>
            </div>   

            <table className="table p-20 overflow-x-scroll">
  <thead>
    <tr>
      <th>S No.</th>
      <th>Course Title</th>
      <th className="hidden lg:table-cell">Course Category</th>
      <th className="hidden lg:table-cell">Instructor</th>
      <th className="hidden lg:table-cell">Total Lectures</th>
      <th>Course Description</th>
      <th>Actions</th>
    </tr>
  </thead>

  <tbody>
    {myCourses?.map((element, index) => (
      <tr key={element?._id}>
        <td>{index + 1}</td>
        <td>
          <textarea
            readOnly
            className="w-full h-auto bg-transparent resize-none"
            value={element?.title}
          />
        </td>
        <td className="hidden lg:table-cell">{element?.category}</td>
        <td className="hidden lg:table-cell">{element?.createdBy}</td>
        <td className="hidden lg:table-cell">{element?.numberOfLectures}</td>
        <td className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
          <textarea
            readOnly
            className="w-full h-auto bg-transparent resize-none"
            value={element?.description}
          />
        </td>

        <td className="flex items-center gap-2 lg:gap-4">
          <button
            onClick={() =>
              navigate(`/course/${element._id}`, {
                state: {
                  ...element
                },
              })
            }
 className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 text-sm lg:text-lg px-1 py-1 lg:py-2 lg:px-3 rounded-md font-bold"
>
            <MdOutlineModeEdit />
          </button>

          <button
            onClick={() => handleCourseDelete(element._id)}
                        className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-30 text-sm lg:text-lg px-1 py-1 lg:py-2 lg:px-3 rounded-md font-bold"
>
            <BsTrash />
          </button>

          <button
            onClick={() =>
              navigate('/course/displaylectures', {
                state: { ...element },
              })
            }
                        className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-30 text-sm lg:text-lg px-1 py-1 lg:py-2 lg:px-3 rounded-md font-bold"
>
            <BsCollectionPlayFill />
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>  
      </div>
      </div>
     

      </div>
    </HomeLayout>
  );
}

export default AdminDashboard;

