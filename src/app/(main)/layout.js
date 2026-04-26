// src/app/(main)/layout.js
import Sidebar from "../components/sidebar"; // Naik 1 tingkat ke folder app
import Chatbot from "../components/chatbot"; // Naik 1 tingkat ke folder app

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#F6F5F1]">
      <Sidebar />
      <main className="flex-1 ml-60 p-10 relative">
        {children}
        <Chatbot />
      </main>
    </div>
  );
}