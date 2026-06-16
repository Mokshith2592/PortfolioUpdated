"use client";
import { motion } from 'framer-motion';
import { Skill } from '@/lib/skill-data';

const getStatusStyles = (status: Skill['status']) => {
  switch (status) {
    case 'completed':
      return 'border-green-500/30 text-green-400 hover:border-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.1)]';
    case 'learning':
      return 'border-blue-500/30 text-blue-400 hover:border-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]';
    case 'future':
      return 'border-purple-500/30 text-purple-400 hover:border-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)]';
  }
};

export const SkillNode = ({ skill }: { skill: Skill }) => {
  return (
    <motion.div 
      className="relative group"
      initial="initial"
      whileHover="hover"
      whileFocus="hover" 
      tabIndex={0}
    >
      {/* Base Node */}
      <div className={`relative z-10 px-3 py-2 md:px-4 md:py-3 bg-zinc-950/30 backdrop-blur-sm border rounded-lg cursor-crosshair transition-all duration-300 ${getStatusStyles(skill.status)}`}>
        <span className="font-mono text-xs md:text-sm tracking-wide">{skill.name}</span>
      </div>

      {/* Hover Reveal Card - FIXED READABILITY */}
      <motion.div 
        variants={{
          initial: { opacity: 0, y: 10, scale: 0.95, pointerEvents: 'none' },
          hover: { opacity: 1, y: 0, scale: 1, pointerEvents: 'auto' }
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        // UPDATED: bg-[#050505]/98 for near-solid background, stronger border, and heavier drop shadow
        className="absolute left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 top-full mt-3 w-[260px] md:w-64 max-w-[85vw] p-4 bg-[#050505]/98 backdrop-blur-2xl border border-zinc-700/80 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-50 text-left"
      >
        <div className="flex justify-between items-center mb-3 border-b border-zinc-800 pb-2">
          <span className="text-white font-bold text-sm truncate pr-2">{skill.name}</span>
          <span className={`text-[10px] uppercase tracking-wider shrink-0 font-bold ${
            skill.status === 'completed' ? 'text-green-400' : 
            skill.status === 'learning' ? 'text-blue-400' : 'text-purple-400'
          }`}>{skill.status}</span>
        </div>
        
        {/* UPDATED: text-zinc-300 for much better contrast against the dark background */}
        <p className="text-zinc-300 text-xs mb-5 leading-relaxed">{skill.desc}</p>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-[10px] text-zinc-400 mb-1.5 font-mono">
              <span>CONFIDENCE</span>
              <span className="text-zinc-300">{skill.confidence}%</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden shadow-inner">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.confidence}%` }}
                transition={{ duration: 1, delay: 0.1 }}
                className={`h-full ${skill.status === 'completed' ? 'bg-green-500' : skill.status === 'learning' ? 'bg-blue-500' : 'bg-purple-500'}`}
              />
            </div>
          </div>
          
          <div>
            <span className="block text-[10px] text-zinc-400 mb-2 font-mono">USED IN:</span>
            <div className="flex flex-wrap gap-1.5">
              {skill.projects.map(p => (
                // UPDATED: Darker pill background with stronger borders and brighter text
                <span key={p} className="text-[10px] bg-zinc-900/80 text-zinc-300 px-2 py-1 rounded border border-zinc-700/50 shadow-sm">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};