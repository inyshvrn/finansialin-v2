import React from "react";
import { Search, Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between mb-10">
      {/* TITLE */}
      <h1 className="font-serif text-4xl font-bold text-fin-black">Settings</h1>

      {/* RIGHT */}
      <div className="flex items-center gap-6">
        {/* SEARCH */}
        <div className="bg-white border border-fin-border rounded-full w-75 md:w-100 flex items-center gap-3 px-5 py-2.5 shadow-sm focus-within:border-fin-gold focus-within:ring-1 focus-within:ring-fin-gold transition">
          <Search className="text-fin-taupe" size={18} />
          <input
            type="text"
            placeholder="Type to search..."
            className="w-full outline-none text-sm text-fin-black placeholder:text-fin-taupe bg-transparent"
          />
        </div>

        {/* ICONS */}
        <button className="p-2.5 bg-white border border-fin-border rounded-full text-fin-taupe hover:text-fin-gold transition shadow-sm">
          <Bell size={20} />
        </button>
        <div className="w-10 h-10 rounded-full bg-fin-gold text-white flex items-center justify-center font-bold shadow-md cursor-pointer hover:scale-105 transition">
          Z
        </div>
      </div>
    </header>
  );
}