"use client";
import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion'; // <-- Added AnimatePresence

type HistoryItem = { id: string; command: string; output: string | React.ReactNode };

const COMMANDS = ['help', 'whoami', 'pwd', 'tree', 'find', 'neofetch', 'resume', 'clear', 'ls', 'cd', 'cat', 'ping', 'sudo', 'hack', 'matrix', 'weather', 'roll', 'github'];
const DIRECTORIES = ['projects', 'notes', 'architecture', 'redis-playground', 'timeline', 'skill-tree', 'now', 'achievements'];

const PATHS: Record<string, string> = {
  'projects': '/projects', 
  'notes': '/notes', 
  'redis-playground': '/redis-playground',
  'architecture': '/architecture/redis', 
  'timeline': '/timeline',
  'skill-tree': '/skill-tree', 
  'now': '/now', 
  'achievements': '/achievements'
};

// --- PURE RENDER FUNCTION --- 
const generateOutput = (baseCmd: string, target: string, fullTarget: string, cmdHistorySnapshot: string[]): React.ReactNode | string => {
  switch (baseCmd) {
    case 'help':
      return (
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-zinc-400">
          <span className="text-blue-400 font-bold">Navigation</span><span className="font-bold border-b border-zinc-800/50 pb-1 mb-1">Description</span>
          <span className="text-blue-400">ls [dir]</span><span>List files and directories</span>
          <span className="text-blue-400">cd [path]</span><span>Navigate system path</span>
          <span className="text-blue-400">tree</span><span>Display file tree</span>
          <span className="text-blue-400 font-bold mt-4">System</span><span className="font-bold border-b border-zinc-800/50 pb-1 mb-1 mt-4">Description</span>
          <span className="text-blue-400">whoami</span><span>Display user identity</span>
          <span className="text-blue-400">github</span><span>Open GitHub profile</span>
          <span className="text-blue-400">neofetch</span><span>Show system stats</span>
          <span className="text-blue-400">resume</span><span>View Resume</span>
          <span className="text-blue-400">clear</span><span>Clear terminal screen</span>
        </div>
      );
    case 'whoami': return "user: mokshith\nrole: developer\nstatus: building_the_future\nlocation: Anantapur, Andhra Pradesh, India [NODE_ACTIVE]";
    case 'pwd': return '/root/portfolio/system';
    case 'tree':
      return (
        <pre className="text-zinc-400 font-mono text-sm">
{`root/
├── projects/
├── notes/
├── architecture/
├── redis-playground
├── timeline
├── skill-tree
├── now
└── achievements`}
        </pre>
      );
    case 'find': return !target ? "Usage: find [term]" : `Searching nodes for "${target}"...\n- /notes/binary-search.md\n- /projects/redis`;
    case 'history': return <div className="font-mono text-zinc-400">{cmdHistorySnapshot.map((c, i) => <div key={i}>{String(i+1).padStart(2, ' ')} {c}</div>)}</div>;
    case 'github': return "Redirecting to GitHub profile...";
    case 'neofetch':
      return (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col md:flex-row gap-8 my-6 p-6 bg-black/30 backdrop-blur-xl border border-zinc-800/40 rounded-xl font-mono text-sm shadow-[0_0_30px_rgba(0,0,0,0.3)]"
        >
          <pre className="text-blue-500 font-bold leading-none hidden md:block drop-shadow-[0_0_12px_rgba(59,130,246,0.4)]">
{`  _____ 
 / ____|
| (___  
 \\___ \\ 
 ____) |
|_____/ `}
          </pre>
          <div className="text-zinc-300 w-full">
            <div className="text-white font-bold mb-3 text-sm border-b border-zinc-700/50 pb-2">
              <span className="text-blue-400">mokshith</span>@<span className="text-blue-400">mokshithOS</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
              <div><span className="text-blue-400 font-bold">OS:</span> MokshithOS v2.0</div>
              <div><span className="text-blue-400 font-bold">Host:</span> NIT Warangal</div>
              <div><span className="text-blue-400 font-bold">Kernel:</span> redis-core</div>
              <div><span className="text-blue-400 font-bold">Shell:</span> mokshsh</div>
              <div><span className="text-blue-400 font-bold">Projects:</span> 8</div>
              <div><span className="text-blue-400 font-bold">Notes:</span> 25</div>
              <div className="col-span-full mt-2 pt-2 border-t border-zinc-800/50"><span className="text-purple-400 font-bold">Focus:</span> Systems Programming</div>
              <div className="col-span-full"><span className="text-zinc-500 font-bold">Uptime:</span> 3 Years of Coding</div>
            </div>
          </div>
        </motion.div>
      );
    case 'ls': return !target ? <div className="flex gap-4 text-blue-400 font-bold">projects/ notes/ architecture/ redis-playground/ timeline/ skill-tree/ now/ achievements/</div> : `ls: cannot access '${target}': No such file`;
    case 'cd': return PATHS[target] ? `Navigating to ${target}...` : `cd: ${target}: No such directory`;
    case 'cat':
      if (target === '.env' || target === 'secrets.txt') return <span className="text-red-400">Access Denied: Nice try! My API keys are locked away securely.</span>;
      return target?.startsWith('notes/') ? "Type 'cd' to read note." : "cat: File not found.";
    case 'resume':
      return (
        <div className="flex flex-col gap-1 mt-2">
          <span className="text-zinc-400">Initializing PDF viewer...</span>
          <span className="text-green-500 font-bold">[SUCCESS] Resume protocol launched in secure environment.</span>
        </div>
      );
    case 'ping': return fullTarget === 'google.com' ? "64 bytes from 8.8.8.8: icmp_seq=1 ttl=117 time=12.4 ms" : "Pinging... destination unreachable.";
    case 'sudo': return fullTarget.includes('rm -rf') ? <span className="text-red-500 font-bold">[CRITICAL] SYSTEM_PROTECTION_FAULT: You cannot delete the OS, Mokshith.</span> : <span className="text-yellow-500">mokshith is not in the sudoers file. This incident will be reported.</span>;
    case 'hack': return fullTarget === 'nasa' ? "Accessing controls... [SUCCESS]. Welcome, Flight Director." : "Target unreachable. Try 'hack nasa'.";
    case 'become':
      if (fullTarget === 'billionaire') return "Processing... Error: Insufficient capital. Keep coding.";
      if (fullTarget === 'god') return "403 Forbidden: Only the compiler has that privilege.";
      return "Syntax invalid.";
    case 'make': return fullTarget === 'me sandwich' ? "Command not found: [Errno 418] I'm a teapot, not a chef." : fullTarget === 'me ceo' ? "System initialized... Welcome, CEO." : "Syntax invalid.";
    case 'vim': return "Vim is currently running. Press Esc, type :wq, and pray you escape.";
    case 'emacs': return "Wait, people still use emacs? Try 'vim' instead.";
    case 'matrix':
      return (
        <div className="text-green-500 flex flex-col">
          <span>Wake up, Mokshith...</span>
          <span>The Matrix has you...</span>
          <span>Follow the white rabbit.</span>
          <span>Knock, knock.</span>
        </div>
      );
    case 'weather': return "Weather module offline. Just look out the window.";
    case 'roll':
      const rollResult = Math.floor(Math.random() * 20) + 1;
      return `Rolling 1d20... You rolled a ${rollResult}! ${rollResult === 20 ? 'Critical Hit!' : rollResult === 1 ? 'Critical Failure!' : ''}`;
    default: return `Command not found: ${baseCmd}.`;
  }
};

export const LiveTerminal = () => {
  const router = useRouter();
  
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([{ id: 'init', command: '', output: 'Welcome to MokshithOS v2.0. Type "help" to see available commands.' }]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [isReady, setIsReady] = useState(false);
  const [isMeltdown, setIsMeltdown] = useState(false);
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // --- AUDIO ENGINE STATE ---
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);

  // --- LOAD AUDIO INTO MEMORY ---
  useEffect(() => {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioContextRef.current = new AudioContextClass();
      
      fetch('/sounds/keyboard.mp3')
        .then(res => res.arrayBuffer())
        .then(buffer => audioContextRef.current?.decodeAudioData(buffer))
        .then(decodedData => {
          if (decodedData) audioBufferRef.current = decodedData;
        })
        .catch(console.error);
    }
      
    return () => {
      if (audioContextRef.current?.state !== 'closed') {
        audioContextRef.current?.close();
      }
    };
  }, []);

  // --- ZERO-LATENCY SLICER ---
  const playSound = (type: 'key' | 'enter') => {
    if (!audioContextRef.current || !audioBufferRef.current) return;
    
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBufferRef.current;

    const gainNode = audioContextRef.current.createGain();
    gainNode.gain.value = type === 'enter' ? 0.6 : 0.3;

    source.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    const randomStart = 2.0 + Math.random() * 8.0;
    const duration = type === 'enter' ? 0.15 : 0.08;
    source.start(0, randomStart, duration);
  };

  // --- REHYDRATION PROTOCOL ---
  useEffect(() => {
    const savedLog = sessionStorage.getItem('mokshithos_term_log');
    if (savedLog) {
      try {
        const parsedLog: string[] = JSON.parse(savedLog);
        let rebuiltHistory: HistoryItem[] = [{ id: 'init', command: '', output: 'Welcome to MokshithOS v2.0. Type "help" to see available commands.' }];
        let rebuiltCmdHistory: string[] = [];

        parsedLog.forEach((cmdStr) => {
          const lowerCmd = cmdStr.toLowerCase();
          const args = lowerCmd.split(' ');
          const baseCmd = args[0];
          
          if (baseCmd === 'clear') {
            rebuiltHistory = [];
          } else {
            if (cmdStr.trim()) rebuiltCmdHistory.push(cmdStr.trim());
            const output = generateOutput(baseCmd, args[1]?.replace(/\/$/, ''), args.slice(1).join(' ').replace(/\/$/, ''), rebuiltCmdHistory);
            rebuiltHistory.push({ id: Math.random().toString(), command: cmdStr, output });
          }
        });

        setHistory(rebuiltHistory);
        setCmdHistory(rebuiltCmdHistory);
      } catch (e) {
        console.error("Failed to parse terminal session log");
      }
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const focusInput = () => inputRef.current?.focus();

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) {
      setHistory(prev => [...prev, { id: Math.random().toString(), command: trimmedCmd, output: '' }]);
      return;
    }

    const lowerCmd = trimmedCmd.toLowerCase();
    const args = lowerCmd.split(' ');
    const baseCmd = args[0];
    const target = args[1]?.replace(/\/$/, '');
    const fullTarget = args.slice(1).join(' ').replace(/\/$/, '');

    // 1. Save to session storage log
    const savedLog = sessionStorage.getItem('mokshithos_term_log');
    let logArr = savedLog ? JSON.parse(savedLog) : [];
    if (baseCmd === 'clear') {
      sessionStorage.removeItem('mokshithos_term_log');
    } else {
      logArr.push(trimmedCmd);
      sessionStorage.setItem('mokshithos_term_log', JSON.stringify(logArr));
    }

    // 2. Execute Side Effects
    if (baseCmd === 'cd' && PATHS[target]) {
      setTimeout(() => router.push(PATHS[target]), 300);
    } else if (baseCmd === 'github' || (baseCmd === 'cd' && target === 'github')) {
      window.open('https://github.com/Mokshith2592', '_blank');
    } else if (baseCmd === 'resume') {
      window.open('/resume.pdf', '_blank');
    }
    
    // 2.5 GUI Window Triggers
    if (baseCmd === 'open') {
      if (['projects', 'notes'].includes(target)) {
        window.dispatchEvent(new CustomEvent('open-os-window', { detail: target }));
        setHistory(prev => [...prev, { id: Math.random().toString(), command: trimmedCmd, output: `Spawning GUI process: ${target}.exe...` }]);
      } else {
        setHistory(prev => [...prev, { id: Math.random().toString(), command: trimmedCmd, output: `Cannot open '${target}'. Try 'open projects' or 'open notes'.` }]);
      }
      return;
    }
    
    // 3. Update React State UI
    if (baseCmd === 'sudo' && fullTarget.includes('rm -rf')) {
      // TRIGGER THE MELTDOWN
      setIsMeltdown(true);
      
      // Wipe the memory so it actually has to reboot
      sessionStorage.removeItem('mokshithos_term_log');
      sessionStorage.removeItem('mokshithos_booted');
      
      // Force a real page reload after 4 seconds of chaos
      setTimeout(() => {
        window.location.reload();
      }, 4000);
      return;
    } else if (baseCmd === 'clear') {
      setHistory([]);
    } else {
      const output = generateOutput(baseCmd, target, fullTarget, [...cmdHistory, trimmedCmd]);
      setHistory(prev => [...prev, { id: Math.random().toString(), command: trimmedCmd, output }]);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!['Shift', 'Control', 'Alt', 'Meta', 'ArrowUp', 'ArrowDown', 'Tab'].includes(e.key)) {
      playSound(e.key === 'Enter' ? 'enter' : 'key');
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const args = input.split(' ');
      if (args.length === 1) {
        const matches = COMMANDS.filter(c => c.startsWith(args[0].toLowerCase()));
        if (matches.length === 1) setInput(matches[0] + ' ');
      } else if (args.length === 2 && ['cd', 'ls', 'cat'].includes(args[0].toLowerCase())) {
        const matches = DIRECTORIES.filter(d => d.startsWith(args[1].toLowerCase()));
        if (matches.length === 1) setInput(`${args[0]} ${matches[0]}`);
      }
      return;
    }

    if (e.ctrlKey) {
      if (e.key.toLowerCase() === 'l') {
        e.preventDefault();
        setHistory([]);
        sessionStorage.removeItem('mokshithos_term_log');
        return;
      }
      if (e.key.toLowerCase() === 'c') {
        e.preventDefault();
        setHistory(prev => [...prev, { id: Math.random().toString(), command: input + '^C', output: '' }]);
        setInput('');
        return;
      }
    }

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

  if (!isReady) return null;

  return (
    <>
      <div 
        className="w-full h-72 md:h-80 max-h-[50vh] bg-zinc-950/20 backdrop-blur-md border border-zinc-800/40 rounded-xl p-4 md:p-6 font-mono text-sm overflow-y-auto cursor-text shadow-2xl z-10 relative" 
        onClick={focusInput}
      >
        {history.map((item) => (
          <div key={item.id} className="mb-3">
            {item.command && (
              <div className="flex gap-2">
                <span className="text-green-500 shrink-0">mokshith@os:~$</span>
                <span className="text-zinc-100 break-all">{item.command}</span>
              </div>
            )}
            <div className="text-zinc-400 mt-1 whitespace-pre-wrap">{item.output}</div>
          </div>
        ))}
        <div className="flex gap-2 mt-2">
          <span className="text-green-500 shrink-0">mokshith@os:~$</span>
          <input 
            ref={inputRef} 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onKeyDown={handleKeyDown} 
            className="flex-1 bg-transparent outline-none text-zinc-100" 
            spellCheck={false}
            autoComplete="off"
            autoFocus 
          />
        </div>
        <div ref={bottomRef} className="pb-2" />
      </div>

      {/* --- THE MELTDOWN OVERLAY --- */}
      <AnimatePresence>
        {isMeltdown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center overflow-hidden"
          >
            {/* Red flashing background */}
            <motion.div 
              animate={{ opacity: [0, 0.8, 0.2, 0.9, 0.1, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "mirror" }}
              className="absolute inset-0 bg-red-600 mix-blend-color-burn"
            />
            
            {/* Shaking Text */}
            <motion.div
              animate={{ 
                x: [-10, 15, -20, 10, -5, 20, 0], 
                y: [10, -15, 20, -10, 5, -20, 0],
                filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(-90deg)", "hue-rotate(0deg)"]
              }}
              transition={{ duration: 0.2, repeat: Infinity }}
              className="relative z-10 text-red-500 font-bold text-6xl md:text-9xl tracking-tighter drop-shadow-[0_0_20px_rgba(239,68,68,1)] flex flex-col items-center"
            >
              <span>KERNEL PANIC</span>
              <span className="text-xl md:text-3xl text-red-300 mt-4 tracking-widest animate-pulse">SYSTEM CORRUPTION DETECTED</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};