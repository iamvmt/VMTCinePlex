import { ArrowRight, CalendarIcon, ClockIcon } from 'lucide-react'
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const HeroSection = () => {

    const naviagate = useNavigate()
  return (
    <div className='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url("/bgimg2.jpeg")] bg-cover bg-center h-screen'>
      
      {/* Marvel Logo - Fixed path */}
      <img src='src/assets/marvelLogo.svg' alt="Marvel Logo" className="max-h-11 lg:h-11 mt-20"/>
      
      {/* Title - Fixed CSS classes */}
      
      <h1 className="text-5xl md:text-[70px] md:leading-tight font-semibold max-w-4xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-200 to-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]">
        The BATMAN
      </h1>


      
      {/* Movie Details */}
      <div className='flex items-center gap-4 text-gray-300'>
        <span>Action | Adventure | Sci-Fi</span>
        
        <div className='flex items-center gap-1 text-gray-400'>
          <CalendarIcon className='w-4 h-4 text-gray-400' />
          2022
        </div>
        
        <div className='flex items-center gap-1 text-gray-400'>
          <ClockIcon className='w-4 h-4 text-gray-400' />
          2h 32m
        </div>
      </div>
      <p className='text-gray-300 max-w-md'>
        When the Riddler, a sadistic serial killer, begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.
      </p>

      <button onClick={() => navigate('/movies')} className='flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-300'>
        Explore Movies
        <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  )
}

export default HeroSection