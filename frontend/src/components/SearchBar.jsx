import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {

    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (keyword.trim()){
            navigate(`/search?keyword=${keyword}`);
        }
    };


  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2'>
        <input type="text" placeholder='Search products...' value={keyword} onChange={(e) => setKeyword(e.target.value)} className='px-3 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500' />
        <button type='submit' className='bg-gradient-to-b from-yellow-100 to-yellow-500 text-yellow-800 px-4 py-2 font-bold text-xl hover:opacity-55 rounded-lg'>Search</button>
    </form>
  );
};

export default SearchBar;
