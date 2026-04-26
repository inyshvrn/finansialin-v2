"use client";
import { Pencil } from 'lucide-react';

export default function BankCard({ type, icon: Icon, number, amount, color }) {
  return (
    <div className="bg-white p-7 rounded-[32px] shadow-sm border border-[#E8E2D9] flex flex-col justify-between h-48 relative overflow-hidden group hover:shadow-md transition-all">
      <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-5 group-hover:opacity-10 transition-opacity" style={{backgroundColor: color}}></div>
      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="text-[11px] text-[#A3A3A3] font-black uppercase tracking-widest">{type}</p>
          <p className="text-base font-bold mt-2">{number}</p>
          <p className="text-[10px] text-[#A3A3A3] font-medium">Account Number</p>
        </div>
        <div className="p-3 rounded-2xl" style={{backgroundColor: `${color}15`}}>
          <Icon size={24} style={{color: color}} />
        </div>
      </div>
      <div className="mt-4 flex justify-between items-end relative z-10">
        <div>
          <p className="text-3xl font-black tracking-tighter">{amount}</p>
          <p className="text-[10px] text-[#A3A3A3] font-medium">Total amount</p>
        </div>
        <Pencil size={16} className="text-[#A3A3A3] cursor-pointer hover:text-[#FFD600] mb-1" />
      </div>
    </div>
  );
}