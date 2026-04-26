"use client";
import React from "react";
import Header from "../../components/header";
import { ArrowUpRight, ArrowDownRight, Filter, Download, Calendar, Layers, ChevronRight } from "lucide-react";

export default function StatisticsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      <Header name="ABP" />

      {/* Hero Stats: Bukan Card, tapi Typography-Based (Clean & Bold) */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center py-6 border-b border-[#E8E2D9]">
        <div className="flex gap-16">
          <header>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A3A3A3] mb-1">Net Balance</p>
            <h2 className="text-4xl font-black tracking-tighter">Rp 24.500.000</h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="flex items-center text-[11px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded-md">
                <ArrowUpRight size={14} /> 12.5%
              </span>
              <span className="text-[10px] text-[#7A746E] font-medium">vs last month</span>
            </div>
          </header>
          <header className="hidden md:block">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A3A3A3] mb-1">Avg. Daily Spend</p>
            <h2 className="text-2xl font-black tracking-tighter">Rp 150.000</h2>
          </header>
        </div>

        <div className="flex gap-3 mt-6 md:mt-0">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-[#E8E2D9] rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-all">
            <Calendar size={14} /> Select Range
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] text-[#FFD600] rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all">
            <Download size={14} /> Export
          </button>
        </div>
      </section>

      {/* Main Analytical Grid */}
      <div className="grid grid-cols-12 gap-8">
        {/* LEFT: Major Chart (Layout 8 Columns) */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <div className="bg-[#F6F5F1]/50 p-8 rounded-[40px] border border-[#E8E2D9] relative overflow-hidden h-[450px]">
            <div className="flex justify-between items-center relative z-10">
              <h3 className="font-black text-sm uppercase tracking-tighter">Financial Pulse</h3>
              <div className="flex gap-2">
                <span className="w-3 h-3 bg-[#1A1A1A] rounded-full"></span>
                <span className="w-3 h-3 bg-[#FFD600] rounded-full"></span>
              </div>
            </div>

            {/* Mockup Wave Chart - Lebih artistik dari bar chart biasa */}
            <div className="absolute inset-x-0 bottom-0 h-64 flex items-end">
              <svg viewBox="0 0 1000 200" className="w-full h-full">
                <path d="M0,150 C150,50 350,180 500,100 C650,20 850,120 1000,50 L1000,200 L0,200 Z" fill="#FFD600" fillOpacity="0.1" />
                <path d="M0,150 C150,50 350,180 500,100 C650,20 850,120 1000,50" stroke="#FFD600" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            </div>

            {/* X-Axis labels */}
            <div className="absolute bottom-6 inset-x-12 flex justify-between">
              {["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"].map((m) => (
                <span key={m} className="text-[10px] font-black text-[#A3A3A3] uppercase">
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Laporan Keuangan Sub-Table */}
          <div className="space-y-4">
            <div className="flex justify-between items-center px-4">
              <h3 className="font-black text-xs uppercase tracking-[0.2em]">Detailed Spending Report</h3>
              <button className="text-[10px] font-black text-[#7A746E] flex items-center gap-1">
                VIEW ALL <ChevronRight size={14} />
              </button>
            </div>
            <div className="bg-white border border-[#E8E2D9] rounded-[32px] overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-[#F6F5F1] text-[9px] font-black uppercase text-[#A3A3A3]">
                  <tr>
                    <th className="px-8 py-4">Kategori</th>
                    <th className="px-8 py-4">Transaksi</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4 text-right">Nominal</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <TableRow cat="Food & Dining" count="24" status="High" amount="Rp 2.400.000" color="#FFD600" />
                  <TableRow cat="Transportation" count="12" status="Normal" amount="Rp 800.000" color="#1A1A1A" />
                  <TableRow cat="Groceries" count="08" status="Lower" amount="Rp 1.200.000" color="#1A1A1A" />
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT: Sidebar Detail (Layout 4 Columns) */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Insights Card */}
          <div className="bg-[#1A1A1A] p-8 rounded-[40px] text-[#FFD600] relative overflow-hidden">
            <Layers className="absolute -right-4 -top-4 opacity-10" size={120} />
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4">Financial Insight</h3>
            <p className="text-lg font-bold leading-tight mb-6 text-white">
              Kamu menghemat <span className="text-[#FFD600]">Rp 1.200.000</span> bulan ini dengan mengurangi jajan kopi di luar.
            </p>
            <button className="w-full py-4 bg-[#FFD600] text-[#1A1A1A] rounded-2xl font-black text-[11px] uppercase tracking-widest hover:scale-[1.02] transition-transform">Learn More</button>
          </div>

          {/* Allocation List */}
          <div className="bg-white p-8 rounded-[40px] border border-[#E8E2D9]">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-8">Asset Allocation</h3>
            <div className="space-y-6">
              <AllocationItem label="Liquid Cash" percent={65} color="#1A1A1A" />
              <AllocationItem label="Investments" percent={25} color="#FFD600" />
              <AllocationItem label="Emergency Fund" percent={10} color="#E8E2D9" />
            </div>
          </div>

          {/* Download Statement Small Card */}
          <div className="flex items-center justify-between p-6 bg-[#F6F5F1] rounded-[32px] border border-dashed border-[#A3A3A3]">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-xl shadow-sm">
                <Download size={18} />
              </div>
              <div>
                <p className="text-[10px] font-black text-[#1A1A1A]">Statement.pdf</p>
                <p className="text-[9px] text-[#7A746E] font-medium">Monthly Report April</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-[#A3A3A3]" />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Internal UI Components ---

function TableRow({ cat, count, status, amount, color }) {
  return (
    <tr className="border-b border-[#F6F5F1] last:border-0 hover:bg-[#F6F5F1]/30 transition-colors">
      <td className="px-8 py-5 flex items-center gap-3">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></div>
        <span className="font-bold text-[#1A1A1A]">{cat}</span>
      </td>
      <td className="px-8 py-5 text-[#7A746E] font-medium">{count} Transaksi</td>
      <td className="px-8 py-5">
        <span className="text-[9px] font-black px-2 py-1 bg-gray-100 rounded text-[#A3A3A3] uppercase">{status}</span>
      </td>
      <td className="px-8 py-5 text-right font-black text-[#1A1A1A]">{amount}</td>
    </tr>
  );
}

function AllocationItem({ label, percent, color }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <p className="text-[11px] font-bold text-[#1A1A1A]">{label}</p>
        <p className="text-[13px] font-black text-[#1A1A1A]">{percent}%</p>
      </div>
      <div className="w-full h-2 bg-[#F6F5F1] rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${percent}%`, backgroundColor: color }}></div>
      </div>
    </div>
  );
}
