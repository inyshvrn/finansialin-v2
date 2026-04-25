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
    <aside className="w-70 bg-white border-r border-fin-border flex flex-col px-6 py-10 sticky top-0 h-screen shadow-sm">
      <div className="flex items-center gap-3 mb-14 px-2">
        <div className="w-10 h-10 bg-fin-gold rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">F</div>
        <span className="font-serif font-bold text-xl tracking-tighter text-fin-black">FINANSIALIN</span>
      </div>

      <nav className="flex flex-col gap-3 flex-1">
        {menu.map((item) => {
          const active = pathname === item.path;
          return (
            <Link key={item.name} href={item.path} className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all ${
              active ? "bg-fin-black text-white shadow-xl scale-[1.02]" : "text-fin-taupe hover:bg-fin-bg hover:text-fin-black"
            }`}>
              {item.icon}
              <span className="font-semibold">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <button className="flex items-center gap-4 px-4 py-3.5 text-red-500 font-semibold hover:bg-red-50 rounded-2xl transition mt-auto">
        <LogOut size={22} />
        <span>Logout</span>
      </button>
    </aside>
  );
};