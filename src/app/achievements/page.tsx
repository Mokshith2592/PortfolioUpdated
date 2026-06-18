"use client";
import { motion } from "framer-motion";
import { HomeButton } from '@/components/ui/HomeButton';
import { achievements } from '@/lib/achievements';
import { motion, Variants } from 'framer-motion';

// Stagger animation for the ledger entries
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const item: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } }
};

export default function Achievements() {
  return (
    <main className="min-h-screen text-zinc-300 p-8 md:p-16 max-w-4xl mx-auto relative z-10 font-mono">
      <HomeButton />
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-12 md:mt-0 mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight font-sans">
          Achievement Ledger
        </h1>
        <div className="flex items-center gap-3 border-b border-zinc-800/50 pb-4">
          <p className="text-blue-400 text-xs md:text-sm uppercase tracking-widest">
            Permanent Record of Technical Milestones
          </p>
          <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)] animate-pulse" />
        </div>
      </motion.div>

      {/* Ledger Entries */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-4 md:space-y-6"
      >
        {achievements.map((r) => (
          <motion.div 
            key={r.id} 
            variants={item}
            className="group relative p-6 bg-zinc-950/30 backdrop-blur-md border border-zinc-800/50 rounded-xl hover:bg-zinc-900/40 hover:border-zinc-700/60 transition-all duration-300 shadow-lg"
          >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-white font-bold text-lg font-sans group-hover:text-blue-400 transition-colors">
                  {r.title}
                </h3>
                <span className="text-[10px] md:text-xs text-zinc-600 font-mono bg-black/40 px-2 py-1 rounded border border-zinc-800/50">
                  ID: {r.id}
                </span>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed font-sans">
                {r.detail}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-16 pt-4 border-t border-zinc-800/50 text-zinc-600 text-[10px] md:text-xs italic flex justify-between items-center"
      >
        <span>[Status: Ledger verified by MokshithOS Core]</span>
        <span className="hidden md:inline-block text-green-500/70">CHECKSUM: VALID</span>
      </motion.div>
    </main>
  );
}