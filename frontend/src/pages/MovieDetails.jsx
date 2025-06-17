// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { dummyShowsData } from '../assets/assets.js';
// import { useFavorites } from '../contexts/FavoritesContext';
// import { HeartIcon, StarIcon } from 'lucide-react';

// const MovieDetails = () => {
//   const { id } = useParams();
//   const { toggleFavorite, isFavorite } = useFavorites();
//   const [selectedMovieId, setSelectedMovieId] = useState(id);

//   const movie = dummyShowsData.find((m) => m._id === selectedMovieId);
//   if (!movie) {
//     return <div className="text-center text-white py-20">Movie not found</div>;
//   }

//   return (
//     <div className="relative w-full min-h-screen bg-[#09090B] px-4 md:px-12 pt-28 pb-10 text-white">
//       {/* Background Image */}
//       <div
//         className="absolute top-[120px] left-0 w-full h-[600px] bg-cover bg-center opacity-20"
//         style={{
//           backgroundImage: `linear-gradient(90.74deg, rgba(0, 0, 0, 0.78) 1.83%, rgba(0, 0, 0, 0) 95.8%),
//             linear-gradient(0deg, rgba(0, 0, 0, 0.49), rgba(0, 0, 0, 0.49)),
//             url(${movie.backdrop_path})`
//         }}
//       />

//       {/* Main Info Section */}
//       <div className="relative z-10 flex flex-col md:flex-row gap-6">
//         <img 
//           src={movie.poster_path || movie.backdrop_path} 
//           alt={movie.title} 
//           className="w-[180px] h-[270px] object-cover rounded-md shadow-md"
//         />

//         <div className="flex flex-col justify-between text-sm">
//           <div>
//             <div className="flex items-center gap-3 mb-2">
//               <span className="text-[#F84565] font-semibold text-sm uppercase tracking-wide">{movie.language || 'ENGLISH'}</span>
//               <span className="flex items-center gap-1 text-[#D1D5DC] text-xs">
//                 <StarIcon size={14} fill="#D1D5DC" className="text-[#D1D5DC]" />
//                 {movie.vote_average.toFixed(1)} IMDb
//               </span>
//               <button
//                 onClick={() => toggleFavorite(movie._id)}
//                 className={`p-1 rounded-full transition-colors duration-200 ${isFavorite(movie._id) ? 'bg-red-500' : 'bg-gray-700 hover:bg-gray-600'} text-white`}
//               >
//                 <HeartIcon size={14} fill={isFavorite(movie._id) ? 'currentColor' : 'none'} />
//               </button>
//             </div>

//             <h1 className="text-xl font-bold mb-2 leading-tight">{movie.title}</h1>
//             <p className="text-[#99A1AF] text-xs mb-3 max-w-md leading-relaxed">{movie.overview}</p>

//             <p className="text-[#D1D5DC] text-xs mb-4">
//               {movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : ''} •
//               {movie.genres?.map(g => g.name).join(', ')} • {new Date(movie.release_date).toDateString()}
//             </p>
//           </div>

//           <div className="flex gap-3">
//             <button className="bg-[#1E2939] px-4 py-1.5 rounded-md text-sm hover:bg-[#2f3b51] hover:scale-105 transition-transform duration-200">Watch Trailer</button>
//             <button
//               className="bg-[#F84565] px-4 py-1.5 rounded-md text-sm hover:bg-red-600 hover:scale-105 transition-transform duration-200"
//             >
//               Buy Tickets
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* You May Also Like Section */}
//       <div className="mt-16">
//         <h2 className="text-lg font-semibold text-[#D1D5DC] mb-5">You May Also Like</h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {dummyShowsData.slice(0, 4).map((rec) => (
//             <div
//               key={rec._id}
//               onClick={() => setSelectedMovieId(rec._id)}
//               className="bg-[#12161C] rounded-md p-3 cursor-pointer hover:scale-105 hover:shadow-lg transition-all"
//             >
//               <img src={rec.backdrop_path} alt={rec.title} className="w-full h-[130px] object-cover rounded" />
//               <h3 className="text-white text-sm font-semibold mt-2 line-clamp-1">{rec.title}</h3>
//               <p className="text-[#797B7D] text-xs">
//                 {new Date(rec.release_date).getFullYear()} - {rec.genres?.slice(0,2).map(g => g.name).join(', ')}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MovieDetails;

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { dummyDateTimeData, dummyShowsData } from '../assets/assets';

const MovieDetails = () => {
const { id } = useParams();
const [show, setShow] = useState(null);


const getShow = async () => {
  const show = dummyShowsData.find(show => show._id === id);
  setShow({
    movie: show,
    dateTime: dummyDateTimeData
  })
}
   
useEffect(()=> {
  getShow();
}, [id]);

  return show ?  (
    <div className='px-6 md:px-16 lg:px-40 pt-30 md:pt-50'>
     <div className='flex flex-col md:flex-row gap-8 max-w-6xl mx-auto'>
        <img src={show.movie.poster_path} alt="" className='max-md:mx-auto rounded-xl h-104 max-w-70 object-cover' />
     </div>

    </div>
  ) : <div>Loading . . .</div>
}

export default MovieDetails