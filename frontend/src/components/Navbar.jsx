import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SearchBar from './SearchBar';

const Navbar = () => {

    const {user, logout} = useAuth();
    const nav = useNavigate();    //This gives you a function nav that you can call to change the page.

    const handleLogout = () => {
        logout();
        nav("/login")
    };

    const linkClass = ({ isActive }) =>
    isActive
      ? "text-yellow-300 text-2xl underline transition"
      : "hover:text-yellow-300 text-2xl transition";

      // console.log("User in Navbar:", user);


  return (
    <nav className="bg-gradient-to-r from-blue-900 via-black to-blue-900 shadow-lg">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between text-white">
             <NavLink to="/" className="flex items-center space-x-2">
                <img src="/logo.png" alt="Logo" className="h-20 w-auto object-contain" />
                   {/* <span className="font-extrabold text-2xl tracking-wide">Luxora</span> */}
             </NavLink>

             <div className="flex-1 px-6 text-black"><SearchBar/></div>

             <div className="space-x-5 flex items-center">
                <NavLink to="/" className={linkClass}>Home</NavLink>
                <NavLink to="/cart" className={linkClass}>Cart</NavLink>
                {user ? (    //If user exists (is not null or undefined):
                    <>
                       <NavLink to="/orders" className={linkClass}>My Orders</NavLink>
                       <button onClick={handleLogout} className='bg-white text-purple-600 px-4 py-1.5 rounded-lg shadow-md hover:bg-black hover:text-white transition'>Logout</button>
                       <span className='mx-2 text-2xl bg-gradient-to-b from-yellow-100 to-yellow-400 text-yellow-900 px-3 py-1 rounded-full font-bold shadow-md font-serif'>Hii, {user.name}!!!</span>
                    </>
                ) : (   //Else (if user does NOT exist):
                    <>
                      <NavLink to="/login" className='px-4 py-1.5 bg-white text-purple-600 rounded-lg shadow-md font-medium hover:bg-gray-100 transition'>Login</NavLink>
                      <NavLink to="/register" className='px-4 py-1.5 border border-white rounded-lg font-medium hover:bg-white hover:text-purple-600 transition'>Register</NavLink>
                    </>
                )}

                {user?.role === "admin" && (
                     <NavLink to="/admin" className={linkClass}>Admin</NavLink>
                )}
                
             </div>
        </div>
    </nav>
  )
}

export default Navbar
