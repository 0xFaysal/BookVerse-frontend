import Title from "../../components/Title";
import BookCount from "./BookCount";
import BookType from "./BookType";
import Hero from "./Hero";
import "./Home.css";

function Home() {
    return (
        <>
            <Title title='' />
            <Hero />
            <BookCount />
            <BookType />
        </>
    );
}

export default Home;
