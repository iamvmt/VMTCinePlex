import React from 'react';
import Navbar from './components/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import SeatLayout from './pages/SeatLayout';
import MyBookings from './pages/MyBookings';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import Favorites from './pages/Favorites';
import { FavoritesProvider } from './contexts/FavoritesContext'; // ✅ import this

const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith('/admin');

  return (
    <FavoritesProvider> {/* ✅ Wrap everything here */}
      <Toaster />
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/movies/:id' element={<MovieDetails />} />
        <Route path='/movies/:id/:date' element={<SeatLayout />} />
        <Route path='/my-bookings' element={<MyBookings />} />
        <Route path='/favorites' element={<Favorites />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </FavoritesProvider>
  );
};

export default App;
