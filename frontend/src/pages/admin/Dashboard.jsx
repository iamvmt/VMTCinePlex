import React, { useEffect, useState } from 'react';
import { ChartLineIcon, PlayCircleIcon, StarIcon, UsersIcon } from 'lucide-react';
import { dummyDashboardData } from '../../assets/assets.js';
import Title from '../../components/admin/Title.jsx';
import BlurRedCircle from '../../components/BlurRedCircle.jsx';
import { dateFormat } from '../../lib/dateFormat.js';
const Dashboard = () => {
  const currency = import.meta.env.VITE_CURRENCY || '₹';

  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    activeShows: [],
    totalRevenue: 0,
    totalUsers: 0,
  });

  const [loading, setLoading] = useState(true);

  const dashboardCards = [
    {
      title: 'Total Bookings',
      value: dashboardData.totalBookings || '0',
      icon: ChartLineIcon,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Revenue',
      value: `${currency} ${dashboardData.totalRevenue.toLocaleString()}` || '0',
      icon: ChartLineIcon,
      color: 'bg-green-500',
    },
    {
      title: 'Active Shows',
      value: dashboardData.activeShows.length || '0',
      icon: PlayCircleIcon,
      color: 'bg-yellow-500',
    },
    {
      title: 'Total Users',
      value: dashboardData.totalUsers || '0',
      icon: UsersIcon,
      color: 'bg-purple-500',
    },
  ];

  const fetchDashboardData = async () => {
    // Simulate data fetch
    setDashboardData(dummyDashboardData);
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <>
      <Title text1="Admin" text2="Dashboard" />

      <div className="relative flex flex-wrap gap-4 mt-6">
        <BlurRedCircle top="-100px" left="0" />
        <div className="flex flex-wrap gap-4 w-full">
          {!loading &&
            dashboardCards.map((card, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-4 py-3 bg-primary/10 border border-primary/20 rounded-md max-w-50 w-full"
              >
                <div>
                  <h1 className="text-sm">{card.title}</h1>
                  <p className="text-xl font-medium mt-1">{card.value}</p>
                </div>
                <card.icon className="w-6 h-6" />
              </div>
            ))}
        </div>
      </div>

    <p className='mt-10 text-lg font-medium'>Active Shows</p>
<div className='relative mt-4 max-w-6xl'>
  <BlurRedCircle top='-100px' left='-10%' />
  
  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
    {dashboardData.activeShows.map((show) => (
      <div
        key={show._id}
        className='rounded-xl overflow-hidden bg-primary/10 border border-primary/20 shadow-sm hover:-translate-y-1 transition duration-300'
      >
        <img
          src={show.movie.poster_path}
          alt={show.movie.title}
          className='h-40 w-full object-cover'
        />
        <div className='p-2'>
          <p className='text-sm font-medium truncate'>{show.movie.title}</p>
          <div className='flex items-center justify-between mt-1 text-sm text-muted-foreground'>
            <span>{currency} {show.showPrice}</span>
            <span className='flex items-center gap-1'>
              <StarIcon className='w-4 h-4 text-primary fill-primary' />
              {show.movie.vote_average.toFixed(1)}
            </span>
          </div>
          <p className='text-xs text-gray-500 mt-1'>
            {new Date(show.showDateTime).toLocaleString('en-IN', {
              day: 'numeric',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit',
               })}
              </p>
            </div>
          </div>
        ))}
      </div>
     </div>
    </>
  );
};

export default Dashboard;
