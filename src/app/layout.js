import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  // Kita ambil weight yang lengkap agar fleksibel
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${inter.variable} font-sans antialiased text-[#1A1A1A] bg-[#FBFBFB]`}>
        {children}
      </body>
    </html>
  );
}