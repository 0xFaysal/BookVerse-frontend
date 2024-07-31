import {createContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GithubAuthProvider,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import {app} from "../Firebase/config";

export const AuthContext = createContext(null);

const auth = getAuth(app);

//Provider
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState("light");
    useEffect(() => {
        const subscribe = onAuthStateChanged(auth, (u) => {
            if (u) {
                setUser(u);
                console.log("User is signed in");
            } else {
                setUser(null);
                console.log("User is signed out");
            }
        });

        return () => subscribe();
    }, []);

    // Create a new user with email and password
    const RegisterWithEmailAndPassword = async (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Update the user profile
    const updateProfile = (data) => {
        return updateProfile(auth.currentUser, data);
    };
    // Sign in with email and password
    const loginWithEmailAndPassword = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Sign out user
    const signOutUser = () => {
        return signOut(auth);
    };

    // Sign in with Google by redirecting to the Google sign-in page
    const signInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    };

    // Sign in with Github by redirecting to the Github sign-in page
    const signInWithGithub = () => {
        return signInWithPopup(auth, githubProvider);
    };

    const data = {
        RegisterWithEmailAndPassword,
        updateProfile,
        user,
        loginWithEmailAndPassword,
        signOutUser,
        signInWithGoogle,
        signInWithGithub,
        theme,
        setTheme,
    };
    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
    children: PropTypes.node,
};

export default AuthProvider;
