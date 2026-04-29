"use client";
import React, { useMemo, useState } from "react";
import {
  Search,
  Bell,
  Pencil,
  ChevronDown,
  X,
  CreditCard,
  Wallet,
  Banknote,
  Plane,
  Car,
  AlertCircle,
} from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { apiPut } from "@/lib/apiClient";
import Header from "../../components/header";
import Select from "@/components/ui/Select";
import {
  SkeletonCard,
  SkeletonTable,
  SkeletonText,
} from "@/components/ui/Skeleton";

const BankCard = React.memo(({ type, icon: Icon, amount, color, onEdit }) => (
  <div className="bg-white p-7 rounded-[32px] shadow-sm border border-[#E8E2D9] flex flex-col justify-between h-48 relative overflow-hidden group hover:shadow-md transition-all">
    <div
      className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none"
      style={{
        backgroundImage: `radial-gradient(${color} 0.5px, transparent 0.5px), radial-gradient(${color} 0.5px, transparent 0.5px)`,
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 10px 10px",
      }}
    ></div>

    <div
      className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"
      style={{ backgroundColor: color }}
    ></div>

    <div className="flex justify-between items-start relative z-10">
      <div>
        <p className="text-[11px] text-[#A3A3A3] font-black uppercase tracking-widest">
          {type}
        </p>
      </div>
      <div className="p-3 rounded-2xl shadow-sm bg-white border border-[#E8E2D9]/50 group-hover:scale-110 transition-transform">
        <Icon size={24} style={{ color: color }} />
      </div>
    </div>

    <div className="mt-auto flex justify-between items-end relative z-10">
      <div>
        <p className="text-3xl font-black tracking-tighter text-[#1A1A1A]">
          {amount}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-[10px] text-[#A3A3A3] font-medium">
            Total balance
          </p>
          <div className="h-px w-8 bg-[#E8E2D9]"></div>
        </div>
      </div>
      <button
        onClick={onEdit}
        className="p-2.5 bg-[#F6F5F1] hover:bg-[#FFD600] text-[#A3A3A3] hover:text-[#1A1A1A] rounded-xl transition-all shadow-sm"
      >
        <Pencil size={14} />
      </button>
    </div>
  </div>
));
BankCard.displayName = "BankCard";

const GoalItem = React.memo(({ name, icon: Icon, progress }) => (
  <div className="flex gap-4 items-center">
    <div className="p-3 bg-[#F6F5F1] rounded-2xl">
      <Icon size={20} />
    </div>
    <div className="flex-1">
      <div className="flex justify-between text-[11px] font-black mb-1 text-[#1A1A1A]">
        <span>{name}</span>
        <span className="text-[#A3A3A3]">{progress}%</span>
      </div>
      <div className="w-full h-1.5 bg-[#F6F5F1] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#1A1A1A] rounded-full transition-all duration-1000"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  </div>
));
GoalItem.displayName = "GoalItem";

export default function DashboardPage() {
  const [editingSource, setEditingSource] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    initialBalance: "",
  });
  const [editError, setEditError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const {
    data: userProfile,
    isLoading: isProfileLoading,
    error: profileError,
  } = useApi("/api/auth/profile");
  const {
    data: fundingSources,
    isLoading: isFundingLoading,
    error: fundingError,
    refetch: refetchFunding,
  } = useApi("/api/funding-sources");
  const {
    data: dashboardData,
    isLoading: isDashboardLoading,
    error: dashboardError,
  } = useApi("/api/insights/dashboard-summary");
  const {
    data: rawBudgets,
    isLoading: isBudgetLoading,
    error: budgetError,
  } = useApi("/api/budgets");
  const {
    data: categories,
    isLoading: isCatLoading,
    error: catError,
  } = useApi("/api/categories");

  const isLoading =
    isProfileLoading ||
    isFundingLoading ||
    isDashboardLoading ||
    isBudgetLoading ||
    isCatLoading;
  const error =
    profileError || fundingError || dashboardError || budgetError || catError;

  // Extract data from dashboard summary API
  const totalIncome = dashboardData?.totalIncome || 0;
  const totalExpense = dashboardData?.totalExpense || 0;
  const totalBalance = dashboardData?.totalBalance || 0;
  const incomeChartData = useMemo(
    () => dashboardData?.incomeChartData || [],
    [dashboardData?.incomeChartData],
  );
  const recentTransactions = useMemo(
    () => dashboardData?.recentTransactions || [],
    [dashboardData?.recentTransactions],
  );

  const budgets = useMemo(() => {
    return (rawBudgets || []).slice(0, 2);
  }, [rawBudgets]);

  const formatCurrency = (value) =>
    `Rp ${Number(value || 0).toLocaleString("id-ID")}`;

  // Extract chart data from API response
  const chartHeights = useMemo(() => {
    const incomeValues = (incomeChartData || []).map(
      (item) => item.amount || 0,
    );
    const maxValue = Math.max(...incomeValues, 1);
    return incomeValues.map((v) => (v / maxValue) * 100);
  }, [incomeChartData]);

  const monthLabels = useMemo(() => {
    return (incomeChartData || []).map((item) => item.month || "");
  }, [incomeChartData]);

  const handleEditSource = (source) => {
    setEditingSource(source);
    setEditFormData({
      name: source.name,
      initialBalance: source.initialBalance || "",
    });
    setEditError("");
  };

  const handleSaveSource = async () => {
    if (!editFormData.name.trim()) {
      setEditError("Nama dompet tidak boleh kosong");
      return;
    }

    setIsSaving(true);
    setEditError("");

    try {
      await apiPut(`/api/funding-sources/${editingSource.idFundingSource}`, {
        name: editFormData.name.trim(),
        initialBalance: Number(editFormData.initialBalance) || 0,
      });
      refetchFunding();
      setEditingSource(null);
    } catch (err) {
      setEditError(err.message || "Gagal menyimpan dompet");
    } finally {
      setIsSaving(false);
    }
  };

  if (error) {
    return (
      <div className="space-y-10">
        <Header name={userProfile?.name || "Dashboard"} />
        <div className="bg-red-50 border border-red-200 rounded-[32px] p-8 flex items-center gap-4">
          <AlertCircle size={24} className="text-red-600" />
          <div>
            <h3 className="font-black text-red-600">Error loading dashboard</h3>
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <Header name={userProfile?.name || "User"} />

      {/* Row Kartu Bank */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (fundingSources || []).length > 0 ? (
          (fundingSources || []).map((source, idx) => (
            <BankCard
              key={idx}
              type={source.name || `Source ${idx + 1}`}
              icon={idx === 0 ? CreditCard : idx === 1 ? Wallet : Banknote}
              amount={formatCurrency(
                source.availableBalance ?? source.currentBalance ?? 0,
              )}
              color={idx === 0 ? "#00529C" : idx === 1 ? "#FFD600" : "#1A1A1A"}
              onEdit={() => handleEditSource(source)}
            />
          ))
        ) : (
          <>
            <BankCard
              type="MBanking"
              icon={CreditCard}
              amount="Rp0"
              color="#00529C"
            />
            <BankCard
              type="Emoney"
              icon={Wallet}
              amount="Rp0"
              color="#FFD600"
            />
            <BankCard
              type="Cash"
              icon={Banknote}
              amount="Rp0"
              color="#1A1A1A"
            />
          </>
        )}
      </section>

      {/* Row Grafik & Aktivitas */}
      <section className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 bg-white p-8 rounded-[32px] border border-[#E8E2D9] shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-center mb-10 font-black uppercase text-sm tracking-tighter relative z-10">
            <h3 className="flex items-center gap-2">
              Total Income <ChevronDown size={16} className="text-[#FFD600]" />
            </h3>
            <div className="text-[11px] border border-[#E8E2D9] px-4 py-2 rounded-xl text-[#7A746E] bg-[#FDFCFB]">
              Last 6 months
            </div>
          </div>

          <div className="h-64 flex items-end justify-between gap-3 px-2 relative z-10">
            {isLoading ? (
              <div className="w-full h-full flex items-end">
                <SkeletonText lines={1} className="w-full h-1/2" />
              </div>
            ) : (
              chartHeights.map((height, i) => (
                <div key={i} className="flex-1 group relative">
                  <div
                    className="bg-[#F6F5F1] group-hover:bg-[#FFD600] transition-all rounded-t-2xl w-full"
                    style={{ height: `${Math.max(height, 5)}%` }}
                  ></div>
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] text-[#A3A3A3] font-black uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                    {monthLabels[i]}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 bg-white p-8 rounded-[32px] border border-[#E8E2D9] shadow-sm flex flex-col items-center justify-between">
          <h3 className="w-full text-sm font-black uppercase tracking-tighter mb-8">
            Activity
          </h3>
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-44 h-44 rounded-full bg-gray-200 animate-pulse"></div>
            </div>
          ) : (
            <>
              <div className="relative w-44 h-44">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 120 120"
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="#F6F5F1"
                    strokeWidth="12"
                    fill="transparent"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="#FFD600"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray="314"
                    strokeDashoffset="100"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="#1A1A1A"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray="314"
                    strokeDashoffset="260"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-black leading-tight text-[#1A1A1A]">
                    {formatCurrency(totalIncome)}
                  </span>
                  <span className="text-[9px] font-black text-[#A3A3A3] uppercase tracking-widest">
                    Income
                  </span>
                </div>
              </div>
              <div className="w-full mt-6 flex justify-around text-[10px] font-black uppercase tracking-tighter">
                <div className="flex items-center gap-2 text-[#7A746E]">
                  <div className="w-2 h-2 rounded-full bg-[#FFD600]"></div>{" "}
                  Income
                </div>
                <div className="flex items-center gap-2 text-[#7A746E]">
                  <div className="w-2 h-2 rounded-full bg-[#1A1A1A]"></div>{" "}
                  Outcome
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Row History & Goals */}
      <section className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 bg-white p-8 rounded-[32px] border border-[#E8E2D9] shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-tighter mb-8">
            Transaction history
          </h3>
          {isLoading ? (
            <SkeletonTable rows={3} cols={4} />
          ) : (
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
                  {recentTransactions.map((trx, i) => (
                    <tr
                      key={i}
                      className="border-b border-[#F6F5F1] last:border-0 hover:bg-[#FDFCFB] transition-colors group"
                    >
                      <td className="py-5">{trx.description}</td>
                      <td className="py-5 text-[#A3A3A3] font-medium">
                        {trx.categoryName}
                      </td>
                      <td className="py-5 font-medium text-[#7A746E]">
                        {trx.date}
                      </td>
                      <td className="py-5 text-right font-black">
                        Rp{Number(trx.amount).toLocaleString("id-ID")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="col-span-12 lg:col-span-4 bg-white p-8 rounded-[32px] border border-[#E8E2D9] shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-sm font-black uppercase tracking-tighter">
              My Goals
            </h3>
            <button className="bg-[#FFD600] hover:bg-[#1A1A1A] hover:text-white transition-all text-[#1A1A1A] text-[10px] font-black px-4 py-2 rounded-full shadow-sm">
              Add
            </button>
          </div>
          <div className="space-y-7">
            {isLoading ? (
              <>
                <SkeletonText lines={2} className="mb-4" />
                <SkeletonText lines={2} />
              </>
            ) : budgets.length > 0 ? (
              budgets.map((budget, idx) => {
                const categoryName =
                  categories?.find((c) => c.idCategory === budget.idCategory)
                    ?.name || "Budget Goal";
                const percent = Math.round(
                  (Number(budget.spent || 0) / Number(budget.amount || 1)) *
                    100,
                );
                return (
                  <GoalItem
                    key={idx}
                    name={categoryName}
                    icon={idx === 0 ? Plane : Car}
                    progress={percent}
                  />
                );
              })
            ) : (
              <>
                <GoalItem name="Travel to Japan" icon={Plane} progress={0} />
                <GoalItem name="New Family Car" icon={Car} progress={0} />
              </>
            )}
          </div>
        </div>
      </section>

      {/* --- MODAL EDIT FUNDING SOURCE --- */}
      {editingSource && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-md p-6 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-[32px] p-10 shadow-2xl relative animate-in zoom-in-95 overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#FFD600]"></div>
            <button
              onClick={() => setEditingSource(null)}
              className="absolute top-6 right-6 p-2 hover:bg-[#F6F5F1] rounded-lg transition text-[#A3A3A3] hover:text-[#1A1A1A]"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-black mb-8 tracking-tighter text-[#1A1A1A] pr-8">
              Edit Dompet
            </h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <Select
                  label="Nama Dompet"
                  required
                  value={editFormData.name}
                  onChange={(val) =>
                    setEditFormData({ ...editFormData, name: val })
                  }
                  searchable
                  options={["mbanking", "emoney", "cash"].map((name) => ({
                    value: name,
                    label: name.charAt(0).toUpperCase() + name.slice(1),
                  }))}
                  placeholder="Select wallet name..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#A3A3A3]">
                  Saldo Awal (Rp)
                </label>
                <input
                  type="number"
                  value={editFormData.initialBalance}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      initialBalance: e.target.value,
                    })
                  }
                  placeholder="0"
                  className="w-full h-12 bg-[#F6F5F1] rounded-2xl px-5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#FFD600] border border-[#E8E2D9]"
                />
              </div>

              {editError && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                  {editError}
                </div>
              )}

              <div className="flex gap-3 pt-6">
                <button
                  onClick={() => setEditingSource(null)}
                  disabled={isSaving}
                  className="flex-1 py-3.5 bg-[#F6F5F1] text-[#A3A3A3] font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-[#E8E2D9] transition-all border border-[#E8E2D9] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveSource}
                  disabled={isSaving}
                  className="flex-1 py-3.5 bg-[#1A1A1A] text-[#FFD600] font-black uppercase tracking-[0.2em] rounded-2xl shadow-lg hover:bg-black transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSaving ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
