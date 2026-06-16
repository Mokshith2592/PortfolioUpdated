"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TimelineEvent } from "@/lib/timeline-data";

export const TimelineNode = ({ event, index }: { event: TimelineEvent; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  const isFuture = event.status === 'future';
  const isPresent = event.status === 'present';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 md:pl-0"
    >
      {/* Central Line & Glowing Dot (Desktop) */}
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-zinc-800" />
      <motion.div 
        animate={isPresent ? { scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] } : {}}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className={`absolute left-0 md:left-1/2 -translate-x-[5px] md:-translate-x-1/2 top-6 w-3 h-3 rounded-full border-2 border-black z-10 ${
          isFuture ? 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.6)]' :
          isPresent ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]' :
          'bg-zinc-500'
        }`}
      />

      {/* Content Container (Alternating left/right on desktop) */}
      <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:mr-auto' : 'md:pl-12 md:ml-auto'}`}>
        <motion.div 
          layout
          onClick={() => setIsOpen(!isOpen)}
          className={`group cursor-pointer p-6 bg-[#0F1115] border rounded-xl transition-all duration-300 hover:shadow-xl ${
            isFuture ? 'border-purple-500/20 hover:border-purple-500/50' :
            isPresent ? 'border-blue-500/30 hover:border-blue-500/60 shadow-[0_0_15px_rgba(59,130,246,0.05)]' :
            'border-zinc-800 hover:border-zinc-600'
          }`}
        >
          {/* Header */}
          <motion.div layout className="flex justify-between items-center mb-2">
            <span className={`font-mono font-bold ${isFuture ? 'text-purple-400' : isPresent ? 'text-blue-400' : 'text-zinc-500'}`}>
              {event.year}
            </span>
            <span className="text-zinc-600 text-xs font-mono group-hover:text-zinc-400 transition-colors">
              {isOpen ? '[-]' : '[+]'}
            </span>
          </motion.div>
          
          <motion.h3 layout className="text-xl font-bold text-zinc-100 mb-2">{event.title}</motion.h3>
          <motion.p layout className="text-sm text-zinc-400">{event.description}</motion.p>

          {/* Expanded Details */}
          <AnimatePresence>
            {isOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pt-6 mt-4 border-t border-zinc-800/50 space-y-4">
                  
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Key Learning</span>
                    <p className="text-sm text-zinc-300 mt-1">{event.keyLearning}</p>
                  </div>

                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Technologies</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {event.technologies.map(tech => (
                        <span key={tech} className="text-xs bg-zinc-900 border border-zinc-800 px-2 py-1 rounded text-zinc-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-blue-950/20 border border-blue-900/30 rounded-lg">
                    <span className="text-[10px] text-blue-400/80 uppercase tracking-widest font-mono">Retrospective Lesson</span>
                    <p className="text-sm text-blue-200 mt-1 italic">"{event.lessonsLearned}"</p>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};