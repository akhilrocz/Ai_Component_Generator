import React from 'react'
import { CiLight } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

const Navbar = () => {
  return (
    <nav className="h-[90px] border-b border-gray-700">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold gradient-colors">
          AI Component Generator
        </h3>

        <div className="flex items-center gap-3">
          <button
            aria-label="Theme"
            className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-700 bg-[#141319] hover:border-purple-500 hover:text-purple-400 transition-all duration-300"
          >
            <CiLight size={20} />
          </button>

          <button
            aria-label="Profile"
            className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-700 bg-[#141319] hover:border-purple-500 hover:text-purple-400 transition-all duration-300"
          >
            <FaRegUserCircle size={20} />
          </button>

          <button
            aria-label="Settings"
            className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-700 bg-[#141319] hover:border-purple-500 hover:text-purple-400 transition-all duration-300"
          >
            <IoMdSettings size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;