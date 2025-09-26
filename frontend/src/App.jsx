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
import { Layout } from 'lucide-react';
import Dashboard from './pages/admin/Dashboard';
import AddShows from './pages/admin/AddShows';
import ListShows from './pages/admin/ListShows';
import ListBookings from './pages/admin/ListBookings';
import AdminLayout from './pages/admin/AdminLayout';
import { useAppContext } from './context/AppContext';
import { SignIn } from '@clerk/clerk-react';
const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith('/admin');

  const { user } = useAppContext();

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
        <Route path='/admin/*' element={ user ? <AdminLayout/> : (
          <div className=' min-h-screen flex justify-center items-center'>
            <SignIn fallbackRedirectUrl={'/admin'}/>
          </div>
        )}>
         <Route index element={<Dashboard/>} />
         <Route path='add-shows' element={<AddShows/>} />
         <Route path='list-shows' element={<ListShows/>} />
         <Route path='list-bookings' element={<ListBookings/>} />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}
    </FavoritesProvider>
  );
};

export default App;
