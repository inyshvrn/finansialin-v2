"use client";
import { Search, Bell } from 'lucide-react';

export default function Header({ name = "ABP" }) {
  return (
    <header className="flex justify-between items-center mb-10">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">
          Hi <span className="text-[#FFD600]">{name}</span> ,
        </h1>
        <p className="text-xl font-semibold -mt-1">Welcome back!</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Type to search" 
            className="w-80 h-12 bg-white rounded-full pl-14 pr-6 shadow-sm border border-[#E8E2D9] focus:outline-none focus:ring-2 focus:ring-[#FFD600]/20 transition-all font-medium text-sm" 
          />
          <Search className="absolute left-5 top-3.5 text-[#A3A3A3] group-focus-within:text-[#FFD600]" size={20} />
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2.5 bg-white rounded-full border border-[#E8E2D9] shadow-sm">
            <Bell size={22} />
            <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>
          </button>
          <div className="w-12 h-12 rounded-full border-4 border-white shadow-lg bg-[#E8E2D9] flex items-center justify-center font-bold text-[#7A746E]">A</div>
        </div>
      </div>
    </header>
  );
}