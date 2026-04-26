"use client";
import React from "react";
import Image from "next/image";
import { Lock } from "lucide-react";
import { Icon } from "@iconify/react";

export default function ProfileForm() {
  return (
    <div className="flex flex-col gap-[60px] animate-in fade-in duration-700">
      
      {/* Tab Switcher - Match Figma Rectangles 11 & 12 */}
      <div className="flex w-fit items-center rounded-full border border-[#979797] bg-white p-[3px]">
        <button className="h-[45px] w-[158px] rounded-full bg-[#F5CA1C] text-[16px] font-normal text-black shadow-sm transition-all duration-300">
          Edit Profile
        </button>
        <button className="h-[45px] w-[158px] rounded-full text-[16px] font-normal text-[#616161] transition-all hover:text-black">
          Preferences
        </button>
      </div>

      {/* Main Content Grid - Match Figma Spacing */}
      <div className="grid grid-cols-1 lg:grid-cols-[304px_1fr] gap-[80px] items-start">
        
        {/* Left Side: Photo Section - Precision Layout */}
        <div className="relative flex justify-center lg:justify-start">
          <div className="relative w-[304px] h-[304px]">
            {/* Outer Decorative Circle from image_c7394f */}
            <div className="absolute inset-0 rounded-full border-[8px] border-[#F6F5F1] z-0 shadow-sm" />
            
            {/* The Image Wrapper */}
            <div className="w-full h-full rounded-full overflow-hidden border border-[#D2D2D2] bg-[#D9D9D9]">
              <Image 
                src="/profile-user.jpg" 
                alt="Profile" 
                width={304} 
                height={304} 
                className="object-cover w-full h-full transition-transform hover:scale-105 duration-500"
              />
            </div>

            {/* Camera Button - Match Figma Rectangle 16 position */}
            <button className="absolute bottom-[23px] right-[15px] w-[67px] h-[67px] bg-[#F5CA1C] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-10 border-[4px] border-white">
               <Icon icon="solar:camera-bold" className="text-black text-[30px]" />
            </button>
          </div>
        </div>

        {/* Right Side: Form Fields - Match Figma Inclusive Sans style */}
        <div className="max-w-[560px] w-full space-y-[25px]">
          
          {/* Name Row */}
          <div className="grid grid-cols-2 gap-[20px]">
            <div className="space-y-[8px]">
              <label className="text-[16px] text-black font-normal opacity-80 ml-1">First Name</label>
              <input 
                type="text" 
                defaultValue="Zafira" 
                className="w-full h-[52px] px-[20px] rounded-[15px] border border-[#9CA3AF] bg-white outline-none focus:border-[#F5CA1C] focus:ring-1 focus:ring-[#F5CA1C] transition-all"
              />
            </div>
            <div className="space-y-[8px]">
              <label className="text-[16px] text-black font-normal opacity-80 ml-1">Last Name</label>
              <input 
                type="text" 
                defaultValue="Noerr" 
                className="w-full h-[52px] px-[20px] rounded-[15px] border border-[#9CA3AF] bg-white outline-none focus:border-[#F5CA1C] focus:ring-1 focus:ring-[#F5CA1C] transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-[8px]">
            <label className="text-[16px] text-black font-normal opacity-80 ml-1">Email</label>
            <div className="relative">
              <input 
                type="email" 
                defaultValue="ZafiraNackKeche@gmail.com" 
                className="w-full h-[52px] px-[20px] pr-[50px] rounded-[15px] border border-[#9CA3AF] bg-white outline-none focus:border-[#F5CA1C] focus:ring-1 focus:ring-[#F5CA1C] transition-all"
              />
              <Lock className="absolute right-[20px] top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={18} />
            </div>
          </div>

          {/* Occupation */}
          <div className="space-y-[8px]">
            <label className="text-[16px] text-black font-normal opacity-80 ml-1">Occupation</label>
            <input 
              type="text" 
              defaultValue="Student" 
              className="w-full h-[52px] px-[20px] rounded-[15px] border border-[#9CA3AF] bg-white outline-none focus:border-[#F5CA1C] focus:ring-1 focus:ring-[#F5CA1C] transition-all"
            />
          </div>

          {/* Bio */}
          <div className="space-y-[8px]">
            <label className="text-[16px] text-black font-normal opacity-80 ml-1">Bio</label>
            <textarea 
              rows="4"
              defaultValue="Target: Hemat buat beli MacBook Air M3" 
              className="w-full px-[20px] py-[15px] rounded-[15px] border border-[#9CA3AF] bg-white outline-none focus:border-[#F5CA1C] focus:ring-1 focus:ring-[#F5CA1C] transition-all resize-none min-h-[136px]"
            />
          </div>

          {/* Save Button - Match Figma Button Spec */}
          <div className="flex justify-end pt-[10px]">
            <button className="h-[56px] w-[233px] bg-[#1D1D1D] text-[#F5CA1C] rounded-full text-[20px] font-bold shadow-lg hover:bg-black hover:shadow-xl transition-all duration-300">
              Save Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}