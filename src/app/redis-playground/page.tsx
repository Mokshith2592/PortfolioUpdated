"use client";
import { useState, useRef, useEffect } from 'react';
import { HomeButton } from '@/components/ui/HomeButton';

export default function RedisPlayground() {
  const [db, setDb] = useState<Record<string, string>>({ "mokshith-os": "v1.1.0" });
  const [output, setOutput] = useState<string[]>(['redis-cli v7.2.0', 'Type "HELP" for a list of commands.']);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [output]);

  const handleRedis = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;
    
    const parts = trimmed.split(/\s+/);
    const op = parts[0].toUpperCase();
    let res = "";

    switch(op) {
      case 'HELP':
        res = "Available commands: SET [key] [val], GET [key], DEL [key], KEYS *, PING, FLUSHALL";
        break;
      case 'SET': 
        if (parts.length < 3) res = "(error) ERR syntax: SET key value";
        else { setDb(prev => ({...prev, [parts[1]]: parts.slice(2).join(' ')})); res = "OK"; }
        break;
      case 'GET': 
        res = db[parts[1]] ? db[parts[1]] : "(nil)"; 
        break;
      case 'DEL': 
        if (db[parts[1]]) { const n = {...db}; delete n[parts[1]]; setDb(n); res = "(integer) 1"; }
        else res = "(integer) 0";
        break;
      case 'KEYS': 
        res = Object.keys(db).length ? Object.keys(db).join(' ') : "(empty list)"; 
        break;
      case 'PING': res = "PONG"; break;
      case 'FLUSHALL': setDb({}); res = "OK"; break;
      default: res = `(error) ERR unknown command '${op}'`;
    }
    setOutput(prev => [...prev, `redis> ${trimmed}`, res]);
  };

  return (
    <main className="p-12 min-h-screen bg-black text-zinc-300 font-mono" onClick={() => inputRef.current?.focus()}>
      <HomeButton />
      <h1 className="text-2xl font-bold text-white mb-6">Redis Playground</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-2 bg-zinc-950 border border-zinc-800 p-4 rounded-lg h-[400px] flex flex-col">
          <div className="flex-1 overflow-y-auto mb-2 text-sm" ref={scrollRef}>
            {output.map((line, i) => <div key={i} className={line.startsWith('redis>') ? "text-green-500 mt-2" : "text-zinc-400"}>{line}</div>)}
          </div>
          <div className="flex border-t border-zinc-800 pt-2">
            <span className="text-green-500 mr-2">redis&gt;</span>
            <input 
              ref={inputRef}
              autoFocus
              className="flex-1 bg-transparent outline-none text-white"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if(e.key === 'Enter') { handleRedis(input); setInput(''); } }}
            />
          </div>
        </div>

        {/* The Sidebar Helper */}
        <div className="bg-zinc-900/30 p-6 rounded-xl border border-zinc-800 h-fit">
          <h3 className="text-white font-bold mb-4">Command Guide</h3>
          <ul className="space-y-3 text-sm">
            <li><code className="text-blue-400">SET key value</code> - Store a value</li>
            <li><code className="text-blue-400">GET key</code> - Retrieve a value</li>
            <li><code className="text-blue-400">DEL key</code> - Remove a key</li>
            <li><code className="text-blue-400">KEYS *</code> - List all keys</li>
            <li><code className="text-blue-400">PING</code> - Test connection</li>
          </ul>
        </div>
      </div>
    </main>
  );
}