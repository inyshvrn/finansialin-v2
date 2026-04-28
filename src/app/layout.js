import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ 
  subsets: ["latin"],
  // Gunakan weight 400-600 saja untuk menjaga kesan ramping
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${montserrat.variable} font-sans antialiased bg-[#FBFBFB] text-[#1A1A1A]`}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}