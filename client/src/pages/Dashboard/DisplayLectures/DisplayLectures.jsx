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
    console.log(lectures);
    console.log(state._id);

    dispatch(getCourseLecture(state._id));
    console.log(dispatch(getCourseLecture(state._id)));
    console.log(lectures);

  }, []);
  return (
    <HomeLayout>
      <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-[5%]">
        <h1 className="text-center text-2xl font-semibold text-yellow-500">
          Course Name : {state?.title}
        </h1>

        {lectures && lectures.length > 0 && (
          <div className="flex justify-center gap-10 w-full">
            <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
              <video
                src={lectures[currentVideo]?.lecture?.secure_url}
                className="object-fill rounded-tl-lg w-full rounded-tr-lg"
                controls
                disablePictureInPicture
                muted
                controlsList="nodownload"
              ></video>
              <div>
                <h1>
                  <span className="text-yellow-500">Title : </span>
                  {lectures && lectures[currentVideo]?.title}
                </h1>
                <p>
                  {" "}
                  <span className="text-yellow-500 line-clamp-4">
                    Description :{" "}
                  </span>
                  {lectures && lectures[currentVideo]?.description}
                </p>
              </div>
            </div>

            <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
              <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
                <p>Lectures List</p>
                {role === "ADMIN" && (
                  <button
                    onClick={() =>navigate("/course/addlecture",)}
                    className="btn btn-accent px-2 py-1 rounded-md font-semibold text-sm"
                  >
                    Add New Lecture
                  </button>
                )}
              </li>
              {lectures &&
                lectures.map((lecture, idx) => {
                  return (
                    <li className="space-y-2" key={lecture._id}>
                      <p
                        className="cursor-pointer"
                        onClick={() => setCurrentVideo(idx)}
                      >
                        <span className="text-yellow-500">
                          {" "}
                          Lecture {idx + 1} :{" "}
                        </span>
                        {lecture?.title}
                      </p>
                      {role === "ADMIN" && (
                        <button
                          onClick={() =>
                            onLectureDelete(
                              state?._id,
                              lecture?._id
                            )
                          }
                          className="btn btn-primary px-2 py-1 rounded-md font-semibold text-sm"
                        >
                          Delete Lecture
                        </button>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>
        )}
      </div>
    </HomeLayout>
  );
}

export default DisplayLectures;
