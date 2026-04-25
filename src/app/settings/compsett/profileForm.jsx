"use client";
import React from "react";
import Image from "next/image";
import { Lock } from "lucide-react";
import { Icon } from "@iconify/react";

export default function ProfileForm() {
  return (
    <div className="flex flex-col gap-15 animate-in fade-in duration-500">
      
      {/* Tab Switcher (Rectangle 11 & 12) */}
      <div className="flex w-fit items-center rounded-full border border-[#979797] bg-white p-0.5">
        <button className="h-11.25 w-39.5 rounded-full bg-[#F5CA1C] text-[16px] font-normal text-black shadow-sm transition">
          Edit Profile
        </button>
        <button className="h-11.25 w-39.5 rounded-full text-[16px] font-normal text-black/60 transition hover:text-black">
          Preferences
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-15 items-start">
        
        {/* Left Side: Photo Section */}
        <div className="relative flex justify-center">
          <div className="relative w-76 h-76">
            {/* Outer Circle Shadow/Border (image_c7394f) */}
            <div className="absolute inset-0 rounded-full border-8 border-[#F6F5F1] shadow-sm z-0" />
            
            {/* The Image (Main Photo) */}
            <div className="w-full h-full rounded-full overflow-hidden border border-[#D2D2D2]">
              <Image 
                src="/profile-user.jpg" 
                alt="Profile" 
                width={304} 
                height={304} 
                className="object-cover w-full h-full"
              />
            </div>

            {/* Camera Button (Rectangle 16) */}
            <button className="absolute bottom-5 right-2.5 w-16.75 h-16.75 bg-[#F5CA1C] rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform z-10">
               <Icon icon="solar:camera-bold" className="text-black text-[32px]" />
            </button>
          </div>
        </div>

        {/* Right Side: Form Fields */}
        <div className="max-w-156.25 space-y-7.5">
          
          <div className="grid grid-cols-2 gap-6.25">
            <div className="space-y-2.5">
              <label className="text-[16px] text-black font-normal ml-1">First Name</label>
              <input 
                type="text" 
                defaultValue="Zafira" 
                className="w-full h-13 px-5 rounded-[15px] border border-[#9CA3AF] bg-white outline-none focus:border-[#F5CA1C] transition"
              />
            </div>
            <div className="space-y-2.5">
              <label className="text-[16px] text-black font-normal ml-1">Last Name</label>
              <input 
                type="text" 
                defaultValue="Noerr" 
                className="w-full h-13 px-5 rounded-[15px] border border-[#9CA3AF] bg-white outline-none focus:border-[#F5CA1C] transition"
              />
            </div>
          </div>

          <div className="space-y-2.5">
            <label className="text-[16px] text-black font-normal ml-1">Email</label>
            <div className="relative">
              <input 
                type="email" 
                defaultValue="ZafiraNackKeche@gmail.com" 
                className="w-full h-13 px-5 pr-12 rounded-[15px] border border-[#9CA3AF] bg-white outline-none focus:border-[#F5CA1C] transition"
              />
              <Lock className="absolute right-5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={18} />
            </div>
          </div>

          <div className="space-y-2.5">
            <label className="text-[16px] text-black font-normal ml-1">Occupation</label>
            <input 
              type="text" 
              defaultValue="Student" 
              className="w-full h-13 px-5 rounded-[15px] border border-[#9CA3AF] bg-white outline-none focus:border-[#F5CA1C] transition"
            />
          </div>

          <div className="space-y-2.5">
            <label className="text-[16px] text-black font-normal ml-1">Bio</label>
            <textarea 
              rows="4"
              defaultValue="Target: Hemat buat beli MacBook Air M3" 
              className="w-full px-5 py-3.75 rounded-[15px] border border-[#9CA3AF] bg-white outline-none focus:border-[#F5CA1C] transition resize-none min-h-35"
            />
          </div>

          <div className="flex justify-end">
            <button className="h-14 px-11 bg-[#1D1D1D] text-[#F5CA1C] rounded-full text-[18px] font-bold shadow-lg hover:bg-black transition-colors">
              Save Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};