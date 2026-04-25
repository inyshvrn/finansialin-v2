import React from "react";
import Image from "next/image";
import { Camera } from "lucide-react";

export default function ProfileForm() {
  return (
    <div className="bg-white rounded-[40px] p-10 lg:p-14 border border-fin-border shadow-sm">
      
      {/* TAB (Dipindah ke atas agar layout lebih logis) */}
      <div className="flex gap-4 mb-10 border-b border-fin-border pb-4">
        <button className="bg-fin-gold text-white px-8 py-2.5 rounded-full font-semibold shadow-md">
          Edit Profile
        </button>
        <button className="text-fin-taupe px-8 py-2.5 rounded-full font-semibold hover:bg-fin-bg transition">
          Preferences
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* LEFT SIDE - PHOTO */}
        <div className="flex flex-col items-center lg:items-start shrink-0">
          <div className="relative w-55 h-55">
            <div className="w-full h-full rounded-full border-8 border-fin-bg bg-gray-100 flex items-center justify-center overflow-hidden shadow-inner">
               <Image src="/profile-user.jpg" alt="Profile" width={220} height={220} className="object-cover w-full h-full" />
            </div>
            {/* CAMERA BUTTON */}
            <button className="absolute bottom-4 right-4 bg-fin-gold text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition">
              <Camera size={20} />
            </button>
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="flex-1 max-w-150 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="First Name" placeholder="Zafira" />
            <Input label="Last Name" placeholder="Noerr" />
          </div>

          <Input label="Email" placeholder="ZafiraNackKeche@gmail.com" type="email" />
          <Input label="Occupation" placeholder="Student" />

          <div>
            <label className="block text-sm font-semibold text-fin-taupe ml-1 mb-2">Bio</label>
            <textarea
              className="w-full p-4 border border-fin-border rounded-2xl outline-none focus:border-fin-gold focus:ring-1 focus:ring-fin-gold transition resize-none text-fin-black"
              rows="4"
              defaultValue="Target: Hemat buat beli MacBook Air M3"
            />
          </div>

          <div className="flex justify-end pt-4">
            <button className="bg-fin-black text-fin-bg px-10 py-4 rounded-full font-bold shadow-xl hover:bg-gray-800 transition">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-komponen Input (Bisa dipisah filenya nanti kalau sering dipakai)
function Input({ label, placeholder, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-fin-taupe ml-1 mb-2">
        {label}
      </label>
      <input
        type={type}
        defaultValue={placeholder}
        className="w-full p-4 border border-fin-border rounded-2xl outline-none focus:border-fin-gold focus:ring-1 focus:ring-fin-gold transition text-fin-black"
      />
    </div>
  );
}