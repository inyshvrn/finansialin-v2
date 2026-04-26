"use client";
import React, { useState } from "react";
import Header from "../components/header";
import ProfileForm from "./compsett/profileForm";
import Preferences from "./compsett/preferences";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Reusable Header dari Dashboard */}
      <Header name="ABP" />
      
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-sm font-black uppercase tracking-tighter text-[#1A1A1A]">Account Settings</h2>
          <p className="text-sm text-[#7A746E] font-medium">Kelola informasi profil dan preferensi keamanan Anda.</p>
        </div>

        {/* Tab Switcher - Styling senada dengan Dashboard Buttons */}
        <div className="flex w-fit items-center rounded-full border border-[#E8E2D9] bg-white p-1.5 shadow-sm">
          <button 
            onClick={() => setActiveTab("profile")}
            className={`h-11 w-40 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${
              activeTab === "profile" 
              ? "bg-[#FFD600] text-[#1A1A1A] shadow-sm" 
              : "text-[#7A746E] hover:text-[#1A1A1A]"
            }`}
          >
            Edit Profile
          </button>
          <button 
            onClick={() => setActiveTab("preferences")}
            className={`h-11 w-40 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${
              activeTab === "preferences" 
              ? "bg-[#FFD600] text-[#1A1A1A] shadow-sm" 
              : "text-[#7A746E] hover:text-[#1A1A1A]"
            }`}
          >
            Preferences
          </button>
        </div>
      </div>

      {/* Main Content Card - Mengikuti Style Dashboard (p-8, rounded-[32px]) */}
      <div className="bg-white p-10 lg:p-14 rounded-[32px] border border-[#E8E2D9] shadow-sm min-h-[600px] relative overflow-hidden">
        {/* Dekorasi lingkaran halus seperti di BankCard Dashboard */}
        <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-[#F6F5F1] opacity-50 z-0"></div>
        
        <div className="relative z-10">
          {activeTab === "profile" ? <ProfileForm /> : <Preferences />}
        </div>
      </div>
    </div>
  );
}