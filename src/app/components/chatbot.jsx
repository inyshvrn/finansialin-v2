"use client";
import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, // Menggunakan Bot untuk logo
  X, 
  Send, 
  Sparkles, 
} from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hai Furqan! Saya AI Finansialin. Ada yang bisa saya bantu?", 
      sender: 'bot',
      time: 'Just now'
    }
  ]);
  
  const scrollRef = useRef(null);

  // Auto scroll ke bawah saat ada pesan baru
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulasi Robot Berpikir (Typing Indicator)
    setTimeout(() => {
      const botMsg = {
        id: messages.length + 2,
        text: "Tentu! Berdasarkan data terbaru, pengeluaranmu di kategori Food bulan ini mencapai 90%. Ingin saya bantu buatkan rencana hemat?",
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] font-sans">
      {/* --- CHAT WINDOW (Compact Size: w-320px, h-480px) --- */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[320px] h-[480px] bg-white rounded-[28px] shadow-2xl border border-[#E8E2D9] overflow-hidden flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300">
          
          {/* Header Chat - Charcoal & Gold */}
          <div className="bg-[#1A1A1A] p-5 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#FFD600] rounded-xl flex items-center justify-center text-[#1A1A1A] shadow-md">
                <Sparkles size={18} />
              </div>
              <div>
                <h3 className="text-xs font-black tracking-tighter text-[#FDFCFB]">Finansialin AI</h3>
                <div className="flex items-center gap-1.5 opacity-70">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[9px] font-bold text-[#FDFCFB] uppercase tracking-widest">Active Assistant</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Chat Body - Cream Background */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-5 bg-[#FDFCFB]">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in duration-300`}>
                <div className={`max-w-[85%] space-y-1`}>
                   <div className={`p-3 rounded-2xl text-xs font-medium leading-relaxed shadow-sm ${
                     msg.sender === 'user' 
                     ? 'bg-[#1A1A1A] text-white rounded-tr-none' 
                     : 'bg-white border border-[#E8E2D9] text-[#1A1A1A] rounded-tl-none'
                   }`}>
                     {msg.text}
                   </div>
                   <p className={`text-[8px] font-black uppercase text-[#A3A3A3] tracking-widest ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                     {msg.time}
                   </p>
                </div>
              </div>
            ))}

            {/* UX: Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start animate-pulse">
                <div className="bg-[#F6F5F1] p-3 rounded-2xl rounded-tl-none flex gap-1">
                  <div className="w-1.5 h-1.5 bg-[#A3A3A3] rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-[#A3A3A3] rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1.5 h-1.5 bg-[#A3A3A3] rounded-full animate-bounce [animation-delay:-0.3s]" />
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-[#E8E2D9] bg-white">
            <div className="relative flex items-center">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Tanya AI..." 
                className="w-full h-11 bg-[#F6F5F1] rounded-2xl pl-5 pr-12 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#FFD600]/20"
              />
              <button 
                onClick={handleSend}
                className="absolute right-1.5 p-2 bg-[#1A1A1A] text-[#FFD600] rounded-xl hover:bg-black transition-all active:scale-90 shadow-sm"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- TRIGGER BUTTON (Logo Robot - Bot Icon) --- */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 hover:scale-110 active:scale-90 group ${
          isOpen ? 'bg-white text-[#1A1A1A] rotate-90 border border-[#E8E2D9]' : 'bg-[#1A1A1A] text-[#FFD600] border-2 border-[#FFD600]/10'
        }`}
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <Bot size={24} className="transition-transform group-hover:rotate-12" />
        )}
      </button>
    </div>
  );
};

export default Chatbot;