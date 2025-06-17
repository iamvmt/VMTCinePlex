import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dummyDateTimeData, dummyShowsData } from '../assets/assets';
import BlurRedCircle from '../components/BlurRedCircle';
import { HeartIcon, Heart } from 'lucide-react';
import { PlayCircle, StarIcon } from 'lucide-react';
import timeFormat from '../lib/timeFormat';
import { useFavorites } from '../contexts/FavoritesContext'; // 🆕 Import

const MovieDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [hoveredCast, setHoveredCast] = useState(null);

  const { favorites, toggleFavorite } = useFavorites(); // 🆕 Use context

  useEffect(() => {
    const show = dummyShowsData.find(show => show._id === id);
    setShow({
      movie: show,
      dateTime: dummyDateTimeData,
    });
  }, [id]);

  const isFavorite = favorites.has(id); // 🆕 Check if favorite
  const handleFavoriteClick = () => {
    toggleFavorite(id); // 🆕 Toggle it
  };

  return show ? (
    <div className="px-4 md:px-10 pt-20 pb-12 text-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
        <img
          src={show.movie.poster_path}
          alt={show.movie.title}
          className="rounded-lg h-80 w-56 object-cover shadow-md mx-auto md:mx-0"
        />

        <div className="relative flex flex-col gap-2 w-full">
          <BlurRedCircle top="-100px" left="-100px" />
          <span className="text-xs text-primary uppercase font-medium">English</span>

          <h1 className="text-2xl font-bold leading-tight">{show.movie.title}</h1>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <StarIcon className="w-4 h-4 text-primary fill-primary" />
            {show.movie.vote_average.toFixed(1)} IMDb
          </div>

          <p className="text-sm text-gray-400 line-clamp-4">{show.movie.overview}</p>

          <p className="text-sm text-gray-300">
            {timeFormat(show.movie.runtime)} • {show.movie.genres?.slice(0, 2).map(g => g.name).join(', ')} •{' '}
            {show.movie.release_date ? new Date(show.movie.release_date).toLocaleDateString() : 'N/A'}
          </p>

          <div className="flex items-center gap-3 flex-wrap mt-3">
            <button className="bg-primary text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200 flex items-center cursor-pointer">
              <PlayCircle className="w-5 h-5 mr-2" />
              Trailer
            </button>
            <a
              href="#dateSelect"
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200 cursor-pointer"
            >
              Tickets
            </a>
            <button onClick={handleFavoriteClick} className="cursor-pointer">
              {isFavorite ? (
                <Heart className="w-6 h-6 text-red-600 fill-current transition-colors duration-200" />
              ) : (
                <HeartIcon className="w-6 h-6 text-gray-400 hover:text-red-600 transition-colors duration-200" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      <div className="mt-10 max-w-6xl mx-auto">
        <h2 className="text-lg font-semibold mb-4">Your Favorite Cast</h2>
        <div className="flex flex-wrap gap-4 md:gap-6">
          {show.movie.casts.slice(0, 12).map((cast, index) => {
            const isHovered = hoveredCast === index;
            const isFaded = hoveredCast !== null && hoveredCast !== index;

            return (
              <div
                key={index}
                className={`flex flex-col items-center text-center transition-all duration-300 ease-in-out cursor-pointer ${
                  isHovered ? 'scale-110 z-10' : isFaded ? 'opacity-40' : 'opacity-100'
                }`}
                onMouseEnter={() => setHoveredCast(index)}
                onMouseLeave={() => setHoveredCast(null)}
              >
                <img
                  src={cast.profile_path}
                  alt={cast.name}
                  className={`rounded-full h-20 w-20 md:h-20 md:w-20 object-cover shadow-md transition-all duration-300 ${
                    isHovered ? 'h-24 w-24 md:h-24 md:w-24' : ''
                  }`}
                />
                <p
                  className={`mt-1 text-sm ${
                    isHovered ? 'text-white font-medium w-28 truncate' : 'text-white truncate w-20'
                  }`}
                >
                  {cast.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    <div className="text-center text-white py-20">Loading...</div>
  );
};

export default MovieDetails;
