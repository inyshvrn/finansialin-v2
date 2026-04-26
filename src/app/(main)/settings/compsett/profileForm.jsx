"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { Lock, Check, Upload, Trash2 } from "lucide-react";
import { Icon } from "@iconify/react";

export default function ProfileForm() {
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // UX State untuk Foto Profil
  const [profileImage, setProfileImage] = useState("/profile-user.jpg");
  const [showPhotoMenu, setShowPhotoMenu] = useState(false);
  const fileInputRef = useRef(null);

  // State untuk form
  const [formData, setFormData] = useState({
    firstName: "Zafira",
    lastName: "Noerr",
    email: "ZafiraNackKeche@gmail.com",
    occupation: "Student",
    bio: "Target: Hemat buat beli MacBook Air M3"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- ACTIONS FOTO PROFIL ---
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Membuat URL sementara untuk preview gambar yang baru dipilih
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setShowPhotoMenu(false);
    }
  };

  const handleRemovePhoto = () => {
    setProfileImage(""); // Kosongkan state untuk memicu tampilan placeholder
    setShowPhotoMenu(false);
  };

  // Simulasi Menyimpan Profil
  const handleSaveProfile = (e) => {
    e.preventDefault(); 
    setIsSaving(true);
    
    setTimeout(() => {
      setIsSaving(false);
      setIsSuccess(true);
      console.log("Data Profil Baru:", formData);
      console.log("Foto Profil Baru:", profileImage);
      
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  return (
    <form onSubmit={handleSaveProfile} className="w-full animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* --- SISI KIRI: Area Foto --- */}
        <div className="flex-shrink-0 flex flex-col items-center">
          <div className="relative w-[304px] h-[304px]">
            <div className="absolute inset-0 rounded-full border-[8px] border-white shadow-sm z-0" />
            
            {/* Wadah Foto / Placeholder */}
            <div className="w-full h-full rounded-full overflow-hidden border border-[#D2D2D2] bg-[#F6F5F1] flex items-center justify-center">
              {profileImage ? (
                <Image 
                  src={profileImage} 
                  alt="Profile" 
                  width={304} 
                  height={304} 
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-6xl font-black text-[#A3A3A3]">
                  {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
                </span>
              )}
            </div>

            {/* Input File Tersembunyi */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/png, image/jpeg, image/jpg" 
              className="hidden" 
            />

            {/* Tombol Kamera */}
            <div className="absolute bottom-[23px] right-[15px] z-10">
              <button 
                type="button" 
                onClick={() => setShowPhotoMenu(!showPhotoMenu)}
                className="w-[67px] h-[67px] bg-[#F5CA1C] rounded-full flex items-center justify-center shadow-lg border-[4px] border-white hover:scale-110 active:scale-95 transition-all relative"
              >
                 <Icon icon="solar:camera-bold" className="text-black text-[30px]" />
              </button>

              {/* Pop-up Menu Ganti Foto */}
              {showPhotoMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowPhotoMenu(false)}></div>
                  <div className="absolute top-full right-0 mt-3 w-48 bg-white rounded-2xl border border-[#E8E2D9] shadow-xl py-2 z-50 animate-in fade-in zoom-in duration-200">
                    <button 
                      type="button"
                      onClick={() => {
                        fileInputRef.current.click();
                        setShowPhotoMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-5 py-3 text-[11px] font-black text-[#1A1A1A] uppercase tracking-widest hover:bg-[#F6F5F1] transition-colors"
                    >
                      <Upload size={16} className="text-[#F5CA1C]" /> Upload Photo
                    </button>
                    <button 
                      type="button"
                      onClick={handleRemovePhoto}
                      className="w-full flex items-center gap-3 px-5 py-3 text-[11px] font-black text-red-500 uppercase tracking-widest hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={16} /> Remove Photo
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* --- SISI KANAN: Form --- */}
        <div className="flex-1 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[16px] text-black font-normal opacity-80 ml-1">First Name</label>
              <input 
                type="text" 
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full h-[56px] px-6 rounded-[15px] border border-[#9CA3AF] bg-white outline-none focus:border-[#F5CA1C] focus:ring-1 focus:ring-[#F5CA1C] transition-all"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[16px] text-black font-normal opacity-80 ml-1">Last Name</label>
              <input 
                type="text" 
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full h-[56px] px-6 rounded-[15px] border border-[#9CA3AF] bg-white outline-none focus:border-[#F5CA1C] focus:ring-1 focus:ring-[#F5CA1C] transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[16px] text-black font-normal opacity-80 ml-1">Email</label>
            <div className="relative">
              <input 
                type="email" 
                name="email"
                value={formData.email}
                className="w-full h-[56px] px-6 pr-14 rounded-[15px] border border-[#9CA3AF] bg-gray-50 text-gray-500 outline-none cursor-not-allowed transition-all"
                disabled 
              />
              <Lock className="absolute right-6 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={20} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[16px] text-black font-normal opacity-80 ml-1">Occupation</label>
            <input 
              type="text" 
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              className="w-full h-[56px] px-6 rounded-[15px] border border-[#9CA3AF] bg-white outline-none focus:border-[#F5CA1C] focus:ring-1 focus:ring-[#F5CA1C] transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[16px] text-black font-normal opacity-80 ml-1">Bio</label>
            <textarea 
              rows="4"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full p-6 rounded-[15px] border border-[#9CA3AF] bg-white outline-none focus:border-[#F5CA1C] focus:ring-1 focus:ring-[#F5CA1C] transition-all resize-none min-h-[140px]"
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <button 
              type="submit"
              disabled={isSaving || isSuccess}
              className={`h-[56px] w-[233px] rounded-full text-[18px] font-bold shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                isSuccess 
                ? "bg-green-500 text-white" 
                : "bg-[#1D1D1D] text-[#F5CA1C] hover:bg-black active:scale-95 disabled:opacity-80"
              }`}
            >
              {isSaving && <div className="w-5 h-5 border-2 border-[#F5CA1C] border-t-transparent rounded-full animate-spin" />}
              {isSuccess && <Check size={20} />}
              {isSaving ? "Saving..." : isSuccess ? "Saved!" : "Save Change"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}