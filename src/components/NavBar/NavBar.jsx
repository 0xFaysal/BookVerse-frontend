import {Link, NavLink} from "react-router-dom";
import swal from "sweetalert";
import "./style.css";
import {useContext, useEffect, useState} from "react";
import {BsMoonStarsFill} from "react-icons/bs";
import {PiSunBold} from "react-icons/pi";
import {Tooltip} from "react-tooltip";
import {AuthContext} from "../../Provider/AuthProvider";

function Navbar() {
    //Theme and Navbar Style
    const [theme, setTheme] = useState("dark");
    const [navbarBackground, setNavbarBackground] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    const {user, signOutUser} = useContext(AuthContext);

    //theme handler
    const handleThemeChange = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    // Navbar background Handler
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            const visible = prevScrollPos > currentScrollPos;
            setPrevScrollPos(currentScrollPos);
            setVisible(visible);
            setNavbarBackground(currentScrollPos > 80);
        };

        document.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener("scroll", handleScroll);
        };
    }, [prevScrollPos, visible, navbarBackground]);

    //Sign Out Handler
    const handleSignOutBtn = () => {
        swal({
            title: "Are you sure?",
            text: "Do you want to sign out?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willSignOut) => {
            if (willSignOut) {
                signOutUser()
                    .then(() => {
                        swal("You are signed out!", {
                            icon: "success",
                        });
                    })
                    .catch(() => {
                        swal("Something went wrong!", {
                            icon: "error",
                        });
                    });
            }
        });
    };

    const navItem = (
        <>
            <li>
                <NavLink to='/'>Home</NavLink>
            </li>
            <li>
                <NavLink to='/all-book'>All Book</NavLink>
            </li>
            {user ? (
                <>
                    <li>
                        <NavLink to={"/add_tourist_spot"}></NavLink>
                    </li>
                    <li>
                        <NavLink to={"/my_list"}>Borrowed Books</NavLink>
                    </li>
                </>
            ) : null}
        </>
    );

    return (
        <div
            className={` w-full transition z-50 top-0 ${
                navbarBackground ? "bg-base-200" : ""
            }${visible ? " fixed" : " absolute"}`}
        >
            <div className='navbar top-0 px-8'>
                <div className='navbar-start'>
                    <div className='dropdown max-md:hidden block'>
                        <div
                            tabIndex={0}
                            role='button'
                            className='btn btn-ghost lg:hidden'
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-5 w-5'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M4 6h16M4 12h8m-8 6h16'
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
                        >
                            {navItem}
                        </ul>
                    </div>
                    <Link to='/'>
                        <div className='flex items-center justify-center'>
                            <h1 className='font-cormorant-garamond text-3xl uppercase text-base-content  font-bold'>
                                BOOKVERSE
                            </h1>
                        </div>
                    </Link>
                </div>
                <div className='navbar-center hidden lg:flex'>
                    <ul className='flex gap-6 navLink font-medium text-base px-1'>
                        {navItem}
                    </ul>
                </div>
                <div className='navbar-end md:space-x-6 space-x-0'>
                    <button
                        className='btn btn-ghost font-bold text-2xl'
                        onClick={handleThemeChange}
                    >
                        {theme === "light" ? (
                            <BsMoonStarsFill />
                        ) : (
                            <PiSunBold />
                        )}
                    </button>
                    {!user ? (
                        <div className='space-x-4 hidden md:block'>
                            <Link to='/signup'>
                                <button className='btn btn-secondary'>
                                    Sign Up
                                </button>
                            </Link>
                            <Link to='/login'>
                                <button className='btn btn-accent'>
                                    Login
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div className='flex gap-3 items-center'>
                            <h1 className='hidden md:block'>
                                {user.displayName}
                            </h1>
                            <div className='avatar'>
                                <div
                                    id='clickable'
                                    className='w-12 rounded-full'
                                >
                                    <img src={user.photoURL} alt='avatar' />
                                </div>
                            </div>
                            <Tooltip
                                anchorSelect='#clickable'
                                clickable
                                place='bottom-start'
                            >
                                <Link to='/profile'>
                                    <button className='btn btn-secondary w-24 block'>
                                        Profile
                                    </button>
                                </Link>
                                <button
                                    onClick={handleSignOutBtn}
                                    className='btn btn-error w-24 mt-2 block'
                                >
                                    Sign Out
                                </button>
                            </Tooltip>
                        </div>
                    )}
                    <div className='dropdown block md:hidden'>
                        <div
                            tabIndex={0}
                            role='button'
                            className='btn btn-ghost lg:hidden'
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-5 w-5'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M4 6h16M4 12h8m-8 6h16'
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className='menu-my relative right-0 menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
                        >
                            {navItem}
                            {!user ? (
                                <>
                                    <li className='w-full'>
                                        <Link to='/signup' className='w-full'>
                                            <button className='w-full px-3 py-4 rounded-lg bg-secondary'>
                                                Sign Up
                                            </button>
                                        </Link>
                                    </li>
                                    <li className='w-full'>
                                        <Link to='/login'>
                                            <button className='btn btn-accent w-full'>
                                                Login
                                            </button>
                                        </Link>
                                    </li>
                                </>
                            ) : null}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
