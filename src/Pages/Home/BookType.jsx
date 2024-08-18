import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, FreeMode} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import img1 from "/type-1.webp";
import img2 from "/type-2.webp";
import img3 from "/type-3.webp";
import img4 from "/type-4.webp";
import img5 from "/type-5.webp";
import img6 from "/type-6.webp";
import img7 from "/type-7.webp";
import img8 from "/type-8.webp";
import img9 from "/type-9.webp";
import img10 from "/type-10.webp";

function BookType() {
    return (
        <section className='w-[98%] md:w-4/5 min-h-96 mx-auto mt-32'>
            <h1 className='font-bold text-3xl font-raleway text-center md:text-left capitalize mb-4 ml-2'>
                Book Category
            </h1>
            <Swiper
                navigation={true}
                modules={[FreeMode, Navigation]}
                className='mySwiper'
                slidesPerView={1}
                spaceBetween={10}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    "@0.00": {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    "@0.75": {
                        slidesPerView: 3,
                        spaceBetween: 15,
                    },
                    "@1.00": {
                        slidesPerView: 4,
                        spaceBetween: 15,
                    },
                    "@1.50": {
                        slidesPerView: 5,
                        spaceBetween: 15,
                    },
                }}
            >
                <SwiperSlide>
                    <div className='min-w-56 bg-base-200 pb-4 p-2'>
                        <img src={img1} alt='Novel Book Cover' />
                        <h2 className='font-bold text-lg '>Novel</h2>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='min-w-56 bg-base-200 pb-4 p-2'>
                        <img src={img2} alt='Book Cover' />
                        <h2 className='font-bold text-lg '>
                            Self-Help, Motivational
                        </h2>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='min-w-56 bg-base-200 pb-4 p-2'>
                        <img src={img3} alt='Book Cover' />
                        <h2 className='font-bold text-lg '>
                            Poems and Recitation
                        </h2>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='min-w-56 bg-base-200 pb-4 p-2'>
                        <img src={img4} alt='Book Cover' />
                        <h2 className='font-bold text-lg '>
                            Science & Technology
                        </h2>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='min-w-56 bg-base-200 pb-4 p-2'>
                        <img src={img5} alt='Book Cover' />
                        <h2 className='font-bold text-lg '>Travel</h2>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='min-w-56 bg-base-200 pb-4 p-2'>
                        <img src={img6} alt='Book Cover' />
                        <h2 className='font-bold text-lg '>Science Fiction</h2>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='min-w-56 bg-base-200 pb-4 p-2'>
                        <img src={img7} alt='Book Cover' />
                        <h2 className='font-bold text-lg '>
                            History and Tradition
                        </h2>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='min-w-56 bg-base-200 pb-4 p-2'>
                        <img src={img8} alt='Book Cover' />
                        <h2 className='font-bold text-lg '>Children & Teens</h2>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='min-w-56 bg-base-200 pb-4 p-2'>
                        <img src={img9} alt='Book Cover' />
                        <h2 className='font-bold text-lg '>
                            Thriller and Adventure
                        </h2>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='min-w-56 bg-base-200 pb-4 p-2'>
                        <img src={img10} alt='Book Cover' />
                        <h2 className='font-bold text-lg '>Articles</h2>
                    </div>
                </SwiperSlide>
            </Swiper>
        </section>
    );
}

export default BookType;
