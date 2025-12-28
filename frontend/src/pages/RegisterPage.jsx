import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from "../services/api";

const RegisterPage = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate();

    const handleSubmit = async (e)=> {
        e.preventDefault();
        console.log("REGISTER CLICKED", name, email, password);
        try{
            await api.post('/auth/register', {name, email, password});
            alert("Registered - please login");
            nav('/login')
        } catch (err){
            alert(err?.response?.data?.message || "Register failed");
        }
    };


  return (

    <div className="h-screen grid grid-cols-1 md:grid-cols-2">

        <div className="hidden md:flex items-center justify-center bg-black h-screen">
          <img src="/register-img.jpg" alt="Shopping Illustration" className="w-full h-full object-cover" />
       </div>

        <div className='min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-black via-blue-900 to-black relative overflow-hidden'>
       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"> </div>

        <div className='relative z-10 max-w-md w-full bg-white/40 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/30'>
              <h2 className='text-3xl font-bold text-center text-gray-800 mb-6'>Create Account</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                  {/* <input value={name} onChange={(e)=>setName(e.target.value)} placeholder='Name' className='w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:outline-none' />
                  <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email' className='w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:outline-none' />
                  <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password' className='w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:outline-none' /> */}
                  <input
  type="text"
  value={name}
  onChange={(e) => setName(e.target.value)}
  placeholder="Name"
  className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:outline-none"
/>

<input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Email"
  className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:outline-none"
/>

<input
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Password"
  className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:outline-none"
/>

                 <button type='submit' className='w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold text-lg shadow-lg hover:opacity-90 transition'>Register</button>
             </form>
             <p className="mt-4 text-center text-sm text-gray-700">Already have an account ?{" "}
                  <span onClick={()=> nav("/login")} className="text-purple-900 cursor-pointer font-semibold hover:underline">Login</span>
             </p>
       </div>
    </div>

    </div>
    
    
  );
}

export default RegisterPage
