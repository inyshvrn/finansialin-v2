"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Receipt, PieChart, BarChart3, Settings, LogOut } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", icon: <LayoutDashboard size={22} />, path: "/dashboard" },
    { name: "Transactions", icon: <Receipt size={22} />, path: "/transactions" },
    { name: "Budgeting", icon: <PieChart size={22} />, path: "/budgeting" },
    { name: "Statistics", icon: <BarChart3 size={22} />, path: "/statistics" },
    { name: "Settings", icon: <Settings size={22} />, path: "/settings" },
  ];

  return (
    <aside className="w-72 bg-white border border-fin-border rounded-[40px] flex flex-col px-6 py-8 sticky top-4 h-[calc(100vh-2rem)] shadow-sm ml-4">
      <div className="flex items-center gap-3 mb-14 px-2">
        <div className="w-11 h-11 bg-fin-gold rounded-4xl flex items-center justify-center text-white font-bold text-xl shadow-sm">F</div>
        <span className="font-serif font-bold text-xl tracking-tighter text-fin-black">FINANSIALIN</span>
      </div>

      <nav className="flex flex-col gap-3 flex-1">
        {menu.map((item) => {
          const active = pathname === item.path;
          return (
            <Link key={item.name} href={item.path} className={`flex items-center gap-4 px-4 py-3.5 rounded-4xl transition-all ${
              active ? "bg-fin-black text-white shadow-sm" : "text-fin-black/70 hover:bg-fin-bg hover:text-fin-black"
            }`}>
              {item.icon}
              <span className="font-semibold">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <button className="flex items-center gap-4 px-4 py-3.5 text-fin-black font-semibold hover:bg-fin-bg rounded-4xl transition mt-auto border border-fin-border shadow-sm">
        <LogOut size={22} />
        <span>Logout</span>
      </button>
    </aside>
  );
};