"use client";
import React from 'react';
import { Pencil } from 'lucide-react';

const BankCard = ({ type, bankName, bankLogo: BankLogo, accountNumber, amount, color }) => {
  const isCash = type.toLowerCase() === 'cash';

  return (
    <div className="bg-white p-8 rounded-[40px] border border-[#E8E2D9] flex flex-col h-60 relative overflow-hidden group hover:shadow-xl transition-all duration-500 font-sans">
      
      {/* Pattern halus di background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
        style={{ 
          backgroundImage: `radial-gradient(${color} 0.8px, transparent 0.8px)`,
          backgroundSize: '24px 24px'
        }}>
      </div>

      <div className="flex flex-col h-full relative z-10">
        {/* HEADER: Tipe & Logo */}
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-1">
            <p className="text-[10px] text-[#A3A3A3] font-bold uppercase tracking-[0.25em]">{type}</p>
            <p className="text-[14px] font-semibold text-[#1A1A1A]">{bankName}</p>
          </div>
          <div className="p-3 rounded-2xl bg-white border border-[#E8E2D9]/50 shadow-sm group-hover:scale-105 transition-transform">
            {typeof BankLogo === 'string' ? (
              <img src={BankLogo} className="h-6 w-auto object-contain" alt="bank logo" />
            ) : (
              <BankLogo size={22} style={{color: color}} />
            )}
          </div>
        </div>

        {/* MIDDLE: Account Number (Hanya muncul jika bukan Cash) */}
        <div className="flex-1 flex flex-col justify-center">
          {!isCash && (
            <>
              <p className="text-[18px] font-medium tracking-[0.05em] text-[#1A1A1A] tabular-nums">
                {accountNumber}
              </p>
              <div className="flex items-center gap-2 mt-1.5 opacity-50">
                <p className="text-[9px] font-bold uppercase tracking-widest text-[#A3A3A3]">Account Number</p>
                <div className="h-[1px] w-4 bg-[#A3A3A3]"></div>
              </div>
            </>
          )}
        </div>

        {/* FOOTER: Amount & Edit Icon */}
        <div className="flex justify-between items-end mt-4 pb-1">
          <p className="text-[26px] font-semibold tracking-tighter text-[#1A1A1A] leading-none tabular-nums">
            {amount}
          </p>
          <button className="p-2.5 bg-[#F6F5F1] hover:bg-[#FFD600] text-[#A3A3A3] hover:text-[#1A1A1A] rounded-xl transition-all shadow-sm">
            <Pencil size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankCard;