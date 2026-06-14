'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const router = useRouter();

  // These are the routes we will be building!
  const routes = [
    { name: 'Open System Terminal (Home)', path: '/' },
    { name: 'View Projects Grid', path: '/projects' },
    { name: 'View Markdown Notes', path: '/notes' },
    { name: 'Open Redis Playground', path: '/redis-playground' },
    { name: 'Open Redis Architecture', path: '/architecture/redis' },
    { name: 'Open Engineering Timeline', path: '/timeline' },
    { name: 'Open Interactive Skill Tree', path: '/skill-tree' },
    { name: 'Open System Status Console', path: '/status' },
    { name: 'Open Now Dashboard', path: '/now' },
    { name: 'View GitHub Integration', path: '/github' }
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const filtered = routes.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center pt-[20vh]">
      <div className="bg-[#09090b] border border-zinc-800 w-full max-w-xl rounded-xl shadow-2xl overflow-hidden font-sans">
        <div className="p-4 border-b border-zinc-800 flex items-center gap-3">
          <span className="text-zinc-400">⚡</span>
          <input
            autoFocus
            type="text"
            placeholder="Search commands, tools, systems... (Esc to exit)"
            className="w-full bg-transparent text-zinc-100 outline-none placeholder-zinc-500 text-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="max-h-64 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <p className="text-sm text-zinc-500 p-4 font-mono">No matching control structures found.</p>
          ) : (
            filtered.map((route) => (
              <button
                key={route.path}
                className="w-full text-left px-4 py-3 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-lg text-sm font-mono flex justify-between items-center transition-colors"
                onClick={() => {
                  router.push(route.path);
                  setIsOpen(false);
                  setSearch('');
                }}
              >
                <span>{route.name}</span>
                <span className="text-xs text-zinc-500">⏎ Run</span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}