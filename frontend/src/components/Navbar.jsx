import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MenuIcon, SearchIcon, TicketPlus, XIcon } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
   
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
 
  const { user } = useUser()
  const { openSignIn } = useClerk()
  const navigate = useNavigate()
 
  return (
    <>
      <div className='fixed top-0 left-0 z-50 w-full flex items-center justify-between px-3 md:px-4 lg:px-6 py-2'>
        {/* Logo - More Compact */}
        <Link to='/' className='flex-shrink-0'>
          <div className='flex items-center gap-1.5'>
            <img
              src='/src/assets/WhiteMainLogo.svg'
              alt="VMTCinePlex Logo"
              className='w-16 h-16 md:w-18 md:h-18 object-contain'
            />
          </div>
        </Link>
                
        {/* Center navigation - More compact pill */}
        <div className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-sm z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-0.5 md:gap-0.5 md:px-3 py-1 max-md:h-screen md:rounded-full backdrop-blur-md bg-slate-800/95 md:bg-slate-800/70 md:border border-slate-600/50 overflow-hidden transition-all duration-300 ${isOpen ? 'max-md:w-full' : 'max-md:w-0'}`}>
          <XIcon
            className='md:hidden absolute top-6 right-6 w-5 h-5 cursor-pointer text-white hover:text-gray-300'
            onClick={() => setIsOpen(!isOpen)}
          />
          <Link
            onClick={() => { scrollTo(0, 0); setIsOpen(false) }}
            to='/'
            className='px-2.5 py-1 text-white hover:bg-slate-700/60 rounded-full transition-all duration-200 whitespace-nowrap text-xs font-medium'
          >
            Home
          </Link>
          <Link
            onClick={() => { scrollTo(0, 0); setIsOpen(false) }}
            to='/movies'
            className='px-2.5 py-1 text-white hover:bg-slate-700/60 rounded-full transition-all duration-200 whitespace-nowrap text-xs font-medium'
          >
            Movies
          </Link>
          <Link
            onClick={() => { scrollTo(0, 0); setIsOpen(false) }}
            to='/theatres'
            className='px-2.5 py-1 text-white hover:bg-slate-700/60 rounded-full transition-all duration-200 whitespace-nowrap text-xs font-medium'
          >
            Theaters
          </Link>
          <Link
            onClick={() => { scrollTo(0, 0); setIsOpen(false) }}
            to='/releases'
            className='px-2.5 py-1 text-white hover:bg-slate-700/60 rounded-full transition-all duration-200 whitespace-nowrap text-xs font-medium'
          >
            Releases
          </Link>
          <Link
            onClick={() => { scrollTo(0, 0); setIsOpen(false) }}
            to='/favorites'
            className='px-2.5 py-1 text-white hover:bg-slate-700/60 rounded-full transition-all duration-200 whitespace-nowrap text-xs font-medium'
          >
            Favorites
          </Link>
        </div>
                
        {/* Right side - More compact */}
        <div className='flex items-center gap-2'>
          <SearchIcon className='max-md:hidden w-4 h-4 cursor-pointer text-white hover:text-gray-300 transition-colors' />
          {
            !user ? (
              <button onClick={openSignIn} className='px-3 py-1 bg-red-500 hover:bg-red-600 transition-colors rounded-full font-medium cursor-pointer text-white whitespace-nowrap text-xs'>
                Login
              </button>
            ) : (
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Action label="My Bookings" labelIcon={<TicketPlus width={13} />}
                    onClick={() => navigate('/my-bookings')}
                  />
                </UserButton.MenuItems>
              </UserButton>
            )
          }
          
          <MenuIcon
            className='md:hidden w-5 h-5 cursor-pointer text-white hover:text-gray-300 transition-colors'
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
      </div>
    </>
  )
}

export default Navbar