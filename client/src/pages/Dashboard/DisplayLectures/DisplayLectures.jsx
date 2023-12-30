import React, { useEffect, useState } from "react";
import HomeLayout from "../../../Layouts/HomeLayout/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  deleteCourseLecture,
  getCourseLecture,
} from "../../../redux/slices/lectureSlice";

function DisplayLectures() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state } = useLocation();
  const { lectures } = useSelector((state) => state.lecture);
  const { role } = useSelector((state) => state.auth);

  const [currentVideo, setCurrentVideo] = useState(0);

  async function onLectureDelete(cid, lid) {
    await dispatch(deleteCourseLecture({ courseId: cid, lectureId: lid }));
    await dispatch(getCourseLecture(state._id));
  }

  useEffect(() => {
    if (!state) navigate("/courses");
    dispatch(getCourseLecture(state._id));


  }, []);
  return (
  
   

    <HomeLayout>
    <div className="flex flex-col gap-6 items-center justify-center min-h-[90vh] py-6 text-white mx-4 lg:mx-10">
      <h1 className="text-center text-2xl lg:text-3xl font-semibold text-yellow-500 mt-6 lg:mt-0">
        Course Name: {state?.title}
      </h1>

      {lectures && lectures.length > 0 && (
        <div className="flex flex-col lg:flex-row justify-center gap-6 lg:w-full">
          <div className="space-y-4 w-full lg:w-full lg:max-w-[60%] p-4 lg:p-6 rounded-lg shadow-[0_0_10px_black]">
            <div>
              <h1 className="text-2xl lg:text-3xl text-yellow-500">
                Title: {lectures && lectures[currentVideo]?.title}
              </h1>
            </div>
            <video
              src={lectures[currentVideo]?.lecture?.secure_url}
              className="object-fill rounded-lg w-full"
              controls
              disablePictureInPicture
              muted
              controlsList="nodownload"
            ></video>
            <div>
              <p className="text-sm lg:text-base text-white line-clamp-4">
                Description: {lectures && lectures[currentVideo]?.description}
              </p>
            </div>
          </div>

          <ul className="w-full lg:w-[28rem] max-h-[89vh] overflow-auto rounded-lg shadow-[0_0_10px_black] p-4 lg:p-6 space-y-4">
            <li className="font-semibold text-xl text-yellow-500 flex justify-between items-center">
              <p>Lectures List</p>
              {role === "ADMIN" && (
                <button
                  onClick={() =>
                    navigate("/course/addlecture", { state: { ...state } })
                  }
                  className="btn btn-accent px-2 py-1 rounded-md font-semibold text-sm"
                >
                  Add New Lecture
                </button>
              )}
            </li>
            {lectures &&
              lectures.map((lecture, idx) => (
                <li className="space-y-2" key={lecture._id}>
                  <p
                    className="cursor-pointer text-xl text-yellow-500"
                    onClick={() => setCurrentVideo(idx)}
                  >
                    Lecture {idx + 1}: {lecture?.title}
                  </p>
                  <p className="text-sm">{lecture?.description}</p>
                  {role === "ADMIN" && (
                    <button
                      onClick={() => onLectureDelete(state?._id, lecture?._id)}
                      className="btn btn-primary px-2 py-1 rounded-md font-semibold text-sm"
                    >
                      Delete Lecture
                    </button>
                  )}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  </HomeLayout>
    
  );
}

export default DisplayLectures;
