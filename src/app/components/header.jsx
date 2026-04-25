import React from "react";
import { Search, Bell } from "lucide-react";

export default function Header({ title = "Overview" }) {
  return (
    <header className="flex items-center justify-between mb-10">
      {/* TITLE */}
      <h1 className="font-serif text-4xl font-bold text-fin-black tracking-tight">{title}</h1>

      {/* RIGHT */}
      <div className="flex items-center gap-6">
        {/* SEARCH */}
        <div className="bg-white border border-fin-border rounded-4xl w-75 md:w-100 flex items-center gap-3 px-5 py-3 shadow-sm focus-within:border-fin-gold focus-within:ring-1 focus-within:ring-fin-gold transition">
          <Search className="text-fin-black/60" size={18} />
          <input
            type="text"
            placeholder="Type to search..."
            className="w-full outline-none text-sm text-fin-black placeholder:text-fin-black/50 bg-transparent"
          />
        </div>

        {/* ICONS */}
        <button className="p-3 bg-white border border-fin-border rounded-4xl text-fin-black/65 hover:text-fin-gold transition shadow-sm">
          <Bell size={20} />
        </button>
        <div className="w-11 h-11 rounded-4xl bg-fin-gold text-white flex items-center justify-center font-semibold shadow-sm cursor-pointer hover:brightness-95 transition">
          Z
        </div>
      </div>
    </header>
  );
}