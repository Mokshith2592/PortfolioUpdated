"use client";
import { motion } from "framer-motion";
import { HomeButton } from "@/components/ui/HomeButton";
import { timelineData } from "@/lib/timeline-data";
import { TimelineNode } from "@/components/timeline/TimelineNode";

export default function TimelinePage() {
  return (
    // Removed bg-[#050505] and added relative z-10 so the global background effects work
    <main className="min-h-screen text-white p-8 md:p-16 max-w-6xl mx-auto overflow-x-hidden relative z-10">
      <HomeButton /> 
      
      <motion.div 
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.8 }}
        // Added mt-12 md:mt-0 to clear the HomeButton on mobile screens
        className="max-w-4xl mx-auto mb-20 text-center mt-12 md:mt-0"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-zinc-100">Engineering Trajectory</h1>
        <p className="text-zinc-500 font-mono text-sm max-w-xl mx-auto leading-relaxed">
          A chronological documentary of technical growth, paradigm shifts, and systems built over time. Click any node to inspect telemetry.
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto relative">
        {/* Mobile vertical line - updated to slightly transparent zinc for stealth look */}
        <div className="md:hidden absolute left-0 top-0 bottom-0 w-px bg-zinc-800/50 ml-[5px]" />
        
        <div className="space-y-8 md:space-y-0">
          {timelineData.map((event, index) => (
            <TimelineNode key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
      
      <div className="mt-24 pb-12 text-center text-zinc-600 text-xs italic font-mono">
        [Status: Timeline synchronized. Awaiting future commits.]
      </div>
    </main>
  );
}