import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">Admin Dashboard</div>
        <div className="space-x-4">
          <Link 
            to="/admin/insert" 
            className="hover:bg-gray-700 p-2 rounded transition duration-300"
          >
            Insert
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
