"use client";
import { MessageCircle } from "lucide-react";

export default function Chatbot() {
  return (
    <div className="fixed bottom-10 right-10 z-50">
      <button className="bg-fin-gold text-white p-5 rounded-4xl shadow-[0_10px_24px_rgba(26,26,26,0.12)] hover:brightness-95 transition flex items-center justify-center border border-fin-border group">
        <MessageCircle size={30} />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-fin-black rounded-4xl border border-fin-bg animate-pulse"></span>
      </button>
    </div>
  );
};