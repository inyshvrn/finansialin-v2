import "./globals.css";
import Sidebar from "./components/sidebar";
import Chatbot from "./components/chatbot";

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-fin-bg text-fin-black antialiased">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content with left margin for fixed sidebar */}
        <div className="ml-62.5 min-h-screen py-4 pr-4">
          <main className="flex-1 overflow-y-auto bg-white border border-fin-border rounded-[40px] shadow-sm min-h-[calc(100vh-2rem)] p-6">
            {children}
          </main>
          
          {/* Chatbot melayang di kanan bawah */}
          <Chatbot />
        </div>
      </body>
    </html>
  );
};