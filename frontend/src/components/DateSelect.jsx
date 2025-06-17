import React, { useState } from 'react';
import BlurRedCircle from './BlurRedCircle';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const DateSelect = ({ dateTime, id }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const handleDateClick = (date) => {
    setSelected((prev) => (prev === date ? null : date));
  };

  const onBookHandler = () => {
    if (!selected) {
      toast('Please select a date', { duration: 2000 });
      return;
    }
    navigate(`/movies/${id}/${selected}`);
    window.scrollTo(0, 0);
  };

  return (
    <div id="dateSelect" className="pt-16 px-4 md:px-10 text-white">
      <div className="relative bg-primary/10 border border-primary/30 rounded-xl max-w-5xl mx-auto p-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <BlurRedCircle top="-100px" left="-100px" />
        <BlurRedCircle top="-100px" right="-100px" />

        {/* Left side */}
        <div className="w-full md:w-4/5">
          <h3 className="text-base font-semibold mb-2">🎯 Choose Date</h3>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 gap-3">
            {Object.keys(dateTime).map((date) => {
              const isSelected = selected === date;
              const day = new Date(date).getDate();
              const month = new Date(date).toLocaleDateString('en-US', {
                month: 'short',
              });

              return (
                <button
                  key={date}
                  onClick={() => handleDateClick(date)}
                  className={`flex flex-col items-center justify-center px-2 py-2 rounded-lg text-xs font-medium border transition-all
                    ${isSelected
                      ? 'bg-primary text-white border-primary shadow'
                      : 'bg-black/10 text-gray-300 border-white/10 hover:bg-primary/20 hover:border-primary'}
                  `}
                >
                  <span>{day}</span>
                  <span>{month}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right side */}
        <div className="w-full md:w-1/5 flex justify-end md:justify-center">
          <button
            onClick={onBookHandler}
            className="px-6 py-2 text-sm bg-primary text-white rounded-lg hover:bg-red-500 hover:scale-105 transition-all duration-200 cursor-pointer"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateSelect;
