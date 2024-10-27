import {Outlet} from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer";
import {Helmet} from "react-helmet";
import {ToastContainer} from "react-toastify";

function App() {
    return (
        <>
            <Helmet>
                <meta charSet='utf-8' />
                <link rel='icon' type='image/svg+xml' href={"logo-2.svg"} />
                <link rel='canonical' href='http://mysite.com/example' />
            </Helmet>

            <NavBar />
            <Outlet />
            <ToastContainer />
            <Footer />
        </>
    );
}

export default App;
