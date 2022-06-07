import React, {createContext, useState} from "react";
import {useHistory, Link} from 'react-router-dom';


export const AuthContext = createContext(null);

function AuthContextProvider({children}) {
    const [isAuth, toggleIsAuth] = useState(false);
    const history = useHistory();


    function login() {
        console.log("Gebruiker is ingelogd");
        toggleIsAuth(!isAuth);
        // history.push('/profile');
    }

    function logout() {
        console.log("de gebruiker is uitgelogd");
        toggleIsAuth(!isAuth);
        // history.push('/');


    }

    return (
        <AuthContext.Provider value={
            {
                auth: isAuth,
                login: login,
                logout: logout,
            }
        }>
            {children}
        </AuthContext.Provider>


    );

}

export default AuthContextProvider;