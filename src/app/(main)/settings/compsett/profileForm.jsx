"use client";
import React from "react";
import Image from "next/image";
import { Lock } from "lucide-react";
import { Icon } from "@iconify/react";

export default function ProfileForm() {
  return (
    <div className="w-full animate-in fade-in duration-700">
      {/* Menggunakan w-full dan gap yang konsisten agar form memanjang ke kanan */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* SISI KIRI: Area Foto (Fixed Width agar tidak gepeng) */}
        <div className="flex-shrink-0 flex flex-col items-center">
          <div className="relative w-[304px] h-[304px]">
            {/* Dekorasi lingkaran luar seperti di Figma */}
            <div className="absolute inset-0 rounded-full border-[8px] border-fin-bg shadow-sm z-0" />
            
            <div className="w-full h-full rounded-full overflow-hidden border border-[#D2D2D2] bg-[#D9D9D9]">
              <Image 
                src="/profile-user.jpg" 
                alt="Profile" 
                width={304} 
                height={304} 
                className="object-cover w-full h-full"
              />
            </div>

            {/* Tombol Kamera Kuning */}
            <button className="absolute bottom-[23px] right-[15px] w-[67px] h-[67px] bg-[#F5CA1C] rounded-full flex items-center justify-center shadow-lg border-[4px] border-white hover:scale-110 transition-transform z-10">
               <Icon icon="solar:camera-bold" className="text-black text-[30px]" />
            </button>
          </div>
        </div>

        {/* SISI KANAN: Form yang memanjang (flex-1 agar mengisi sisa ruang) */}
        <div className="flex-1 space-y-8">
          
          {/* Row: First Name & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[16px] text-black font-normal opacity-80 ml-1">First Name</label>
              <input 
                type="text" 
                defaultValue="Zafira" 
                className="w-full h-[56px] px-6 rounded-[15px] border border-[#9CA3AF] bg-white outline-none focus:border-[#F5CA1C] focus:ring-1 focus:ring-[#F5CA1C] transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[16px] text-black font-normal opacity-80 ml-1">Last Name</label>
              <input 
                type="text" 
                defaultValue="Noerr" 
                className="w-full h-[56px] px-6 rounded-[15px] border border-[#9CA3AF] bg-white outline-none focus:border-[#F5CA1C] focus:ring-1 focus:ring-[#F5CA1C] transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-[16px] text-black font-normal opacity-80 ml-1">Email</label>
            <div className="relative">
              <input 
                type="email" 
                defaultValue="ZafiraNackKeche@gmail.com" 
                className="w-full h-[56px] px-6 pr-14 rounded-[15px] border border-[#9CA3AF] bg-white outline-none focus:border-[#F5CA1C] focus:ring-1 focus:ring-[#F5CA1C] transition-all"
              />
              <Lock className="absolute right-6 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={20} />
            </div>
          </div>

          {/* Occupation */}
          <div className="space-y-2">
            <label className="text-[16px] text-black font-normal opacity-80 ml-1">Occupation</label>
            <input 
              type="text" 
              defaultValue="Student" 
              className="w-full h-[56px] px-6 rounded-[15px] border border-[#9CA3AF] bg-white outline-none focus:border-[#F5CA1C] focus:ring-1 focus:ring-[#F5CA1C] transition-all"
            />
          </div>

          {/* Bio - Bagian ini akan memanjang mengikuti flex-1 kanan */}
          <div className="space-y-2">
            <label className="text-[16px] text-black font-normal opacity-80 ml-1">Bio</label>
            <textarea 
              rows="4"
              defaultValue="Target: Hemat buat beli MacBook Air M3" 
              className="w-full p-6 rounded-[15px] border border-[#9CA3AF] bg-white outline-none focus:border-[#F5CA1C] focus:ring-1 focus:ring-[#F5CA1C] transition-all resize-none min-h-[140px]"
            />
          </div>

          {/* Save Button - Rata Kanan di ujung form */}
          <div className="flex justify-end pt-4">
            <button className="h-[56px] w-[233px] bg-[#1D1D1D] text-[#F5CA1C] rounded-full text-[18px] font-bold shadow-lg hover:bg-black hover:shadow-xl transition-all duration-300">
              Save Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}