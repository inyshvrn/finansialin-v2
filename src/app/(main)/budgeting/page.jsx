"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import Header from "../../components/header";
import { apiGet, apiPost, apiPut } from "@/lib/apiClient";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { 
  Plus, 
  Target, 
  AlertTriangle, 
  X, 
  Search, 
  CheckCircle2, 
  PencilLine,
  SearchX
} from "lucide-react";

const CategoryCard = React.memo(({ label, spent, limit, percent, daysLeft, isWarning, onAdjust }) => {
  const progressWidth = Math.min(percent, 100);

  return (
    <div className="bg-white border border-[#E8E2D9] p-7 rounded-[32px] shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col h-full">
      <div className="flex justify-between items-start z-10 gap-3 mb-6">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-[20px] ${isWarning ? "bg-red-50 text-red-500" : "bg-[#F6F5F1] text-[#1A1A1A]"}`}>
            <Target size={22} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col justify-center flex-1 min-w-0">
            <h3 className="font-black text-base text-[#1A1A1A] leading-none truncate block" title={label}>{label}</h3>
            <p className="text-[9px] text-[#A3A3A3] font-black uppercase tracking-widest mt-1.5 truncate">Monthly Target</p>
          </div>
        </div>
        
        <div className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm border ${isWarning ? "bg-red-50 text-red-600 border-red-100" : "bg-[#FDFCFB] text-green-600 border-[#E8E2D9]"}`}>
          {isWarning ? <AlertTriangle size={12} strokeWidth={2.5} /> : <CheckCircle2 size={12} strokeWidth={2.5} />}
          {isWarning ? "Waspada" : "Aman"}
        </div>
      </div>

      <div className="space-y-4 z-10 flex-1 flex flex-col justify-center">
        <div className="flex justify-between items-end gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-black text-[#A3A3A3] uppercase tracking-widest mb-1">Terpakai</p>
            <p className="text-lg font-black text-[#1A1A1A] tracking-tighter truncate">
              {spent} <span className="text-[11px] text-[#A3A3A3] font-bold tracking-normal">/ {limit}</span>
            </p>
          </div>
          <span className={`flex-shrink-0 text-2xl font-black block leading-none tracking-tighter ${isWarning ? "text-red-500" : "text-[#1A1A1A]"}`}>
            {percent}%
          </span>
        </div>

        <div className="w-full h-2.5 bg-[#F6F5F1] rounded-full overflow-hidden border border-[#E8E2D9]/50">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ease-out ${isWarning ? "bg-red-500" : "bg-[#1A1A1A]"}`} 
            style={{ width: `${progressWidth}%` }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center z-10 pt-5 mt-6 border-t border-[#F6F5F1] mt-auto">
        <div className="flex items-center -space-x-2 flex-shrink-0">
          <div className="w-9 h-9 rounded-full border-[2.5px] border-white bg-[#FFD600] text-[10px] flex items-center justify-center font-black shadow-sm z-10 relative">
            {daysLeft}d
          </div>
          <div className="h-9 pr-3 pl-3 rounded-full border-[2.5px] border-white bg-[#1A1A1A] text-white text-[9px] flex items-center justify-center font-black uppercase tracking-tighter shadow-sm">
            Left
          </div>
        </div>

        <button
          onClick={onAdjust}
          className="flex-shrink-0 flex items-center justify-center gap-1.5 px-4 h-9 bg-white border border-[#E8E2D9] text-[#1A1A1A] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#F6F5F1] hover:border-[#A3A3A3] active:scale-95 transition-all duration-300 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0"
        >
          <PencilLine size={14} /> Adjust
        </button>
      </div>
    </div>
  );
});
CategoryCard.displayName = "CategoryCard";

export default function BudgetingPage() {
  const [filter, setFilter] = useState("Active");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [categories, setCategories] = useState([]);
  const [budgetData, setBudgetData] = useState([]);
  
  // State untuk Modal Adjust Budget
  const [showAdjust, setShowAdjust] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [adjustAmount, setAdjustAmount] = useState("");

  // State untuk Modal Add Budget
  const [showAddBudget, setShowAddBudget] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [newLimit, setNewLimit] = useState("");

  const formatCurrency = useCallback((value) => `Rp ${Number(value || 0).toLocaleString("id-ID")}`, []);

  const daysLeftUntil = useCallback((dateStr) => {
    if (!dateStr) return 0;
    const target = new Date(String(dateStr).slice(0, 10));
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);
    const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
    return Math.max(0, diff);
  }, []);

  const computeStatus = useCallback((percent) => {
    if (percent > 100) return "Overlimit";
    if (percent === 100) return "Completed";
    return "Active";
  }, []);

  const loadBudgets = useCallback(async () => {
    setLoading(true);
    setApiError("");

    try {
      const [budgets, categoryData] = await Promise.all([
        apiGet("/api/budgets"),
        apiGet("/api/categories"),
      ]);

      const categoryMap = new Map((categoryData || []).map((cat) => [cat.idCategory, cat.name]));
      setCategories(categoryData || []);

      const usageData = await Promise.all(
        (budgets || []).map(async (budget) => {
          const usage = await apiGet(`/api/budgets/${budget.idBudget}/usage`);
          return { idBudget: budget.idBudget, usage };
        })
      );

      const usageMap = new Map(usageData.map((item) => [item.idBudget, item.usage]));

      const mapped = (budgets || []).map((budget) => {
        const usage = usageMap.get(budget.idBudget) || { used: 0, percent: 0 };
        const percent = Math.round(Number(usage.percent || 0));
        const label = budget.idCategory ? (categoryMap.get(budget.idCategory) || "Unknown") : "Uncategorized";

        return {
          id: budget.idBudget,
          idBudget: budget.idBudget,
          idCategory: budget.idCategory,
          label,
          spent: formatCurrency(usage.used),
          limit: formatCurrency(budget.amount),
          amountRaw: Number(budget.amount || 0),
          percent,
          daysLeft: String(daysLeftUntil(budget.periodEnd)),
          status: computeStatus(percent),
          isWarning: percent >= 80,
        };
      });

      setBudgetData(mapped);
    } catch (err) {
      setApiError(err.message || "Gagal memuat budget");
    } finally {
      setLoading(false);
    }
  }, [formatCurrency, daysLeftUntil, computeStatus]);

  useEffect(() => {
    loadBudgets();
  }, [loadBudgets]);

  const filteredData = useMemo(() => {
    return budgetData.filter((item) => {
      const matchesSearch = item.label.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filter === "All" ? true : item.status === filter;
      return matchesFilter && matchesSearch;
    });
  }, [budgetData, searchQuery, filter]);

  const openAdjust = useCallback((cat) => {
    setSelectedBudget(cat);
    setAdjustAmount("");
    setShowAdjust(true);
  }, []);

  const handleSaveAdjust = async () => {
    if (!selectedBudget || !adjustAmount) return;

    try {
      await apiPut(`/api/budgets/${selectedBudget.idBudget}`, {
        amount: Number(adjustAmount),
      });

      await loadBudgets();
      setShowAdjust(false);
      setSelectedBudget(null);
    } catch (err) {
      setApiError(err.message || "Gagal update budget");
    }
  };

  const handleAddBudget = async () => {
    const category = categories.find(
      (cat) => String(cat.name || "").trim().toLowerCase() === newCategory.trim().toLowerCase() && String(cat.type || "") === "expense"
    );

    if (!category) {
      setApiError("Kategori tidak ditemukan. Pakai nama kategori expense yang valid.");
      return;
    }

    try {
      const now = new Date();
      const periodStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10);
      const periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().slice(0, 10);

      await apiPost("/api/budgets", {
        idCategory: category.idCategory,
        period: "monthly",
        periodStart,
        periodEnd,
        amount: Number(newLimit),
      });

      await loadBudgets();
      setNewCategory("");
      setNewLimit("");
      setShowAddBudget(false);
    } catch (err) {
      setApiError(err.message || "Gagal membuat budget");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20 relative">
      <Header />

      {apiError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-bold text-red-600">
          {apiError}
        </div>
      )}

      {/* --- HERO SECTION --- */}
      <section className="bg-[#1A1A1A] rounded-[32px] p-8 text-white relative overflow-hidden shadow-lg">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-[#FFD600]/20 to-transparent blur-[60px] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 text-left">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-[9px] font-black uppercase tracking-[0.3em] text-[#FFD600] border border-white/10 backdrop-blur-sm">Overall Status</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter">78% Terpakai</h2>
            <p className="text-xs text-gray-400 font-medium">
              Sisa hari di bulan ini: <span className="text-white font-bold">4 Hari Lagi</span>
            </p>
          </div>
          <div className="text-left md:text-right bg-white/5 px-6 py-5 rounded-2xl border border-white/10 backdrop-blur-md w-full md:w-auto">
            <p className="text-[9px] font-black uppercase opacity-70 tracking-widest mb-1 text-[#FFD600]">Sisa Saldo Anggaran</p>
            <p className="text-2xl font-black text-white">Rp 1.250.000</p>
          </div>
        </div>
      </section>

      {/* --- CONTROL BAR --- */}
      <section className="flex flex-col xl:flex-row justify-between items-center gap-4">
        <div className="flex items-center bg-white p-1.5 rounded-2xl border border-[#E8E2D9] h-[52px] w-full xl:w-auto overflow-x-auto no-scrollbar shadow-sm">
          {["All", "Active", "Completed", "Overlimit"].map((t) => (
            <button 
              key={t} 
              onClick={() => setFilter(t)} 
              className={`flex-1 xl:flex-none h-full px-6 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center ${
                filter === t 
                ? "bg-[#1A1A1A] text-[#FFD600] shadow-md" 
                : "text-[#A3A3A3] hover:text-[#1A1A1A] hover:bg-[#F6F5F1]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full xl:w-auto h-[52px]">
          <div className="relative flex-1 md:w-80 h-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A3A3A3] group-focus-within:text-[#FFD600] transition-colors" size={18} />
            <input
              type="text"
              placeholder="Cari kategori..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-full pl-12 pr-4 bg-white border border-[#E8E2D9] rounded-2xl text-xs font-bold outline-none focus:border-[#FFD600] transition-all shadow-sm"
            />
          </div>
          
          <button 
            onClick={() => setShowAddBudget(true)}
            className="h-full w-[52px] flex-shrink-0 flex items-center justify-center bg-[#1A1A1A] text-[#FFD600] rounded-2xl shadow-lg hover:bg-black active:scale-95 transition-all"
          >
            <Plus size={20} strokeWidth={3} />
          </button>
        </div>
      </section>

      {/* --- BUDGET GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : filteredData.length > 0 ? (
          filteredData.map((budget) => <CategoryCard key={budget.id} {...budget} onAdjust={() => openAdjust(budget)} />)
        ) : (
          <div className="col-span-full py-24 flex flex-col items-center justify-center border-2 border-dashed border-[#E8E2D9] rounded-[32px] bg-white">
            <div className="w-16 h-16 bg-[#F6F5F1] rounded-full flex items-center justify-center mb-4 text-[#A3A3A3]">
              <SearchX size={32} />
            </div>
            <p className="text-[#1A1A1A] font-black text-lg tracking-tight">Kategori tidak ditemukan</p>
            <p className="text-[#A3A3A3] text-sm mt-1">Coba gunakan kata kunci lain untuk "{searchQuery}".</p>
          </div>
        )}
      </div>

      {/* ================= MODAL SECTION ================= */}

      {/* --- MODAL ADD NEW BUDGET --- */}
      {showAddBudget && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowAddBudget(false)}></div>
          
          <div className="bg-white w-full max-w-md rounded-[32px] p-8 shadow-2xl relative border border-[#E8E2D9] animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setShowAddBudget(false)} 
              className="absolute right-6 top-6 p-2 text-[#A3A3A3] hover:text-[#1A1A1A] hover:bg-[#F6F5F1] rounded-full transition-all"
            >
              <X size={20} />
            </button>

            <div className="mb-8">
              <h3 className="text-2xl font-black tracking-tighter text-[#1A1A1A] mb-2">Tambah Anggaran</h3>
              <p className="text-sm text-[#7A746E] font-medium leading-relaxed">
                Buat kategori target anggaran baru untuk mengontrol arus kas Anda.
              </p>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#A3A3A3] ml-1">Nama Kategori</label>
                <input 
                  type="text" 
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  list="budget-category-options"
                  placeholder="Contoh: Belanja Bulanan" 
                  className="w-full h-14 px-6 bg-[#F6F5F1] rounded-2xl border border-[#E8E2D9] font-bold text-[#1A1A1A] outline-none focus:border-[#FFD600] focus:bg-white transition-all" 
                />
                <datalist id="budget-category-options">
                  {categories
                    .filter((cat) => String(cat.type || "") === "expense")
                    .map((cat) => (
                      <option key={cat.idCategory} value={cat.name} />
                    ))}
                </datalist>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#A3A3A3] ml-1">Target Bulanan (Rp)</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-[#A3A3A3]">Rp</span>
                  <input 
                    type="number" 
                    value={newLimit}
                    onChange={(e) => setNewLimit(e.target.value)}
                    placeholder="0" 
                    className="w-full h-14 pl-14 pr-6 bg-[#F6F5F1] rounded-2xl border border-[#E8E2D9] font-bold text-[#1A1A1A] outline-none focus:border-[#FFD600] focus:bg-white transition-all" 
                  />
                </div>
              </div>
              
              <div className="flex gap-4 pt-4">
                 <button 
                  onClick={() => setShowAddBudget(false)} 
                  className="flex-1 h-[52px] flex items-center justify-center bg-white border border-[#E8E2D9] text-[#1A1A1A] rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#F6F5F1] transition-all"
                >
                  Batal
                </button>
                <button 
                  onClick={handleAddBudget} 
                  disabled={!newCategory || !newLimit}
                  className="flex-[2] h-[52px] flex items-center justify-center bg-[#1A1A1A] text-[#FFD600] border border-[#1A1A1A] rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg hover:bg-black active:scale-95 disabled:opacity-50 transition-all"
                >
                  Buat Target
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL ADJUST BUDGET --- */}
      {showAdjust && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowAdjust(false)}></div>
          
          <div className="bg-white w-full max-w-md rounded-[32px] p-8 shadow-2xl relative border border-[#E8E2D9] animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setShowAdjust(false)} 
              className="absolute right-6 top-6 p-2 text-[#A3A3A3] hover:text-[#1A1A1A] hover:bg-[#F6F5F1] rounded-full transition-all"
            >
              <X size={20} />
            </button>

            <div className="mb-8">
              <h3 className="text-2xl font-black tracking-tighter text-[#1A1A1A] mb-2">Adjust Budget</h3>
              <p className="text-sm text-[#7A746E] font-medium leading-relaxed">
                Sesuaikan limit anggaran bulanan untuk kategori <span className="text-[#1A1A1A] font-bold px-2 py-0.5 bg-[#F6F5F1] rounded-md">{selectedBudget?.label}</span>
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#A3A3A3] ml-1">Nominal Baru (Rp)</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-[#A3A3A3]">Rp</span>
                  <input 
                    type="number" 
                    value={adjustAmount}
                    onChange={(e) => setAdjustAmount(e.target.value)}
                    placeholder="0" 
                    className="w-full h-14 pl-14 pr-6 bg-[#F6F5F1] rounded-2xl border border-[#E8E2D9] font-bold text-[#1A1A1A] outline-none focus:border-[#FFD600] focus:bg-white transition-all" 
                  />
                </div>
              </div>
              
              <div className="flex gap-4 pt-4">
                 <button 
                  onClick={() => setShowAdjust(false)} 
                  className="flex-1 h-[52px] flex items-center justify-center bg-white border border-[#E8E2D9] text-[#1A1A1A] rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#F6F5F1] transition-all"
                >
                  Batal
                </button>
                <button 
                  onClick={handleSaveAdjust} 
                  disabled={!adjustAmount}
                  className="flex-[2] h-[52px] flex items-center justify-center bg-[#1A1A1A] text-[#FFD600] border border-[#1A1A1A] rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg hover:bg-black active:scale-95 disabled:opacity-50 transition-all"
                >
                  Simpan Limit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}