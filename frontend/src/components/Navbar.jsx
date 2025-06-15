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
      <div className='fixed top-0 bottom-90 left-0 z-100 w-full flex items-center justify-between px-0 md:px-3 lg:px-4 py-0'>
        {/* Logo */}
        <Link to='/' className='flex-shrink-0'>
          <div className='flex items-center gap-2'>
            <img
              src='/src/assets/WhiteMainLogo.svg'
              alt="VMTCinePlex Logo"
              className='w-24 h-24 object-contain'
            />
          </div>
        </Link>
        
        {/* Center navigation - pill shaped container */}
        <div className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-sm z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-1 md:gap-1 md:px-4 py-1.5 max-md:h-screen md:rounded-full backdrop-blur bg-slate-800/90 md:bg-slate-800/60 md:border border-slate-600/40 overflow-hidden transition-all duration-300 ${isOpen ? 'max-md:w-full' : 'max-md:w-0'}`}>
          <XIcon
            className='md:hidden absolute top-6 right-6 w-5 h-5 cursor-pointer text-white hover:text-gray-300'
            onClick={() => setIsOpen(!isOpen)}
          />
          <Link
            onClick={() => { scrollTo(0, 0); setIsOpen(false) }}
            to='/'
            className='px-3 py-1.5 text-white hover:bg-slate-700/50 rounded-full transition-all duration-200 whitespace-nowrap text-sm'
          >
            Home
          </Link>
          <Link
            onClick={() => { scrollTo(0, 0); setIsOpen(false) }}
            to='/movies'
            className='px-3 py-1.5 text-white hover:bg-slate-700/50 rounded-full transition-all duration-200 whitespace-nowrap text-sm'
          >
            Movies
          </Link>
          <Link
            onClick={() => { scrollTo(0, 0); setIsOpen(false) }}
            to='/theatres'
            className='px-3 py-1.5 text-white hover:bg-slate-700/50 rounded-full transition-all duration-200 whitespace-nowrap text-sm'
          >
            Theaters
          </Link>
          <Link
            onClick={() => { scrollTo(0, 0); setIsOpen(false) }}
            to='/releases'
            className='px-3 py-1.5 text-white hover:bg-slate-700/50 rounded-full transition-all duration-200 whitespace-nowrap text-sm'
          >
            Releases
          </Link>
        </div>
        
        {/* Right side - Search and Login */}
        <div className='flex items-center gap-3'>
          <SearchIcon className='max-md:hidden w-4 h-4 cursor-pointer text-white hover:text-gray-300 transition-colors' />
          {
            !user ? (
              <button onClick={openSignIn} className='px-4 py-1.5 bg-red-500 hover:bg-red-600 transition-colors rounded-full font-medium cursor-pointer text-white whitespace-nowrap text-xs'>
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
        </div>
        
        <MenuIcon
          className='md:hidden w-5 h-5 cursor-pointer text-white hover:text-gray-300 transition-colors'
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
    </>
  )
}

export default Navbar