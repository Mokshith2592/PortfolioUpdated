"use client";
import { HomeButton } from '@/components/ui/HomeButton';
import { nowStatus } from '@/lib/data';

export default function Now() {
  return (
    <main className="p-12 min-h-screen bg-black text-zinc-300 font-mono">
      <HomeButton />
      <h1 className="text-3xl font-bold text-white mb-2">System Status: NOW</h1>
      <p className="text-blue-400 text-sm mb-12 uppercase tracking-widest">Active Focus & Learning Modules</p>

      <div className="max-w-2xl space-y-8">
        <div className="border-l-2 border-green-500 pl-6">
          <h3 className="text-white font-bold text-lg mb-2">Currently Building</h3>
          <p className="text-zinc-400">{nowStatus.building}</p>
        </div>

        <div className="border-l-2 border-blue-500 pl-6">
          <h3 className="text-white font-bold text-lg mb-2">Deep-Diving</h3>
          <p className="text-zinc-400">{nowStatus.diving}</p>
        </div>

        <div className="border-l-2 border-purple-500 pl-6">
          <h3 className="text-white font-bold text-lg mb-2">Career Focus</h3>
          <p className="text-zinc-400">{nowStatus.focus}</p>
        </div>
      </div>

      <div className="mt-16 text-xs text-zinc-600 italic">
        [Status: Last sync at {new Date().toLocaleDateString()} | State: Operational]
      </div>
    </main>
  );
}