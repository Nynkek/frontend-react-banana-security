import React, {createContext, useState} from "react";
import {useHistory, Link} from 'react-router-dom';
import jwtDecode from "jwt-decode";
import axios from "axios";


export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
        // status: 'pending',
    });
    let history = useHistory();

    function login(jwt) {
        localStorage.setItem('token', jwt);
        const decode = jwtDecode(jwt);
        console.log(decode);
        console.log("Gebruiker is ingelogd");
        getData(decode.sub, jwt);
    }

    async function getData(id, token) {
        try {
            const data = await axios.get(`http://localhost:3000/600/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            toggleIsAuth({
                isAuth: true,
                user: {
                    username: data.data.username,
                    email: data.data.email,
                    id: data.data.id,
                },
            });

            console.log(data);
            history.push('/profile');
        } catch(e) {
            console.log(e);
        }
    }

    const contextData = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        login: login,
        logout: logout,
    }

    function logout(e) {
        e.preventDefault();
        console.log("de gebruiker is uitgelogd");
        toggleIsAuth(!isAuth);
        history.push('/');
    }

    return (
        <AuthContext.Provider value={
            { contextData }
        }>
            {children}
        </AuthContext.Provider>


    );

}

export default AuthContextProvider;