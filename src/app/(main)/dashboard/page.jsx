"use client";
import React from 'react';
import { 
  Search, Bell, Pencil, ChevronDown, 
  CreditCard, Wallet, Banknote, 
  Plane, Car, MoreHorizontal 
} from 'lucide-react';

// --- INTERNAL COMPONENTS (Biar gampang panggil-panggil di satu file) ---

const Header = ({ name }) => (
  <header className="flex justify-between items-center mb-10">
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight">
        Hi <span className="text-[#FFD600]">{name}</span> ,
      </h1>
      <p className="text-xl font-semibold -mt-1">Welcome back!</p>
    </div>
    <div className="flex items-center gap-6">
      <div className="relative">
        <input 
          type="text" 
          placeholder="Type to search" 
          className="w-80 h-12 bg-white rounded-full pl-14 pr-6 shadow-sm border border-[#E8E2D9] focus:outline-none focus:ring-2 focus:ring-[#FFD600]/20 transition-all font-medium text-sm" 
        />
        <Search className="absolute left-5 top-3.5 text-[#A3A3A3]" size={20} />
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2.5 bg-white rounded-full border border-[#E8E2D9] shadow-sm hover:bg-gray-50">
          <Bell size={22} />
          <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>
        </button>
        <div className="w-12 h-12 rounded-full border-4 border-white shadow-lg bg-[#E8E2D9] flex items-center justify-center font-bold text-[#7A746E]">A</div>
      </div>
    </div>
  </header>
);

const BankCard = ({ type, icon: Icon, number, amount, color }) => (
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
        <p className="text-[10px] text-[#A3A3A3] font-medium mt-2">Total amount</p>
      </div>
      <Pencil size={16} className="text-[#A3A3A3] cursor-pointer hover:text-[#FFD600] mb-1" />
    </div>
  </div>
);

// --- MAIN PAGE ---

export default function DashboardPage() {
  const transactions = [
    { reciever: 'Handai Coffee', type: 'R&D', date: '26 April 2026', amount: 'Rp200.000' },
    { reciever: 'Loffu Mart', type: 'Mart', date: '26 April 2026', amount: 'Rp200.000' },
    { reciever: 'Yogya Mart', type: 'Mart', date: '26 April 2026', amount: 'Rp200.000' },
  ];

  return (
    <div className="space-y-10">
      <Header name="ABP" />

      {/* Row Kartu Bank */}
      <section className="grid grid-cols-3 gap-6">
        <BankCard 
          type="MBanking" icon={CreditCard} 
          number="3388 4556 8860 8***" amount="Rp100.000.000" color="#00529C" 
        />
        <BankCard 
          type="Emoney" icon={Wallet} 
          number="3388 4556 8860 8***" amount="Rp50.000.000" color="#FFD600" 
        />
        <BankCard 
          type="Cash" icon={Banknote} 
          number="Fisik" amount="Rp50.000.000" color="#1A1A1A" 
        />
      </section>

      {/* Row Grafik & Aktivitas */}
      <section className="grid grid-cols-12 gap-6">
        <div className="col-span-8 bg-white p-8 rounded-[32px] border border-[#E8E2D9] shadow-sm">
          <div className="flex justify-between items-center mb-8 font-black uppercase text-sm tracking-tighter">
            <h3>Total Income <ChevronDown className="inline" size={16} /></h3>
            <div className="text-[11px] border px-4 py-2 rounded-xl text-[#7A746E]">Last 6 months</div>
          </div>
          <div className="h-60 bg-gradient-to-t from-[#FFD600]/5 to-transparent rounded-2xl border border-dashed border-[#E8E2D9] flex items-center justify-center italic text-[#A3A3A3] text-xs">
            [ Area Chart Integration ]
          </div>
        </div>

        <div className="col-span-4 bg-white p-8 rounded-[32px] border border-[#E8E2D9] shadow-sm flex flex-col items-center">
          <h3 className="w-full text-sm font-black uppercase tracking-tighter mb-8">Activity</h3>
          <div className="relative w-40 h-40">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" stroke="#F6F5F1" strokeWidth="12" fill="transparent" />
              <circle cx="60" cy="60" r="50" stroke="#FFD600" strokeWidth="12" fill="transparent" strokeDasharray="314" strokeDashoffset="100" strokeLinecap="round" />
              <circle cx="60" cy="60" r="50" stroke="#1A1A1A" strokeWidth="12" fill="transparent" strokeDasharray="314" strokeDashoffset="260" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-lg font-black leading-tight">Rp5.000.000</span>
              <span className="text-[9px] font-black text-[#A3A3A3] uppercase">Spent</span>
            </div>
          </div>
        </div>
      </section>

      {/* Row History & Goals */}
      <section className="grid grid-cols-12 gap-6">
        <div className="col-span-8 bg-white p-8 rounded-[32px] border border-[#E8E2D9] shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-tighter mb-8">Transaction history</h3>
          <table className="w-full text-sm">
            <thead className="text-[10px] font-black text-[#A3A3A3] uppercase tracking-widest border-b border-gray-50">
              <tr>
                <th className="text-left pb-4">Reciever</th>
                <th className="text-left pb-4">Type</th>
                <th className="text-left pb-4">Date</th>
                <th className="text-right pb-4">Amount</th>
              </tr>
            </thead>
            <tbody className="font-bold text-[#1A1A1A]">
              {transactions.map((trx, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="py-4">{trx.reciever}</td>
                  <td className="py-4 text-[#A3A3A3] font-medium">{trx.type}</td>
                  <td className="py-4 font-medium text-[#7A746E]">{trx.date}</td>
                  <td className="py-4 text-right font-black">{trx.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-span-4 bg-white p-8 rounded-[32px] border border-[#E8E2D9] shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-sm font-black uppercase tracking-tighter">My Goals</h3>
            <button className="bg-[#FFD600] text-[#1A1A1A] text-[10px] font-black px-4 py-2 rounded-full">Add</button>
          </div>
          <div className="space-y-6">
            <GoalItem name="Travel" icon={Plane} progress={50} />
            <GoalItem name="Car" icon={Car} progress={25} />
          </div>
        </div>
      </section>
    </div>
  );
}

function GoalItem({ name, icon: Icon, progress }) {
  return (
    <div className="flex gap-4 items-center">
      <div className="p-3 bg-[#F6F5F1] rounded-2xl"><Icon size={20} /></div>
      <div className="flex-1">
        <div className="flex justify-between text-[11px] font-black mb-1">
          <span>{name}</span>
          <span className="text-[#A3A3A3]">{progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-[#F6F5F1] rounded-full overflow-hidden">
          <div className="h-full bg-[#1A1A1A] rounded-full" style={{width: `${progress}%`}}></div>
        </div>
      </div>
    </div>
  );
}