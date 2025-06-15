import { StarIcon } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import timeFormat from '../lib/timeFormat'

const MovieCard = ({ movie }) => {
  const navigate = useNavigate()
     
  return (
    <div className='flex flex-col justify-between p-1.5 bg-gray-800 rounded-xl hover:-translate-y-1 transition duration-300 w-40 flex-shrink-0'>
      <img 
        onClick={() => { navigate(`/movies/${movie.id}`); window.scrollTo(0, 0) }}
        src={movie.backdrop_path} 
        alt={movie.title} 
        className='rounded-md h-24 w-full object-cover object-center cursor-pointer' 
      />
      <p className='font-medium mt-1 truncate text-xs leading-tight'>
        {movie.title}
      </p>
      <p className='text-[8px] text-gray-400 mt-0.5 leading-tight truncate'>
        {new Date(movie.release_date).getFullYear()} • {movie.genres?.slice(0, 2).map(genre => genre.name).join(' | ')} • {timeFormat(movie.runtime)} min
      </p>
      <p className='flex items-center gap-0.5 text-xs text-gray-400 mt-0.5'>
        <StarIcon className='w-3 h-3 text-primary fill-primary' />
        {movie.vote_average?.toFixed(1)}
      </p>
    </div>
  )
}

export default MovieCard