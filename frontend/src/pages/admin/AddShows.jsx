import React from 'react'
import { dummyShowsData } from '../../assets/assets';
import Title from '../../components/admin/Title';
import Loading from '../../components/Loading';
import { CheckIcon, DeleteIcon, StarIcon } from 'lucide-react';
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
        const handleDateTimeAdd = () => {
          if (!dateTimeInput) return;
          const [date, time] = dateTimeInput.split("T");
          if (!date || !time) return;

          setDateTimeSelection((prev) => {
            const times = prev[date] || [];
            if (!times.includes(time)) {
              return { ...prev, [date]: [...times, time] };
            }
            return prev;
          });
          
        };

        const handleRemoveTime = (date, time) => {
          setDateTimeSelection((prev) => {
           const filteredTimes = prev[date].filter((t) => t !== time);
           if (filteredTimes.length === 0) {
            const { [date]: _, ...rest } = prev;
            return rest;
           }
           return { ...prev, [date]: filteredTimes };
          });
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
          <div key={movie.id} className={'relative max-w-40 cursor-pointer rounded-md shadow-md overflow-hidden hover:scale-105 transition-transform duration-200'}
           onClick={() => setSelectedMovie(movie.id)}>
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
            {selectedMovie === movie.id && (
              <div className='absolute top-2 right-2 flex items-center justify-center bg-primary h-6 w-6 rounded'>
                <CheckIcon className='w-4 h-4 text-white' strokeWidth={2.5}/>
              </div>
              )}
              <p className='font-medium truncate'>{movie.title}</p>
              <p className='text-sm text-gray-500'>{movie.release_date}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Show Price Input */}
    <div className='mt-8'>
      <label className='block text-sm font-medium mb-2'>Show Price</label>
      <div className='inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md'>
        <p className='text-gray-400 text-sm'>{currency}</p>
        <input min={0} type="number" value={showPrice} onChange={(e) => setShowPrice(e.target.value)}
          placeholder='Enter show price' className='bg-transparent outline-none w-32 text-sm'>
          </input>
      </div>
    </div>

    {/* Date & Time Selection */}
    <div className='mt-6'></div>
      <label className='block text-sm font-medium mb-2'>Select Date & Time</label>
      <div className='inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md'>
        <input type="datetime-local" value={dateTimeInput} onChange={(e) => setDateTimeInput(e.target.value)}
          className='outline-none rounded-md'>
        </input>
        <button onClick={handleDateTimeAdd} className='bg-red-500 text-white px-3 py-1 rounded-md text-sm
         hover:bg-primary/90 transition cursor-pointer'>Add Time</button>
      </div>
    
{/* Display Selected Date & Times */}
  {Object.keys(dateTimeSelection).length > 0 && (
    <div className='mt-6'>
      <h2 className='mb-2'>Selected Date-Time</h2>
      <ul className='space-y-3'>
        {Object.entries(dateTimeSelection).map(([date, times]) => (
          <li key={date}>
            <div className='font-medium'>{date}</div>
            <div className='flex flex-wrap gap-2 mt-1 text-sm'>
                {times.map((time) => (
                  <div key={time} className='border border-primary px-2 py-1 flex items-center rounded'>
                    <span>{time}</span>
                    <DeleteIcon onClick={() => handleRemoveTime(date, time)} width={15} className='ml-2 text-red-500 hover:text-red-700 cursor-pointer'/>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    )}

    {/* AddShow Button */}
    <button className='bg-primary text-white px-8 py-2 mt-6 rounded 
    hover:bg-primary/90 transition-all cursor-pointer '>
      Add Show
    </button>

    </>
  ) : <Loading />;
}

export default AddShows