"use client";
import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';

type HistoryItem = { id: string; command: string; output: string | React.ReactNode };

export const LiveTerminal = () => {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    { id: 'init', command: '', output: 'Welcome to MokshithOS v1.1.0. Type "help" to see available commands.' }
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const focusInput = () => inputRef.current?.focus();

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    const lowerCmd = trimmedCmd.toLowerCase();
    let output: string | React.ReactNode = '';

    if (!lowerCmd) return;

    const args = lowerCmd.split(' ');
    const baseCmd = args[0];
    const target = args[1]?.replace(/\/$/, '');
    const fullTarget = args.slice(1).join(' ').replace(/\/$/, '');

    switch (baseCmd) {
      case 'help':
        output = (
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-zinc-400">
            <span className="text-blue-400 font-bold">Navigation</span><span className="font-bold border-b border-zinc-800 pb-1 mb-1">Description</span>
            <span className="text-blue-400">ls [dir]</span><span>List files and directories</span>
            <span className="text-blue-400">cd [path]</span><span>Navigate system path</span>
            <span className="text-blue-400">tree</span><span>Display file tree</span>
            <span className="text-blue-400 font-bold mt-4">System</span><span className="font-bold border-b border-zinc-800 pb-1 mb-1 mt-4">Description</span>
            <span className="text-blue-400">whoami</span><span>Display user identity</span>
            <span className="text-blue-400">history</span><span>List command history</span>
            <span className="text-blue-400">neofetch</span><span>Show system stats</span>
            <span className="text-blue-400">clear</span><span>Clear terminal screen</span>
          </div>
        );
        break;
      
      case 'whoami':
        output = "user: mokshith\nrole: developer\nstatus: building_the_future\nlocation: NIT_Warangal_Node";
        break;

      case 'pwd':
        output = '/root/portfolio/system';
        break;

      case 'tree':
        output = (
          <pre className="text-zinc-400 font-mono text-sm">
{`root/
├── projects/
├── notes/
├── architecture/
├── redis-playground
├── timeline
├── skill-tree
├── now
└── achievements
└── github`}
          </pre>
        );
        break;

      case 'find':
        output = !target ? "Usage: find [term]" : `Searching nodes for "${target}"...\n- /notes/binary-search.md\n- /projects/redis`;
        break;

      case 'history':
        output = <div className="font-mono text-zinc-400">{cmdHistory.map((c, i) => <div key={i}>{String(i+1).padStart(2, ' ')} {c}</div>)}</div>;
        break;

      case 'neofetch':
        output = (
          <div className="flex flex-col md:flex-row gap-8 my-6 font-mono text-xs p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
            {/* Custom Brand ASCII */}
            <pre className="text-blue-500 font-bold leading-none hidden md:block">
{`    M O K S H I T H
    _  _  ___  _  _
   | || ||   \\| || |
   | __ || || | || |
   |_||_||___/|_||_|
   SYSTEM v1.1.0-STABLE`}
            </pre>
            
            <div className="text-zinc-300 space-y-1">
              <div className="text-white font-bold mb-2 text-sm border-b border-zinc-700 pb-1">
                mokshith@NITW-Node-01
              </div>
              <div><span className="text-blue-400">Uptime:</span> {Math.floor(performance.now() / 60000)}m</div>
              <div><span className="text-blue-400">Kernel:</span> Next.js 16.2.9</div>
              <div><span className="text-blue-400">Memory:</span> 42.0MB / 16GB</div>
              <div><span className="text-blue-400">Compiler:</span> Turbopack</div>
              <div className="mt-4 flex gap-1">
                {['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-purple-500'].map((color, i) => (
                  <div key={i} className={`w-8 h-3 ${color} opacity-80`} />
                ))}
              </div>
            </div>
          </div>
        );
        break;

      case 'ls':
        if (!target) output = <div className="flex gap-4 text-blue-400 font-bold">projects/ notes/ architecture/ redis-playground/ timeline/ skill-tree/ now/ achievements/</div>;
        else output = `ls: cannot access '${target}': No such file`;
        break;

      case 'cd':
        const paths: Record<string, string> = {
          'projects': '/projects', 
          'notes': '/notes', 
          'redis-playground': '/redis-playground',
          'architecture': '/architecture/redis', 
          'timeline': '/timeline',
          'skill-tree': '/skill-tree', 
          'now': '/now', 
          'achievements': '/achievements'
        };

        if (target === 'github') {
          window.open('https://github.com/Mokshith2592', '_blank');
          output = "Redirecting to GitHub profile...";
        } else if (paths[target]) { 
          router.push(paths[target]); 
          output = `Navigating to ${target}...`; 
        } else { 
          output = `cd: ${target}: No such directory`; 
        }
        break;

      case 'cat':
        output = target?.startsWith('notes/') ? "Type 'cd' to read note." : "cat: File not found.";
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'ping':
        output = fullTarget === 'google.com' ? "64 bytes from 8.8.8.8: icmp_seq=1 ttl=117 time=12.4 ms" : "Pinging... destination unreachable.";
        break;

      case 'sudo':
        output = fullTarget.includes('rm -rf') ? <span className="text-red-500 font-bold">[CRITICAL] SYSTEM_PROTECTION_FAULT: You cannot delete the OS, Mokshith.</span> : "Permission denied. Don't try to override the root kernel.";
        break;

      case 'hack':
        output = fullTarget === 'nasa' ? "Accessing controls... [SUCCESS]. Welcome, Flight Director." : "Target unreachable. Try 'hack nasa'.";
        break;

      case 'become':
        if (fullTarget === 'billionaire') output = "Processing... Error: Insufficient capital. Keep coding.";
        else if (fullTarget === 'god') output = "403 Forbidden: Only the compiler has that privilege.";
        else output = "Syntax invalid.";
        break;

      case 'make':
        if (fullTarget === 'me sandwich') output = "Command not found: [Errno 418] I'm a teapot, not a chef.";
        else if (fullTarget === 'me ceo') output = "System initialized... Welcome, CEO.";
        else output = "Syntax invalid.";
        break;

      default:
        output = `Command not found: ${baseCmd}.`;
    }
    setHistory(prev => [...prev, { id: Math.random().toString(), command: trimmedCmd, output }]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (input.trim()) setCmdHistory(prev => [...prev, input.trim()]);
      setHistoryIdx(-1);
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const newIdx = historyIdx === -1 ? cmdHistory.length - 1 : Math.max(0, historyIdx - 1);
        setHistoryIdx(newIdx);
        setInput(cmdHistory[newIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx !== -1) {
        const newIdx = historyIdx + 1;
        if (newIdx >= cmdHistory.length) { setHistoryIdx(-1); setInput(''); }
        else { setHistoryIdx(newIdx); setInput(cmdHistory[newIdx]); }
      }
    }
  };

  return (
    <div className="w-full h-80 bg-zinc-950/80 border border-zinc-800 rounded-xl p-4 font-mono text-sm overflow-y-auto cursor-text shadow-inner" onClick={focusInput}>
      {history.map((item) => (
        <div key={item.id} className="mb-3">
          {item.command && <div className="flex gap-2"><span className="text-green-500">mokshith@os:~$</span><span className="text-zinc-100">{item.command}</span></div>}
          <div className="text-zinc-400 mt-1 whitespace-pre-wrap">{item.output}</div>
        </div>
      ))}
      <div className="flex gap-2 mt-2">
        <span className="text-green-500">mokshith@os:~$</span>
        <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} className="flex-1 bg-transparent outline-none text-zinc-100" autoFocus />
      </div>
      <div ref={bottomRef} />
    </div>
  );
};