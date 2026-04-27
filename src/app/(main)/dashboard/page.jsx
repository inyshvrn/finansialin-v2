"use client";
import React from 'react';
import { 
  Search, Bell, Pencil, ChevronDown, 
  CreditCard, Wallet, Banknote, 
  Plane, Car 
} from 'lucide-react';

// --- INTERNAL COMPONENTS ---
import Header from '../../components/header';

const BankCard = ({ type, icon: Icon, amount, color }) => (
  <div className="bg-white p-7 rounded-[32px] shadow-sm border border-[#E8E2D9] flex flex-col justify-between h-48 relative overflow-hidden group hover:shadow-md transition-all">
    
    {/* --- PATTERN LAYER (Dot Matrix) --- */}
    <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none" 
      style={{ 
        backgroundImage: `radial-gradient(${color} 0.5px, transparent 0.5px), radial-gradient(${color} 0.5px, transparent 0.5px)`,
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 10px 10px'
      }}>
    </div>

    {/* Dekorasi lingkaran halus */}
    <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity" 
      style={{backgroundColor: color}}>
    </div>
    
    {/* --- CONTENT LAYER --- */}
    <div className="flex justify-between items-start relative z-10">
      <div>
        <p className="text-[11px] text-[#A3A3A3] font-black uppercase tracking-widest">{type}</p>
      </div>
      <div className="p-3 rounded-2xl shadow-sm bg-white border border-[#E8E2D9]/50 group-hover:scale-110 transition-transform">
        <Icon size={24} style={{color: color}} />
      </div>
    </div>

    <div className="mt-auto flex justify-between items-end relative z-10">
      <div>
        <p className="text-3xl font-black tracking-tighter text-[#1A1A1A]">{amount}</p>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-[10px] text-[#A3A3A3] font-medium">Total balance</p>
          <div className="h-px w-8 bg-[#E8E2D9]"></div>
        </div>
      </div>
      <button className="p-2.5 bg-[#F6F5F1] hover:bg-[#FFD600] text-[#A3A3A3] hover:text-[#1A1A1A] rounded-xl transition-all shadow-sm">
        <Pencil size={14} />
      </button>
    </div>
  </div>
);

const GoalItem = ({ name, icon: Icon, progress }) => (
  <div className="flex gap-4 items-center">
    <div className="p-3 bg-[#F6F5F1] rounded-2xl"><Icon size={20} /></div>
    <div className="flex-1">
      <div className="flex justify-between text-[11px] font-black mb-1 text-[#1A1A1A]">
        <span>{name}</span>
        <span className="text-[#A3A3A3]">{progress}%</span>
      </div>
      <div className="w-full h-1.5 bg-[#F6F5F1] rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#1A1A1A] rounded-full transition-all duration-1000" 
          style={{width: `${progress}%`}}
        ></div>
      </div>
    </div>
  </div>
);

// --- MAIN PAGE ---

export default function DashboardPage() {
  const transactions = [
    { receiver: 'Handai Coffee', type: 'R&D', date: '26 April 2026', amount: 'Rp200.000' },
    { receiver: 'Loffu Mart', type: 'Mart', date: '26 April 2026', amount: 'Rp200.000' },
    { receiver: 'Yogya Mart', type: 'Mart', date: '26 April 2026', amount: 'Rp200.000' },
  ];

  return (
    <div className="space-y-10">
      <Header name="ABP" />

      {/* Row Kartu Bank dengan Pattern */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BankCard 
          type="MBanking" icon={CreditCard} 
          amount="Rp100.000.000" color="#00529C" 
        />
        <BankCard 
          type="Emoney" icon={Wallet} 
          amount="Rp50.000.000" color="#FFD600" 
        />
        <BankCard 
          type="Cash" icon={Banknote} 
          amount="Rp50.000.000" color="#1A1A1A" 
        />
      </section>

      {/* Row Grafik & Aktivitas */}
      <section className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 bg-white p-8 rounded-[32px] border border-[#E8E2D9] shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-center mb-10 font-black uppercase text-sm tracking-tighter relative z-10">
            <h3 className="flex items-center gap-2">Total Income <ChevronDown size={16} className="text-[#FFD600]" /></h3>
            <div className="text-[11px] border border-[#E8E2D9] px-4 py-2 rounded-xl text-[#7A746E] bg-[#FDFCFB]">Last 6 months</div>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-3 px-2 relative z-10">
            {[40, 70, 45, 90, 65, 80].map((height, i) => (
              <div key={i} className="flex-1 group relative">
                <div 
                  className="bg-[#F6F5F1] group-hover:bg-[#FFD600] transition-all rounded-t-2xl w-full" 
                  style={{ height: `${height}%` }}
                ></div>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] text-[#A3A3A3] font-black uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 bg-white p-8 rounded-[32px] border border-[#E8E2D9] shadow-sm flex flex-col items-center justify-between">
          <h3 className="w-full text-sm font-black uppercase tracking-tighter mb-8">Activity</h3>
          <div className="relative w-44 h-44">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" stroke="#F6F5F1" strokeWidth="12" fill="transparent" />
              <circle cx="60" cy="60" r="50" stroke="#FFD600" strokeWidth="12" fill="transparent" strokeDasharray="314" strokeDashoffset="100" strokeLinecap="round" />
              <circle cx="60" cy="60" r="50" stroke="#1A1A1A" strokeWidth="12" fill="transparent" strokeDasharray="314" strokeDashoffset="260" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xl font-black leading-tight text-[#1A1A1A]">Rp5.000.000</span>
              <span className="text-[9px] font-black text-[#A3A3A3] uppercase tracking-widest">Spent</span>
            </div>
          </div>
          <div className="w-full mt-6 flex justify-around text-[10px] font-black uppercase tracking-tighter">
            <div className="flex items-center gap-2 text-[#7A746E]"><div className="w-2 h-2 rounded-full bg-[#FFD600]"></div> Income</div>
            <div className="flex items-center gap-2 text-[#7A746E]"><div className="w-2 h-2 rounded-full bg-[#1A1A1A]"></div> Outcome</div>
          </div>
        </div>
      </section>

      {/* Row History & Goals */}
      <section className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 bg-white p-8 rounded-[32px] border border-[#E8E2D9] shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-tighter mb-8">Transaction history</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-[10px] font-black text-[#A3A3A3] uppercase tracking-widest border-b border-[#F6F5F1]">
                <tr>
                  <th className="text-left pb-4">Receiver</th>
                  <th className="text-left pb-4">Type</th>
                  <th className="text-left pb-4">Date</th>
                  <th className="text-right pb-4">Amount</th>
                </tr>
              </thead>
              <tbody className="font-bold text-[#1A1A1A]">
                {transactions.map((trx, i) => (
                  <tr key={i} className="border-b border-[#F6F5F1] last:border-0 hover:bg-[#FDFCFB] transition-colors group">
                    <td className="py-5">{trx.receiver}</td>
                    <td className="py-5 text-[#A3A3A3] font-medium">{trx.type}</td>
                    <td className="py-5 font-medium text-[#7A746E]">{trx.date}</td>
                    <td className="py-5 text-right font-black">{trx.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 bg-white p-8 rounded-[32px] border border-[#E8E2D9] shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-sm font-black uppercase tracking-tighter">My Goals</h3>
            <button className="bg-[#FFD600] hover:bg-[#1A1A1A] hover:text-white transition-all text-[#1A1A1A] text-[10px] font-black px-4 py-2 rounded-full shadow-sm">Add</button>
          </div>
          <div className="space-y-7">
            <GoalItem name="Travel to Japan" icon={Plane} progress={50} />
            <GoalItem name="New Family Car" icon={Car} progress={25} />
          </div>
        </div>
      </section>
    </div>
  );
}