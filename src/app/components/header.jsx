"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Bell, 
  ChevronDown, 
  User, 
  LogOut, 
  Settings, 
  X,
  Mail,
  Briefcase,
  GraduationCap
} from 'lucide-react';

const Header = () => {
  const router = useRouter();
  
  // UX States
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Data User (Bisa dihubungkan ke State/Context nantinya)
  const userData = {
    name: "Muhammad Furqan Maulidi",
    email: "frqmld@student.telkomuniversity.ac.id",
    role: "Informatics Student",
    bio: "Head of Cadreization Department. Fokus pada pengembangan web dan riset Machine Learning.",
    avatar: "M"
  };

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      router.push('/'); 
    }, 1500);
  };

  return (
    <>
      <header className="flex justify-between items-center mb-10 relative z-40">
        {/* Welcome Section - Yang tadinya hilang */}
        <div className="animate-in slide-in-from-left duration-700">
          <h1 className="text-2xl font-black tracking-tighter text-[#1A1A1A]">
            Hi, {userData.name.split(' ')[0]}
          </h1>
          <p className="text-xs text-[#7A746E] font-bold uppercase tracking-widest mt-0.5 opacity-70">
            Welcome back! 👋
          </p>
        </div>

        <div className="flex items-center gap-6">
          {/* Search Bar */}
          <div className={`relative transition-all duration-300 ${isSearchFocused ? 'w-96' : 'w-72'}`}>
            <input 
              type="text" 
              placeholder="Search anything..." 
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full h-12 bg-white rounded-2xl pl-12 pr-6 shadow-sm border border-[#E8E2D9] focus:outline-none focus:border-[#FFD600] transition-all font-medium text-xs" 
            />
            <Search 
              className={`absolute left-4 top-3.5 transition-colors ${isSearchFocused ? 'text-[#FFD600]' : 'text-[#A3A3A3]'}`} 
              size={18} 
            />
          </div>

          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <button className="relative p-3 bg-white rounded-2xl border border-[#E8E2D9] shadow-sm hover:bg-gray-50 transition-all group">
              <Bell size={20} className="group-hover:rotate-12 transition-transform" />
              <div className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 p-1.5 pr-4 bg-white rounded-2xl border border-[#E8E2D9] shadow-sm hover:shadow-md transition-all active:scale-95"
              >
                <div className="w-9 h-9 rounded-xl bg-[#1A1A1A] text-[#FFD600] flex items-center justify-center font-black text-sm shadow-inner">
                  {userData.avatar}
                </div>
                <ChevronDown 
                  size={16} 
                  className={`text-[#7A746E] transition-transform duration-300 ${showProfileMenu ? 'rotate-180' : ''}`} 
                />
              </button>

              {showProfileMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowProfileMenu(false)} />
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-3xl border border-[#E8E2D9] shadow-2xl py-3 z-20 animate-in fade-in zoom-in duration-200">
                    <div className="px-4 py-2 mb-2 border-b border-[#F6F5F1]">
                       <p className="text-[10px] font-black text-[#A3A3A3] uppercase tracking-widest">Signed in as</p>
                       <p className="text-xs font-bold text-[#1A1A1A] truncate">{userData.email}</p>
                    </div>
                    <button 
                      onClick={() => { setShowProfileModal(true); setShowProfileMenu(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-[#7A746E] hover:bg-[#F6F5F1] hover:text-[#1A1A1A] transition-colors"
                    >
                      <User size={16} className="text-[#FFD600]" /> My Profile
                    </button>
                    <button 
                      onClick={() => router.push('/settings')}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-[#7A746E] hover:bg-[#F6F5F1] hover:text-[#1A1A1A] transition-colors"
                    >
                      <Settings size={16} /> Account Settings
                    </button>
                    <div className="h-px bg-[#F6F5F1] my-2 mx-4" />
                    <button 
                      onClick={() => { setShowLogoutModal(true); setShowProfileMenu(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* --- POPUP: MY PROFILE (Biodata) --- */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl relative overflow-hidden animate-in zoom-in duration-300 border border-[#E8E2D9]">
            <div className="h-32 bg-[#1A1A1A] relative">
              <button onClick={() => setShowProfileModal(false)} className="absolute right-6 top-6 text-white/50 hover:text-white transition-colors bg-white/10 p-2 rounded-full backdrop-blur-sm">
                <X size={20} />
              </button>
            </div>
            
            <div className="px-10 pb-10">
              <div className="relative -mt-12 mb-6">
                <div className="w-24 h-24 rounded-[32px] bg-[#FFD600] border-8 border-white flex items-center justify-center text-4xl font-black text-[#1A1A1A] shadow-lg">
                  {userData.avatar}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-[#1A1A1A] tracking-tighter">{userData.name}</h3>
                  <p className="text-sm font-bold text-[#FFD600] uppercase tracking-widest">{userData.role}</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <ProfileDetail icon={<Mail size={16}/>} label="Email" value={userData.email} />
                  <ProfileDetail icon={<Briefcase size={16}/>} label="Organization" value="Informatics Student Association" />
                  <ProfileDetail icon={<GraduationCap size={16}/>} label="University" value="Telkom University" />
                </div>

                <div className="p-5 bg-[#F6F5F1] rounded-3xl">
                  <p className="text-[10px] font-black text-[#A3A3A3] uppercase tracking-widest mb-2">Bio</p>
                  <p className="text-sm text-[#7A746E] leading-relaxed font-medium italic">"{userData.bio}"</p>
                </div>
              </div>

              <button 
                onClick={() => router.push('/settings')}
                className="w-full mt-8 h-14 bg-[#1A1A1A] text-[#FFD600] rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all shadow-lg active:scale-95"
              >
                Edit Full Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: LOGOUT CONFIRMATION --- */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-sm rounded-[32px] p-8 shadow-2xl text-center relative border border-[#E8E2D9] animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <LogOut size={32} />
            </div>
            <h3 className="text-xl font-black text-[#1A1A1A] tracking-tighter mb-2">Ready to Leave?</h3>
            <p className="text-sm text-[#7A746E] font-medium mb-8">Data transaksi Anda akan tetap aman di Finansialin.</p>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => setShowLogoutModal(false)} className="h-12 border border-[#E8E2D9] rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#F6F5F1] transition-all">Batal</button>
              <button onClick={handleLogout} className="h-12 bg-red-500 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-lg flex items-center justify-center">
                {isLoggingOut ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Logout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Helper Component untuk Detail Profile
function ProfileDetail({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="p-2.5 bg-white border border-[#E8E2D9] rounded-xl text-[#A3A3A3] group-hover:text-[#FFD600] group-hover:border-[#FFD600] transition-all shadow-sm">
        {icon}
      </div>
      <div>
        <p className="text-[9px] font-black text-[#A3A3A3] uppercase tracking-widest">{label}</p>
        <p className="text-xs font-bold text-[#1A1A1A]">{value}</p>
      </div>
    </div>
  );
}

export default Header;