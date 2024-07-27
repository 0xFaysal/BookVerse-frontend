import {Outlet} from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer";
import {Helmet} from "react-helmet";
import {useEffect, useState} from "react";

function App() {
    const svgUrls = ["/logo-1.svg", "/logo-2.svg", "/logo-3.svg"];

    const [currentSvg, setCurrentSvg] = useState(svgUrls[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSvg((prevSvg) => {
                const currentIndex = svgUrls.indexOf(prevSvg);
                const nextIndex = (currentIndex + 1) % svgUrls.length;
                return svgUrls[nextIndex];
            });
        }, 1000); // Change SVG every 3 seconds

        return () => clearInterval(interval);
    }, [svgUrls]);

    return (
        <>
            <Helmet>
                <meta charSet='utf-8' />
                <link rel='icon' type='image/svg+xml' href={currentSvg} />
                <link rel='canonical' href='http://mysite.com/example' />
            </Helmet>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    );
}

export default App;
