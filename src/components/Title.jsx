import {Helmet} from "react-helmet";
import {PropTypes} from "prop-types";
function Title({title}) {
    return (
        <>
            <Helmet>
                <meta charSet='utf-8' />
                <title>{title}BOOKVERSE</title>
            </Helmet>
        </>
    );
}

Title.propTypes = {
    title: PropTypes.string,
};

export default Title;
