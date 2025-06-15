import { CalendarIcon, ClockIcon } from 'lucide-react'
import React from 'react'

const HeroSection = () => {
  return (
    <div className='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url("/bgimg2.jpeg")] bg-cover bg-center h-screen'>
      
      {/* Marvel Logo - Fixed path */}
      <img src='src/assets/marvelLogo.svg' alt="Marvel Logo" className="max-h-11 lg:h-11 mt-20"/>
      
      {/* Title - Fixed CSS classes */}
      <h1 className='text-5xl md:text-[70px] md:leading-tight font-semibold max-w-4xl text-white'>
        The Batman
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
      
    </div>
  )
}

export default HeroSection