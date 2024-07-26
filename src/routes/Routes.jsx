import {createBrowserRouter} from "react-router-dom";
import Home from "../Pages/Home/Home";
import App from "../App";

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
        ],
    },
]);

export default router;
