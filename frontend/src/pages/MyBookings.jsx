import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BlurRedCircle from '../components/BlurRedCircle'
import { ArrowRight } from 'lucide-react'

const MyBookings = () => {
  const [booking, setBooking] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const stored = localStorage.getItem('latestBooking')
    if (stored) {
      setBooking(JSON.parse(stored))
    }
  }, [])

  const handlePayment = () => {
    alert(`✅ Payment successful for ₹${booking.total}!`)
    localStorage.removeItem('latestBooking')
    navigate('/')
  }

  if (!booking) {
    return (
      <div className='min-h-screen bg-black text-white flex items-center justify-center'>
        <p>No booking found. Please select seats first.</p>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-red-950 to-black text-white px-4 py-16 relative flex justify-center items-center'>
      <BlurRedCircle top="100px" left="100px" />
      <BlurRedCircle bottom="0px" left="600px" />

      <div className='w-[80%] max-w-4xl h-[180px] bg-[#1A1A1A] border border-red-700 rounded-xl shadow-lg p-3 flex items-center gap-4'>
        {/* Poster */}
        <img
          src={booking.movie.poster_path}
          alt={booking.movie.title}
          className='h-full aspect-[2/3] object-cover rounded-lg shadow-md'
        />

        {/* Details */}
        <div className='flex flex-col justify-between h-full py-2 text-xs flex-1'>
          <h2 className='text-base font-semibold text-white mb-1'>{booking.movie.title}</h2>
          <div className='text-gray-300 space-y-0.5 text-[11px]'>
            <p><span className='text-white'>Showtime:</span> {new Date(booking.time).toLocaleString()}</p>
            <p><span className='text-white'>Seats:</span> {booking.seats.join(', ')}</p>
            <p><span className='text-white'>Total:</span> ₹{booking.total}</p>
          </div>
        </div>

        {/* Pay Now */}
        <div className='flex items-end h-full pb-2 pr-2'>
          <button
            onClick={handlePayment}
            className='bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-full text-xs font-medium flex items-center gap-2'
          >
            Pay Now <ArrowRight className='w-3 h-3' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default MyBookings








