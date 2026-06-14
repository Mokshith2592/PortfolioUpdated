"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TerminalPage() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState(['Welcome to MokshithOS v1.0. Type "help" for commands.']);
  const router = useRouter();

  const handleCommand = (cmd: string) => {
    const c = cmd.toLowerCase().trim();
    const newHistory = [...history, `$ ${cmd}`];
    
    if (c === 'help') {
      setHistory([...newHistory, 'Available: help, whoami, projects, clear, home, redis']);
    } else if (c === 'whoami') {
      setHistory([...newHistory, 'Mokshith | Systems Engineer & Competitive Programmer']);
    } else if (c === 'projects') {
      router.push('/projects');
    } else if (c === 'redis') {
      router.push('/projects/redis');
    } else if (c === 'clear') {
      setHistory([]);
    } else if (c === 'home') {
      router.push('/');
    } else {
      setHistory([...newHistory, `Command '${c}' not recognized.`]);
    }
  };

  return (
    <div className="p-10 font-mono text-green-500 bg-black min-h-screen">
      {history.map((line, i) => <p key={i}>{line}</p>)}
      <input 
        autoFocus 
        className="bg-transparent outline-none w-full" 
        onKeyDown={(e) => { if(e.key === 'Enter') { handleCommand(input); setInput(''); } }} 
        onChange={(e) => setInput(e.target.value)} 
        value={input} 
      />
    </div>
  );
}