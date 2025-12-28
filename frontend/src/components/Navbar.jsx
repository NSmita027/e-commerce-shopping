import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SearchBar from './SearchBar';

const Navbar = () => {

    const {user, logout} = useAuth();
    const nav = useNavigate();    //This gives you a function nav that you can call to change the page.
    const [menuOpen, setMenuOpen] = useState(false);
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);


    const handleLogout = () => {
        logout();
        nav("/login")
        setMenuOpen(false);
    };

    const linkClass = ({ isActive }) =>
    isActive
       ? 'text-base md:text-xl lg:text-2xl text-yellow-300 font-medium underline transition'
      : 'text-base md:text-xl lg:text-2xl hover:text-yellow-300 transition';


      // console.log("User in Navbar:", user);


  return (
    <nav className="bg-gradient-to-r from-blue-900 via-black to-blue-900 shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row: fixed height to keep desktop tidy */}
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Logo"
                className="h-10 md:h-14 w-auto object-contain"
                style={{ maxHeight: 56 }} // guard to avoid huge logos
              />
            </NavLink>
          </div>

          {/* Center: Search (desktop) */}
          <div className="hidden md:flex flex-1 px-6 justify-center">
            <div className="w-full max-w-2xl">
              <SearchBar />
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 md:gap-5">
            {/* Mobile: search toggle */}
            <button
              onClick={() => {
                setMobileSearchOpen((s) => !s);
                setMenuOpen(false);
              }}
              className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-yellow-300"
              aria-label="Search"
            >
              🔍
            </button>


            {/* Desktop nav links & auth */}
            <div className="hidden md:flex items-center space-x-9 text-white">
              <NavLink to="/" className={linkClass}>
                Home
              </NavLink>
              
              <NavLink to="/cart" className={linkClass}>
                Cart
              </NavLink>

              {user ? (
                <>
                  <NavLink to="/orders" className={linkClass}>
                    My Orders
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="bg-white text-purple-600 px-3 py-1.5 rounded-lg shadow-md hover:bg-black hover:text-white transition text-base md:text-lg lg:text-xl"
                  >
                    Logout
                  </button>
                  <span className="hidden lg:inline-block ml-2 text-sm bg-gradient-to-b from-yellow-100 to-yellow-400 text-yellow-900 px-3 py-1 rounded-full font-bold shadow-md font-serif">
                    Hii, {user.name}!!!
                  </span>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="px-3 py-1.5 bg-white text-purple-600 rounded-lg shadow-md font-medium hover:bg-gray-100 transition text-sm"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="px-3 py-1.5 border border-white rounded-lg font-medium hover:bg-white hover:text-purple-600 transition text-sm"
                  >
                    Register
                  </NavLink>
                </>
              )}

              {user?.role === 'admin' && (
                <NavLink to="/admin" className={linkClass}>
                  Admin
                </NavLink>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => {
                setMenuOpen((s) => !s);
                setMobileSearchOpen(false);
              }}
              className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-yellow-300"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? '✖' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile search below header */}
        {mobileSearchOpen && (
          <div className="md:hidden pb-3">
            <div className="px-2">
              <SearchBar />
            </div>
          </div>
        )}

        {/* Mobile dropdown menu */}
        <div
          className={`md:hidden transition-all duration-200 ${
            menuOpen ? 'max-h-screen py-3' : 'max-h-0 overflow-hidden'
          }`}
        >
          <div className="bg-white rounded-lg shadow-md text-black mx-2 p-4">
            <div className="flex flex-col space-y-3">
              <NavLink
                to="/"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? 'text-yellow-500 text-base font-semibold'
                    : 'hover:text-yellow-500 text-base'
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/cart"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? 'text-yellow-500 text-base font-semibold'
                    : 'hover:text-yellow-500 text-base'
                }
              >
                Cart
              </NavLink>

              {user ? (
                <>
                  <NavLink
                    to="/orders"
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? 'text-yellow-500 text-base font-semibold'
                        : 'hover:text-yellow-500 text-base'
                    }
                  >
                    My Orders
                  </NavLink>

                  {user?.role === 'admin' && (
                    <NavLink
                      to="/admin"
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        isActive
                          ? 'text-yellow-500 text-base font-semibold'
                          : 'hover:text-yellow-500 text-base'
                      }
                    >
                      Admin
                    </NavLink>
                  )}

                  <div className="pt-2 border-t">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 bg-purple-600 text-white rounded-md"
                    >
                      Logout
                    </button>
                    <div className="mt-2 text-sm">
                      <span className="inline-block bg-gradient-to-b from-yellow-100 to-yellow-400 text-yellow-900 px-3 py-1 rounded-full font-bold">
                        Hii, {user.name}!!!
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="px-3 py-2 bg-purple-600 text-white rounded-md text-center"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-center"
                  >
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
