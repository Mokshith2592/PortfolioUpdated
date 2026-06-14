"use client";
import { HomeButton } from '@/components/ui/HomeButton';
import { achievements } from '@/lib/data';

export default function Achievements() {
  return (
    <main className="p-12 min-h-screen bg-black text-zinc-300 font-mono">
      <HomeButton />
      <h1 className="text-3xl font-bold text-white mb-2">Achievement Ledger</h1>
      <p className="text-blue-400 text-sm mb-12 uppercase tracking-widest">Permanent Record of Technical Milestones</p>

      <div className="max-w-3xl">
        {achievements.map((r) => (
          <div key={r.id} className="mb-6 p-6 border border-zinc-800 bg-zinc-950 rounded-lg hover:border-zinc-600 transition-colors">
            <div className="text-xs text-zinc-600 mb-2">ID: {r.id}</div>
            <h3 className="text-white font-bold text-lg mb-2">{r.title}</h3>
            <p className="text-zinc-400 text-sm">{r.detail}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-zinc-600 text-xs italic">
        [Status: Ledger verified by MokshithOS Core]
      </div>
    </main>
  );
}