import React from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate ,NavLink} from 'react-router-dom';
import { authClient } from '@/lib/auth-client';
import {UserButton} from '@daveyplate/better-auth-ui'

const Navbar = () => {

     const [menuOpen, setMenuOpen] = React.useState(false);
     const navigate = useNavigate();

     const {data : session} = authClient.useSession()


  return (
    <div>
      <nav className="z-50 flex items-center justify-between w-full py-4 px-4 md:px-16 lg:px-24 xl:px-32 backdrop-blur border-b text-white border-slate-800">
        <Link to={"/"}>
          <div className="flex items-center gap-2">
            <img src={assets.logo3} alt="logo" className="h-10 sm:h-12" />
            <h1 className="text-white text-lg sm:text-3xl font-semibold">
              PR WebBuilder
            </h1>
          </div>
        </Link>

<div className="hidden md:flex items-center gap-8 text-2xl">

  <NavLink to="/" className="relative group">
    Home
    <span className="absolute left-0 -bottom-1 h-[2px] bg-white transition-all duration-300 w-0 group-hover:w-full group-[.active]:w-full"></span>
  </NavLink>

  <NavLink to="/projects" className="relative group">
    My Project
    <span className="absolute left-0 -bottom-1 h-[2px]  bg-white transition-all duration-300 w-0 group-hover:w-full group-[.active]:w-full"></span>
  </NavLink>

  <NavLink to="/community" className="relative group">
    Community
    <span className="absolute left-0 -bottom-1 h-[2px]  bg-white transition-all duration-300 w-0 group-hover:w-full group-[.active]:w-full"></span>
  </NavLink>

  <NavLink to="/pricing" className="relative group">
    Pricing
    <span className="absolute left-0 -bottom-1 h-[2px]  bg-white transition-all duration-300 w-0 group-hover:w-full group-[.active]:w-full"></span>
  </NavLink>

</div>


        <div className="flex items-center gap-3">

         {!session?.user ? (
          // when no login user come
               <button
              onClick={() => navigate("./auth/signin")}
              className="px-6 py-2 bg-indigo-600 active:scale-95 hover:bg-indigo-700 transition rounded-md"
            >
              Get started
            </button>
           ) : (
                   <UserButton size='icon' />
           )
            
          }

          <button
            id="open-menu"
            className="md:hidden active:scale-90 transition"
            onClick={() => setMenuOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 5h16" />
              <path d="M4 12h16" />
              <path d="M4 19h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 text-white backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/projects" onClick={() => setMenuOpen(false)}>
            My Projets
          </Link>
          <Link to="/community" onClick={() => setMenuOpen(false)}>
            Community
          </Link>
          <Link to="/pricing" onClick={() => setMenuOpen(false)}>
            Pric
          </Link>

          <button
            className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-slate-100 hover:bg-slate-200 transition text-black rounded-md flex"
            onClick={() => setMenuOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar
