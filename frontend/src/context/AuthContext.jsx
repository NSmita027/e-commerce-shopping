//This file helps your app remember who is logged in and keep track of the login token. 
// It also shares this info with all parts of your app that need it.

import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext();


const AuthProvider = ({children}) => {

    const [user, setUser] = useState(() => {
        try{
            return JSON.parse(localStorage.getItem('user'));
        } catch {
            return null;
        }
    });

    const [token, setToken] = useState(() => localStorage.getItem('token') || null);

    //When the app starts, try to get the saved user and token from the browser's local storage.
    //If there is no saved user or token, start with null (means no one is logged in).

    useEffect(() => {
        if (token) {
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            delete api.defaults.headers.common["Authorization"];
        }
    }, [token]);

    //If you have a token, it adds it to the 'api' headers. This means every time you ask your backend for something, it knows who you are.
    //If you don't have a token (logged out), it removes the token from the headers.


    const login = ({token, user}) => {
        localStorage.setItem('token', token);  //Saves the token and user info in the browser's localStorage
        localStorage.setItem('user', JSON.stringify(user));
        setToken(token);
        setUser(user); //Updates the React state (setToken and setUser ) so your app knows the user is logged in right now.
    };

    const logout = () => {
        localStorage.removeItem('token');  //Removes the token and user info from localStorage.
        localStorage.removeItem('user');
        setToken(null);
        setUser(null); //Sets the React state to null (means no user is logged in).
    };

  return (
      <AuthContext.Provider value={{user, token, login, logout, api}}>
        {children}
      </AuthContext.Provider>
  )
}

export default AuthProvider

export const useAuth = () => useContext(AuthContext);