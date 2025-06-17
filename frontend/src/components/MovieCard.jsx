import { StarIcon, HeartIcon, TicketIcon } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import timeFormat from '../lib/timeFormat';

const MovieCard = ({ movie, onToggleFavorite, isFavorite, onBuyTicket }) => {
  const navigate = useNavigate();

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(movie._id);
    }
  };

  const handleBuyTicketsClick = (e) => {
    e.stopPropagation();
    if (onBuyTicket) {
      onBuyTicket(movie);
    } else {
      navigate(`/movies/${movie._id}#dateSelect`);
    }
  };

  return (
    <div className="relative group w-48">
      <img
        onClick={() => {
          navigate(`/movies/${movie._id}`);
          window.scrollTo(0, 0);
        }}
        src={movie.backdrop_path}
        alt={movie.title}
        className="rounded-md h-24 w-full object-cover object-center cursor-pointer"
      />

      {/* Favorite Button - Top Right */}
      <button
        onClick={handleFavoriteClick}
        className={`absolute top-2 right-2 p-1.5 rounded-full transition-all duration-200 ${
          isFavorite
            ? 'bg-red-500 text-white'
            : 'bg-black/50 text-white hover:bg-black/70'
        }`}
      >
        <HeartIcon size={16} fill={isFavorite ? 'currentColor' : 'none'} />
      </button>

      <div className="mt-2">
        <h3 className="font-semibold text-sm line-clamp-2">{movie.title}</h3>

        <p className="text-xs text-gray-600 mt-1">
          {new Date(movie.release_date).getFullYear()} •{' '}
          {movie.genres?.slice(0, 2).map((genre) => genre.name).join(' | ')} •{' '}
          {timeFormat(movie.runtime)} min
        </p>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-1">
            <StarIcon size={14} className="text-yellow-500" fill="currentColor" />
            <span className="text-sm font-medium">{movie.vote_average?.toFixed(1)}</span>
          </div>

          {/* Buy Tickets Button */}
          <button
            onClick={handleBuyTicketsClick}
            className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs font-medium transition-colors duration-200"
          >
            <TicketIcon size={12} />
            <span>Tickets</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

