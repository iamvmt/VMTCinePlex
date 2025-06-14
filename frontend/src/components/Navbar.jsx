import React from 'react'
import { Link } from 'react-router-dom'
import { MenuIcon, SearchIcon, XIcon } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className='fixed top-0 left-0 z-50 w-full flex items-center px-4 md:px-8 lg:px-12 py-5 bg-black/20 backdrop-blur-sm'>
        {/* Logo - positioned more to the left */}
        <Link to='/' className='flex-shrink-0'>
          <img src='/src/assets/WhiteMainLogo.svg' alt="Logo" className='w-36 h-auto' />
        </Link>
        
        {/* Center navigation - with proper spacing */}
        <div className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center md:flex-1 md:justify-center gap-6 lg:gap-10 md:px-8 py-3 max-md:h-screen md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border border-gray-300/20 overflow-hidden transition-[width] duration-300 ${isOpen ? 'max-md:w-full' : 'max-md:w-0'}`}>
          <XIcon 
            className='md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer text-white hover:text-gray-300' 
            onClick={toggleMenu}
          />
          <Link to='/' className='text-white hover:text-gray-300 transition-colors whitespace-nowrap'>Home</Link>
          <Link to='/movies' className='text-white hover:text-gray-300 transition-colors whitespace-nowrap'>Movies</Link>
          <Link to='/theatres' className='text-white hover:text-gray-300 transition-colors whitespace-nowrap'>Theatres</Link>
          <Link to='/releases' className='text-white hover:text-gray-300 transition-colors whitespace-nowrap'>Releases</Link>
          <Link to='/favourite' className='text-white hover:text-gray-300 transition-colors whitespace-nowrap'>Favourites</Link>
        </div>
        
        {/* Right side - Search and Login with more space */}
        <div className='flex items-center gap-4 lg:gap-6 flex-shrink-0 ml-auto'>
          <SearchIcon className='max-md:hidden w-6 h-6 cursor-pointer text-white hover:text-gray-300' />
          <button className='px-6 py-2 lg:px-8 lg:py-2.5 bg-red-500 hover:bg-red-600 transition rounded-full font-medium cursor-pointer text-white whitespace-nowrap'>
            Login
          </button>
        </div>
        
        <MenuIcon 
          className='max-md:ml-4 md:hidden w-8 h-8 cursor-pointer text-white hover:text-gray-300' 
          onClick={toggleMenu}
        />
      </div>
    </>
  )
}

export default Navbar