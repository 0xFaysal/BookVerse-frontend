import {TbUsersGroup} from "react-icons/tb";
import {FaBookOpen, FaUserPlus} from "react-icons/fa6";

function BookCount() {
    return (
        <div className='flex items-center justify-center mb-24 mt-8'>
            <div className='stats shadow stats-vertical md:stats-horizontal flex flex-col md:flex-row gap-7 md:gap-14 lg:gap-28 bg-base-200'>
                <div className='stat'>
                    <div className='stat-figure text-secondary'>
                        <TbUsersGroup className='inline-block h-8 w-8 stroke-current' />
                    </div>
                    <div className='stat-title'>New User</div>
                    <div className='stat-value'>567</div>
                    <div className='stat-desc'>↗︎ 400 (22%)</div>
                </div>

                <div className='stat'>
                    <div className='stat-figure text-secondary'>
                        <FaBookOpen className='inline-block h-8 w-8 stroke-current' />
                    </div>
                    <div className='stat-title'>Total Books</div>
                    <div className='stat-value'>4,200</div>
                    <div className='stat-desc'>2024</div>
                </div>

                <div className='stat'>
                    <div className='stat-figure text-secondary'>
                        <FaUserPlus className='inline-block h-8 w-8 stroke-current' />
                    </div>
                    <div className='stat-title'>New Registers</div>
                    <div className='stat-value'>120+</div>
                    <div className='stat-desc'>↗︎ 40 (14%)</div>
                </div>
            </div>
        </div>
    );
}

export default BookCount;
