"use client";
import React from 'react';
import Image from 'next/image';
import { 
  LayoutGrid, 
  ArrowRightLeft, 
  Wallet, 
  BarChart3, 
  Settings, 
  LogOut 
} from 'lucide-react';

const Sidebar = ({ activeMenu = 'Dashboard' }) => {
  const menus = [
    { name: 'Dashboard', icon: LayoutGrid },
    { name: 'Transactions', icon: ArrowRightLeft },
    { name: 'Budgeting', icon: Wallet },
    { name: 'Statistics', icon: BarChart3 },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-60 h-screen bg-white border-r border-[#E8E2D9] fixed left-0 top-0 flex flex-col p-6 z-50">
      {/* Logo Section */}
      <div className="mb-10 w-full flex justify-center">
        <Image
          src="/logolengkap.svg" 
          alt="Finansialin Logo" 
          width={190} 
          height={50} 
          priority
          className="object-contain"
        />
      </div>

      {/* Menu List */}
      <nav className="flex-1 space-y-2">
        {menus.map((item) => {
          const isActive = activeMenu === item.name;
          return (
            <div 
              key={item.name} 
              className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all relative group
                ${isActive 
                  ? 'bg-[#FFD600]/10 text-[#1A1A1A] font-bold' 
                  : 'text-[#7A746E] hover:bg-gray-50'}`}
            >
              {/* Indikator Kuning Aktif */}
              {isActive && (
                <div className="absolute left-0 w-1.5 h-6 bg-[#FFD600] rounded-r-full" />
              )}
              
              <item.icon 
                size={20} 
                className={`${isActive ? 'text-[#FFD600]' : 'text-[#7A746E] group-hover:text-[#1A1A1A]'}`}
                strokeWidth={isActive ? 3 : 2} 
              />
              <span className="text-sm">{item.name}</span>
            </div>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="mt-auto pt-6 border-t border-[#E8E2D9]">
        <button className="flex items-center gap-4 px-4 py-3 text-[#7A746E] hover:text-red-500 w-full transition-colors group font-medium text-sm">
          <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;