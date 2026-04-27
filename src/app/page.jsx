// src/app/page.jsx
"use client";
import React from "react";
import Link from "next/link";

export default function WelcomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F7F3] px-4 py-8 animate-in fade-in duration-1000">
      {/* Container Utama (Ramping & Proporsional) */}
      <main className="w-full max-w-4xl rounded-[40px] border border-[#E8E2D9] bg-[#FDFCFB] p-10 shadow-lg lg:p-14 relative overflow-hidden">
        
        {/* Dekorasi lingkaran halus */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#F2EFE9] rounded-full opacity-50 z-0"></div>

        <div className="relative z-10 max-w-2xl">
          
          <div className="space-y-6">
            {/* Badge Kecil */}
            <div className="space-y-3">
              <p className="inline-block rounded-full border border-[#E8E2D9] bg-white px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-[#C4A000] shadow-sm">
                Luxury Minimalist Finance
              </p>
              
              {/* Judul yang sudah dikecilkan ukurannya */}
              <h1 className="font-serif text-3xl font-bold leading-tight text-[#1A1A1A] lg:text-5xl tracking-tight">
                Kelola Finansial Harian dengan <br className="hidden lg:block" /> Tenang dan Elegan.
              </h1>
            </div>

            {/* Deskripsi standar */}
            <p className="max-w-md text-base leading-relaxed text-[#7A746E] font-medium">
              Fokus pada keputusan keuangan penting melalui pengalaman visual yang bersih, premium, dan terstruktur.
            </p>

            {/* ACTION BUTTONS: Alur Baru */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/register"
                className="rounded-full bg-[#1A1A1A] px-8 py-3.5 text-[11px] font-black uppercase tracking-widest text-[#FDFCFB] shadow-md transition-all hover:scale-105 hover:bg-black active:scale-95"
              >
                Mulai Daftar — Gratis
              </Link>
              
              <Link
                href="/login"
                className="rounded-full border border-[#E8E2D9] bg-white px-8 py-3.5 text-[11px] font-black uppercase tracking-widest text-[#1A1A1A] shadow-sm transition-all hover:bg-[#F8F7F3] hover:scale-105 active:scale-95"
              >
                Sudah Ada Akun? Login
              </Link>
            </div>

            {/* Footer halus */}
            <p className="pt-4 text-[10px] text-[#A8A29E] uppercase tracking-widest font-bold">
              © 2026 Finansialin Global — Terenkripsi & Aman
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}