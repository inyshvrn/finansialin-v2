"use client";
import { MessageCircle } from "lucide-react";

export default function Chatbot() {
  return (
    <div className="fixed bottom-10 right-10 z-50">
      <button className="bg-fin-gold text-white p-5 rounded-full shadow-[0_10px_40px_rgba(197,160,89,0.4)] hover:scale-110 transition-transform flex items-center justify-center border-4 border-white group">
        <MessageCircle size={30} />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
      </button>
    </div>
  );
};