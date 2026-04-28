"use client";
import React, { useMemo, useRef, useState, useCallback } from "react";
import Header from "../../components/header";
import { useApi } from "@/hooks/useApi";
import { apiPost, apiPut, apiDelete } from "@/lib/apiClient";
import { SkeletonTable } from "@/components/ui/Skeleton";
import { 
  Plus, Filter, Search, ChevronDown, Edit3, Trash2, 
  X, Calendar, ArrowUpRight, ArrowDownLeft, Camera, Keyboard,
  Image as ImageIcon, AlertCircle
} from "lucide-react";

const SummaryCard = React.memo(({ label, amount, trend, color, textColor }) => {
  const isDark = color === "bg-[#1A1A1A]";
  return (
    <div className={`${color} p-7 rounded-[32px] border border-[#E8E2D9] shadow-sm relative overflow-hidden group hover:scale-[1.02] transition-all`}>
      <div className="space-y-1 relative z-10 font-sans">
        <p className={`text-[10px] font-black uppercase tracking-widest ${isDark ? "text-[#FFD600]/60" : "text-[#1A1A1A]/60"}`}>{label}</p>
        <h3 className={`text-xl font-black tracking-tighter ${textColor} tabular-nums`}>{amount}</h3>
        <div className="flex items-center gap-1.5 pt-2">
          <span className={`text-[9px] font-black px-2 py-1 rounded-lg ${isDark ? "bg-[#FFD600] text-[#1A1A1A]" : "bg-[#1A1A1A] text-[#FFD600]"}`}>{trend} ↗</span>
        </div>
      </div>
    </div>
  );
});
SummaryCard.displayName = "SummaryCard";

export default function TransactionsPage() {
  const today = new Date().toISOString().slice(0, 10);

  // --- STATES UTAMA ---
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All"); 
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addMethod, setAddMethod] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(today.slice(0, 7));
  const monthInputRef = useRef(null);

  // --- CRUD STATES ---
  const [editingTrx, setEditingTrx] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null); // State baru untuk modal delete
  const [formData, setFormData] = useState({ desc: "", type: "Income", amount: "", cat: "", date: today, idCategory: null });
  const [actionError, setActionError] = useState("");

  // --- BUILD QUERY PARAMS FOR SERVER-SIDE FILTERING ---
  const queryParams = new URLSearchParams();
  if (searchTerm) queryParams.append('q', searchTerm);
  if (filterType !== "All") queryParams.append('type', filterType === "Income" ? "income" : "expense");
  if (selectedMonth) {
    const [year, month] = selectedMonth.split('-');
    const startDate = `${year}-${month}-01`;
    const endDate = new Date(year, month, 0).toISOString().split('T')[0];
    queryParams.append('dateFrom', startDate);
    queryParams.append('dateTo', endDate);
  }
  queryParams.append('page', currentPage.toString());
  queryParams.append('per_page', '25');

  const { data: paginatedData, isLoading: isTxnsLoading, error: txnsError, refetch: refetchTxns } = useApi(
    `/api/transactions/search?${queryParams.toString()}`
  );
  const { data: rawCategories, isLoading: isCatLoading, error: catError } = useApi("/api/categories");

  const loading = isTxnsLoading || isCatLoading;
  const apiError = txnsError || catError || actionError;

  // --- LOGIC CRUD ---
  const normalizeTypeToUi = useCallback((type) => (type === "income" ? "Income" : "Expenses"), []);
  const normalizeTypeToApi = useCallback((type) => (type === "Income" ? "income" : "expense"), []);

  // Extract transactions from paginated response
  const displayedTransactions = useMemo(() => {
    if (!paginatedData || !paginatedData.data) return [];
    const categoryMap = new Map((rawCategories || []).map((c) => [c.idCategory, c.name]));
    return paginatedData.data.map((item) => {
      const date = item?.date ? String(item.date).slice(0, 10) : today;
      return {
        id: item.idTransaction,
        idCategory: item.idCategory ?? null,
        date,
        desc: item.description || "(No description)",
        cat: item.category?.name || (item.idCategory ? (categoryMap.get(item.idCategory) || "Uncategorized") : "Uncategorized"),
        type: normalizeTypeToUi(item.type),
        amount: Number(item.amount || 0),
      };
    });
  }, [paginatedData, rawCategories, today, normalizeTypeToUi]);

  const resolveCategoryId = useCallback((categoryName, type) => {
    const normalized = categoryName.trim().toLowerCase();
    if (!normalized) return null;

    const apiType = normalizeTypeToApi(type);
    const found = (rawCategories || []).find((cat) => {
      const sameName = String(cat.name || "").trim().toLowerCase() === normalized;
      const sameType = String(cat.type || "") === apiType;
      return sameName && sameType;
    });

    return found?.idCategory ?? null;
  }, [rawCategories, normalizeTypeToApi]);

  const handleSave = async (e) => {
    e.preventDefault();
    setActionError("");

    const categoryId = formData.idCategory ?? resolveCategoryId(formData.cat, formData.type);
    const payload = {
      description: formData.desc,
      type: normalizeTypeToApi(formData.type),
      amount: Number(formData.amount || 0),
      date: formData.date,
      ...(categoryId ? { idCategory: categoryId } : {}),
    };

    try {
      if (editingTrx) {
        await apiPut(`/api/transactions/${editingTrx.id}`, payload);
      } else {
        await apiPost("/api/transactions", payload);
      }
      refetchTxns();
      closeModal();
    } catch (err) {
      setActionError(err.message || "Failed to save transaction");
    }
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      try {
        await apiDelete(`/api/transactions/${itemToDelete.id}`);
        refetchTxns();
        setItemToDelete(null);
      } catch (err) {
        setActionError(err.message || "Failed to delete transaction");
      }
    }
  };

  const openEditModal = useCallback((trx) => {
    setEditingTrx(trx);
    setFormData({ ...trx });
    setAddMethod('manual');
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingTrx(null);
    setAddMethod(null);
    setFormData({ desc: "", type: "Income", amount: "", cat: "", date: today, idCategory: null });
  }, [today]);

  // Get pagination info from API response
  const totalPages = paginatedData?.last_page || 1;
  const totalResults = paginatedData?.total || 0;
  const pageNumbers = useMemo(() => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }, [totalPages]);

  const totalBalance = useMemo(() => 
    displayedTransactions.reduce((acc, curr) => curr.type === "Income" ? acc + curr.amount : acc - curr.amount, 0),
    [displayedTransactions]
  );
  const totalIncome = useMemo(() => 
    displayedTransactions.filter(t => t.type === "Income").reduce((acc, curr) => acc + curr.amount, 0),
    [displayedTransactions]
  );
  const totalExpenses = useMemo(() => 
    displayedTransactions.filter(t => t.type === "Expenses").reduce((acc, curr) => acc + curr.amount, 0),
    [displayedTransactions]
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20 font-sans text-[#1A1A1A]">
      <Header name="ABP" />

      {apiError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-bold text-red-600">
          {apiError}
        </div>
      )}

      {/* Summary Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-[#1A1A1A]">
        <SummaryCard 
          label="Total Balance" 
          amount={`Rp ${totalBalance.toLocaleString('id-ID')}`} 
          trend="+15%" color="bg-[#1A1A1A]" textColor="text-[#FFD600]" 
        />
        <SummaryCard 
          label="Total Income" 
          amount={`Rp ${totalIncome.toLocaleString('id-ID')}`} 
          trend="+30%" color="bg-[#FFD600]" textColor="text-[#1A1A1A]" 
        />
        <SummaryCard 
          label="Total Expenses" 
          amount={`Rp ${totalExpenses.toLocaleString('id-ID')}`} 
          trend="-11%" color="bg-[#1A1A1A]" textColor="text-[#FFD600]" 
        />
        <SummaryCard label="Savings Target" amount="Rp 50.000.000" trend="+5%" color="bg-[#FFD600]" textColor="text-[#1A1A1A]" />
      </section>

      {/* Filter & Action Row */}
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

            <div className="relative">
              <input type="month" ref={monthInputRef} value={selectedMonth} onChange={(e) => {setSelectedMonth(e.target.value); setCurrentPage(1);}} className="absolute inset-0 w-0 h-0 opacity-0" />
              <button onClick={() => monthInputRef.current?.showPicker()} className="flex items-center gap-2 px-6 py-3.5 bg-white border border-[#E8E2D9] rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#F6F5F1] transition shadow-sm">
                <Calendar size={14} className="text-[#FFD600]" /> {selectedMonth} <ChevronDown size={14} />
              </button>
            </div>

            <button 
              onClick={() => {setIsModalOpen(true); setAddMethod(null);}}
              className="group flex items-center gap-2 px-6 py-3.5 bg-[#1A1A1A] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all hover:bg-[#FFD600] hover:text-[#1A1A1A] shadow-lg"
            >
              <Plus size={18} className="text-[#FFD600] group-hover:text-[#1A1A1A]" /> 
              Add Transaction
            </button>
          </div>
        </div>

        {/* --- TABLE CONTENT --- */}
        <div className="overflow-x-auto min-h-[300px]">
          {loading ? (
             <SkeletonTable rows={10} cols={6} />
          ) : (
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
                {displayedTransactions.length > 0 ? displayedTransactions.map((trx) => (
                  <tr key={trx.id} className="hover:bg-[#FDFCFB] transition group">
                    <td className="px-6 py-6 text-sm font-medium text-[#7A746E]">{trx.date}</td>
                    <td className="px-6 py-6 text-sm font-bold">{trx.desc}</td>
                    <td className="px-6 py-6"><span className="bg-[#F6F5F1] px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-[#A3A3A3]">{trx.cat}</span></td>
                    <td className={`px-6 py-6 text-[10px] font-black uppercase tracking-widest ${trx.type === "Expenses" ? "text-red-500" : "text-green-600"}`}>{trx.type}</td>
                    <td className={`px-6 py-6 text-sm font-black tabular-nums ${trx.type === "Expenses" ? "text-red-500" : "text-[#1A1A1A]"}`}>
                      {trx.type === "Expenses" ? "-" : ""}Rp {trx.amount.toLocaleString('id-ID')}
                    </td>
                    <td className="px-6 py-6 text-right space-x-2">
                      <button onClick={() => openEditModal(trx)} className="p-2 hover:bg-[#FFD600] rounded-xl transition text-[#A3A3A3] hover:text-[#1A1A1A]"><Edit3 size={16} /></button>
                      <button onClick={() => setItemToDelete(trx)} className="p-2 hover:bg-red-500 rounded-xl transition text-[#A3A3A3] hover:text-white"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="6" className="py-20 text-center text-[#A3A3A3] italic">No data found...</td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* --- PAGINATION --- */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-between items-center pt-8 border-t border-[#F6F5F1]">
            <p className="text-[10px] font-black text-[#A3A3A3] uppercase tracking-widest">{totalResults} Results</p>
            <div className="flex gap-2">
              {pageNumbers.map(num => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`w-10 h-10 rounded-xl text-[10px] font-black transition-all ${currentPage === num ? "bg-[#1A1A1A] text-[#FFD600] scale-110" : "bg-white text-[#A3A3A3] border border-[#E8E2D9] hover:bg-[#F6F5F1]"}`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* --- MODAL ADD/EDIT --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-6 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-xl rounded-[40px] p-10 shadow-2xl relative animate-in zoom-in-95 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#FFD600]"></div>
            <button onClick={closeModal} className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full"><X size={24}/></button>
            {!addMethod ? (
              <div className="space-y-8 py-4">
                <h2 className="text-3xl font-black tracking-tighter text-center">Choose Method</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setAddMethod('scan')} className="p-8 border-2 border-[#F6F5F1] hover:border-[#FFD600] rounded-[32px] transition-all flex flex-col items-center gap-4 group">
                    <Camera size={32} className="group-hover:text-[#FFD600]" /><p className="font-black uppercase tracking-widest text-xs">Scan Receipt</p>
                  </button>
                  <button onClick={() => setAddMethod('manual')} className="p-8 border-2 border-[#F6F5F1] hover:border-[#FFD600] rounded-[32px] transition-all flex flex-col items-center gap-4 group">
                    <Keyboard size={32} className="group-hover:text-[#FFD600]" /><p className="font-black uppercase tracking-widest text-xs">Manual Input</p>
                  </button>
                </div>
              </div>
            ) : (
              <div className="animate-in slide-in-from-right-4">
                <button onClick={() => setAddMethod(null)} className="text-[10px] font-black uppercase tracking-widest text-[#FFD600] mb-4 hover:underline">← Back</button>
                <h2 className="text-2xl font-black mb-6 tracking-tighter">{editingTrx ? "Edit" : "New"} Transaction</h2>
                <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#A3A3A3]">Description</label>
                    <input required value={formData.desc} onChange={(e) => setFormData({...formData, desc: e.target.value})} type="text" className="w-full h-12 bg-[#F6F5F1] rounded-2xl px-5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#FFD600]" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#A3A3A3]">Type</label>
                    <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full h-12 bg-[#F6F5F1] rounded-2xl px-4 text-sm font-semibold outline-none"><option value="Income">Income</option><option value="Expenses">Expenses</option></select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#A3A3A3]">Amount (Rp)</label>
                    <input required value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} type="number" className="w-full h-12 bg-[#F6F5F1] rounded-2xl px-5 text-sm font-semibold outline-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#A3A3A3]">Category</label>
                    <input required value={formData.cat} onChange={(e) => {
                      const inputVal = e.target.value;
                      const matchId = resolveCategoryId(inputVal, formData.type);
                      setFormData({...formData, cat: inputVal, idCategory: matchId});
                    }} type="text" list="transaction-category-options" className="w-full h-12 bg-[#F6F5F1] rounded-2xl px-5 text-sm font-semibold outline-none" />
                    <datalist id="transaction-category-options">
                      {(rawCategories || [])
                        .filter((cat) => String(cat.type || "") === normalizeTypeToApi(formData.type))
                        .map((cat) => (
                          <option key={cat.idCategory} value={cat.name} />
                        ))}
                    </datalist>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#A3A3A3]">Date</label>
                    <input required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} type="date" className="w-full h-12 bg-[#F6F5F1] rounded-2xl px-5 text-sm font-semibold outline-none" />
                  </div>
                  <button type="submit" className="col-span-2 py-4 bg-[#1A1A1A] text-[#FFD600] font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl mt-4 hover:bg-black transition-all">
                    {editingTrx ? "Update" : "Save"} Transaction
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- MODAL KONFIRMASI DELETE --- */}
      {itemToDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-md p-6 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-sm rounded-[40px] p-10 shadow-2xl relative overflow-hidden text-center animate-in zoom-in-95 duration-300">
            <div className="absolute top-0 left-0 w-full h-2 bg-red-500/80"></div>
            
            <div className="flex flex-col items-center gap-5">
              <div className="w-20 h-20 bg-red-50 rounded-[30px] flex items-center justify-center text-red-500">
                <AlertCircle size={40} />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-black tracking-tighter text-[#1A1A1A]">Hapus Data?</h3>
                <p className="text-sm font-medium text-[#A3A3A3] leading-relaxed">
                  Kamu yakin ingin menghapus transaksi <span className="font-bold text-[#1A1A1A]">"{itemToDelete.desc}"</span>? Data ini tidak bisa dikembalikan.
                </p>
              </div>

              <div className="flex gap-3 w-full pt-4">
                <button 
                  onClick={() => setItemToDelete(null)} 
                  className="flex-1 py-4 bg-[#F6F5F1] text-[#A3A3A3] font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-gray-100 transition-all border border-[#E8E2D9]"
                >
                  Batal
                </button>
                <button 
                  onClick={confirmDelete} 
                  className="flex-1 py-4 bg-red-500 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-lg shadow-red-200 hover:bg-red-600 hover:scale-[1.02] transition-all"
                >
                  Ya, Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}