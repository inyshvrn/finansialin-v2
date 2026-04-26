// src/components/bank-card.jsx
"use client";
import React from 'react';
import { Pencil } from 'lucide-react';

const BankCard = ({ type, bankName, bankLogo: BankLogo, accountNumber, amount, color }) => (
  <div className="bg-white p-7 rounded-[32px] shadow-sm border border-[#E8E2D9] flex flex-col h-56 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
    
    {/* --- 1. PATTERN LAYER (Luxury Dot Matrix) --- */}
    <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none z-0" 
      style={{ 
        backgroundImage: `radial-gradient(${color} 0.5px, transparent 0.5px), radial-gradient(${color} 0.5px, transparent 0.5px)`,
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 10px 10px'
      }}>
    </div>

    {/* dekorasi lingkaran halus */}
    <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity z-0" 
      style={{backgroundColor: color}}>
    </div>
    
    {/* --- 2. CONTENT LAYER --- */}
    <div className="flex flex-col flex-1 relative z-10 space-y-7">
      
      {/* HEADER: Tipe Akun & Logo Bank */}
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <p className="text-[10px] text-[#A3A3A3] font-black uppercase tracking-[0.2em]">{type}</p>
          <p className="text-xs font-bold text-[#1A1A1A]">{bankName}</p>
        </div>
        {/* Box Logo Bank Interaktif */}
        <div className="p-2.5 rounded-2xl bg-white border border-[#E8E2D9]/50 shadow-sm group-hover:scale-105 transition-transform flex items-center justify-center">
          {/* BankLogo bisa berupa Icon Component atau tag img */}
          {typeof BankLogo === 'string' ? (
            <img src={BankLogo} alt={`${bankName} logo`} className="h-6 w-auto object-contain" />
          ) : (
            <BankLogo className="h-6 w-6" style={{color: color}} />
          )}
        </div>
      </div>

      {/* MIDDLE: Nomor Akun (Style dari Image 2) */}
      <div className="space-y-1.5 flex-1 justify-center">
        <p className="text-[17px] font-bold tracking-tight text-[#1A1A1A] tabular-nums leading-none">
          {accountNumber}
        </p>
        <div className="flex items-center gap-2">
          <p className="text-[9px] text-[#A3A3A3] font-bold uppercase tracking-widest">Account Number</p>
          <div className="h-[1px] w-5 bg-[#E8E2D9]"></div>
        </div>
      </div>

      {/* FOOTER: Saldo & Hanya Icon Pencil */}
      <div className="flex justify-between items-end mt-auto">
        <div>
          {/* Sora/Inter Bold Tracking Tighter */}
          <p className="text-2xl font-extrabold tracking-tighter text-[#1A1A1A] leading-none tabular-nums">
            {amount}
          </p>
          {/* Label saldo dihapus total biar clean */}
        </div>
        
        {/* Cukup icon Pencil saja, Remove dihilangkan */}
        <button className="p-3 bg-[#F6F5F1] hover:bg-[#FFD600] text-[#A3A3A3] hover:text-[#1A1A1A] rounded-2xl transition-all shadow-sm">
          <Pencil size={16} />
        </button>
      </div>
    </div>
  </div>
);

export default BankCard;