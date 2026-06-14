"use client";
import { HomeButton } from '@/components/ui/HomeButton';
import { skills } from '@/lib/data';

export default function SkillTree() {
  return (
    <main className="p-12 min-h-screen bg-black text-zinc-300 font-mono">
      <HomeButton />
      <h1 className="text-3xl font-bold text-white mb-2">Technical Skill Tree</h1>
      <p className="text-blue-400 text-sm mb-12 uppercase tracking-widest">Core Competency Graph</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {skills.map((s) => (
          <div key={s.category} className="border border-zinc-800 p-6 rounded-lg bg-zinc-950 hover:border-zinc-700 transition-all duration-300">
            <h3 className="text-white font-bold mb-4 border-b border-zinc-800 pb-2 flex justify-between items-center">
              <span>{s.category}</span>
              <span className="text-[10px] text-zinc-600 font-normal">// Node_</span>
            </h3>
            <ul className="space-y-2">
              {s.items.map((item) => (
                <li key={item} className="text-zinc-400 text-sm flex items-center group cursor-default">
                  <span className="text-blue-500 mr-2 group-hover:translate-x-1 transition-transform">▹</span> 
                  <span className="group-hover:text-zinc-200 transition-colors">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-zinc-600 text-xs italic">
        [Status: Tree nodes parsed cleanly from data layers]
      </div>
    </main>
  );
}