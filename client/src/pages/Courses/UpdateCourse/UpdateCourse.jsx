import { useDispatch } from "react-redux";
import HomeLayout from "../../../Layouts/HomeLayout/HomeLayout";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { updateCourse } from "../../../redux/slices/courseSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";

function UpdateCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [userData, setUserData] = useState({
    title: "",
    category: "",
    createdBy: "",
    description: "",
    id: useParams().courseId,
  });

  function handleChangeinput(e) {
    const { name, value } = e.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  }

  async function handleSubmitForm(e) {
    e.preventDefault();

    if (
      !userData.title ||
      !userData.category ||
      !userData.createdBy ||
      !userData.description
    ) {
      toast.error("All filds are required");
      return;
    }

    const response = await dispatch(updateCourse(userData));

    console.log(response);

    try {
      const response = await dispatch(updateCourse(userData));

      if (response?.payload?.success) {
        setUserData({
          title: "",
          category: "",
          createdBy: "",
          description: "",
        });
        navigate("/admin/dashboard");
      } else {
        toast.error("Failed to update course. Please try again.");
      }
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  }

  useEffect(() => {
    console.log(state);
    console.log(userData);
  }, []);

  return (
    <HomeLayout>
      <div className="h-[90vh] flex items-center justify-center">
        <form
          onSubmit={handleSubmitForm}
          className="flex flex-col justify-center mt-20 lg:mt-10 gap-5 rounded-lg p-4 lg:p-10 text-white w-[350px] lg:w-[700px] lg:h-[550px] my-10 shadow-[0_0_10px_white] relative"
        >
          <div className="flex items-center justify-center gap-4 lg:block">
            <Link
              onClick={() => navigate(-1)}
              className="lg:absolute lg:top-8 top-2 text-2xl link text-accent cursor-pointer"
            >
              <AiOutlineArrowLeft />
            </Link>
            <h1 className="text-center text-2xl font-bold mt-2">
              Update Course
            </h1>
          </div>

          <div className="flex flex-col gap-1 p-4 lg:p-10">
            <div className="flex flex-col gap-1">
              <label htmlFor="title" className="text-lg font-semibold">
                Course title
              </label>
              <input
                required
                type="text"
                name="title"
                id="title"
                placeholder="enter the title of the course"
                onChange={handleChangeinput}
                value={userData.title}
                className="px-2 bg-transparent py-1 border"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="createdBy" className="text-lg font-semibold">
                Instructor
              </label>
              <input
                required
                type="text"
                name="createdBy"
                id="createdBy"
                placeholder="enter the instructor of the course"
                onChange={handleChangeinput}
                value={userData.createdBy}
                className="px-2 bg-transparent py-1 border"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="category" className="text-lg font-semibold">
                Category
              </label>
              <input
                required
                type="text"
                name="category"
                id="category"
                placeholder="enter the category of the course"
                onChange={handleChangeinput}
                value={userData.category}
                className="px-2 bg-transparent py-1 border"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="description" className="text-lg font-semibold">
                Description
              </label>
              <textarea
                required
                type="text"
                name="description"
                id="description"
                placeholder="enter the description of the course"
                onChange={handleChangeinput}
                value={userData.description}
                className="px-2 bg-transparent py-1 border h-24 resize-none overflow-y-scroll"
              />
            </div>
            <button
            type="submit"
            className="w-full py-2 rounded-sm font-semibold text-lg cursor-pointer bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300"
          >
            Update Course
          </button>
          </div>
         
        </form>
      </div>
    </HomeLayout>
  );
}

export default UpdateCourse;
