import React from 'react'
import { dummyShowsData } from '../../assets/assets';
import Title from '../../components/admin/Title';
import Loading from '../../components/Loading';
import { StarIcon } from 'lucide-react';
import { kConverter } from '../../lib/kConverter';

const AddShows = () => {
  const currency = import.meta.env.VITE_CURRENCY
  const [nowPlayingMovies, setNowPlayingMovies] = React.useState([]);
  const [selectedMovie, setSelectedMovie] = React.useState(null);
  const [dateTimeSelection, setDateTimeSelection] = React.useState({});
  const [dateTimeInput, setDateTimeInput] = React.useState("");
  const [showPrice, setShowPrice] = React.useState("");

        const fetchNowPlayingMovies = async () => {
            setNowPlayingMovies(dummyShowsData)
        };

        React.useEffect(() => {
            fetchNowPlayingMovies();
        }, []);

  return nowPlayingMovies.length > 0 ? (
    <>
    <Title text1="Add" text2="Shows" />
    <p className='mt-10 text-lg font-medium'>Now Playing Movies</p>
    <div className='overflow-x-auto pb-4'>
      <div className='group flex flex-wrap gap-4 mt-4 w-max'>
        {nowPlayingMovies.map((movie) => (
          <div key={movie.id} className={'relative max-w-40 cursor-pointer rounded-md shadow-md overflow-hidden hover:scale-105 transition-transform duration-200'}>
            <div className='relative rounded-lg overflow-hidden'>
              <img src={movie.poster_path} alt='' className='w-full object-cover brightness-90' />
              <div className='text-sm flex items-center justify-between p-2 bg-black/70 w-full absolute bottom-0 left-0'>
                <p className='flex items-center gap-1 text-gray-400'>
                  <StarIcon className='w-4 h-4 text-primary fill-primary'/>
                  {movie.vote_average.toFixed(1)}
                </p>
                <p className='text-gray-300'>
                  {kConverter(movie.vote_count)} Votes
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  ) : <Loading />;
}

export default AddShows