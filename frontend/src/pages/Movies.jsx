// pages/Movies.jsx
import React, { useState, useMemo } from 'react';
import { dummyShowsData } from '../assets/assets.js';
import { useFavorites } from '../contexts/FavoritesContext';
import MovieCard from '../components/MovieCard.jsx';
import BlurRedCircle from '../components/BlurRedCircle.jsx';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Movies = () => {
  const { favorites, toggleFavorite, isFavorite, getFavoritesCount } = useFavorites();
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('title');
  
  const navigate = useNavigate();
  const handleBuyTicket = (movie) => {
   navigate(`/movies/${movie._id}#dateSelect`);
  }; 

  // Memoized filtered and sorted movies
  const filteredAndSortedMovies = useMemo(() => {
    let movies = [...dummyShowsData];
    
    // Apply filters
    if (filter === 'favorites') {
      movies = movies.filter(movie => favorites.has(movie._id));
    } else if (filter === 'high-rated') {
      movies = movies.filter(movie => movie.vote_average >= 7);
    }
    
    // Apply sorting
    movies.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.vote_average - a.vote_average;
        case 'release_date':
          return new Date(b.release_date) - new Date(a.release_date);
        case 'title':
        default:
          return a.title.localeCompare(b.title);
      }
    });
    
    return movies;
  }, [dummyShowsData, favorites, filter, sortBy]);

  if (dummyShowsData.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className='text-3xl font-bold text-center'>No Movies Available</h1>
        <p className='text-gray-600 mt-2'>Check back later for new releases!</p>
      </div>
    );
  }

  return (
    <div className='relative my-30 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]'>
      <BlurRedCircle top="150px" left="0px" />
      <BlurRedCircle bottom="50px" right='50px'/>
      
      {/* Header Section */}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6'>
        <h1 className='text-2xl font-bold mb-4 sm:mb-0'>
          Now Showing ({filteredAndSortedMovies.length})
        </h1>
        
        {/* Controls */}
        <div className='flex flex-col sm:flex-row gap-4'>
          {/* Filter Dropdown */}
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className='px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500'
          >
            <option value="all">All Movies</option>
            <option value="favorites">Favorites ({getFavoritesCount()})</option>
            <option value="high-rated">High Rated (7+)</option>
          </select>
          
          {/* Sort Dropdown */}
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className='px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500'
          >
            <option value="title">Sort by Title</option>
            <option value="rating">Sort by Rating</option>
            <option value="release_date">Sort by Release Date</option>
          </select>
        </div>
      </div>
      
      {/* Movies Grid */}
      {filteredAndSortedMovies.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center'>
          {filteredAndSortedMovies.map((movie) => (
            <MovieCard 
              movie={movie} 
              key={movie._id}
              onToggleFavorite={toggleFavorite}
              isFavorite={isFavorite(movie._id)}
              onBuyTicket={handleBuyTicket}
            />
          ))}
        </div>
      ) : (
        <div className='text-center py-12'>
          <h3 className='text-xl font-semibold text-gray-600 mb-2'>
            No movies found
          </h3>
          <p className='text-gray-500'>
            Try adjusting your filters or check back later
          </p>
        </div>
      )}
      
      {/* Favorites Summary Section */}
      {getFavoritesCount() > 0 && filter !== 'favorites' && (
        <div className="mt-12 p-6 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-red-800 flex items-center gap-2">
              <Heart className="w-5 h-5 fill-current" />
              Your Favorites ({getFavoritesCount()})
            </h3>
            <a 
              href="/favorites" 
              className="text-red-600 hover:text-red-800 font-medium text-sm underline"
            >
              View all →
            </a>
          </div>
          <div className="flex flex-wrap gap-2">
            {dummyShowsData
              .filter(movie => favorites.has(movie._id))
              .slice(0, 5) // Show only first 5
              .map(movie => (
                <span
                  key={movie._id}
                  className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {movie.title}
                </span>
              ))}
            {getFavoritesCount() > 5 && (
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                +{getFavoritesCount() - 5} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Movies;