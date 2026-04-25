import "./globals.css";
import Sidebar from "./components/sidebar";
import Chatbot from "./components/chatbot";

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-fin-bg text-fin-black antialiased">
        <div className="flex min-h-screen py-4 pr-4">
          {/* Sidebar yang selalu ada di kiri */}
          <Sidebar />

          {/* Area Konten Dinamis */}
          <div className="flex-1 flex flex-col relative pl-4">
            <main className="flex-1 overflow-y-auto bg-white border border-fin-border rounded-[40px] shadow-sm">
              {children}
            </main>
            
            {/* Chatbot melayang di kanan bawah */}
            <Chatbot />
          </div>
        </div>
      </body>
    </html>
  );
};