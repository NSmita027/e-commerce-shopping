import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //These two lines create state variables to store what the user types in the email and password fields.
    // setEmail and setPassword update these values as the user types.
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await api.post('/auth/login', {email, password}); //This sends a POST request to your backend API endpoint /auth/login.. . It sends the email and password as data... authcontroller will check email & password in backend ...await means the code waits here until the backend responds... 
            login({token : res.data.token, user: res.data.user});  //The response (res) should contain the login result, usually a token and user info. You pass it the token and user data received from the backend. This function saves the token and user info in React state and localStorage, so your app knows the user is logged in.
            navigate('/');
        } catch(err){
            alert(err?.response?.data?.message || "Login Failed");
        }
    };

  return (

    <div className="h-screen grid grid-cols-1 md:grid-cols-2">
       <div className="hidden md:flex items-center justify-center bg-black h-screen">
          <img src="/login-img.jpg" alt="Shopping Illustration" className="w-full h-full object-cover" />
       </div>


       <div className='h-screen flex items-center justify-center bg-gradient-to-r from-black via-blue-900 to-black p-8'>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
      <div className='bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md text-white'>
      <h2 className='text-3xl font-bold text-center mb-6 drop-shadow-md'>Welcome Back👋</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' className='w-full p-3 rounded-xl border border-white/40 bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300' />  
        <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Enter your password' className='w-full p-3 rounded-xl border border-white/40 bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300' />
        <button type='submit' className='w-full py-3 rounded-xl bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 font-semibold shadow-lg hover:scale-105 transform transition duration-300'>Login</button>
      </form>
      <p className='text-sm text-center mt-6 text-gray-200'>Don’t have an account?{" "}
        <a href="/register" className="text-pink-300 underline hover:text-white">Register</a>
      </p>
      </div>
    </div>

    </div>

   
    
    // e.target.value = the value that user types on the input field .. set this value as email/psw
  );
};

export default LoginPage
