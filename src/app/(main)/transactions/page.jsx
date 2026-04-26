"use client";
import React, { useState, useMemo, useRef } from "react";
import Header from "../../components/header";
import { 
  Plus, Filter, Search, ChevronDown, Edit3, Trash2, 
  X, Calendar, ArrowUpRight, ArrowDownLeft, Camera, Keyboard,
  Image as ImageIcon
} from "lucide-react";

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All"); 
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addMethod, setAddMethod] = useState(null); // 'scan' or 'manual'
  
  const [selectedMonth, setSelectedMonth] = useState("2026-04");
  const monthInputRef = useRef(null); // Untuk memicu kalender

  const itemsPerPage = 25;

  // --- DATA DUMMY (Sama seperti sebelumnya) ---
  const initialData = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    date: `2026-04-${(i % 28) + 1 < 10 ? '0' + ((i % 28) + 1) : (i % 28) + 1}`,
    desc: i % 3 === 0 ? "Gaji Handai Coffee" : "Kopi Kalcer",
    cat: i % 3 === 0 ? "Salary" : "Food",
    type: i % 3 === 0 ? "Income" : "Expenses",
    amount: i % 3 === 0 ? "Rp 2.000.000" : "-Rp 25.000"
  }));
  const [transactions] = useState(initialData);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((trx) => {
      const matchSearch = trx.desc.toLowerCase().includes(searchTerm.toLowerCase());
      const matchType = filterType === "All" || trx.type === filterType;
      const matchMonth = trx.date.startsWith(selectedMonth);
      return matchSearch && matchType && matchMonth;
    });
  }, [searchTerm, filterType, selectedMonth, transactions]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const displayedTransactions = filteredTransactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20 font-sans">
      <Header name="ABP" />

      {/* Summary Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard label="Total Balance" amount="Rp200.000.000" trend="+15%" color="bg-[#1A1A1A]" textColor="text-[#FFD600]" />
        <SummaryCard label="Total Income" amount="Rp60.000.000" trend="+30%" color="bg-[#FFD600]" textColor="text-[#1A1A1A]" />
        <SummaryCard label="Total Expenses" amount="Rp750.000" trend="-11%" color="bg-[#1A1A1A]" textColor="text-[#FFD600]" />
        <SummaryCard label="Total Savings" amount="Rp59.250.000" trend="+5%" color="bg-[#FFD600]" textColor="text-[#1A1A1A]" />
      </section>

      <section className="bg-white p-8 rounded-[40px] border border-[#E8E2D9] shadow-sm space-y-8">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A3A3A3]" size={18} />
            <input 
              type="text" 
              placeholder="Search description..." 
              value={searchTerm}
              onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
              className="w-full h-12 bg-[#F6F5F1] rounded-2xl pl-12 pr-4 border-none focus:ring-2 focus:ring-[#FFD600] text-sm font-medium" 
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            {/* Filter Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className={`p-3.5 rounded-2xl border border-[#E8E2D9] transition-all flex items-center gap-2 hover:bg-[#F6F5F1] ${showFilterDropdown ? 'bg-[#1A1A1A] text-[#FFD600]' : 'bg-white text-[#7A746E]'}`}
              >
                <Filter size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">{filterType}</span>
              </button>
              {showFilterDropdown && (
                <div className="absolute top-14 left-0 w-40 bg-white border border-[#E8E2D9] rounded-2xl shadow-xl z-20 overflow-hidden animate-in zoom-in-95 duration-200">
                  {["All", "Income", "Expenses"].map((type) => (
                    <button
                      key={type}
                      onClick={() => { setFilterType(type); setShowFilterDropdown(false); setCurrentPage(1); }}
                      className="w-full px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider hover:bg-[#FFD600] hover:text-[#1A1A1A] transition-colors border-b border-[#F6F5F1] last:border-0"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Kalender Button (Fixed Click) */}
            <div className="relative">
              <input 
                type="month" 
                ref={monthInputRef}
                value={selectedMonth}
                onChange={(e) => {setSelectedMonth(e.target.value); setCurrentPage(1);}}
                className="absolute inset-0 w-0 h-0 opacity-0"
              />
              <button 
                onClick={() => monthInputRef.current?.showPicker()}
                className="flex items-center gap-2 px-6 py-3.5 bg-white border border-[#E8E2D9] rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#F6F5F1] transition shadow-sm"
              >
                <Calendar size={14} className="text-[#FFD600]" /> 
                {selectedMonth} <ChevronDown size={14} />
              </button>
            </div>

            <button 
              onClick={() => {setIsModalOpen(true); setAddMethod(null);}}
              className="group flex items-center gap-2 px-6 py-3.5 bg-[#1A1A1A] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all hover:bg-[#FFD600] hover:text-[#1A1A1A] hover:scale-105 shadow-lg"
            >
              <Plus size={18} className="text-[#FFD600] group-hover:text-[#1A1A1A]" /> 
              Add Transaction
            </button>
          </div>
        </div>

        {/* Table Content (Sama seperti sebelumnya) */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black uppercase tracking-[0.25em] text-[#A3A3A3] border-b border-[#F6F5F1]">
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F6F5F1]">
              {displayedTransactions.map((trx) => (
                <tr key={trx.id} className="hover:bg-[#FDFCFB] transition group">
                  <td className="px-6 py-6 text-sm font-medium text-[#7A746E]">{trx.date}</td>
                  <td className="px-6 py-6 text-sm font-bold text-[#1A1A1A]">{trx.desc}</td>
                  <td className="px-6 py-6"><span className="bg-[#F6F5F1] px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-[#A3A3A3]">{trx.cat}</span></td>
                  <td className="px-6 py-6 text-[10px] font-black uppercase tracking-widest">
                    <span className={trx.type === "Expenses" ? "text-red-500" : "text-green-600"}>{trx.type}</span>
                  </td>
                  <td className={`px-6 py-6 text-sm font-black tabular-nums ${trx.type === "Expenses" ? "text-red-500" : "text-[#1A1A1A]"}`}>{trx.amount}</td>
                  <td className="px-6 py-6 text-right space-x-2">
                    <button className="p-2 hover:bg-[#FFD600] rounded-xl transition text-[#A3A3A3] hover:text-[#1A1A1A]"><Edit3 size={16} /></button>
                    <button className="p-2 hover:bg-red-500 rounded-xl transition text-[#A3A3A3] hover:text-white"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* --- MODAL ADD TRANSACTION DENGAN PILIHAN --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-6 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-xl rounded-[40px] p-10 shadow-2xl relative animate-in zoom-in-95">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={24}/></button>
            
            {!addMethod ? (
              <div className="space-y-8 py-4 text-[#1A1A1A]">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-black tracking-tighter">Choose Method</h2>
                  <p className="text-sm font-medium text-[#A3A3A3]">How would you like to add the transaction?</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button 
                    onClick={() => setAddMethod('scan')}
                    className="p-8 border-2 border-[#F6F5F1] hover:border-[#FFD600] rounded-[32px] transition-all flex flex-col items-center gap-4 group"
                  >
                    <div className="w-16 h-16 bg-[#F6F5F1] group-hover:bg-[#FFD600] rounded-2xl flex items-center justify-center transition-colors">
                      <Camera size={32} className="text-[#1A1A1A]" />
                    </div>
                    <div className="text-center">
                      <p className="font-black uppercase tracking-widest text-xs">Scan Receipt</p>
                      <p className="text-[10px] font-medium text-[#A3A3A3] mt-1">Automatic OCR Detection</p>
                    </div>
                  </button>
                  <button 
                    onClick={() => setAddMethod('manual')}
                    className="p-8 border-2 border-[#F6F5F1] hover:border-[#FFD600] rounded-[32px] transition-all flex flex-col items-center gap-4 group"
                  >
                    <div className="w-16 h-16 bg-[#F6F5F1] group-hover:bg-[#FFD600] rounded-2xl flex items-center justify-center transition-colors">
                      <Keyboard size={32} className="text-[#1A1A1A]" />
                    </div>
                    <div className="text-center">
                      <p className="font-black uppercase tracking-widest text-xs">Manual Input</p>
                      <p className="text-[10px] font-medium text-[#A3A3A3] mt-1">Fill details by yourself</p>
                    </div>
                  </button>
                </div>
              </div>
            ) : addMethod === 'manual' ? (
              <div className="animate-in slide-in-from-right-4 duration-300">
                <button onClick={() => setAddMethod(null)} className="text-[10px] font-black uppercase tracking-widest text-[#FFD600] mb-4 hover:underline">← Back to selection</button>
                <h2 className="text-2xl font-black mb-6 tracking-tighter text-[#1A1A1A]">Manual Transaction</h2>
                <form className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#A3A3A3] ml-1">Description</label>
                    <input type="text" placeholder="Gaji Handai Coffee" className="w-full h-12 bg-[#F6F5F1] rounded-2xl px-5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#FFD600]" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#A3A3A3] ml-1">Type</label>
                    <select className="w-full h-12 bg-[#F6F5F1] rounded-2xl px-4 text-sm font-semibold outline-none">
                      <option>Income</option>
                      <option>Expenses</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#A3A3A3] ml-1">Amount</label>
                    <input type="number" placeholder="Rp" className="w-full h-12 bg-[#F6F5F1] rounded-2xl px-5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#FFD600]" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#A3A3A3] ml-1">Category</label>
                    <input type="text" placeholder="Salary, Food, etc" className="w-full h-12 bg-[#F6F5F1] rounded-2xl px-5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#FFD600]" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#A3A3A3] ml-1">Date</label>
                    <input type="date" className="w-full h-12 bg-[#F6F5F1] rounded-2xl px-5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#FFD600]" />
                  </div>
                  <button className="col-span-2 py-4 bg-[#1A1A1A] text-[#FFD600] font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl mt-4 hover:bg-black transition-all">Save Transaction</button>
                </form>
              </div>
            ) : (
              <div className="animate-in slide-in-from-right-4 duration-300 text-center space-y-6 py-6">
                 <button onClick={() => setAddMethod(null)} className="absolute top-8 left-8 text-[10px] font-black uppercase tracking-widest text-[#FFD600] hover:underline">← Back</button>
                 <div className="w-full h-64 border-2 border-dashed border-[#E8E2D9] rounded-[32px] flex flex-col items-center justify-center gap-4 bg-[#FDFCFB] group hover:border-[#FFD600] cursor-pointer transition-all">
                    <ImageIcon size={48} className="text-[#A3A3A3] group-hover:text-[#FFD600]" />
                    <p className="text-sm font-bold text-[#A3A3A3]">Drop receipt here or click to upload</p>
                 </div>
                 <button className="w-full py-4 bg-[#1A1A1A] text-[#FFD600] font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl">Process Receipt</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({ label, amount, trend, color, textColor }) {
  const isDark = color === "bg-[#1A1A1A]";
  return (
    <div className={`${color} p-7 rounded-[32px] border border-[#E8E2D9] shadow-sm relative overflow-hidden group hover:scale-[1.02] transition-all`}>
      <div className="space-y-1 relative z-10">
        <p className={`text-[10px] font-black uppercase tracking-widest ${isDark ? "text-[#FFD600]/60" : "text-[#1A1A1A]/60"}`}>{label}</p>
        <h3 className={`text-xl font-black tracking-tighter ${textColor} tabular-nums`}>{amount}</h3>
        <div className="flex items-center gap-1.5 pt-2">
          <span className={`text-[9px] font-black px-2 py-1 rounded-lg ${isDark ? "bg-[#FFD600] text-[#1A1A1A]" : "bg-[#1A1A1A] text-[#FFD600]"}`}>{trend} ↗</span>
        </div>
      </div>
    </div>
  );
}