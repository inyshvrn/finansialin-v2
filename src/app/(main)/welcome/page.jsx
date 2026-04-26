"use client";
import React from "react";
import Link from "next/link";

export default function WelcomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F7F3] px-6 py-10 lg:px-12 animate-in fade-in duration-1000">
      {/* Container Utama (Kartu Putih Besar) */}
      <main className="w-full max-w-6xl rounded-[50px] border border-[#E8E2D9] bg-[#FDFCFB] p-8 shadow-xl lg:p-16 relative overflow-hidden">
        
        {/* Dekorasi lingkaran halus di pojok kanan atas */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#F2EFE9] rounded-full opacity-50 z-0"></div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center relative z-10">
          
          {/* SISI KIRI: Teks & CTA */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="inline-block rounded-full border border-[#E8E2D9] bg-white px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#C4A000] shadow-sm">
                Luxury Minimalist Finance
              </p>
              <h1 className="font-serif text-5xl font-bold leading-[1.1] text-[#1A1A1A] lg:text-6xl tracking-tighter">
                Kelola Finansial Harian dengan Tampilan Elegan dan Tenang.
              </h1>
            </div>

            <p className="max-w-md text-lg leading-relaxed text-[#7A746E] font-medium">
              Finansialin membantu Anda fokus pada keputusan keuangan penting melalui pengalaman visual yang bersih, premium, dan terstruktur.
            </p>

            <div className="flex flex-wrap gap-5 pt-4">
              <Link
                href="/dashboard"
                className="rounded-full bg-[#1A1A1A] px-10 py-4 text-sm font-black uppercase tracking-widest text-[#FDFCFB] shadow-lg transition-all hover:scale-105 hover:bg-black active:scale-95"
              >
                Masuk Dashboard
              </Link>
              <Link
                href="/transactions"
                className="rounded-full border border-[#E8E2D9] bg-white px-10 py-4 text-sm font-black uppercase tracking-widest text-[#1A1A1A] shadow-sm transition-all hover:bg-[#F8F7F3] hover:scale-105 active:scale-95"
              >
                Lihat Transaksi
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}