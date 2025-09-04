import React, { useEffect, useState } from 'react'
import { dummyShowsData } from '../../assets/assets';
import Title from '../../components/admin/Title';
import Loading from '../../components/Loading';

const ListShows = () => {

  const currency = import.meta.env.VITE_CURRENCY
  const [shows, setShows] = useState([]);
  const[loading, setLoading] = useState(true);
  
  const getAllShows = async () => {
    try {
          setShows([{
            movie: dummyShowsData[0],
            showDateTime: "2025-06-30T14:30:00Z",
            showPrice: 50,
            occupiedSeats: {
              A1: "user_1",
              B1: "user_2",
              C1: "user_3"
            }
          }]);
          setLoading(false);

    } catch (error) {
      console.error("Error fetching shows:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllShows();  
  }, []);

  return !loading ? (
  <>
    <Title text1="List" text2="Shows" />
    <div className='max-w-4xl mt-6 overflow-x-auto'>
      <table className='w-full border-collapse rounded-md overflow-hidden text-nowrap'>
         <thead>
            <tr className='bg-primary' style={{ opacity: 0.85, color: 'white', textAlign: 'left' }}>
              <th className='p-2 font-medium pl-5'>Movie Name</th>
              <th className='p-2 font-medium'>Show Date & Time</th>
              <th className='p-2 font-medium'>Total Bookings</th>
              <th className='p-2 font-medium'>Earnings</th>
            </tr>
         </thead>
         <tbody className='text-sm font-light'>
            {shows.map((show, index) => (
              <tr
                key={index}
                className='bg-primary'
                style={{
                  opacity: index % 2 === 0 ? 0.65 : 0.25,
                  borderBottom: '2px solid var(--color-primary)'
                }}
              >
                <td className='p-2 pl-5'>{show.movie.title}</td>
                <td className='p-2'>{new Date(show.showDateTime).toLocaleString()}</td>
                <td className='p-2'>{Object.keys(show.occupiedSeats).length}</td>
                <td className='p-2'>{currency} {Object.keys(show.occupiedSeats).length * show.showPrice}</td>
              </tr>
            ))}
         </tbody>
      </table>
    </div>
  </>
) : <Loading/>
}

export default ListShows