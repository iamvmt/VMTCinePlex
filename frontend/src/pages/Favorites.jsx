// pages/Favorites.jsx
import React, { useState, useMemo } from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import { dummyShowsData } from '../assets/assets.js';
import MovieCard from '../components/MovieCard.jsx';
import BlurRedCircle from '../components/BlurRedCircle.jsx';
import { Heart, Trash2, SortAsc, SortDesc } from 'lucide-react';

const Favorites = () => {
  const { favorites, toggleFavorite, clearAllFavorites, getFavoritesCount } = useFavorites();
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleBuyTicket = (movie) => {
    alert(`Buying tickets for "${movie.title}"\nRelease Date: ${new Date(movie.release_date).toLocaleDateString()}\nRating: ${movie.vote_average}/10`);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all movies from favorites?')) {
      clearAllFavorites();
    }
  };

  const favoriteMovies = useMemo(() => {
    let movies = dummyShowsData.filter(movie => favorites.has(movie._id));
    movies.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'rating':
          comparison = b.vote_average - a.vote_average;
          break;
        case 'release_date':
          comparison = new Date(b.release_date) - new Date(a.release_date);
          break;
        case 'title':
        default:
          comparison = a.title.localeCompare(b.title);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    return movies;
  }, [favorites, sortBy, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  if (getFavoritesCount() === 0) {
    return (
      <div className='relative flex flex-col items-center justify-center min-h-[70vh] px-4 text-center pt-24'>
        <BlurRedCircle top="100px" left="0px" />
        <BlurRedCircle bottom="30px" right='30px'/>
        <Heart className='w-16 h-16 text-gray-300 mb-4' />
        <h1 className='text-2xl font-bold text-gray-700 mb-2'>No Favorites Yet</h1>
        <p className='text-sm text-gray-500 mb-6'>Start adding movies to your favorites by clicking the heart icon.</p>
        <a href="/movies" className='px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition'>Browse Movies</a>
      </div>
    );
  }

  return (
    <div className='relative px-4 py-8 md:px-12 min-h-[70vh] pt-24'>
      <BlurRedCircle top="100px" left="0px" />
      <BlurRedCircle bottom="30px" right='30px'/>

      {/* Header */}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4'>
        <div className='flex items-center gap-2'>
          <Heart className='w-6 h-6 text-red-600 fill-current' />
          <h1 className='text-2xl font-bold text-gray-800'>My Favorites</h1>
          <span className='bg-red-100 text-red-800 px-2 py-0.5 rounded-full text-xs font-medium'>{getFavoritesCount()}</span>
        </div>

        {/* Controls */}
        <div className='flex flex-wrap items-center gap-3'>
          <div className='flex items-center gap-2'>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className='px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-red-500'
            >
              <option value="title">Title</option>
              <option value="rating">Rating</option>
              <option value="release_date">Release Date</option>
            </select>
            <button
              onClick={toggleSortOrder}
              className='p-1 border border-gray-300 rounded-md hover:bg-gray-100 text-gray-600'
              title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
            >
              {sortOrder === 'asc' ? <SortAsc size={16} /> : <SortDesc size={16} />}
            </button>
          </div>

          <button
            onClick={handleClearAll}
            className='flex items-center gap-1 px-3 py-1 text-red-600 border border-red-300 rounded-md hover:bg-red-50 text-sm'
          >
            <Trash2 size={14} /> Clear All
          </button>
        </div>
      </div>

      {/* Movies Grid */}
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
        {favoriteMovies.map((movie) => (
          <MovieCard 
            movie={movie} 
            key={movie._id}
            onToggleFavorite={toggleFavorite}
            isFavorite={true}
            onBuyTicket={handleBuyTicket}
          />
        ))}
      </div>

      {/* Stats */}
      <div className="mt-10 p-4 bg-red-50 rounded-lg border border-red-100">
        <h3 className="text-base font-semibold text-red-800 mb-3">Your Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm text-red-700">
          <div>
            <div className="text-lg font-bold text-red-600">{getFavoritesCount()}</div>
            <div>Total Favorites</div>
          </div>
          <div>
            <div className="text-lg font-bold text-red-600">
              {favoriteMovies.length > 0 ? 
                (favoriteMovies.reduce((sum, m) => sum + m.vote_average, 0) / favoriteMovies.length).toFixed(1) 
                : '0'}
            </div>
            <div>Avg Rating</div>
          </div>
          <div>
            <div className="text-lg font-bold text-red-600">
              {favoriteMovies.filter(m => m.vote_average >= 8).length}
            </div>
            <div>Highly Rated</div>
          </div>
          <div>
            <div className="text-lg font-bold text-red-600">
              {favoriteMovies.filter(m => new Date(m.release_date).getFullYear() === new Date().getFullYear()).length}
            </div>
            <div>This Year</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorites;