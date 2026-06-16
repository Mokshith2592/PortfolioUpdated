"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HomeButton } from '@/components/ui/HomeButton';
import { notes } from '@/lib/data';

export default function NotesPage() {
  return (
    <main className="min-h-screen p-8 md:p-16 max-w-5xl mx-auto font-sans relative z-10 text-zinc-300">
      <HomeButton />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-12 md:mt-0 mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-zinc-100">Engineering Notes</h1>
        <p className="text-zinc-500 font-mono text-sm max-w-xl leading-relaxed">
          Documentation, algorithm patterns, and system design thoughts. Synced directly to local filesystem.
        </p>
      </motion.div>

      {/* Stealth File Explorer UI */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-zinc-950/20 backdrop-blur-md rounded-xl border border-zinc-800/40 overflow-hidden shadow-2xl"
      >
        {/* Mock Window Header */}
        <div className="bg-black/60 border-b border-zinc-800/50 px-6 py-4 flex items-center justify-between">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40"></div>
          </div>
          <div className="text-[10px] font-mono text-zinc-600 tracking-widest">~/root/notes</div>
        </div>

        {/* Table Column Headers (Hidden on Mobile) */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-zinc-800/40 bg-zinc-950/40 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
          <div className="col-span-6">Filename</div>
          <div className="col-span-4">Tags</div>
          <div className="col-span-2 text-right">Modified</div>
        </div>

        {/* File List */}
        <div className="divide-y divide-zinc-800/20">
          {notes.map((note, i) => (
            <motion.div 
              key={note.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + (i * 0.05) }}
            >
              <Link 
                href={`/notes/${note.slug}`}
                className="group grid grid-cols-1 md:grid-cols-12 gap-4 items-center px-6 py-4 hover:bg-zinc-900/30 transition-colors"
              >
                {/* File Name (Using slug to look like a .md file) */}
                <div className="col-span-6 flex items-center gap-3">
                  <span className="text-zinc-600 font-mono text-sm group-hover:text-blue-500 transition-colors">↳</span>
                  <div>
                    <h2 className="text-zinc-300 font-mono text-sm group-hover:text-blue-400 transition-colors truncate">
                      {note.slug}.md
                    </h2>
                    {/* Real Title shown on hover/subtext on mobile */}
                    <p className="text-[10px] text-zinc-600 mt-1 md:hidden group-hover:text-zinc-400">{note.title}</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="col-span-4 flex flex-wrap gap-2 mt-2 md:mt-0">
                  {note.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-mono px-2 py-0.5 bg-black/40 border border-zinc-800/50 rounded text-zinc-500 uppercase shadow-inner group-hover:border-zinc-700/50 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Date */}
                <div className="col-span-2 text-left md:text-right text-xs font-mono text-zinc-600 mt-2 md:mt-0">
                  {note.date}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}