"use client";
import React from "react";
import Header from "../components/header";

export default function BudgetingPage() {
  return (
    <div className="px-10 py-10 lg:px-16 space-y-10">
      <Header title="Budgeting" />

      <section>
        <h2 className="font-serif text-3xl font-bold mb-2">Budgeting</h2>
        <p className="text-fin-black/60">Kelola batasan pengeluaran kategori bulanan Anda.</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <BudgetCard label="Food & Beverage" used="Rp 1.200.000" limit="Rp 2.000.000" percent={60} />
        <BudgetCard label="Transportation" used="Rp 450.000" limit="Rp 500.000" percent={90} isWarning />
        <BudgetCard label="Self Care" used="Rp 800.000" limit="Rp 1.500.000" percent={53} />
        <BudgetCard label="Entertainment" used="Rp 100.000" limit="Rp 1.000.000" percent={10} />
      </div>
    </div>
  );
}

function BudgetCard({ label, used, limit, percent, isWarning }) {
  return (
    <div className="bg-white p-8 rounded-4xl border border-fin-border shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <h3 className="font-bold text-lg">{label}</h3>
        <p className={`text-xs font-bold px-3 py-1 rounded-4xl ${isWarning ? 'bg-fin-gold/15 text-fin-gold' : 'bg-fin-bg text-fin-black/60'}`}>
          {isWarning ? 'WASPADA' : 'AMAN'}
        </p>
      </div>
      
      <div className="flex justify-between text-sm mb-2">
        <span className="text-fin-black/60">Terpakai: <b className="text-fin-black">{used}</b></span>
        <span className="text-fin-black/60">Limit: {limit}</span>
      </div>

      {/* Progress Bar Mewah */}
      <div className="w-full h-3 bg-fin-bg rounded-4xl overflow-hidden border border-fin-border">
        <div 
          className={`h-full rounded-4xl transition-all duration-1000 ${isWarning ? 'bg-fin-black' : 'bg-fin-gold'}`} 
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <p className="text-right text-xs mt-2 text-fin-black/60 font-medium">{percent}% dari total anggaran</p>
    </div>
  );
}
