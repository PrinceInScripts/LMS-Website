import React from 'react';
import HomeLayout from '../../Layouts/HomeLayout/HomeLayout';
import aboutMainImage from '../../assets/Images/aboutMainImage.png'
import apj from '../../assets/Images/apj.png'
import nelsonMandela from '../../assets/Images/nelsonMandela.png'
import billGates from '../../assets/Images/billGates.png'
import steveJobs from '../../assets/Images/steveJobs.png'
import einstein from '../../assets/Images/einstein.png'

function Aboutus() {
    return (
        <HomeLayout>
        <div className="flex flex-col text-white lg:pl-20 pt-32 lg:pt-20">
          <div className="lg:flex flex flex-col lg:flex-row items-center gap-5 mx-10">
            <section className="lg:w-1/2 space-y-8">
              <h1 className="lg:text-5xl text-lg text-yellow-500 font-semibold">
                Affordable and quality education
              </h1>
              <p className="lg:text-xl text-xs text-gray-200">
                Our goal is to provide the affortable and quality education to the
                world. We are providing the plateform for the aspiring teachers
                and students to share their skills, creativity and knowledge to
                each other to empower ad contibute in the growth and wellness of
                mankind.
              </p>
            </section>
            <div className="lg:w-1/2">
              <img
                src={aboutMainImage}
                alt="about main page"
                className="drop-shadow-2xl"
              />
            </div>
          </div>
  
          <div className="carousel lg:w-1/2 my-10 lg:mx-auto">
            <div id="slide1" className="carousel-item relative w-full">
              <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                <img src={apj} className="w-40 rounded-full border-2 border-gray-400" />
                <p className="text-xl text-gray-200 text-center">If you fail, never give up because FAIL means "First Attempt In Learning.</p>
                <h3 className="text-2xl font-semibold">APJ Abdul Kalam</h3>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide5" className="btn btn-circle">❮</a>
                  <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
              </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                <img src={nelsonMandela} className="w-40 rounded-full border-2 border-gray-400" />
                <p className="text-xl text-gray-200 text-center">Real leaders must be ready to sacrifice all for the freedom of their people.</p>
                <h3 className="text-2xl font-semibold">Nelson Rolihlahla Mandela</h3>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide1" className="btn btn-circle">❮</a>
                  <a href="#slide3" className="btn btn-circle">❯</a>
                </div>
              </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                <img src={billGates} className="w-40 rounded-full border-2 border-gray-400" />
                <p className="text-xl text-gray-200 text-center">Don't compare yourself with anyone in this world… if you do so, you are insulting yourself.</p>
                <h3 className="text-2xl font-semibold">William Henry Gates III</h3>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide2" className="btn btn-circle">❮</a>
                  <a href="#slide4" className="btn btn-circle">❯</a>
                </div>
              </div>
            </div>
            <div id="slide4" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                <img src={steveJobs} className="w-40 rounded-full border-2 border-gray-400" />
                <p className="text-xl text-gray-200 text-center">Your time is limited, so don't waste it living someone else's life.</p>
                <h3 className="text-2xl font-semibold">Steven Paul Jobs</h3>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide3" className="btn btn-circle">❮</a>
                  <a href="#slide5" className="btn btn-circle">❯</a>
                </div>
              </div>
            </div>
            <div id="slide5" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                <img src={einstein} className="w-40 rounded-full border-2 border-gray-400" />
                <p className="text-xl text-gray-200 text-center">We cannot solve our problems with the same thinking we used when we created them.</p>
                <h3 className="text-2xl font-semibold">Albert Einstein</h3>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide4" className="btn btn-circle">❮</a>
                  <a href="#slide1" className="btn btn-circle">❯</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HomeLayout>
    );
}

export default Aboutus;