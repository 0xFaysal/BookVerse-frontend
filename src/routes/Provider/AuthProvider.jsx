import {createContext} from "react";
import PropTypes from "prop-types";
export const AuthContext = createContext(null);

function AuthProvider({children}) {
    const data = {};
    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
    children: PropTypes.node,
};

export default AuthProvider;
