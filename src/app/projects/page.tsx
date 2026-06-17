"use client";
import Link from 'next/link';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { MouseEvent } from 'react';
import { HomeButton } from '@/components/ui/HomeButton';
import { projects } from '@/lib/data';

const ProjectCard = ({ project }: { project: any }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div 
      className="group relative h-full flex flex-col rounded-xl border border-zinc-800 bg-[#0F1115]/80 overflow-hidden backdrop-blur-md shadow-lg transition-all duration-300 hover:border-zinc-600 hover:shadow-blue-900/20"
      onMouseMove={handleMouseMove}
    >
      {/* 1. Restored Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-500 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              450px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.12),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* 2. Content Layer */}
      <Link 
        href={project.link} 
        target={project.link.startsWith('http') ? "_blank" : "_self"}
        className="relative flex flex-col h-full p-6 z-10"
      >
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-xl font-bold text-zinc-100 group-hover:text-blue-400 transition-colors">
            {project.title}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500/60 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
          </div>
        </div>
        
        {/* TEXT CLAMPING APPLIED HERE */}
        <p 
          className="text-zinc-400 text-sm mb-6 leading-relaxed flex-1 group-hover:text-zinc-300 transition-colors line-clamp-4"
          title={project.description} // Shows full description on native browser hover
        >
          {project.description}
        </p>

        {/* System Tech Stack (More compact) */}
        <div className="mt-auto pt-4 border-t border-zinc-800/60 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="block text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
              Sys_Req
            </span>
            <span className="text-[10px] text-zinc-600 font-mono group-hover:text-blue-500/50 transition-colors">
              EXECUTE_&gt;
            </span>
          </div>
          
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t: string) => (
              <span 
                key={t} 
                className="text-[10px] font-mono text-zinc-400 bg-black/60 px-2 py-0.5 rounded border border-zinc-800 shadow-inner"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen p-8 md:p-16 max-w-6xl mx-auto font-sans relative z-10 text-zinc-300">
      <HomeButton />
      
      <div className="mt-12 md:mt-0 mb-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-2"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-zinc-100">Deployment Matrix</h1>
          <p className="text-zinc-400 font-mono text-sm max-w-xl leading-relaxed">
            Active system architectures, backend infrastructure modules, and compiled full-stack applications currently in production.
          </p>
        </motion.div>

        {/* Telemetry Box matching the terminal background */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#0F1115]/80 backdrop-blur-md p-4 rounded-lg font-mono text-xs text-zinc-400 border border-zinc-800 shadow-lg md:col-span-1 hidden md:block"
        >
          <div className="text-blue-500 border-b border-zinc-800 pb-2 mb-3 flex justify-between">
            <span>[SYS_MONITOR]</span>
            <span className="animate-pulse">REC: ACTIVE</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><span>Nodes_Online:</span> <span className="text-zinc-100">{projects.length}</span></div>
            <div className="flex justify-between"><span>Network_I/O:</span> <span className="text-green-500">STABLE</span></div>
            <div className="flex justify-between"><span>Last_Deploy:</span> <span className="text-zinc-100">T-0.00s</span></div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
            className="h-full"
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </main>
  );
}