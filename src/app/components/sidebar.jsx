"use client";
import React, { useState } from 'react'; // Tambahkan useState
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // Tambahkan useRouter
import { 
  LayoutGrid, 
  ArrowRightLeft, 
  Wallet, 
  BarChart3, 
  Settings, 
  LogOut,
  X // Ikon untuk tutup modal
} from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  
  // UX State
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const menus = [
    { name: 'Dashboard', icon: LayoutGrid, path: '/dashboard' },
    { name: 'Transactions', icon: ArrowRightLeft, path: '/transactions' },
    { name: 'Budgeting', icon: Wallet, path: '/budgeting' },
    { name: 'Statistics', icon: BarChart3, path: '/statistics' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  // UX Logic
  const handleLogout = () => {
    setIsLoggingOut(true);
    // Simulasi loading logout
    setTimeout(() => {
      router.push('/'); // Kembali ke Welcome page
    }, 1500);
  };

  return (
    <>
      <aside className="w-60 h-screen bg-white border-r border-[#E8E2D9] fixed left-0 top-0 flex flex-col px-6 pt-8 pb-4 z-50">
        {/* Logo Section */}
        <div className="mb-10 w-full flex justify-center">
          <Link href="/dashboard">
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
                href={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all relative group
                  ${isActive 
                    ? 'bg-[#FFD600]/10 text-[#1A1A1A] font-bold' 
                    : 'text-[#7A746E] hover:bg-gray-50'}`}
              >
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

        {/* Logout Section */}
        <div className="mt-auto pt-4">
          <div className="border-t border-[#E8E2D9] mb-4" /> 
          <button 
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center gap-4 px-4 py-3 text-[#7A746E] hover:text-red-600 w-full transition-all group font-medium text-sm rounded-xl hover:bg-red-50"
          >
            <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* --- UX LOGOUT MODAL --- */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-sm rounded-[32px] p-8 shadow-2xl relative animate-in zoom-in duration-300">
            {/* Close Button */}
            <button 
              onClick={() => setShowLogoutModal(false)}
              className="absolute right-6 top-6 text-[#A3A3A3] hover:text-[#1A1A1A]"
            >
              <X size={20} />
            </button>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <LogOut size={30} />
              </div>
              
              <div className="space-y-1">
                <h3 className="text-xl font-black text-[#1A1A1A] tracking-tighter">Ready to Leave?</h3>
                <p className="text-sm text-[#7A746E] font-medium">Pastikan semua transaksi harian Anda sudah tercatat ya.</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4">
                <button 
                  onClick={() => setShowLogoutModal(false)}
                  className="px-6 py-3 border border-[#E8E2D9] rounded-2xl text-xs font-black uppercase tracking-widest text-[#1A1A1A] hover:bg-[#F6F5F1] transition-all"
                >
                  Batal
                </button>
                <button 
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="px-6 py-3 bg-[#1A1A1A] text-[#FFD600] rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg hover:bg-black active:scale-95 transition-all flex items-center justify-center"
                >
                  {isLoggingOut ? (
                    <div className="w-4 h-4 border-2 border-[#FFD600] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Logout"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;