import React, { useEffect } from 'react'
import { dummyBookingData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';

const ListBookings = () => {

  const currency = import.meta.env.VITE_CURRENCY

  const [bookings, setBookings] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);

  const getAllBookings = async () => {
    setBookings(dummyBookingData)
    setLoading(false);
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  return !isLoading ? (
    <>
      <Title text1="List" text2="Bookings" />
      <div className='max-w-4xl mt-6 overflow-x-auto'>
        <table className='w-full border-collapse rounded-md overflow-hidden
        text-nowrap'>
           <thead>
              <tr className='bg-primary/20 text-left text-white'>
                <th className='p-2 font-medium pl-5'>Username</th>
                <th className='p-2 font-medium'>Movie Name</th>
                <th className='p-2 font-medium'>Showtime</th>
                <th className='p-2 font-medium'>Seats</th>
                <th className='p-2 font-medium'>Total Amount</th>
              </tr>
           </thead>
           <tbody className='text-sm font-light'>
           {bookings.map((item, index) => (
            <tr key={index} className='border-b border-primary/20 bg-primary/5 even:bg-primary/10'>
              <td className='p-2 pl-5'>{item.user.name}</td>
              <td className='p-2'>{item.show.movie.title}</td>
              <td className='p-2'>{new Date(item.show.showDateTime).toLocaleString()}</td>
              <td className='p-2'>{item.bookedSeats.join(", ")}</td>
              <td className='p-2'>{currency} {item.amount}</td>
            </tr>
           ))}
           </tbody>
         </table>
      </div>
    </>
  ) : <Loading/>;
}

export default ListBookings