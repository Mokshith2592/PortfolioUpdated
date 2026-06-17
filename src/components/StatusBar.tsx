"use client";

import { motion } from "framer-motion";
import { useClock, useUptime, usePortfolioStats } from "@/hooks/useSystemDiagnostics";

export default function StatusBar() {
  const time = useClock();
  const uptime = useUptime();
  const { currentRoute, status, counts } = usePortfolioStats();

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed bottom-0 left-0 right-0 z-50 h-8 bg-black/90 border-t border-zinc-800 backdrop-blur-md text-xs font-mono text-zinc-400 flex items-center px-2 md:px-4 justify-between"
    >
      <div className="flex items-center gap-3 md:gap-6">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-green-500 font-bold tracking-widest hidden sm:inline-block">
            {status}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-blue-400 font-bold">{currentRoute}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
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