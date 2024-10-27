import {Link, useLocation, useNavigate} from "react-router-dom";
import bgimg from "/bg-register.svg";
import {useContext, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
// import axios from "axios";
// axios.defaults.baseURL = "http://localhost:5000";
// axios.defaults.withCredentials = true;

import {FaEye, FaEyeSlash, FaCheckCircle} from "react-icons/fa";
import {AuthContext} from "../Provider/AuthProvider";
import Title from "../components/Title";

function Register() {
    const [imagePreview, setImagePreview] = useState(null);
    // const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(false);

    const {
        signInWithGoogle,
        signInWithGithub,
        RegisterWithEmailAndPassword,
        updateInfo,
        axios,
    } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();

    //Image Preview
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                // 2MB in bytes
                setErrorMessage(
                    "File size exceeds 2MB. Please select a smaller file."
                );
                setImagePreview(null);
                return;
            }
            console.log(file.size);
            setErrorMessage(false);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    //Google Sign In
    const handleGoogleSignIn = () => {
        console.log("Google Sign In");
        signInWithGoogle()
            .then((userInfo) => {
                axios
                    .post("/login", {
                        name: userInfo.user.displayName,
                        email: userInfo.user.email,
                        uId: userInfo.user.uid,
                        metadata: userInfo.user.metadata,
                    })
                    .then(() => {
                        toast.success("Registration Successful");

                        if (location.state?.from) {
                            navigate(location.state.from);
                        } else {
                            navigate("/");
                        }
                    })
                    .catch((error) => {
                        toast.error("Cookies Failed");
                        console.log("Error on login cookies:", error);
                    });
            })
            .catch((error) => {
                toast.error("Google Sign In Failed");
                console.log(error);
            });
    };

    //Github Sign In
    const handleGithubSignIn = () => {
        console.log("Github Sign In");
        signInWithGithub()
            .then((userInfo) => {
                console.log(userInfo);
                axios
                    .post("/login", {
                        name: userInfo.user.displayName,
                        email: userInfo.user.email,
                        uId: userInfo.user.uid,
                        metadata: userInfo.user.metadata,
                    })
                    .then(() => {
                        toast.success("Registration Successful");

                        if (location.state?.from) {
                            navigate(location.state.from);
                        } else {
                            navigate("/");
                        }
                    })
                    .catch((error) => {
                        toast.error("Cookies Failed");
                        console.log("Error on login cookies:", error);
                    });
            })
            .catch((error) => {
                toast.error("Github Sign In Failed");
                console.log(error);
            });
    };

    //Form Submission
    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted");
        const form = new FormData(e.target);
        const name = form.get("name");
        const email = form.get("email");
        const password = form.get("password");
        form.delete("password");
        form.delete("name");
        form.delete("email");

        console.log(name, email, password);

        axios
            .post("/uploadUserPic", form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                console.log(res.data.path);

                RegisterWithEmailAndPassword(email, password)
                    .then((userInfo) => {
                        console.log(userInfo);

                        updateInfo(
                            name,
                            `http://localhost:5000/${res.data.path}`
                        ).catch((error) => {
                            console.log("Error on update :", error);
                        });

                        axios
                            .post("/login", {
                                email,
                                uId: userInfo.user.uid,
                                name: userInfo.user.displayName,
                                metadata: userInfo.user.metadata,
                            })
                            .then(() => {
                                toast.success("Registration Successful");

                                if (location.state?.from) {
                                    navigate(location.state.from);
                                } else {
                                    navigate("/");
                                }
                            })
                            .catch((error) => {
                                toast.error("Cookies Failed");
                                console.log("Error on login cookies:", error);
                            });
                    })
                    .catch((error) => {
                        toast.error("Registration Failed");
                        console.log(error);
                    });
            })

            .catch((error) => {
                console.log("Image Upload fail:", error);
            });
    };

    //Password validation
    const [showPassword, setShowPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [passUpperCase, setPassUpperCase] = useState(false);
    const [passLowerCase, setPassLowerCase] = useState(false);
    const [passLength, setPassLength] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handlePassword = (e) => {
        const newPassword = e.target.value;
        // setPassword(newPassword);
        if (newPassword.match(/[A-Z]/)) {
            setPassUpperCase(true);
        } else {
            setPassUpperCase(false);
        }
        if (newPassword.match(/[a-z]/)) {
            setPassLowerCase(true);
        } else {
            setPassLowerCase(false);
        }
        if (newPassword.length >= 6) {
            setPassLength(true);
        } else {
            setPassLength(false);
        }
    };

    return (
        <section className='h-screen w-full'>
            <Title title='Register | ' />
            <div className='max-w-full m-0 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
                <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
                    <div>
                        <Link to='/'>
                            <h2 className='font-cormorant-garamond text-black text-center font-bold text-4xl'>
                                BOOKVERSE
                            </h2>
                        </Link>
                    </div>
                    <div className='mt-12 flex flex-col items-center'>
                        <h1 className='text-2xl xl:text-3xl font-extrabold text-black'>
                            Register
                        </h1>
                        <div className='w-full flex-1 mt-8'>
                            <div className='flex flex-col items-center'>
                                <button
                                    className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline'
                                    onClick={handleGoogleSignIn}
                                >
                                    <div className='bg-white p-2 rounded-full'>
                                        <svg
                                            className='w-4'
                                            viewBox='0 0 533.5 544.3'
                                        >
                                            <path
                                                d='M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z'
                                                fill='#4285f4'
                                            />
                                            <path
                                                d='M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z'
                                                fill='#34a853'
                                            />
                                            <path
                                                d='M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z'
                                                fill='#fbbc04'
                                            />
                                            <path
                                                d='M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z'
                                                fill='#ea4335'
                                            />
                                        </svg>
                                    </div>
                                    <span className='ml-4'>
                                        Register with Google
                                    </span>
                                </button>

                                <button
                                    className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                                    onClick={handleGithubSignIn}
                                >
                                    <div className='bg-white p-1 rounded-full'>
                                        <svg
                                            className='w-6'
                                            viewBox='0 0 32 32'
                                        >
                                            <path
                                                fillRule='evenodd'
                                                d='M16 4C9.371 4 4 9.371 4 16c0 5.3 3.438 9.8 8.207 11.387.602.11.82-.258.82-.578 0-.286-.011-1.04-.015-2.04-3.34.723-4.043-1.609-4.043-1.609-.547-1.387-1.332-1.758-1.332-1.758-1.09-.742.082-.726.082-.726 1.203.086 1.836 1.234 1.836 1.234 1.07 1.836 2.808 1.305 3.492 1 .11-.777.422-1.305.762-1.605-2.664-.301-5.465-1.332-5.465-5.93 0-1.313.469-2.383 1.234-3.223-.121-.3-.535-1.523.117-3.175 0 0 1.008-.32 3.301 1.23A11.487 11.487 0 0116 9.805c1.02.004 2.047.136 3.004.402 2.293-1.55 3.297-1.23 3.297-1.23.656 1.652.246 2.875.12 3.175.77.84 1.231 1.91 1.231 3.223 0 4.61-2.804 5.621-5.476 5.922.43.367.812 1.101.812 2.219 0 1.605-.011 2.898-.011 3.293 0 .32.214.695.824.578C24.566 25.797 28 21.3 28 16c0-6.629-5.371-12-12-12z'
                                            />
                                        </svg>
                                    </div>
                                    <span className='ml-4'>
                                        Register with GitHub
                                    </span>
                                </button>
                            </div>

                            <div className='my-12 border-b text-center'>
                                <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                                    Or Register with E-mail
                                </div>
                            </div>

                            <div className='mx-auto max-w-xs'>
                                <form onSubmit={handleFormSubmit}>
                                    <input
                                        className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white text-black'
                                        type='text'
                                        name='name'
                                        placeholder='Name'
                                        required
                                    />
                                    <div className='w-full flex gap-6 justify-center items-center'>
                                        {imagePreview && (
                                            <img
                                                src={imagePreview}
                                                alt='Selected'
                                                className=' ml-2 w-12 h-12  mt-5 rounded-full'
                                            />
                                        )}
                                        <input
                                            type='file'
                                            name='photo'
                                            accept='image/*'
                                            onChange={handleImageChange}
                                            className='w-full px-6 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 transition placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white text-black mt-5 focus:w-4/5 disabled:opacity-10'
                                            required
                                        />
                                    </div>
                                    {errorMessage && (
                                        <div>
                                            <h1 className='font-medium text-red-600'>
                                                {errorMessage}
                                            </h1>
                                        </div>
                                    )}
                                    {console.log(errorMessage)}

                                    <input
                                        className='w-full px-6 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white text-black mt-5'
                                        type='email'
                                        name='email'
                                        placeholder='Email'
                                        required
                                    />
                                    <div className='relative'>
                                        <input
                                            className='w-full pl-6 pr-10 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 text-black placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                                            name='password'
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder='Password'
                                            onFocus={() =>
                                                setPasswordFocus(true)
                                            }
                                            onChange={handlePassword}
                                            required
                                        />
                                        <div
                                            onClick={handleShowPassword}
                                            className='absolute top-1/2 translate-y-0 right-3 text-xl text-black'
                                        >
                                            {showPassword ? (
                                                <FaEyeSlash />
                                            ) : (
                                                <FaEye />
                                            )}
                                        </div>
                                    </div>
                                    {passwordFocus && (
                                        <div className='mt-5 space-y-3'>
                                            <div className='flex gap-2 items- text-black'>
                                                <FaCheckCircle
                                                    className={
                                                        passUpperCase
                                                            ? "text-green-600"
                                                            : "text-red-600"
                                                    }
                                                />
                                                <p>
                                                    Must have an Uppercase
                                                    letter in the password
                                                </p>
                                            </div>
                                            <div className='flex gap-2 items-center text-black'>
                                                <FaCheckCircle
                                                    className={
                                                        passLowerCase
                                                            ? "text-green-600"
                                                            : "text-red-600"
                                                    }
                                                />
                                                <p>
                                                    Must have a Lowercase letter
                                                    in the password
                                                </p>
                                            </div>
                                            <div className='flex gap-2 items-center text-black'>
                                                <FaCheckCircle
                                                    className={
                                                        passLength
                                                            ? "text-green-600"
                                                            : "text-red-600"
                                                    }
                                                />
                                                <p>
                                                    Length must be at least 6
                                                    character
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                    <button className='mt-5 tracking-wide font-semibold bg-green-500 text-gray-100 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'>
                                        <svg
                                            className='w-6 h-6 -ml-2'
                                            fill='none'
                                            stroke='currentColor'
                                            strokeWidth='2'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                        >
                                            <path d='M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2' />
                                            <circle cx='8.5' cy='7' r='4' />
                                            <path d='M20 8v6M23 11h-6' />
                                        </svg>
                                        <span className='ml-3'>Register</span>
                                    </button>
                                </form>
                                <div className='mt-6 text-sm text-gray-600 text-center flex items-center justify-center gap-3'>
                                    <p>Already have an Account ?</p>
                                    <Link
                                        to='/login'
                                        className='text-green-500 hover:text-green-700 font-bold underline text-lg'
                                    >
                                        Login
                                    </Link>
                                </div>
                                <p className='mt-6 text-xs text-gray-600 text-center'>
                                    I agree to abide by templatana&rsquo;s
                                    <a
                                        href='#'
                                        className='border-b border-gray-500 border-dotted'
                                    >
                                        Terms of Service
                                    </a>
                                    and its
                                    <a
                                        href='#'
                                        className='border-b border-gray-500 border-dotted'
                                    >
                                        Privacy Policy
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex-1 bg-green-100 text-center hidden lg:flex'>
                    <div
                        className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
                        style={{
                            backgroundImage: `url(${bgimg})`,
                        }}
                    ></div>
                </div>
            </div>
            <ToastContainer />
        </section>
    );
}

export default Register;
