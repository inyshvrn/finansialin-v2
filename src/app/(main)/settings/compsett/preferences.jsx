"use client";
import React, { useState, useEffect } from "react";
import { Check, AlertCircle } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { apiPut } from "@/lib/apiClient";

export default function Preferences() {
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [preferences, setPreferences] = useState({
    theme: "light",
    hideBalance: false,
    dailyReminder: true,
    budgetAlert: true,
    weeklySummary: true,
  });

  const { data: prefData, isLoading: loading, error: apiError } = useApi("/api/users/preferences");

  useEffect(() => {
    if (prefData) {
      setPreferences({
        theme: prefData.theme || "light",
        hideBalance: prefData.hideBalance || false,
        dailyReminder: prefData.dailyReminder !== false,
        budgetAlert: prefData.budgetAlert !== false,
        weeklySummary: prefData.weeklySummary !== false,
      });
    }
  }, [prefData]);

  // Simpan preferences ke backend
  const handleApplySettings = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    const savePreferences = async () => {
      try {
        await apiPut("/api/users/preferences", {
          theme: preferences.theme,
          hideBalance: preferences.hideBalance,
          dailyReminder: preferences.dailyReminder,
          budgetAlert: preferences.budgetAlert,
          weeklySummary: preferences.weeklySummary,
        });

        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 3000);
      } catch (err) {
        setError(err.message || "Gagal menyimpan pengaturan");
      } finally {
        setIsSaving(false);
      }
    };

    savePreferences();
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#FFD600]"></div>
      </div>
    );
  }

  if (error && !isSaving) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
        <AlertCircle className="text-red-600" size={20} />
        <div>
          <h4 className="font-bold text-red-600">Error</h4>
          <p className="text-sm text-red-500">{error}</p>
        </div>
      </div>
    );
  }

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
              <ThemeOption 
                label="Light Mode" 
                active={preferences.theme === 'light'}
                onClick={() => setPreferences({...preferences, theme: 'light'})}
              />
              <ThemeOption 
                label="Dark Mode"
                active={preferences.theme === 'dark'}
                onClick={() => setPreferences({...preferences, theme: 'dark'})}
              />
              <ThemeOption 
                label="System Default"
                active={preferences.theme === 'system'}
                onClick={() => setPreferences({...preferences, theme: 'system'})}
              />
            </div>
          </div>

          <hr className="border-[#E8E2D9]" />

          {/* Hide Balance Toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="text-[16px] font-bold text-black">Privasi Saldo</h4>
              <p className="text-sm text-[#7A746E]">Sembunyikan total saldo Anda secara otomatis saat aplikasi dibuka</p>
            </div>
            <Toggle 
              active={preferences.hideBalance}
              onChange={(checked) => setPreferences({...preferences, hideBalance: checked})}
            />
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
            active={preferences.dailyReminder}
            onChange={(checked) => setPreferences({...preferences, dailyReminder: checked})}
          />
          <NotificationItem 
            title="Budget Limit Alert" 
            desc="Dapatkan notifikasi saat pengeluaran Anda mencapai 80% dari batas anggaran bulanan."
            active={preferences.budgetAlert}
            onChange={(checked) => setPreferences({...preferences, budgetAlert: checked})}
          />
          <NotificationItem 
            title="Weekly Financial Summary" 
            desc="Terima laporan ringkasan kesehatan finansial Anda setiap hari Minggu sore."
            active={preferences.weeklySummary}
            onChange={(checked) => setPreferences({...preferences, weeklySummary: checked})}
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

function ThemeOption({ label, active, onClick }) {
  return (
    <div className="flex flex-col items-center gap-3 group cursor-pointer" onClick={onClick}>
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

function Toggle({ active = false, onChange }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        className="sr-only peer" 
        checked={active}
        onChange={(e) => onChange && onChange(e.target.checked)} 
      />
      <div className={`
        w-[52px] h-[28px] rounded-full transition-all duration-300
        after:content-[''] after:absolute after:top-[4px] after:left-[4px] 
        after:bg-white after:rounded-full after:h-[20px] after:w-[20px] after:transition-all
        ${active 
          ? "bg-[#FFD600] after:translate-x-[24px] shadow-sm" 
          : "bg-[#E8E2D9] after:translate-x-0"
        }
      `}></div>
    </label>
  );
}

function NotificationItem({ title, desc, active, onChange }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-[#F6F5F1] last:border-0">
      <div className="space-y-1 pr-10">
        <h4 className="text-[16px] font-bold text-black">{title}</h4>
        <p className="text-sm text-[#7A746E] leading-relaxed max-w-[550px]">{desc}</p>
      </div>
      <Toggle active={active} onChange={onChange} />
    </div>
  );
}