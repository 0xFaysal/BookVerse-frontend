import Lottie from "lottie-react";
import animation from "./../../assets/Animation.json";
function ComingSoon() {
    return (
        <div className='h-96 w-full  mt-28 flex flex-col items-center justify-start'>
            <Lottie animationData={animation} loop={true} className='w-72' />
            <h1 className=' text-center font-bold text-3xl animate-pulse mt-8 font-raleway leading-4 tracking-widest'>
                Coming Soon........
            </h1>
        </div>
    );
}

export default ComingSoon;
