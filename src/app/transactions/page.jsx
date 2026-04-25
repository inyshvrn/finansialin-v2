"use client";
import React from "react";
import Header from "../components/header";
import { Plus, Filter, Download } from "lucide-react";

export default function TransactionsPage() {
  return (
    <div className="px-10 py-10 lg:px-16 space-y-8">
      <Header title="Transactions" />
      
      <div className="flex justify-between items-end">
        <div>
          <h2 className="font-serif text-3xl font-bold">Transactions</h2>
          <p className="text-fin-black/60 mt-1">Pantau semua arus kas masuk dan keluar Anda.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-3 border border-fin-border rounded-4xl font-semibold hover:bg-white transition shadow-sm">
            <Filter size={18} /> Filter
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-fin-black text-white rounded-4xl font-semibold hover:opacity-90 transition shadow-sm">
            <Plus size={18} /> Add Transaction
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-4xl border border-fin-border shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-fin-bg/50 border-b border-fin-border text-fin-black/55 uppercase text-xs tracking-widest">
              <th className="px-8 py-5 font-semibold">Description</th>
              <th className="px-8 py-5 font-semibold">Category</th>
              <th className="px-8 py-5 font-semibold">Date</th>
              <th className="px-8 py-5 font-semibold text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-fin-border">
            <TransactionRow name="Gaji Bulanan" cat="Income" date="25 Apr 2026" price="+ Rp 15.000.000" isInc />
            <TransactionRow name="Sewa Apartemen" cat="Housing" date="24 Apr 2026" price="- Rp 3.500.000" />
            <TransactionRow name="Makan Malam Sate" cat="Food" date="24 Apr 2026" price="- Rp 50.000" />
            <TransactionRow name="Tagihan Listrik" cat="Utilities" date="23 Apr 2026" price="- Rp 450.000" />
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TransactionRow({ name, cat, date, price, isInc }) {
  return (
    <tr className="hover:bg-fin-bg/30 transition group">
      <td className="px-8 py-6 font-bold text-fin-black">{name}</td>
      <td className="px-8 py-6 text-fin-black/60">{cat}</td>
      <td className="px-8 py-6 text-fin-black/60">{date}</td>
      <td className={`px-8 py-6 text-right font-bold ${isInc ? 'text-fin-gold' : 'text-fin-black'}`}>{price}</td>
    </tr>
  );
}