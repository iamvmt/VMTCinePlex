import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboardIcon,
  PlusSquareIcon,
  ListIcon,
  ListCollapseIcon
} from 'lucide-react';
import { assets } from '../../assets/assets';

const AdminSidebar = () => {
  const user = {
    firstName: 'Admin',
    lastName: 'User',
    imageUrl: assets.profile,
  };

  const adminNavlinks = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboardIcon },
    { name: 'Add Shows', path: '/admin/add-shows', icon: PlusSquareIcon },
    { name: 'List Shows', path: '/admin/list-shows', icon: ListIcon },
    { name: 'List Bookings', path: '/admin/list-bookings', icon: ListCollapseIcon },
  ];

  return (
    <div className="h-[calc(100vh-48px)] w-full max-w-14 md:max-w-52 border-r border-gray-200 text-sm flex flex-col items-center py-4">
      <img
        src={user.imageUrl}
        alt="Profile"
        className="h-9 w-9 md:h-12 md:w-12 rounded-full"
      />
      <p className="mt-1 text-xs text-gray-700 hidden md:block">
        {user.firstName} {user.lastName}
      </p>

      <div className="mt-6 w-full">
        {adminNavlinks.map(({ name, path, icon: Icon }, idx) => (
          <NavLink
            key={idx}
            to={path}
            end={path === '/admin'}  // 👈 apply 'end' only for the Dashboard route
            className={({ isActive }) =>
              `group flex items-center md:pl-6 gap-2 w-full py-2.5 text-gray-500 hover:text-primary hover:bg-gray-100 transition 
               ${isActive ? 'text-primary bg-primary/10 font-medium' : ''}`
            }
          >
            <Icon className="w-5 h-5 mx-auto md:mx-0" />
            <span className="hidden md:inline">{name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
