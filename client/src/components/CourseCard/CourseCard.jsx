import { BsPersonCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function CourseCard({ data }) {
  const navigate = useNavigate();

  return (
    <div className="group w-[22rem] h-[500px] shadow-lg rounded-lg cursor-pointer overflow-hidden bg-zinc-700 transition-transform transform hover:scale-105 relative">
      <div className="relative overflow-hidden">
        <div
          className="w-full h-48 relative"
          style={{
            backgroundImage: `url(${data?.thumbail?.secure_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-end p-3 space-y-1 text-white">
            <h2 className="text-cl font-bold text-yellow-500 line-clamp-2 relative z-10">
              {data?.title}
            </h2>
            <div
              className="absolute inset-0 bg-gradient-to-t from-black to-transparent"
              style={{ mixBlendMode: "multiply" }}
            />
          </div>
        </div>
      </div>

      <div className="p-3 space-y-2 text-white flex-grow">
        <p className="line-clamp-3 text-center p-3 max-h-32 overflow-y-auto">
          {data?.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center w-1/2 border-r-2 p-2">
            <BsPersonCircle className="lg:w-16 lg:h-16 w-10 h-10 rounded-full mr-2" />
            <div>
              <p className="font-semibold text-sm">
                <span className="text-yellow-500">{data?.createdBy}</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col w-1/2 p-2">
            <p className="text-sm font-semibold">
              Category: <span className="text-yellow-500">{data?.category}</span>
            </p>
            <p className="font-semibold text-sm">
              Total Lectures:{" "}
              <span className="text-yellow-500">{data?.numberOfLectures}</span>
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate("/course/description", { state: { ...data } })}
        className="bg-yellow-500 text-xl font-bold px-5 py-3 w-full hover:bg-yellow-600 transition-all ease-in-out absolute bottom-0"
      >
        Learn More
      </button>
    </div>
  );
}

export default CourseCard;