import { Link } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout/HomeLayout";
import homePageMainImage from '../../assets/Images/homePageMainImage.png'

function Home() {
    return (
        <HomeLayout>
        <div className="pt-10 text-white flex flex-col lg:flex-row items-center justify-center gap-10 mx-16 h-[90vh]">
              <div className="lg:w-1/2 space-y-6">
                <h1 className="lg:text-5xl text-3xl font-semibold">Find Out Best <span className="text-yellow-500 font-fold">Online Courses</span></h1>
                <p className="lg:text-xl text-sm text-gray-200">
                    we have a large Library of courses taught by highly skilled and qualified faculities at a very affortable cost.
                </p>
                <div className="space-x-6 flex"> 
                    <Link to="/courses">
                        <button className="bg-yellow-500 px-2 py-2 lg:px-5 lg:py-3 rounded-md font-semibold text-sm lg:text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                            Explore Courses
                        </button>
                    </Link>
                    <Link to="/contact">
                        <button className="border border-yellow-500 px-2 py-2 lg:px-5 lg:py-3  rounded-md font-semibold text-sm lg:text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                            Contact Us
                        </button>
                    </Link>
                </div>
              </div>

              <div className="w-1/2 lg:flex items-center justify-center hidden ">
                    <img src={homePageMainImage} alt="Home Page" />
              </div>
            </div>
        </HomeLayout>
    );
}

export default Home;