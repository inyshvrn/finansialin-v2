// src/app/layout.js (ROOT LAYOUT)
import "./globals.css"; // CSS global kamu
import { Inter } from "next/font/google"; // Contoh font

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Finansialin - Aplikasi Keuangan",
  description: "Kelola keuanganmu dengan lebih mudah",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}