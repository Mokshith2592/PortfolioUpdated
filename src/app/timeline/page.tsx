"use client";
import { HomeButton } from '@/components/ui/HomeButton';

const events = [
  { year: '2026', title: 'Systems Engineering Focus', desc: 'Deep dive into Redis internals, non-blocking I/O, and RESP protocol at NITW.' },
  { year: '2026', title: 'SDE Internship @ Visa', desc: 'Applied distributed systems knowledge to large-scale payment pipelines.' },
  { year: '2025', title: 'Full-Stack Development', desc: 'Architected the T&P Portal using Next.js, managing university-wide placement flows.' },
  { year: '2025', title: 'Competitive Programming', desc: 'Mastered C++ data structures and algorithmic optimization for high-pressure contests.' },
  { year: '2024', title: 'Introduction to AI/ML', desc: 'Built neural networks and explored swarm intelligence algorithms like Grey Wolf Optimizer.' }
];

export default function Timeline() {
  return (
    <main className="p-12 min-h-screen bg-black text-zinc-300 font-mono">
      <HomeButton />
      <h1 className="text-3xl font-bold text-white mb-2">Engineering Log</h1>
      <p className="text-blue-400 text-sm mb-12 uppercase tracking-widest">System Trajectory: v1.1.0</p>

      <div className="max-w-2xl relative border-l border-zinc-800 ml-4">
        {events.map((e, i) => (
          <div key={i} className="mb-10 ml-8 relative group">
            <div className="absolute -left-[41px] top-1 w-5 h-5 bg-black border border-blue-500 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors">
              <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:bg-black"></div>
            </div>
            <div className="text-blue-500 text-xs mb-1 font-bold">{e.year}</div>
            <h3 className="text-white font-bold text-lg mb-2">{e.title}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">{e.desc}</p>
          </div>
        ))}
      </div>
      
      {/* System Status Footer */}
      <div className="mt-16 p-4 border border-zinc-800 bg-zinc-950/50 rounded-lg max-w-2xl text-xs text-zinc-500">
        [LOG_STATUS]: TIMELINE_SYNC_COMPLETE | NODES_PROCESSED: {events.length} | UPTIME_SINCE: 2024
      </div>
    </main>
  );
}