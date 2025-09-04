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
        <table className='w-full border-collapse rounded-md overflow-hidden text-nowrap'>
           <thead>
              <tr className='bg-primary' style={{ opacity: 0.95, color: 'white' }}>
                <th className='p-2 font-medium pl-5 text-left' align="left">Username</th>
                <th className='p-2 font-medium text-left' align="left">Movie Name</th>
                <th className='p-2 font-medium text-left' align="left">Showtime</th>
                <th className='p-2 font-medium text-left' align="left">Seats</th>
                <th className='p-2 font-medium text-left' align="left">Total Amount</th>
              </tr>
           </thead>
           <tbody className='text-sm font-light'>
           {bookings.map((item, index) => (
            <tr
              key={index}
              className={`border-b bg-primary`}
              style={{
                opacity: index % 2 === 0 ? 0.80 : 0.70,
                borderColor: 'rgba(248, 69, 101, 0.3)'
              }}
            >
              <td className='p-2 pl-5 text-left' align="left">{item.user.name}</td>
              <td className='p-2 text-left' align="left">{item.show.movie.title}</td>
              <td className='p-2 text-left' align="left">{new Date(item.show.showDateTime).toLocaleString()}</td>
              <td className='p-2 text-left' align="left">{item.bookedSeats.join(", ")}</td>
              <td className='p-2 text-left' align="left">{currency} {item.amount}</td>
            </tr>
           ))}
           </tbody>
         </table>
      </div>
    </>
  ) : <Loading/>;
}

export default ListBookings