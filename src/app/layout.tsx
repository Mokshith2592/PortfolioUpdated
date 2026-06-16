import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Or whatever font you are using
import "./globals.css";
import { NetworkParticles } from "@/components/layout/NetworkParticles";

const inter = Inter({ subsets: ["latin"] });

// --- PROTOCOL 1: METADATA & OPEN GRAPH ---
export const metadata: Metadata = {
  title: "MokshithOS | Systems Engineer",
  description: "Personal engineering operating system and portfolio of Mokshith Gattu, Data Engineering Intern at Visa.",
  keywords: [
    "Mokshith Gattu", 
    "Systems Engineer", 
    "Software Engineer", 
    "NIT Warangal", 
    "Portfolio", 
    "C++", 
    "Redis",
    "Visa"
  ],
  authors: [{ name: "Mokshith Gattu" }],
  openGraph: {
    title: "MokshithOS | Systems Engineer",
    description: "Personal engineering operating system and portfolio of Mokshith Gattu.",
    url: "https://mokshithos.vercel.app", // Update this later if you buy a custom domain!
    siteName: "MokshithOS",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MokshithOS | Systems Engineer",
    description: "Personal engineering operating system and portfolio of Mokshith Gattu.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#050505] text-zinc-300 antialiased selection:bg-blue-500/30`}>
        <div className="flex flex-col min-h-screen relative z-0">
          
          {/* 1. Add the Canvas Background */}
          <NetworkParticles />

          {/* 2. Main Content Area */}
          <div className="flex-1 relative z-10">
            {children}
          </div>

          {/* 3. OS Taskbar / Status Bar */}
          <footer className="fixed bottom-0 w-full bg-[#0F1115]/90 backdrop-blur-md border-t border-zinc-800/80 p-2 px-4 flex justify-between items-center text-[10px] font-mono text-zinc-500 z-40">
            <div className="flex gap-4">
              <span className="text-blue-500 font-bold drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">[MokshithOS v2.0]</span>
              <span>SYSTEM_KERNEL: ACTIVE</span>
            </div>
            <div className="flex gap-4 hidden md:flex">
              <span>CPU: OPTIMIZED</span>
              <span>MEM: 42MB</span>
              <span className="text-green-500 font-bold animate-pulse">● LIVE</span>
            </div>
          </footer>
          
        </div>
      </body>
    </html>
  );
}