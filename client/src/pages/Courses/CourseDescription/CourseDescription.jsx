import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../../Layouts/HomeLayout/HomeLayout";

function CourseDescription() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { role, data } = useSelector((state) => state.auth);



  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-12 px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 flex lg:flex-col items-center justify-center text-white">
        <div className="space-y-8 flex flex-col lg:flex-row gap-10">
          {/* Image and Title Section */}
          <div className="space-y-5 text-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-yellow-500 mb-5">
              {state?.title}
            </h1>
            <div className="w-full h-auto max-h-64 md:max-h-full rounded-md overflow-hidden">
              <img
                className="w-full h-full rounded-md object-cover"
                alt="thumbnail"
                src={state?.thumbail?.secure_url}
              />
            </div>
          </div>

          {/* Information Section */}
          <div className="space-y-4">
            <div className="flex flex-col gap-10">
            <div className="space-y-2">
              <p className="text-yellow-500 text-3xl">Course Description:</p>
              <p>{state?.description}</p>
            </div>


            {role === "ADMIN" || data?.subscription?.status === "active" ? (
              <button
                onClick={() => navigate("/course/displaylectures", { state: { ...state } })}
                className="bg-yellow-500 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-600 transition-all ease-in-out"
              >
                Watch Lectures
              </button>
            ) : (
              <button
                onClick={() => navigate("/checkout")}
                className="bg-yellow-500 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-600 transition-all ease-in-out"
              >
                Subscribe
              </button>
            )}
            </div>
            

           

            <div className="space-y-4 lg:flex pt-20 lg:justify-between ">


               <div className="flex flex-col lg:items-start text-xl space-y-2">
                <p className="font-semibold">
                  <span className="font-bold text-yellow-500">Instructor:</span>{" "}
                  {state?.createdBy}
                </p>
                <p className="font-semibold">
                  <span className="font-bold text-yellow-500">Category:</span>{" "}
                  {state?.category}
                </p>
                <p className="font-semibold">
                  <span className="font-bold text-yellow-500">Total Lectures:</span>{" "}
                  {state?.numberOfLectures}
                </p>
              </div>

              <div className="text-center">
                {role === "ADMIN" ? (
                  <button
                  onClick={() =>navigate("/course/addlecture",{state:{...state}})}
                  className="btn btn-outline btn-primary text-xl rounded-md font-bold px-5 py-3"
                  >
                    Add Lecture
                  </button>
                ) : (
                  ""
                )}
              </div>

             
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default CourseDescription;