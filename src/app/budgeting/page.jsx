"use client";
import React, { useState } from "react";
import Header from "../components/header";
import { 
  Plus, Target, AlertTriangle, X, Search, CheckCircle2, PencilLine 
} from "lucide-react";

export default function BudgetingPage() {
  // --- UX STATES ---
  const [filter, setFilter] = useState("Active");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAdjust, setShowAdjust] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // --- DUMMY DATA ---
  const budgetData = [
    { id: 1, label: "Food & Dining", spent: "Rp 1.800.000", limit: "Rp 2.000.000", percent: 90, daysLeft: "4", status: "Active", isWarning: true },
    { id: 2, label: "Transportation", spent: "Rp 400.000", limit: "Rp 1.500.000", percent: 26, daysLeft: "4", status: "Active", isWarning: false },
    { id: 3, label: "Self Care", spent: "Rp 1.500.000", limit: "Rp 1.500.000", percent: 100, daysLeft: "0", status: "Completed", isWarning: false },
    { id: 4, label: "Entertainment", spent: "Rp 1.200.000", limit: "Rp 1.000.000", percent: 120, daysLeft: "4", status: "Overlimit", isWarning: true },
  ];

  // --- LOGIC FILTER & SEARCH ---
  const filteredData = budgetData.filter(item => {
    const matchesSearch = item.label.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "All" ? true : item.status === filter;
    return matchesFilter && matchesSearch;
  });

  const openAdjust = (cat) => {
    setSelectedCategory(cat);
    setShowAdjust(true);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20 relative">
      <Header name="ABP" />

      {/* --- HERO SECTION --- */}
      <section className="bg-[#1A1A1A] rounded-[40px] p-10 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-[#FFD600] opacity-10 blur-[80px]"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FFD600]">Overall Status</span>
            <h2 className="text-4xl font-black tracking-tighter">78% Anggaran Terpakai</h2>
            <p className="text-sm text-gray-400 font-medium italic">Sisa hari di bulan April: <span className="text-white font-bold">4 Hari Lagi</span>.</p>
          </div>
          <div className="hidden md:block text-right">
             <p className="text-[10px] font-black uppercase opacity-50 tracking-widest">Sisa Saldo Anggaran</p>
             <p className="text-4xl font-black text-[#FFD600]">Rp 1.250.000</p>
          </div>
        </div>
      </section>

      {/* --- CONTROL BAR: SEARCH & FILTER --- */}
      <section className="flex flex-col xl:flex-row justify-between items-center gap-6">
        {/* Filter Tabs */}
        <div className="flex bg-white border border-[#E8E2D9] p-1.5 rounded-2xl shadow-sm">
          {["Active", "Completed", "Overlimit"].map((t) => (
            <button 
              key={t}
              onClick={() => setFilter(t)}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                filter === t ? "bg-[#1A1A1A] text-[#FFD600]" : "text-[#7A746E] hover:text-black"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Search & Add Button */}
        <div className="flex items-center gap-3 w-full xl:w-auto">
          <div className="relative flex-1 md:w-80">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A3A3A3]" size={18} />
             <input 
               type="text" 
               placeholder="Find a category..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full pl-12 pr-4 h-12 bg-white border border-[#E8E2D9] rounded-2xl text-xs font-bold outline-none focus:border-[#FFD600] transition-all shadow-sm"
             />
          </div>
          <button className="p-3 bg-[#1A1A1A] text-[#FFD600] rounded-2xl shadow-lg hover:scale-110 active:scale-95 transition-all">
             <Plus size={24} />
          </button>
        </div>
      </section>

      {/* --- BUDGET GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredData.length > 0 ? (
          filteredData.map((budget) => (
            <CategoryCard 
              key={budget.id}
              {...budget}
              onAdjust={() => openAdjust(budget.label)}
            />
          ))
        ) : (
          <div className="col-span-full py-24 text-center border-2 border-dashed border-[#E8E2D9] rounded-[40px] bg-[#F6F5F1]/30">
            <p className="text-[#A3A3A3] font-bold">Kategori "{searchQuery}" tidak ditemukan.</p>
          </div>
        )}
      </div>

      {/* --- MODAL ADJUST --- */}
      {showAdjust && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-in zoom-in duration-300">
          <div className="bg-white w-full max-w-md rounded-[32px] p-10 shadow-2xl relative border border-[#E8E2D9]">
            <button onClick={() => setShowAdjust(false)} className="absolute right-8 top-8 text-[#A3A3A3] hover:text-black transition-colors">
              <X size={24} />
            </button>
            
            <h3 className="text-2xl font-black tracking-tighter mb-1">Adjust Budget</h3>
            <p className="text-sm text-[#7A746E] mb-10 font-medium">Ubah limit anggaran untuk kategori <span className="text-black font-bold">{selectedCategory}</span></p>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#A3A3A3]">Nominal Baru (Rp)</label>
                <input 
                  type="number" 
                  placeholder="Contoh: 2000000" 
                  className="w-full h-14 px-6 bg-[#F6F5F1] rounded-2xl border border-[#E8E2D9] font-bold outline-none focus:border-[#FFD600] transition-all"
                />
              </div>
              <button 
                onClick={() => setShowAdjust(false)}
                className="w-full h-14 bg-[#1A1A1A] text-[#FFD600] rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg hover:bg-black transition-all"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- SUB-COMPONENT: CATEGORY CARD ---
function CategoryCard({ label, spent, limit, percent, daysLeft, isWarning, onAdjust }) {
  return (
    <div className="bg-white border border-[#E8E2D9] p-8 rounded-[40px] shadow-sm hover:shadow-xl hover:border-[#FFD600]/30 transition-all group relative overflow-hidden">
      
      {/* Header Kartu */}
      <div className="flex justify-between items-center mb-10 relative z-10">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl transition-colors duration-500 ${isWarning ? 'bg-red-50 text-red-500' : 'bg-[#F6F5F1] text-[#1A1A1A] group-hover:bg-[#FFD600]/20'}`}>
            <Target size={26} />
          </div>
          <div>
            <h3 className="font-black text-[17px] tracking-tighter">{label}</h3>
            <p className="text-[10px] text-[#7A746E] font-black uppercase tracking-widest">Monthly Target</p>
          </div>
        </div>
        <div className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-transform group-hover:scale-105 ${isWarning ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
          {isWarning ? <AlertTriangle size={14} /> : <CheckCircle2 size={14} />}
          {isWarning ? 'Waspada' : 'Aman'}
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        {/* Info Angka */}
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-[#A3A3A3] uppercase tracking-widest">Pemakaian Anggaran</p>
            <p className="text-xl font-black text-[#1A1A1A]">{spent} <span className="text-xs text-[#A3A3A3] font-medium">/ {limit}</span></p>
          </div>
          <div className="text-right">
             <span className={`text-2xl font-black block leading-none ${isWarning ? 'text-red-600' : 'text-[#1A1A1A]'}`}>{percent}%</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-[#F6F5F1] rounded-full overflow-hidden p-0.5 border border-[#E8E2D9]">
          <div 
            className={`h-full rounded-full transition-all duration-[1500ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isWarning ? 'bg-red-500' : 'bg-[#1A1A1A]'}`} 
            style={{ width: `${Math.min(percent, 100)}%` }} 
          />
        </div>

        {/* Footer Kartu (Sisa Hari & Tombol Adjust) */}
        <div className="flex justify-between items-center pt-2">
           {/* Visual Sisa Hari (Double Circle) */}
           <div className="flex -space-x-2 group/days cursor-help">
              <div className="w-9 h-9 rounded-full border-[3px] border-white bg-[#FFD600] text-[11px] flex items-center justify-center font-black shadow-sm transition-transform group-hover/days:-translate-x-1">
                {daysLeft}d
              </div>
              <div className="w-9 h-9 rounded-full border-[3px] border-white bg-[#1A1A1A] text-white text-[9px] flex items-center justify-center font-black uppercase tracking-tighter shadow-sm transition-transform group-hover/days:translate-x-1">
                Left
              </div>
           </div>
           
           {/* Tombol Adjust Lucide Version */}
           <button 
             onClick={onAdjust}
             className="flex items-center gap-2 px-5 py-2.5 bg-[#1A1A1A] text-[#FFD600] rounded-xl text-[10px] font-black uppercase tracking-widest 
                        shadow-md hover:bg-black hover:shadow-xl active:scale-95 transition-all duration-300 transform opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
           >
             <PencilLine size={14} />
             Adjust
           </button>
        </div>
      </div>
    </div>
  );
}