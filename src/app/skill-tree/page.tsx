"use client";
// 1. Import Variants here!
import { motion, Variants } from 'framer-motion'; 
import { skillGraph } from '@/lib/skill-data';
import { SkillNode } from '@/components/skills/SkillNode';
import { HomeButton } from '@/components/ui/HomeButton';

// 2. Add ": Variants" to explicitly type the container
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

// 3. Add ": Variants" to explicitly type the item
const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function SkillTreePage() {
  // ... rest of your code stays exactly the same

export default function SkillTreePage() {
  return (
    // Reduced padding on mobile (p-6), removed overflow-x-hidden to prevent weird scrolling bugs
    <main className="min-h-screen text-white p-6 md:p-16 max-w-5xl mx-auto relative z-10 pb-24 md:pb-16">
      <HomeButton />
      
      {/* Header section */}
      <motion.div 
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.8 }}
        className="mb-10 md:mb-16 mt-12 md:mt-0"
      >
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-2 text-zinc-100">Knowledge Graph</h1>
        <p className="text-zinc-500 font-mono text-sm border-l-2 border-blue-500/50 pl-4 mt-4 leading-relaxed max-w-xl">
          Visualizing technical progression and system-level competencies. Hover (or tap) over any node to inspect telemetry.
        </p>

        {/* Legend - MOVED HERE so it flows naturally and doesn't break mobile UI */}
        <div className="flex flex-wrap gap-3 md:gap-6 mt-8 p-3 md:py-3 md:px-6 bg-black/30 backdrop-blur-md border border-zinc-800/50 rounded-lg md:rounded-full text-[10px] md:text-xs font-mono text-zinc-400 w-fit">
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" /> Completed</div>
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" /> Learning</div>
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]" /> Future</div>
        </div>
      </motion.div>

      {/* Tree Generation - FIXED STRUCTURAL MATH */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        // Cleaned up mobile margins/padding so the main line stays perfectly straight
        className="space-y-12 md:space-y-16 pl-3 md:pl-10 border-l border-zinc-800/50 ml-2 md:ml-0"
      >
        {skillGraph.map((section) => (
          <motion.div key={section.category} variants={item} className="relative">
            {/* Section Connector Line */}
            <div className="absolute -left-[13px] md:-left-[41px] top-3 w-3 md:w-10 h-px bg-zinc-800/50" />
            
            <h2 className="text-lg md:text-xl font-bold text-zinc-200 mb-4 md:mb-6 flex items-center gap-3">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-zinc-600 shadow-[0_0_10px_rgba(255,255,255,0.1)]" />
              {section.category}
            </h2>
            
            {/* Skill Nodes Container - Allow wrapping dynamically */}
            <div className="flex flex-wrap gap-3 md:gap-4 mt-4 md:mt-0">
              {section.skills.map((skill) => (
                <SkillNode key={skill.name} skill={skill} />
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}