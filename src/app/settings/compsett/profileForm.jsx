import React from "react";
import Image from "next/image";
import { Camera, Lock } from "lucide-react";

export default function ProfileForm() {
  return (
    <div className="space-y-8">
      <div className="inline-flex items-center rounded-full border border-fin-border bg-white p-1 shadow-sm">
        <button className="min-w-38.5 rounded-full bg-fin-gold px-6 py-3 text-center text-base font-medium text-[#0F0F0D]">
          Edit Profile
        </button>
        <button className="min-w-38.5 rounded-full px-6 py-3 text-center text-base font-medium text-[#0F0F0D]/80 transition hover:bg-fin-bg">
          Preferences
        </button>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-14">
        <div className="flex justify-center lg:justify-start">
          <div className="relative h-76 w-76">
            <div className="h-full w-full overflow-hidden rounded-full bg-[#D9D9D9]">
              <Image src="/profile-user.jpg" alt="Profile" width={304} height={304} className="h-full w-full object-cover" />
            </div>

            <button className="absolute bottom-2 right-2 flex h-16.75 w-16.75 items-center justify-center rounded-full bg-[#F5CA1C] text-[#0F0F0D] shadow-sm transition hover:brightness-95">
              <Camera size={24} />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Input label="First Name" placeholder="Zafira" />
            <Input label="Last Name" placeholder="Noerr" />
          </div>

          <Input label="Email" placeholder="ZafiraNackKeche@gmail.com" type="email" icon={<Lock size={18} className="text-[#757575]" />} />
          <Input label="Occupation" placeholder="Student" />

          <div>
            <label className="mb-2 block text-base font-normal text-[#3A3231]">Bio</label>
            <textarea
              className="min-h-34 w-full rounded-[15px] border border-[#8C8C8C] p-4 text-sm text-[#6B7280] outline-none transition focus:border-fin-gold focus:ring-1 focus:ring-fin-gold"
              rows="6"
              defaultValue="Target: Hemat buat beli MacBook Air M3"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button className="w-full rounded-full border border-[#8C8C8C] bg-[#232522] px-8 py-3 text-center text-lg font-semibold text-[#ECC939] shadow-sm transition hover:brightness-95 sm:w-47.5">
              Save Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-komponen Input (Bisa dipisah filenya nanti kalau sering dipakai)
function Input({ label, placeholder, type = "text", icon }) {
  return (
    <div>
      <label className="mb-2 block text-base font-normal text-[#3A3231]">
        {label}
      </label>

      <div className="relative">
        <input
          type={type}
          defaultValue={placeholder}
          className="h-11.5 w-full rounded-[15px] border border-[#8C8C8C] px-4 pr-12 text-sm text-[#6B7280] outline-none transition focus:border-fin-gold focus:ring-1 focus:ring-fin-gold"
        />
        {icon && <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">{icon}</span>}
      </div>
    </div>
  );
}