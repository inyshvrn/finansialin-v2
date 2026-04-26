import { Plus_Jakarta_Sans } from "next/font/google"; // Import font-nya
import "./globals.css";
import Sidebar from "./components/sidebar";
import Chatbot from "./components/chatbot";

// Konfigurasi font
const jakartaSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"], // Ambil semua ketebalan yang kita butuh
  variable: "--font-jakarta", // Set variabel buat CSS
});

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      {/* Tambahkan className font-nya di body */}
      <body className={`${jakartaSans.className} bg-[#F6F5F1] text-[#1A1A1A] antialiased`}>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 ml-60 p-10 relative">
            {children}
            <Chatbot />
          </main>
        </div>
      </body>
    </html>
  );
};