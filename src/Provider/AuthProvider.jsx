import {createContext} from "react";
import PropTypes from "prop-types";
import {getAuth} from "firebase/auth";
import {app} from "../Firebase/config";

export const AuthContext = createContext(null);

const auth = getAuth(app);

function AuthProvider({children}) {
    const data = {};
    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
    children: PropTypes.node,
};

export default AuthProvider;
