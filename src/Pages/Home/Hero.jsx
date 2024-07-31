import Marquee from "react-fast-marquee";
import Snowfall from "react-snowfall";

import img1 from "/img-1.jpeg";
import img2 from "/img-2.jpeg";
import img3 from "/img-3.jpeg";
import img4 from "/img-4.jpeg";
import img5 from "/img-5.jpeg";
import img6 from "/img-6.jpeg";
import img7 from "/img-7.jpeg";
import img8 from "/img-8.jpeg";
import {useContext} from "react";
import {AuthContext} from "../../Provider/AuthProvider";

function Hero() {
    const {theme} = useContext(AuthContext);
    return (
        <section className='w-full bg-gradient-to-b from-base-300 to-base-100 flex flex-col justify-center items-center relative '>
            <Snowfall
                color='green'
                speed={[0.5, 1.0]}
                wind={[-0.5, 0.5]}
                snowflakeCount={60}
                snowflakeStyle={{fontSize: "20px"}}
            />
            <div className='w-3/4 h-fit  text-center relative mt-48 mb-6'>
                <h1 className='text-6xl font-black font-roboto hero-h1 capitalize z-50 relative'>
                    Read, Share , and Inspire: Unleash Your Literary Journey
                </h1>
                <p className=' font-roboto font-medium text-lg mt-4 leading-8 tracking-wide z-50 relative select-none'>
                    Dive into Bookverse, the ultimate library management system
                    and book-sharing platform. Here, every page turns into a new
                    adventure, connecting readers and igniting imaginations.
                    With Bookverse, your next great read is just a click away.
                    Join our community of book enthusiasts and embark on an
                    endless journey of literary exploration.
                </p>

                <button className='bg-primary text-white font-raleway font-semibold text-xl mt-8 py-3 px-4 rounded-lg hover:outline outline-offset-1 outline-primary relative z-50 shadow-md'>
                    Explore Now
                </button>
                <button className='border-secondary border-2 box-border text-secondary font-raleway ml-4 font-semibold text-xl mt-8 py-3 px-4 rounded-lg hover:outline outline-offset-1 outline-secondary relative z-50 shadow'>
                    Learn More
                </button>
            </div>
            <div className=' relative w-11/12 mb-20 flex justify-between '>
                <div className='mt-28'>
                    <Marquee
                        gradient={true}
                        speed={40}
                        pauseOnHover={true}
                        autoFill={true}
                        gradientColor={
                            theme === "light" ? "#ffffff" : "#0F0F0F"
                        }
                    >
                        <img src={img1} alt='logo' className='w-44 ml-4 ' />
                        <img src={img2} alt='logo' className='w-44 ml-4' />
                        <img src={img3} alt='logo' className='w-44 ml-4' />
                        <img src={img4} alt='logo' className='w-44 ml-4' />
                        <img src={img5} alt='logo' className='w-44 ml-4' />
                        <img src={img6} alt='logo' className='w-44 ml-4' />
                        <img src={img7} alt='logo' className='w-44 ml-4' />
                        <img src={img8} alt='logo' className='w-44 ml-4' />
                    </Marquee>
                </div>
            </div>
        </section>
    );
}

export default Hero;
