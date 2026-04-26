"use client";
import React, { useState } from "react";
import Header from "../../components/header";
import ProfileForm from "./compsett/profileForm";
import Preferences from "./compsett/preferences";
import { User, SlidersHorizontal } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20 relative">
      {/* Header Global */}
      <Header />

      <div className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-black tracking-tighter text-[#1A1A1A]">Account Settings</h2>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A3A3A3]">Manage Profile & Preferences</p>
        </div>

        {/* Tab Switcher - Premium Pill Design */}
        <div className="flex w-fit items-center rounded-2xl border border-[#E8E2D9] bg-white p-1.5 shadow-sm">
          <button
            onClick={() => setActiveTab("profile")}
            className={`h-12 px-6 flex items-center justify-center gap-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
              activeTab === "profile" 
              ? "bg-[#1A1A1A] text-[#FFD600] shadow-md" 
              : "text-[#A3A3A3] hover:text-[#1A1A1A] hover:bg-[#F6F5F1]"
            }`}
          >
            <User size={16} /> Edit Profile
          </button>
          <button
            onClick={() => setActiveTab("preferences")}
            className={`h-12 px-6 flex items-center justify-center gap-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
              activeTab === "preferences" 
              ? "bg-[#1A1A1A] text-[#FFD600] shadow-md" 
              : "text-[#A3A3A3] hover:text-[#1A1A1A] hover:bg-[#F6F5F1]"
            }`}
          >
            <SlidersHorizontal size={16} /> Preferences
          </button>
        </div>
      </div>

      {/* Main Content Card - Smooth Transisition Wrapper */}
      <div className="bg-white p-10 lg:p-12 rounded-[40px] border border-[#E8E2D9] shadow-sm min-h-[600px] relative overflow-hidden group transition-all duration-500">
        {/* Dekorasi Glow Latar Belakang */}
        <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-[#FFD600] opacity-[0.03] blur-[60px] group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none"></div>

        {/* Konten Tab Rendered di Sini */}
        <div className="relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500" key={activeTab}>
          {activeTab === "profile" ? <ProfileForm /> : <Preferences />}
        </div>
      </div>
    </div>
  );
}