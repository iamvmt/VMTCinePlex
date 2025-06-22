import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, dummyDateTimeData, dummyShowsData, dummyDashboardData } from '../assets/assets'
import { ClockIcon, ArrowRight } from 'lucide-react'
import isoTimeFormat from '../lib/isoTimeFormat'
import BlurRedCircle from '../components/BlurRedCircle'
import toast from 'react-hot-toast'

const SeatLayout = () => {
  const { id, date } = useParams()
  const [selectedSeats, setSelectedSeats] = useState([])
  const [selectedTime, setSelectedTime] = useState(null)
  const [show, setShow] = useState(null)
  const [showDetails, setShowDetails] = useState(null)
  const navigate = useNavigate()

  const handleSeatClick = (seatId) => {
    if (!selectedTime) return toast.error("Please select a slot")
    if (bookedSeats.includes(seatId)) return
    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5) {
      return toast.error("You can only select up to 5 seats")
    }
    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(seat => seat !== seatId)
        : [...prev, seatId]
    )
  }

  const bookedSeats = showDetails?.occupiedSeats ? Object.keys(showDetails.occupiedSeats) : []

  const renderSeatRow = (row, count = 9) => (
    <div key={row} className='flex gap-1 justify-center'>
      {Array.from({ length: count }, (_, i) => {
        const seatId = `${row}${i + 1}`
        const isBooked = bookedSeats.includes(seatId)
        const isSelected = selectedSeats.includes(seatId)

        return (
          <button
            key={seatId}
            title={`Seat ${seatId}`}
            onClick={() => handleSeatClick(seatId)}
            disabled={isBooked}
            className={`h-5 w-5 text-xs rounded border font-medium transition-all duration-200 ease-in-out transform
              ${isBooked
                ? "bg-red-500 text-white border-red-500 cursor-not-allowed"
                : isSelected
                ? "bg-red-600 text-white border-red-500 scale-110 shadow-md"
                : "bg-gray-800 text-gray-300 hover:bg-red-600/30 hover:border-red-500/70 border-gray-600 hover:scale-105"
              }`}
          >
            {seatId}
          </button>
        )
      })}
    </div>
  )

  const renderTwoColumnSeats = (leftRow, rightRow) => (
    <div className='flex justify-center gap-6'>
      <div className='flex flex-col gap-1'>
        {renderSeatRow(leftRow)}
      </div>
      <div className='flex flex-col gap-1'>
        {renderSeatRow(rightRow)}
      </div>
    </div>
  )

  useEffect(() => {
    const matchedShow = dummyShowsData.find(show => String(show._id) === String(id))
    if (matchedShow) {
      setShow({
        movie: matchedShow,
        dateTime: dummyDateTimeData
      })
    }
  }, [id])

  useEffect(() => {
    setSelectedSeats([])
    if (!selectedTime) return
    const found = dummyDashboardData.activeShows.find(
      s => s.showDateTime === selectedTime.time && String(s.movie._id) === String(id)
    )
    setShowDetails(found || null)
  }, [selectedTime, id])

  if (!show) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-950 to-black">
        <p className="text-lg text-white">Loading...</p>
      </div>
    )
  }

  const timeSlots = show.dateTime?.[date] || []
  const totalPrice = showDetails?.showPrice
    ? selectedSeats.length * showDetails.showPrice
    : 0

  return (
    <div className='min-h-screen pt-16 pb-6 px-4 md:px-10 bg-gradient-to-br from-red-950 to-black text-white'>
      <BlurRedCircle top="-80px" left="-80px" />
      <BlurRedCircle bottom="0px" right="0px" />

      <div className='max-w-6xl mx-auto'>
        <h1 className='text-2xl font-bold text-center mb-4'>Select Seats</h1>

        <div className='flex flex-col lg:flex-row gap-6'>
          {/* Timings */}
          <div className='lg:w-48 bg-[#1A1A1A] p-4 rounded border border-red-700'>
            <h3 className='text-sm font-semibold mb-3 flex items-center gap-1'>
              <ClockIcon className='w-4 h-4 text-red-400' /> Show Times
            </h3>
            <div className='flex flex-wrap lg:flex-col gap-2'>
              {timeSlots.map(item => (
                <button
                  key={item.time}
                  onClick={() => setSelectedTime(item)}
                  className={`text-xs px-3 py-1.5 rounded border transition-all duration-200 ${
                    selectedTime?.time === item.time
                      ? "bg-red-600 text-white border-red-500 shadow-md"
                      : "bg-gray-800 border-gray-600 text-gray-300 hover:bg-red-600/20 hover:border-red-500"
                  }`}
                >
                  {isoTimeFormat(item.time)}
                </button>
              ))}
            </div>
          </div>

          {/* Seat Layout */}
          <div className='flex-1'>
            {selectedTime ? (
              <div className='bg-[#1b1b1b] p-5 rounded-lg border border-red-700'>
                <div className='text-center mb-4'>
                  <img src={assets.screenImage} alt='screen' className='w-36 mx-auto mb-1' />
                  <p className='text-xs text-gray-400'>SCREEN</p>
                </div>

                <div className='space-y-2'>
                  {['A', 'B'].map(row => renderSeatRow(row))}
                  <div className='h-2' />
                  {renderTwoColumnSeats('C', 'D')}
                  {renderTwoColumnSeats('E', 'F')}
                  <div className='h-2' />
                  {renderTwoColumnSeats('G', 'H')}
                  {renderTwoColumnSeats('I', 'J')}
                </div>

                {selectedSeats.length > 0 && (
                  <div className='mt-6 bg-red-900/20 p-4 rounded border border-red-700 text-sm'>
                    <p className='text-center mb-2'>Selected: {selectedSeats.join(', ')}</p>
                    <p className='text-center mb-4'>
                      Total: <span className='text-red-400 font-bold'>₹{totalPrice}</span>
                    </p>
                    <div className='text-center'>
                      <button
                        onClick={() => {
                          const bookingInfo = {
                            movie: {
                              title: show.movie.title,
                              poster_path: show.movie.poster_path
                            },
                            time: selectedTime.time,
                            seats: selectedSeats,
                            total: totalPrice
                          }
                          localStorage.setItem('latestBooking', JSON.stringify(bookingInfo))
                          navigate('/my-bookings')
                        }}
                        className='bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full inline-flex items-center gap-2'
                      >
                        Proceed to Checkout <ArrowRight className='w-4 h-4' />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className='bg-gray-800 p-6 rounded text-center border border-red-700'>
                <p className='text-sm text-gray-300'>Please select a time slot</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeatLayout


