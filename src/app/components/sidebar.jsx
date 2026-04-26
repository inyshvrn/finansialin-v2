"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Import Link untuk navigasi
import { usePathname } from 'next/navigation'; // Import hook untuk mendeteksi path
import { 
  LayoutGrid, 
  ArrowRightLeft, 
  Wallet, 
  BarChart3, 
  Settings, 
  LogOut 
} from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname(); // Mendapatkan path URL saat ini (misal: /settings)

  const menus = [
    { name: 'Dashboard', icon: LayoutGrid, path: '/dashboard' },
    { name: 'Transactions', icon: ArrowRightLeft, path: '/transactions' },
    { name: 'Budgeting', icon: Wallet, path: '/budgeting' },
    { name: 'Statistics', icon: BarChart3, path: '/statistics' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <aside className="w-60 h-screen bg-white border-r border-[#E8E2D9] fixed left-0 top-0 flex flex-col p-6 z-50">
      {/* Logo Section */}
      <div className="mb-10 w-full flex justify-center">
        <Link href="/dashboard"> {/* Klik logo balik ke dashboard */}
          <Image
            src="/logolengkap.svg" 
            alt="Finansialin Logo" 
            width={190} 
            height={50} 
            priority
            className="object-contain cursor-pointer"
          />
        </Link>
      </div>

      {/* Menu List */}
      <nav className="flex-1 space-y-2">
        {menus.map((item) => {
          const isActive = pathname.startsWith(item.path); 
          
          return (
            <Link 
              key={item.name} 
              href={item.path} // Berpindah file sesuai folder di src/app
              className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all relative group
                ${isActive 
                  ? 'bg-[#FFD600]/10 text-[#1A1A1A] font-bold' 
                  : 'text-[#7A746E] hover:bg-gray-50'}`}
            >
              {/* Indikator Kuning Aktif - Sesuai Figma */}
              {isActive && (
                <div className="absolute left-[-24px] w-1.5 h-8 bg-[#FFD600] rounded-r-full" />
              )}
              
              <item.icon 
                size={20} 
                className={`${isActive ? 'text-[#FFD600]' : 'text-[#7A746E] group-hover:text-[#1A1A1A]'}`}
                strokeWidth={isActive ? 3 : 2} 
              />
              <span className="text-sm">{item.name}</span>
            </Link>
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