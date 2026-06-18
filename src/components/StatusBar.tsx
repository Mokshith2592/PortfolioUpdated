"use client";

import { motion } from "framer-motion";
import { useClock, useUptime, usePortfolioStats } from "@/hooks/useSystemDiagnostics";

export default function StatusBar() {
  const time = useClock();
  const uptime = useUptime();
  // We grab the new statusColor from the hook here:
  const { currentRoute, status, statusColor, counts } = usePortfolioStats();

  // A safe color mapper so Tailwind doesn't break in production
  const getColorMap = (colorName?: string) => {
    // 1. Add a safety check! If colorName is undefined or null, default to "green"
    const safeColor = colorName || "green";

    // 2. Safely call toLowerCase() on the guaranteed string
    switch (safeColor.toLowerCase()) {
      case "red": return { text: "text-red-500", bg: "bg-red-500", ping: "bg-red-400" };
      case "yellow": return { text: "text-yellow-500", bg: "bg-yellow-500", ping: "bg-yellow-400" };
      case "blue": return { text: "text-blue-500", bg: "bg-blue-500", ping: "bg-blue-400" };
      default: return { text: "text-green-500", bg: "bg-green-500", ping: "bg-green-400" };
    }
  };

  const activeColor = getColorMap(statusColor);

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed bottom-0 left-0 right-0 z-50 h-8 bg-black/90 border-t border-zinc-800 backdrop-blur-md text-xs font-mono text-zinc-400 flex items-center px-2 md:px-4 justify-between"
    >
      {/* LEFT: System Status & Route */}
      <div className="flex items-center gap-3 md:gap-6">
        <div className="flex items-center gap-2">
          {/* We inject the dynamic colors into the pinging dot! */}
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${activeColor.ping}`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${activeColor.bg}`}></span>
          </span>
          {/* We inject the dynamic text color here! */}
          <span className={`${activeColor.text} font-bold tracking-widest hidden sm:inline-block`}>
            {status}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-blue-400 font-bold">{currentRoute}</span>
        </div>
      </div>

      {/* MIDDLE: Application Stats (Hidden on Mobile) */}
      <div className="hidden md:flex items-center gap-4 text-zinc-500">
        <div className="flex gap-1"><span>PRJ:</span><span className="text-zinc-300">{counts.projects}</span></div>
        <div className="flex gap-1"><span>NTS:</span><span className="text-zinc-300">{counts.notes}</span></div>
        <div className="flex gap-1"><span>ACH:</span><span className="text-zinc-300">{counts.achievements}</span></div>
      </div>

      {/* RIGHT: Comms, Time & Uptime */}
      <div className="flex items-center gap-3 md:gap-6">
        <div className="hidden md:flex gap-3 text-zinc-500 border-r border-zinc-700 pr-4 mr-2">
           <a href="mailto:your.email@example.com" className="hover:text-blue-400 transition-colors">MAIL</a>
           <a href="https://www.linkedin.com/in/mokshith-sai" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">IN</a>
           <a href="https://github.com/Mokshith2592" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">GIT</a>
        </div>

        <div className="hidden sm:flex gap-2">
          <span className="text-zinc-500">UP:</span>
          <span className="text-zinc-300 w-[70px] text-right">{uptime}</span>
        </div>
        
        <div className="flex items-center gap-1 text-zinc-300">
          <span className="w-[60px] text-right">{time}</span>
          <span className="animate-pulse bg-zinc-300 w-1.5 h-3 ml-1"></span>
        </div>
      </div>
    </motion.div>
  );
}