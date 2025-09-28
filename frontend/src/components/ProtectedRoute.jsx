// This file creates a special route that only lets logged-in users see certain pages. 
// If someone is not logged in, it sends them to the login page.

import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const {user} = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />  //replace - it replaces the current page in the browser history, so the user can't go back to the protected page by clicking back.
    } //Navigate -  This is a tool that lets you redirect users to a different page.
  return children;
}

export default ProtectedRoute


//This component protects pages that only logged-in users should see.
// If someone tries to visit a protected page without logging in, they get sent to the login page.
// If they are logged in, they see the page normally.
