"use client";
import { motion } from "framer-motion";
import { HomeButton } from '@/components/ui/HomeButton';
import { nowStatus } from '@/lib/data';

export default function Now() {
  return (
    <main className="min-h-screen text-zinc-300 p-8 md:p-16 max-w-4xl mx-auto relative z-10 font-mono">
      <HomeButton />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-12 md:mt-0 mb-16"
      >
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-sans">System Status: NOW</h1>
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
        </div>
        <p className="text-blue-400 text-xs md:text-sm uppercase tracking-widest mt-2 border-b border-zinc-800/50 pb-4">
          Active Focus & Learning Modules
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* Module 1: Building */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="bg-zinc-950/30 backdrop-blur-md border border-zinc-800/50 border-l-4 border-l-green-500 rounded-r-xl p-6 md:p-8 shadow-lg hover:bg-zinc-900/40 transition-colors"
        >
          <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2 font-sans">
            <span className="text-green-500 text-sm">▶</span> Currently Building
          </h3>
          <p className="text-zinc-400 leading-relaxed text-sm">
            {nowStatus.building}
          </p>
        </motion.div>

        {/* Module 2: Deep-Diving */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="bg-zinc-950/30 backdrop-blur-md border border-zinc-800/50 border-l-4 border-l-blue-500 rounded-r-xl p-6 md:p-8 shadow-lg hover:bg-zinc-900/40 transition-colors"
        >
          <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2 font-sans">
            <span className="text-blue-500 text-sm">▶</span> Deep-Diving
          </h3>
          <p className="text-zinc-400 leading-relaxed text-sm">
            {nowStatus.diving}
          </p>
        </motion.div>

        {/* Module 3: Career Focus */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="bg-zinc-950/30 backdrop-blur-md border border-zinc-800/50 border-l-4 border-l-purple-500 rounded-r-xl p-6 md:p-8 shadow-lg hover:bg-zinc-900/40 transition-colors"
        >
          <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2 font-sans">
            <span className="text-purple-500 text-sm">▶</span> Career Focus
          </h3>
          <p className="text-zinc-400 leading-relaxed text-sm">
            {nowStatus.focus}
          </p>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-16 text-[10px] md:text-xs text-zinc-600 italic border-t border-zinc-800/50 pt-4 flex justify-between"
      >
        <span>[Status: State Operational]</span>
        <span>Last sync at {new Date().toLocaleDateString()}</span>
      </motion.div>
    </main>
  );
}