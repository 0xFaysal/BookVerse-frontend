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
    updateProfile,
} from "firebase/auth";
import {app} from "../Firebase/config";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

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
                axios.get("/logout").then((res) => {
                    console.log(res.data);
                });
            }
        });

        return () => subscribe();
    }, []);

    // Create a new user with email and password
    const RegisterWithEmailAndPassword = async (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Update the user profile
    const updateInfo = (displayName, photoURL) => {
        return updateProfile(auth.currentUser, {
            displayName: displayName,
            photoURL: photoURL,
        });
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
        updateInfo,
        user,
        loginWithEmailAndPassword,
        signOutUser,
        signInWithGoogle,
        signInWithGithub,
        theme,
        setTheme,
        axios,
    };
    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
    children: PropTypes.node,
};

export default AuthProvider;
