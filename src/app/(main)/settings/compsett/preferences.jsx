"use client";
import React, { useState } from "react";
import { Check } from "lucide-react";

export default function Preferences() {
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Simulasi Menyimpan Pengaturan
  const handleApplySettings = (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    setTimeout(() => {
      setIsSaving(false);
      setIsSuccess(true);
      console.log("Pengaturan Display & Notifikasi berhasil disimpan.");
      
      // Kembali ke state normal setelah 3 detik
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  return (
    <form onSubmit={handleApplySettings} className="w-full animate-in slide-in-from-bottom-4 duration-700 space-y-12">
      
      {/* Section: Display Setting */}
      <section className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        <div className="lg:w-[304px] shrink-0">
          <h3 className="text-[20px] font-bold text-black uppercase tracking-tight">Display Setting</h3>
          <p className="text-sm text-[#7A746E] mt-2 font-medium">Sesuaikan tampilan aplikasi sesuai kenyamanan mata Anda.</p>
        </div>
        
        <div className="flex-1 space-y-10">
          {/* Theme Selection */}
          <div className="space-y-5">
            <div>
              <h4 className="text-[16px] font-bold text-black">App Theme</h4>
              <p className="text-sm text-[#7A746E]">Pilih antara mode terang, gelap, atau mengikuti sistem</p>
            </div>
            
            <div className="flex flex-wrap gap-6 pt-2">
              <ThemeOption label="Light Mode" active />
              <ThemeOption label="Dark Mode" />
              <ThemeOption label="System Default" />
            </div>
          </div>

          <hr className="border-[#E8E2D9]" />

          {/* Hide Balance Toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="text-[16px] font-bold text-black">Privasi Saldo</h4>
              <p className="text-sm text-[#7A746E]">Sembunyikan total saldo Anda secara otomatis saat aplikasi dibuka</p>
            </div>
            <Toggle />
          </div>
        </div>
      </section>

      <div className="h-[1px] w-full bg-[#E8E2D9]" />

      {/* Section: Notifications */}
      <section className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        <div className="lg:w-[304px] shrink-0">
          <h3 className="text-[20px] font-bold text-black uppercase tracking-tight">Notifications</h3>
          <p className="text-sm text-[#7A746E] mt-2 font-medium">Atur bagaimana Finansialin memberi tahu Anda tentang arus kas.</p>
        </div>
        
        <div className="flex-1 space-y-8">
          <NotificationItem 
            title="Daily Reminder" 
            desc="Terima pengingat setiap malam untuk mencatat pengeluaran harian Anda agar tidak lupa." 
            active
          />
          <NotificationItem 
            title="Budget Limit Alert" 
            desc="Dapatkan notifikasi saat pengeluaran Anda mencapai 80% dari batas anggaran bulanan." 
          />
          <NotificationItem 
            title="Weekly Financial Summary" 
            desc="Terima laporan ringkasan kesehatan finansial Anda setiap hari Minggu sore." 
            active
          />
        </div>
      </section>

      {/* Save Button */}
      <div className="flex justify-end pt-6">
        <button 
          type="submit"
          disabled={isSaving || isSuccess}
          className={`h-[56px] w-[233px] rounded-full text-[18px] font-bold shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
            isSuccess 
            ? "bg-green-500 text-white" 
            : "bg-[#1D1D1D] text-[#FFD600] hover:bg-black active:scale-95 disabled:opacity-80"
          }`}
        >
          {isSaving && <div className="w-5 h-5 border-2 border-[#FFD600] border-t-transparent rounded-full animate-spin" />}
          {isSuccess && <Check size={20} />}
          {isSaving ? "Applying..." : isSuccess ? "Saved!" : "Apply Settings"}
        </button>
      </div>
    </form>
  );
}

// --- Sub-components ---

function ThemeOption({ label, active }) {
  return (
    <div className="flex flex-col items-center gap-3 group cursor-pointer">
      <div className={`w-[160px] h-[100px] rounded-[15px] border-2 transition-all duration-300 ${
        active 
        ? "border-[#FFD600] bg-[#FFD600]/5 shadow-md" 
        : "border-[#E8E2D9] bg-white group-hover:border-[#9CA3AF]"
      }`}>
        <div className="p-3 space-y-2">
           <div className={`h-2 w-10 rounded-full ${active ? 'bg-[#FFD600]' : 'bg-[#E8E2D9]'}`} />
           <div className={`h-2 w-full rounded-full ${active ? 'bg-[#FFD600]/40' : 'bg-[#F6F5F1]'}`} />
           <div className={`h-2 w-3/4 rounded-full ${active ? 'bg-[#FFD600]/40' : 'bg-[#F6F5F1]'}`} />
        </div>
      </div>
      <span className={`text-sm font-bold ${active ? "text-black" : "text-[#7A746E]"}`}>{label}</span>
    </div>
  );
}

function Toggle({ defaultChecked = false }) {
  const [enabled, setEnabled] = useState(defaultChecked);
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        className="sr-only peer" 
        checked={enabled}
        onChange={() => setEnabled(!enabled)} 
      />
      <div className={`
        w-[52px] h-[28px] rounded-full transition-all duration-300
        after:content-[''] after:absolute after:top-[4px] after:left-[4px] 
        after:bg-white after:rounded-full after:h-[20px] after:w-[20px] after:transition-all
        ${enabled 
          ? "bg-[#FFD600] after:translate-x-[24px] shadow-sm" 
          : "bg-[#E8E2D9] after:translate-x-0"
        }
      `}></div>
    </label>
  );
}

function NotificationItem({ title, desc, active }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-[#F6F5F1] last:border-0">
      <div className="space-y-1 pr-10">
        <h4 className="text-[16px] font-bold text-black">{title}</h4>
        <p className="text-sm text-[#7A746E] leading-relaxed max-w-[550px]">{desc}</p>
      </div>
      <Toggle defaultChecked={active} />
    </div>
  );
}