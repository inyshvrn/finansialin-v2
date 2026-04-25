import React from "react";
import Image from "next/image";

export default function Sidebar() {
  return (
    <aside className="w-65 bg-white flex flex-col border-r border-fin-border shadow-sm px-6 py-10">
      
      {/* LOGO */}
      <div className="flex items-center gap-3 mb-12 px-2">
        <Image src="/logo.svg" alt="Logo" width={40} height={40} />
        <span className="font-serif font-bold text-xl tracking-wide text-fin-black">
          Finansialin
        </span>
      </div>

      {/* MENU */}
      <nav className="flex flex-col gap-2 flex-1">
        <MenuItem text="Dashboard" />
        <MenuItem text="Transactions" />
        <MenuItem text="Budgeting" />
        <MenuItem text="Statistics" />

        {/* ACTIVE ITEM */}
        <div className="px-4 py-3 cursor-pointer bg-fin-bg text-fin-black font-bold border-l-4 border-fin-gold rounded-r-xl transition">
          Settings
        </div>
      </nav>

      {/* LOGOUT */}
      <div className="px-4 py-3 cursor-pointer text-red-500 font-medium hover:bg-red-50 rounded-xl transition mt-auto">
        Logout
      </div>
    </aside>
  );
}

function MenuItem({ text }) {
  return (
    <div className="px-4 py-3 cursor-pointer text-fin-taupe font-medium rounded-xl hover:bg-fin-bg transition">
      {text}
    </div>
  );
}