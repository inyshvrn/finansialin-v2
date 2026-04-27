"use client";
import React, { useState } from "react";
import Header from "../../components/header";
import {
  Download,
  Calendar,
  Layers,
  ChevronRight,
  CheckCircle2,
  X,
  Activity,
  Music,
  Wifi,
  MonitorPlay,
  CreditCard,
  TrendingUp,
  PieChart,
  FileText,
  FileSpreadsheet,
  Check
} from "lucide-react";

export default function StatisticsPage() {
  // --- UX STATES ---
  // Range Modal
  const [showRangeModal, setShowRangeModal] = useState(false);
  const [activeRange, setActiveRange] = useState("Last 6 Months");
  const [hoveredMonth, setHoveredMonth] = useState(null);

  // Download PDF Biasa
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  // Advanced Export UX
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [exportStatus, setExportStatus] = useState("idle"); // idle, loading, success

  // Portfolio Manage UX
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const [allocations, setAllocations] = useState({
    liquid: 65,
    investments: 25,
    emergency: 10
  });

  // --- DUMMY DATA ---
  const chartData = [
    { month: "Jan", val: "Rp 12M" },
    { month: "Feb", val: "Rp 15M" },
    { month: "Mar", val: "Rp 11M" },
    { month: "Apr", val: "Rp 18M" },
    { month: "Mei", val: "Rp 14M" },
    { month: "Jun", val: "Rp 24.5M" },
  ];

  // --- ACTIONS ---
  const handleExportAction = (format) => {
    setShowExportMenu(false);
    setExportStatus("loading");

    // Simulasi proses export
    setTimeout(() => {
      setExportStatus("success");
      console.log(`Berhasil export data sebagai ${format}`);

      // Kembali ke state idle setelah 2.5 detik
      setTimeout(() => setExportStatus("idle"), 2500);
    }, 1500);
  };

  const handleDownloadPdf = () => {
    setIsDownloadingPdf(true);
    setTimeout(() => setIsDownloadingPdf(false), 2000);
  };

  const handleSavePortfolio = () => {
    console.log("Menyimpan alokasi baru:", allocations);
    setShowPortfolioModal(false);
  };

  // Kalkulasi total persentase portofolio (harus 100%)
  const totalAllocation = Number(allocations.liquid) + Number(allocations.investments) + Number(allocations.emergency);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10 relative">
      <Header />

      {/* --- PAGE HEADER & CONTROL BAR --- */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-[#E8E2D9]">
        <div>
          <h2 className="text-3xl font-black tracking-tighter text-[#1A1A1A]">Analytics Overview</h2>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A3A3A3] mt-1.5">Detailed Financial Report</p>
        </div>

        <div className="flex gap-3 w-full md:w-auto h-[52px]">
          <button
            onClick={() => setShowRangeModal(true)}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 h-full bg-white border border-[#E8E2D9] rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#F6F5F1] hover:border-[#A3A3A3] active:scale-95 transition-all shadow-sm"
          >
            <Calendar size={14} /> {activeRange}
          </button>

          {/* Export Button UX Berubah */}
          <div className="relative flex-1 md:flex-none h-full">
            <button
              onClick={() => exportStatus === "idle" && setShowExportMenu(!showExportMenu)}
              disabled={exportStatus !== "idle"}
              className={`w-full h-full flex items-center justify-center gap-2 px-6 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg transition-all duration-300 ${exportStatus === "success"
                  ? "bg-green-500 text-white border border-green-500"
                  : "bg-[#1A1A1A] text-[#FFD600] border border-[#1A1A1A] hover:bg-black active:scale-95 disabled:opacity-80"
                }`}
            >
              {exportStatus === "idle" && <><Download size={14} /> Export</>}
              {exportStatus === "loading" && <><div className="w-4 h-4 border-2 border-[#FFD600] border-t-transparent rounded-full animate-spin" /> Wait</>}
              {exportStatus === "success" && <><Check size={14} /> Success</>}
            </button>

            {/* Export Dropdown Menu */}
            {showExportMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowExportMenu(false)}></div>
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl border border-[#E8E2D9] shadow-2xl py-2 z-50 animate-in fade-in zoom-in duration-200">
                  <button
                    onClick={() => handleExportAction('PDF')}
                    className="w-full flex items-center gap-3 px-5 py-3 text-[11px] font-black text-[#1A1A1A] uppercase tracking-widest hover:bg-[#F6F5F1] transition-colors"
                  >
                    <FileText size={16} className="text-[#FFD600]" /> As PDF
                  </button>
                  <button
                    onClick={() => handleExportAction('CSV')}
                    className="w-full flex items-center gap-3 px-5 py-3 text-[11px] font-black text-[#1A1A1A] uppercase tracking-widest hover:bg-[#F6F5F1] transition-colors"
                  >
                    <FileSpreadsheet size={16} className="text-[#FFD600]" /> As CSV
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* --- MAIN ANALYTICAL GRID --- */}
      <div className="grid grid-cols-12 gap-8">

        {/* === LEFT SIDE (8 Columns) === */}
        <div className="col-span-12 lg:col-span-8 space-y-8">

          {/* 1. Cash Flow & Trend Chart */}
          <div className="bg-[#FDFCFB] p-8 rounded-[40px] border border-[#E8E2D9] shadow-sm relative overflow-hidden h-[450px] group">
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#1A1A1A 1px, transparent 1px), linear-gradient(90deg, #1A1A1A 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            <div className="flex justify-between items-start relative z-10 mb-8">
              <div>
                <h3 className="font-black text-sm uppercase tracking-tighter text-[#1A1A1A]">Cash Flow & Trend</h3>
                <p className="text-[10px] text-[#A3A3A3] font-bold mt-1">
                  {hoveredMonth !== null ? `Data for ${chartData[hoveredMonth].month}: ${chartData[hoveredMonth].val}` : "Hover chart to see details"}
                </p>
              </div>

              <div className="flex items-center gap-5 bg-white p-3 rounded-2xl border border-[#E8E2D9] shadow-sm">
                <div className="text-right">
                  <p className="flex items-center justify-end gap-1.5 text-[9px] font-black uppercase tracking-widest text-[#A3A3A3] mb-1">
                    <span className="w-2 h-2 bg-[#FFD600] rounded-full"></span> Income
                  </p>
                  <p className="text-base font-black text-[#1A1A1A] leading-none">Rp 32.0M</p>
                </div>
                <div className="w-px h-8 bg-[#F6F5F1]"></div>
                <div className="text-right">
                  <p className="flex items-center justify-end gap-1.5 text-[9px] font-black uppercase tracking-widest text-[#A3A3A3] mb-1">
                    <span className="w-2 h-2 bg-[#1A1A1A] rounded-full"></span> Expense
                  </p>
                  <p className="text-base font-black text-[#1A1A1A] leading-none">Rp 7.5M</p>
                </div>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-12 h-64 flex items-end">
              <svg viewBox="0 0 1000 200" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                <path d="M0,180 C150,150 350,180 500,100 C650,20 850,120 1000,40 L1000,200 L0,200 Z" fill="#FFD600" fillOpacity="0.1" className="transition-all duration-700" />
                <path d="M0,180 C150,150 350,180 500,100 C650,20 850,120 1000,40" stroke="#FFD600" strokeWidth="6" fill="none" strokeLinecap="round" className="drop-shadow-lg" />
              </svg>
            </div>

            <div className="absolute inset-x-8 bottom-12 h-64 flex justify-between z-20">
              {chartData.map((data, i) => (
                <div
                  key={i}
                  className="flex-1 h-full flex justify-center group/col cursor-crosshair"
                  onMouseEnter={() => setHoveredMonth(i)}
                  onMouseLeave={() => setHoveredMonth(null)}
                >
                  <div className="w-px h-full bg-black/5 opacity-0 group-hover/col:opacity-100 transition-opacity relative">
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-white border-2 border-[#FFD600] rounded-full opacity-0 group-hover/col:opacity-100 shadow-md"></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute bottom-6 inset-x-8 flex justify-between px-[5%] z-10">
              {chartData.map((data, i) => (
                <span key={i} className={`text-[10px] font-black uppercase transition-colors duration-300 w-8 text-center ${hoveredMonth === i ? "text-[#1A1A1A]" : "text-[#A3A3A3]"}`}>
                  {data.month}
                </span>
              ))}
            </div>
          </div>

          {/* 2. Asset Allocation - Ditambahkan Fungsi Klik */}
          <div className="bg-white border border-[#E8E2D9] p-10 rounded-[40px] shadow-sm relative overflow-hidden group">
            <PieChart className="absolute -right-12 -bottom-12 opacity-[0.03] text-[#1A1A1A] group-hover:rotate-12 transition-transform duration-1000 pointer-events-none" size={240} />

            <div className="flex justify-between items-center mb-10 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#1A1A1A] rounded-2xl flex items-center justify-center text-[#FFD600] shadow-lg">
                  <Layers size={22} />
                </div>
                <div>
                  <h3 className="font-black text-lg tracking-tighter text-[#1A1A1A]">Asset Allocation</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#A3A3A3]">Capital Distribution Strategy</p>
                </div>
              </div>
              {/* Tombol Portfolio Manage yang Aktif */}
              <button
                onClick={() => setShowPortfolioModal(true)}
                className="px-4 py-2 bg-[#F6F5F1] rounded-xl text-[10px] font-black text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FFD600] flex items-center gap-1.5 transition-colors uppercase tracking-widest active:scale-95 shadow-sm"
              >
                Portfolio Manage <ChevronRight size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
              {/* Values are now dynamic from state */}
              <AllocationItem label="Liquid Cash" percent={allocations.liquid} color="#1A1A1A" amount="Rp 15.9M" />
              <AllocationItem label="Investments" percent={allocations.investments} color="#FFD600" amount="Rp 6.1M" />
              <AllocationItem label="Emergency Fund" percent={allocations.emergency} color="#E8E2D9" amount="Rp 2.5M" />
            </div>
          </div>

          {/* 3. Top Spending Categories */}
          <div className="bg-white border border-[#E8E2D9] p-8 rounded-[40px] shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-black text-sm uppercase tracking-tighter text-[#1A1A1A]">Top Spending Categories</h3>
              <p className="text-[10px] font-black bg-[#F6F5F1] px-3 py-1 rounded text-[#1A1A1A] tracking-widest uppercase">April Insight</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <TopSpendBar icon={<CreditCard size={14} />} label="Food & Dining" amount="Rp 2.4M" percent={40} color="#FFD600" />
                <TopSpendBar icon={<TrendingUp size={14} />} label="Investments" amount="Rp 1.5M" percent={25} color="#1A1A1A" />
              </div>
              <div className="space-y-6">
                <TopSpendBar icon={<Activity size={14} />} label="Self Care" amount="Rp 1.2M" percent={20} color="#1A1A1A" />
                <TopSpendBar icon={<Layers size={14} />} label="Others" amount="Rp 900K" percent={15} color="#E8E2D9" />
              </div>
            </div>
          </div>
        </div>

        {/* === RIGHT SIDE (4 Columns) === */}
        <div className="col-span-12 lg:col-span-4 space-y-6">

          {/* 4. Financial Health Score & AI Insight */}
          <div className="bg-[#1A1A1A] p-8 rounded-[40px] shadow-xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute -right-10 -top-10 w-48 h-48 bg-[#FFD600] rounded-full opacity-[0.03] blur-2xl group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#FFD600] rounded-full animate-pulse"></div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A3A3A3]">Health Score</h3>
                </div>
                <div className="text-right">
                  <span className="text-4xl font-black text-[#FFD600] tracking-tighter leading-none">A-</span>
                  <p className="text-[9px] font-black uppercase tracking-widest text-green-400 mt-1">Excellent</p>
                </div>
              </div>

              <div className="w-full h-px bg-white/10 mb-6"></div>

              <p className="text-sm font-medium leading-relaxed mb-8 text-[#A3A3A3]">
                <span className="text-white font-bold">AI Insight:</span> Kamu menghemat <span className="text-[#FFD600] bg-[#FFD600]/10 px-1.5 py-0.5 rounded text-xs font-black">Rp 1.2M</span> bulan ini dengan mengurangi jajan kopi di luar. Pertahankan!
              </p>
              <button className="w-full h-12 flex items-center justify-center bg-[#FFD600] text-[#1A1A1A] rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white active:scale-95 transition-all shadow-md">
                View Recommendations
              </button>
            </div>
          </div>

          {/* 5. Recurring Bills & Subscriptions */}
          <div className="bg-white p-8 rounded-[40px] border border-[#E8E2D9] shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-black text-sm uppercase tracking-tighter text-[#1A1A1A]">Recurring Bills</h3>
              <span className="text-[10px] font-black bg-[#F6F5F1] px-2 py-1 rounded text-[#1A1A1A]">3 Active</span>
            </div>
            <div className="space-y-4">
              <BillItem icon={<Music size={16} />} name="Spotify Premium" price="Rp 54.900" date="24 Apr" status="Paid" />
              <BillItem icon={<Wifi size={16} />} name="IndiHome Internet" price="Rp 350.000" date="28 Apr" status="Upcoming" />
              <BillItem icon={<MonitorPlay size={16} />} name="Netflix Standard" price="Rp 153.000" date="02 Mei" status="Upcoming" />
            </div>
          </div>

          {/* 6. Download Statement UX Button */}
          <button
            onClick={handleDownloadPdf}
            disabled={isDownloadingPdf}
            className="w-full flex items-center justify-between p-6 bg-[#FDFCFB] rounded-[32px] border-2 border-dashed border-[#E8E2D9] hover:border-[#FFD600] hover:bg-[#FFFDF5] active:scale-[0.98] group transition-all mt-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-[18px] border border-[#E8E2D9] shadow-sm flex items-center justify-center text-[#1A1A1A] group-hover:text-[#FFD600] transition-colors">
                {isDownloadingPdf ? <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : <Download size={20} />}
              </div>
              <div className="text-left">
                <p className="text-xs font-black text-[#1A1A1A] mb-0.5">{isDownloadingPdf ? "Preparing PDF..." : "Statement.pdf"}</p>
                <p className="text-[10px] text-[#A3A3A3] font-bold uppercase tracking-widest">Monthly Report April</p>
              </div>
            </div>
            {isDownloadingPdf ? (
              <span className="text-[10px] font-black text-[#FFD600] uppercase">Wait</span>
            ) : (
              <ChevronRight size={18} className="text-[#A3A3A3] group-hover:text-[#FFD600] group-hover:translate-x-1 transition-all" />
            )}
          </button>
        </div>
      </div>

      {/* ================= MODALS ================= */}

      {/* --- MODAL: SELECT RANGE --- */}
      {showRangeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowRangeModal(false)}></div>
          <div className="bg-white w-full max-w-sm rounded-[32px] p-8 shadow-2xl relative border border-[#E8E2D9] animate-in zoom-in-95 duration-300">
            <button onClick={() => setShowRangeModal(false)} className="absolute right-6 top-6 p-2 text-[#A3A3A3] hover:text-[#1A1A1A] hover:bg-[#F6F5F1] rounded-full transition-all"><X size={20} /></button>
            <h3 className="text-2xl font-black tracking-tighter text-[#1A1A1A] mb-6">Select Range</h3>
            <div className="space-y-3">
              {["This Month", "Last 3 Months", "Last 6 Months", "This Year"].map((range) => (
                <button key={range} onClick={() => { setActiveRange(range); setShowRangeModal(false); }} className={`w-full h-[52px] px-6 rounded-2xl flex justify-between items-center text-xs font-black uppercase tracking-widest transition-all ${activeRange === range ? "bg-[#1A1A1A] text-[#FFD600] shadow-md border border-[#1A1A1A]" : "bg-white border border-[#E8E2D9] text-[#1A1A1A] hover:bg-[#F6F5F1]"}`}>
                  {range} {activeRange === range && <CheckCircle2 size={16} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: MANAGE PORTFOLIO --- */}
      {showPortfolioModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowPortfolioModal(false)}></div>

          <div className="bg-white w-full max-w-md rounded-[32px] p-8 shadow-2xl relative border border-[#E8E2D9] animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setShowPortfolioModal(false)}
              className="absolute right-6 top-6 p-2 text-[#A3A3A3] hover:text-[#1A1A1A] hover:bg-[#F6F5F1] rounded-full transition-all"
            >
              <X size={20} />
            </button>

            <div className="mb-8">
              <h3 className="text-2xl font-black tracking-tighter text-[#1A1A1A] mb-2">Manage Portfolio</h3>
              <p className="text-sm text-[#7A746E] font-medium leading-relaxed">
                Sesuaikan target alokasi aset Anda. Total harus mencapai <span className="text-[#1A1A1A] font-bold">100%</span>.
              </p>
            </div>

            <div className="space-y-5">
              {/* Input Liquid Cash */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#A3A3A3]">Liquid Cash (%)</label>
                  <span className="w-2.5 h-2.5 bg-[#1A1A1A] rounded-full"></span>
                </div>
                <input
                  type="number"
                  value={allocations.liquid}
                  onChange={(e) => setAllocations({ ...allocations, liquid: e.target.value })}
                  className="w-full h-12 px-5 bg-[#F6F5F1] rounded-2xl border border-[#E8E2D9] font-bold text-[#1A1A1A] outline-none focus:border-[#FFD600] focus:bg-white transition-all"
                />
              </div>

              {/* Input Investments */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#A3A3A3]">Investments (%)</label>
                  <span className="w-2.5 h-2.5 bg-[#FFD600] rounded-full"></span>
                </div>
                <input
                  type="number"
                  value={allocations.investments}
                  onChange={(e) => setAllocations({ ...allocations, investments: e.target.value })}
                  className="w-full h-12 px-5 bg-[#F6F5F1] rounded-2xl border border-[#E8E2D9] font-bold text-[#1A1A1A] outline-none focus:border-[#FFD600] focus:bg-white transition-all"
                />
              </div>

              {/* Input Emergency Fund */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#A3A3A3]">Emergency Fund (%)</label>
                  <span className="w-2.5 h-2.5 bg-[#E8E2D9] rounded-full border border-[#A3A3A3]"></span>
                </div>
                <input
                  type="number"
                  value={allocations.emergency}
                  onChange={(e) => setAllocations({ ...allocations, emergency: e.target.value })}
                  className="w-full h-12 px-5 bg-[#F6F5F1] rounded-2xl border border-[#E8E2D9] font-bold text-[#1A1A1A] outline-none focus:border-[#FFD600] focus:bg-white transition-all"
                />
              </div>

              {/* Validation Feedback */}
              <div className={`p-4 rounded-xl flex items-center justify-between border ${totalAllocation === 100 ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]">Total Allocation:</span>
                <span className={`text-sm font-black ${totalAllocation === 100 ? 'text-green-600' : 'text-red-500'}`}>
                  {totalAllocation}%
                </span>
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  onClick={() => setShowPortfolioModal(false)}
                  className="flex-1 h-[52px] flex items-center justify-center bg-white border border-[#E8E2D9] text-[#1A1A1A] rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#F6F5F1] transition-all"
                >
                  Batal
                </button>
                <button
                  onClick={handleSavePortfolio}
                  disabled={totalAllocation !== 100}
                  className="flex-[2] h-[52px] flex items-center justify-center bg-[#1A1A1A] text-[#FFD600] border border-[#1A1A1A] rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg hover:bg-black active:scale-95 disabled:opacity-50 transition-all"
                >
                  Simpan Strategi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- INTERNAL UI COMPONENTS ---

function AllocationItem({ label, percent, color, amount }) {
  return (
    <div className="space-y-4 group cursor-default">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-xs font-black text-[#1A1A1A]">{label}</p>
          <p className="text-lg font-black tracking-tighter mt-0.5">{amount}</p>
        </div>
        <p className="text-sm font-black opacity-40">{percent}%</p>
      </div>
      <div className="w-full h-3 bg-[#F6F5F1] rounded-full overflow-hidden border border-[#E8E2D9]/50">
        <div className="h-full rounded-full transition-all duration-1000 ease-out relative shadow-inner" style={{ width: `${percent}%`, backgroundColor: color }}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
        </div>
      </div>
    </div>
  );
}

function TopSpendBar({ icon, label, amount, percent, color }) {
  return (
    <div className="space-y-3 group">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-[#F6F5F1] text-[#A3A3A3] group-hover:text-[#1A1A1A] transition-colors">{icon}</div>
          <p className="text-[11px] font-black text-[#1A1A1A] uppercase tracking-widest">{label}</p>
        </div>
        <p className="text-xs font-black text-[#1A1A1A]">{amount}</p>
      </div>
      <div className="w-full h-2 bg-[#F6F5F1] rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${percent}%`, backgroundColor: color }}></div>
      </div>
    </div>
  );
}

function BillItem({ icon, name, price, date, status }) {
  const isPaid = status === "Paid";
  return (
    <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-[#F6F5F1] transition-colors group cursor-pointer border border-transparent hover:border-[#E8E2D9]">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm border ${isPaid ? "bg-white border-[#E8E2D9] text-[#1A1A1A]" : "bg-[#1A1A1A] border-[#1A1A1A] text-[#FFD600]"}`}>{icon}</div>
        <div>
          <p className="text-xs font-black text-[#1A1A1A] mb-0.5">{name}</p>
          <p className="text-[9px] font-black text-[#A3A3A3] uppercase tracking-widest">Due {date}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-black text-[#1A1A1A] mb-0.5">{price}</p>
        <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${isPaid ? "bg-green-50 text-green-600" : "bg-[#FFD600]/20 text-[#1A1A1A]"}`}>{status}</span>
      </div>
    </div>
  );
}