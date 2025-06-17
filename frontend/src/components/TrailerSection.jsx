import React, { useState, useEffect } from 'react';
import { dummyTrailers } from '../assets/assets.js';
import ReactPlayer from 'react-player/lazy';
import BlurRedCircle from './BlurRedCircle';

const TrailerSection = () => {
  const [currentTrailerIndex, setCurrentTrailerIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-scroll functionality - only when not playing
  useEffect(() => {
    if (isPlaying) return; // Don't auto-scroll when video is playing

    const interval = setInterval(() => {
      setCurrentTrailerIndex((prevIndex) => 
        (prevIndex + 1) % dummyTrailers.length
      );
    }, 5000); // Change trailer every 5 seconds

    return () => clearInterval(interval);
  }, [isPlaying]); // Re-run effect when isPlaying changes

  const goToPrevious = () => {
    setCurrentTrailerIndex((prevIndex) => 
      prevIndex === 0 ? dummyTrailers.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentTrailerIndex((prevIndex) => 
      (prevIndex + 1) % dummyTrailers.length
    );
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden py-16'>
      <p className='text-gray-300 font-medium text-lg mb-8'>Trailers</p>
             
      <div className='relative'>
        <BlurRedCircle top='-100px' right='-100px'/>
                 
        {/* Main trailer container with navigation arrows */}
        <div className='relative w-[40vw] min-w-[400px] max-w-[600px] mx-auto'>
          {/* Previous Arrow */}
          <button
            onClick={goToPrevious}
            className='absolute left-[-60px] top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 rounded-full p-3 transition-all duration-300 hover:scale-110'
          >
            <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
            </svg>
          </button>

          {/* Video Player */}
          <div style={{ paddingTop: '56.25%' }} className='relative'>
            <ReactPlayer
              url={dummyTrailers[currentTrailerIndex].videoUrl}
              controls={true}
              width="100%"
              height="100%"
              style={{
                position: 'absolute',
                top: 0,
                left: 0
              }}
              className="rounded-xl overflow-hidden shadow-2xl"
              onPlay={handlePlay}
              onPause={handlePause}
              onEnded={handleEnded}
            />
          </div>

          {/* Next Arrow */}
          <button
            onClick={goToNext}
            className='absolute right-[-60px] top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 rounded-full p-3 transition-all duration-300 hover:scale-110'
          >
            <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default TrailerSection