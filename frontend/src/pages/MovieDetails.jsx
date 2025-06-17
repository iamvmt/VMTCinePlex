import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { dummyDateTimeData, dummyShowsData } from '../assets/assets';
import BlurRedCircle from '../components/BlurRedCircle';
import { HeartIcon, Heart, PlayCircle, StarIcon } from 'lucide-react';
import timeFormat from '../lib/timeFormat';
import { useFavorites } from '../contexts/FavoritesContext';
import DateSelect from '../components/DateSelect';
import MovieCard from '../components/MovieCard';

const MovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    setLoading(true);
    setError(null);

    const movie = dummyShowsData.find((show) => show._id === id);

    if (movie) {
      setShow({
        movie,
        dateTime: dummyDateTimeData,
      });
      setLoading(false);
    } else {
      setShow(null);
      setLoading(false);
      setError('Movie not found');
    }
  }, [id]);

  const isFavorite = favorites.has(id);
  const handleFavoriteClick = () => toggleFavorite(id);

  if (loading) {
    return <div className="text-center text-white py-20">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-white py-20">
        <p>{error}</p>
        <button
          onClick={() => navigate('/movies')}
          className="mt-4 px-6 py-2 bg-primary rounded-md hover:bg-primary-dull transition"
        >
          Back to Movies
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-10 pt-20 pb-10 text-white scroll-smooth">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 items-start">
        <img
          src={show.movie.poster_path}
          alt={show.movie.title}
          className="rounded-lg h-72 w-48 object-cover shadow-md"
        />

        <div className="relative flex flex-col gap-2 w-full">
          <BlurRedCircle top="-100px" left="-100px" />
          <span className="text-xs text-primary uppercase font-medium">
            English
          </span>
          <h1 className="text-xl font-bold leading-tight">{show.movie.title}</h1>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <StarIcon className="w-4 h-4 text-primary fill-primary" />
            {show.movie.vote_average.toFixed(1)} IMDb
          </div>

          <p className="text-sm text-gray-400 line-clamp-3">{show.movie.overview}</p>

          <p className="text-sm text-gray-300">
            {timeFormat(show.movie.runtime)} •{' '}
            {show.movie.genres?.slice(0, 2).map((g) => g.name).join(', ')} •{' '}
            {show.movie.release_date
              ? new Date(show.movie.release_date).toLocaleDateString()
              : 'N/A'}
          </p>

          <div className="flex items-center gap-3 mt-4">
            <button className="bg-primary text-white px-3 py-1.5 rounded hover:bg-red-600 transition flex items-center">
              <PlayCircle className="w-4 h-4 mr-2" />
              Trailer
            </button>
            <a
              href="#dateSelect"
              className="bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700 transition cursor-pointer"
            >
              Tickets
            </a>
            <button onClick={handleFavoriteClick}>
              {isFavorite ? (
                <Heart className="w-5 h-5 text-red-600 fill-current transition" />
              ) : (
                <HeartIcon className="w-5 h-5 text-gray-400 hover:text-red-600 transition" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Render DateSelect */}
      <DateSelect dateTime={show.dateTime} id={id} />

      <p className="text-lg font-medium mt-20 mb-8">You May Also Like</p>
      <div className="flex flex-wrap max-sm:justify-center gap-8">
        {dummyShowsData.slice(0, 4).map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>

      <div className="flex justify-center mt-20">
        <button
          onClick={() => {
            navigate('/movies');
            window.scrollTo(0, 0);
          }}
          className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer"
        >
          Show More
        </button>
      </div>
    </div>
  );
};

export default MovieDetails;




