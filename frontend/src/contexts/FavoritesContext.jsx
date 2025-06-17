// contexts/FavoritesContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    // Load favorites from localStorage on initial load
    try {
      const savedFavorites = localStorage.getItem('movieFavorites');
      return savedFavorites ? new Set(JSON.parse(savedFavorites)) : new Set();
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
      return new Set();
    }
  });

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem('movieFavorites', JSON.stringify([...favorites]));
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }, [favorites]);

  const toggleFavorite = (movieId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(movieId)) {
        newFavorites.delete(movieId);
      } else {
        newFavorites.add(movieId);
      }
      return newFavorites;
    });
  };

  const addToFavorites = (movieId) => {
    setFavorites(prev => new Set(prev).add(movieId));
  };

  const removeFromFavorites = (movieId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      newFavorites.delete(movieId);
      return newFavorites;
    });
  };

  const clearAllFavorites = () => {
    setFavorites(new Set());
  };

  const isFavorite = (movieId) => {
    return favorites.has(movieId);
  };

  const getFavoritesCount = () => {
    return favorites.size;
  };

  const value = {
    favorites,
    toggleFavorite,
    addToFavorites,
    removeFromFavorites,
    clearAllFavorites,
    isFavorite,
    getFavoritesCount,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};