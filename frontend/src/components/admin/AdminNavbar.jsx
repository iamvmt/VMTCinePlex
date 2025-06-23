import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const AdminNavbar = () => {
  return (
    <div className='flex items-center justify-between px-6 md:px-10 h-12 border-b border-gray-300/30'>
        <Link to="/">
            <img
                src={assets.VMTCinePLexLogo}
                alt='Logo'
                className='w-36 h-auto'
            />
        </Link>
    </div>
  )
}

export default AdminNavbar