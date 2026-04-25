"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from '@iconify/react';
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

    const menu = [
        { name: "Dashboard", iconPath: "mage:dashboard-fill", path: "/dashboard" },
        { name: "Transactions", iconPath: "grommet-icons:transaction", path: "/transactions" },
        { name: "Budgeting", iconPath: "healthicons:low-income-level-24px", path: "/budgeting" },
        { name: "Statistics", iconPath: "carbon:chart-line-smooth", path: "/statistics" }, // 'graph' di figma diganti ke iconify
        { name: "Settings", iconPath: "solar:settings-bold", path: "/settings" },
    ];

  return (
    <aside className="fixed left-0 top-0 w-62.5 h-screen bg-white shadow-sm z-50 font-['Inclusive_Sans']">
      
      {/* Logo Section (Frame 28) */}
      <div className="absolute w-62.5 h-31.25 left-0 top-2.75">
        <div className="relative w-52.75 h-16.75 left-4.75 top-5">
          {/* Menggunakan image.png sesuai CSS figma kamu */}
          <Image 
            src="/logo-full.png" 
            alt="Finansialin Logo" 
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Navigation Menu (Group 36) */}
      <nav className="absolute w-86.5 h-72 -left-0.75 top-36.75">
        {menu.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link key={item.name} href={item.path}>
              <div className="relative w-67.5 h-15.25 mb-1.75 cursor-pointer">
                
                {/* Active Indicator (Rectangle 60) */}
                {isActive && (
                  <div className="absolute w-2 h-15.25 left-0 top-0 bg-[#F5CA1C]/80 rounded-[50px]" />
                )}

                {/* Icon Placeholder (Menyesuaikan posisi di Figma) */}
                <div className="absolute left-11 top-3.5 w-8 h-8 flex items-center justify-center">
                    <Icon 
                        icon={item.iconPath} 
                        className={`text-[32px] ${isActive ? 'text-[#F5CA1C]' : 'text-black'}`} 
                    />
                </div>

                {/* Text Label */}
                <span className={`absolute left-23.25 top-4.5 text-[20px] leading-6 flex items-center ${isActive ? 'font-bold text-black' : 'font-normal text-black'}`}>
                  {item.name}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button (Group 26) */}
      <div className="absolute w-58.25 h-16.25 left-4.25 top-234.25 flex items-center justify-center cursor-pointer hover:bg-gray-50 rounded-lg transition-colors">
        <div className="flex items-center gap-4">
          <div className="w-6 h-6 relative">
             <Icon icon="solar:logout-2-bold" className="text-[24px] text-black" />
          </div>
          <span className="text-[24px] leading-7.25 text-black">
            Logout
          </span>
        </div>
      </div>
    </aside>
  );
}