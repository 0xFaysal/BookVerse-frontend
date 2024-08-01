import {createBrowserRouter} from "react-router-dom";
import Home from "../Pages/Home/Home";
import App from "../App";
import ComingSoon from "../Pages/ComingSoon";
import AllBook from "../Pages/AllBook";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AddBook from "../Pages/AddBook";
import BorrowedBook from "../Pages/BorrowedBook";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/about",
                element: <div>About</div>,
            },
            {
                path: "/coming-soon",
                element: <ComingSoon />,
            },
            {
                path: "/all-book",
                element: <AllBook />,
            },
            {
                path: "/add-book",
                element: <AddBook />,
            },
            {
                path: "/borrowed-book",
                element: <BorrowedBook />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
]);

export default router;
