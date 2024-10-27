import {useContext, useState} from "react";
import {IoMdAddCircleOutline} from "react-icons/io";
import {AuthContext} from "../Provider/AuthProvider";

function AddBook() {
    const [imagePreview, setImagePreview] = useState(null);
    const [errorMessage, setErrorMessage] = useState(false);

    const {axios} = useContext(AuthContext);
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
    const handleFormSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const name = formData.get("name");
        const authorName = formData.get("authorName");
        const quantity = formData.get("quantity");
        const category = formData.get("category");
        const shortDescription = formData.get("shortDescription");
        const rating = formData.get("rating");
        const photo = formData.get("photo");
        if (
            name === "" ||
            authorName === "" ||
            quantity === "" ||
            category === "" ||
            shortDescription === "" ||
            rating === "" ||
            photo === ""
        ) {
            // setErrorMessage("Please fill all the fields.");

            return;
        }
        console.log(formData);

        // console.log(
        //     name,
        //     authorName,
        //     quantity,
        //     category,
        //     shortDescription,
        //     rating,
        //     photo
        // );

        axios
            .post("/addBook", formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                console.log(res.data);
            });
    };

    return (
        <section className='w-full min-h-screen flex justify-center items-center '>
            <div className='w-4/5 bg-base-300 text-center my-20 rounded-md'>
                <h1 className='font-bold text-2xl mt-2 mb-8'>Add Book</h1>
                <form
                    className=' flex flex-col justify-center items-center gap-4'
                    onSubmit={handleFormSubmit}
                >
                    <input
                        className='w-2/3 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white text-black'
                        type='text'
                        name='name'
                        placeholder='Book Name'
                        required
                        title="Book's Name"
                    />
                    <input
                        className='w-2/3 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white text-black'
                        type='text'
                        name='authorName'
                        placeholder='Author Name'
                        title="Author's Name"
                        required
                    />
                    <input
                        className='w-2/3 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white text-black'
                        type='number'
                        name='quantity'
                        title="Book's Quantity"
                        placeholder='Quantity'
                        required
                    />
                    <select
                        className='w-2/3 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white text-black'
                        title="Book's Category"
                        name='category'
                    >
                        <option value='Category'>Category</option>
                        <option value='Novel'>Novel</option>
                        <option value='Self-Help, Motivational'>
                            Self-Help, Motivational
                        </option>
                        <option value='Poems and Recitation'>
                            Poems and Recitation
                        </option>
                        <option value='Science & Technology'>
                            Science & Technology
                        </option>
                        <option value='Travel'>Travel</option>
                        <option value='Science Fiction'>Science Fiction</option>
                        <option value='History and Tradition'>
                            History and Tradition
                        </option>
                        <option value='Children & Teens'>
                            Children & Teens
                        </option>
                        <option value='Thriller and Adventure'>
                            Thriller and Adventure
                        </option>
                        <option value='Articles'>Articles</option>
                    </select>
                    <textarea
                        className='w-2/3 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white text-black'
                        type='text'
                        name='shortDescription'
                        rows={5}
                        placeholder='Short Description'
                        required
                        title='Short Description'
                    />
                    <input
                        className='w-2/3 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white text-black'
                        type='number'
                        name='rating'
                        max={5}
                        min={1}
                        title="Book's Rating"
                        placeholder='Rating(1-5)'
                        required
                    />
                    <div className='w-2/3 flex gap-6 justify-center items-center'>
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt='Selected'
                                className=' ml-2 w-24 h-24  mt-5 rounded-sm'
                            />
                        )}
                        <input
                            type='file'
                            name='photo'
                            accept='image/*'
                            onChange={handleImageChange}
                            placeholder="Book's Image"
                            title="Book's Cover Image"
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
                    <button className='my-5 tracking-wide font-semibold bg-green-500 text-gray-100 w-2/3 py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'>
                        <IoMdAddCircleOutline />
                        <span className='ml-3'>Add</span>
                    </button>
                </form>
            </div>
        </section>
    );
}

export default AddBook;
