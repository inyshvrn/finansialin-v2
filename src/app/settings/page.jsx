"use client";
import React from "react";
import { Search, Bell, UserCircle2 } from "lucide-react";
import ProfileForm from "./compsett/profileForm";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#F6F5F1] px-12 py-11">
      {/* Top Header */}
      <div className="mb-32 flex items-center justify-between gap-10">
        <h1 className="text-5xl font-semibold text-fin-black" style={{ fontFamily: "'Inclusive Sans'" }}>Settings</h1>

        <div className="flex items-center gap-6">
          {/* Search Bar */}
          <div className="flex w-116 items-center gap-3 rounded-full bg-white px-6 py-5 shadow-sm">
            <Search size={22} className="text-fin-black/50" />
            <input
              type="text"
              placeholder="Type to search"
              className="bg-transparent text-base text-fin-black placeholder:text-fin-black/50 focus:outline-none"
              style={{ fontFamily: "'Inclusive Sans'" }}
            />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button className="flex h-9.5 w-9.5 items-center justify-center rounded-full bg-white text-fin-black shadow-sm hover:opacity-80">
              <Bell size={38} />
            </button>
            <button className="flex h-9.5 w-9.5 items-center justify-center rounded-full bg-white text-fin-black shadow-sm hover:opacity-80">
              <UserCircle2 size={38} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Panel */}
      <div className="rounded-[30px] bg-white px-12 py-11 shadow-sm">
        <ProfileForm />
      </div>
    </div>
  );
};