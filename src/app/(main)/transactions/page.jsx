"use client";
import React from "react";
import Header from "../../components/header";
import { Plus, Filter, Search, ChevronDown, Edit3, Trash2, TrendingUp, TrendingDown } from "lucide-react";

export default function TransactionsPage() {
  const transactions = [
    { date: "9/4/2026", desc: "Gaji Handai Coffee", cat: "Salary", type: "Income", amount: "Rp 2.000.000" },
    { date: "9/4/2026", desc: "Kopi Kalcer", cat: "Food", type: "Expenses", amount: "-Rp 25.000" },
    { date: "9/4/2026", desc: "Gaji Handai Coffee", cat: "Salary", type: "Income", amount: "Rp 2.000.000" },
    { date: "9/4/2026", desc: "Gaji Handai Coffee", cat: "Salary", type: "Income", amount: "Rp 2.000.000" },
    { date: "9/4/2026", desc: "Gaji Handai Coffee", cat: "Salary", type: "Income", amount: "Rp 2.000.000" },
    { date: "9/4/2026", desc: "Gaji Handai Coffee", cat: "Salary", type: "Income", amount: "Rp 2.000.000" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <Header name="ABP" />

      {/* Summary Cards Row */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard label="Total Balance" amount="Rp200.000.000" trend="+15%" color="bg-[#1A1A1A]" textColor="text-[#FFD600]" />
        <SummaryCard label="Total Income" amount="Rp200.000.000" trend="+30%" color="bg-[#FFD600]" textColor="text-[#1A1A1A]" />
        <SummaryCard label="Total Expenses" amount="Rp200.000.000" trend="-11%" color="bg-[#1A1A1A]" textColor="text-[#FFD600]" />
        <SummaryCard label="Total Savings" amount="Rp200.000.000" trend="+5%" color="bg-[#FFD600]" textColor="text-[#1A1A1A]" />
      </section>

      {/* Filter & Action Row */}
      <section className="bg-white p-10 rounded-[32px] border border-[#E8E2D9] shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A3A3A3]" size={18} />
            <input type="text" placeholder="Search for description" className="w-full h-12 bg-[#F6F5F1] rounded-xl pl-12 pr-4 border-none focus:ring-2 focus:ring-[#FFD600] text-sm font-medium" />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="p-3 bg-[#F6F5F1] rounded-xl border border-[#E8E2D9] hover:bg-gray-100 transition">
              <Filter size={18} className="text-[#7A746E]" />
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-[#E8E2D9] rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-50 transition shadow-sm">
              January 2026 <ChevronDown size={14} />
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-[#FFD600] text-[#1A1A1A] rounded-xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition shadow-md">
              <Plus size={18} /> Add Transactions
            </button>
          </div>
        </div>

        {/* Custom Figma Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#FFD600]/20 text-[11px] font-black uppercase tracking-[0.2em] text-[#1A1A1A]">
                <th className="px-6 py-4 rounded-l-xl">Date</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4 text-right rounded-r-xl">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F6F5F1]">
              {transactions.map((trx, i) => (
                <tr key={i} className="hover:bg-[#F6F5F1]/50 transition group">
                  <td className="px-6 py-5 text-sm font-bold text-[#1A1A1A]">{trx.date}</td>
                  <td className="px-6 py-5 text-sm font-medium text-[#7A746E]">{trx.desc}</td>
                  <td className="px-6 py-5 text-sm font-medium text-[#7A746E]">{trx.cat}</td>
                  <td className="px-6 py-5 text-sm font-medium text-[#7A746E]">{trx.type}</td>
                  <td className={`px-6 py-5 text-sm font-black ${trx.type === "Expenses" ? "text-red-500" : "text-[#1A1A1A]"}`}>{trx.amount}</td>
                  <td className="px-6 py-5 text-right space-x-3">
                    <button className="text-[#1A1A1A] hover:text-[#FFD600] transition">
                      <Edit3 size={18} />
                    </button>
                    <button className="text-[#1A1A1A] hover:text-red-500 transition">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function SummaryCard({ label, amount, trend, color, textColor }) {
  const isDark = color === "bg-[#1A1A1A]";
  return (
    <div className={`${color} p-7 rounded-[32px] border border-[#E8E2D9] shadow-sm relative overflow-hidden group hover:scale-[1.02] transition-all`}>
      <div className="space-y-1 relative z-10">
        <p className={`text-[10px] font-black uppercase tracking-widest ${isDark ? "text-[#FFD600]/60" : "text-[#1A1A1A]/60"}`}>{label}</p>
        <h3 className={`text-xl font-black tracking-tighter ${textColor}`}>{amount}</h3>
        <div className="flex items-center gap-1.5 pt-2">
          <span className={`text-[9px] font-black px-2 py-1 rounded-lg ${isDark ? "bg-[#FFD600] text-[#1A1A1A]" : "bg-[#1A1A1A] text-[#FFD600]"}`}>{trend} ↗</span>
          <span className={`text-[9px] font-bold ${isDark ? "text-white/40" : "text-[#1A1A1A]/40"}`}>than last month</span>
        </div>
      </div>
    </div>
  );
}
