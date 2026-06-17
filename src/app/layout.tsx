import type { Metadata } from "next";
import { Inter } from "next/font/google"; 
import "./globals.css";
import { NetworkParticles } from "@/components/layout/NetworkParticles";
import { Analytics } from "@vercel/analytics/react";
import StatusBar from "@/components/StatusBar"; 

const inter = Inter({ subsets: ["latin"] });

// --- PROTOCOL 1: METADATA & OPEN GRAPH ---
export const metadata: Metadata = {
  title: "Mokshith_Portfolio",
  description: "Portfolio of Mokshith Gattu.",
  keywords: [
    "Mokshith Gattu", 
    "Data Engineer", 
    "Software Engineer", 
    "NIT Warangal", 
    "Portfolio", 
    "Visa"
  ],
  authors: [{ name: "Mokshith Gattu" }],
  openGraph: {
    title: "Mokshith_Portfolio",
    description: "Mokshith_Portfolio.",
    url: "https://mokshith_portfolio.vercel.app", 
    siteName: "Mokshith_Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mokshith_Portfolio",
    description: "Portfolio of Mokshith Gattu.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#050505] text-zinc-300 antialiased selection:bg-blue-500/30`}>
        <div className="flex flex-col min-h-screen relative z-0">
          <NetworkParticles />
          <div className="flex-1 relative z-10 pb-8">
            {children}
          </div>
          <StatusBar />
        </div>
        
        {/* 2. ADD THIS RIGHT BEFORE THE CLOSING BODY TAG */}
        <Analytics />
      </body>
    </html>
  );
}