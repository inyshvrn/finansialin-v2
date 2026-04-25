"use client";
import React from "react";
import { Search, Bell, UserCircle2 } from "lucide-react";
import ProfileForm from "./compsett/profileForm";

export default function SettingsPage() {
  return (
    <div className="min-h-full bg-[linear-gradient(131.06deg,#F2EFE8_38.63%,#EBDFC6_92.98%)] px-6 py-8 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-285 space-y-8">
        <section className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <h1 className="text-4xl font-semibold leading-tight text-fin-black">Settings</h1>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex w-full items-center gap-3 rounded-full bg-white px-5 py-3 shadow-sm sm:w-116">
              <Search size={20} className="text-fin-black/50" />
              <input
                type="text"
                placeholder="Type to search"
                className="w-full bg-transparent text-base text-fin-black placeholder:text-fin-black/45 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-fin-black shadow-sm">
                <Bell size={22} />
              </button>
              <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-fin-black shadow-sm">
                <UserCircle2 size={24} />
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-[30px] border border-fin-border bg-white px-6 py-8 shadow-sm lg:px-10 lg:py-10">
          <ProfileForm />
        </section>
      </div>
    </div>
  );
};