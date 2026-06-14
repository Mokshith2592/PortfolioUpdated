"use client";
import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import { projects, notes } from '@/lib/data'; // <-- Connecting to the Data Layer!

type HistoryItem = { id: string; command: string; output: string | React.ReactNode };

export const LiveTerminal = () => {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    { id: 'init', command: '', output: 'Welcome to MokshithOS v1.0.0. Type "help" to see available commands.' }
  ]);
  
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
    const target = args[1]?.replace(/\/$/, ''); // Remove trailing slashes

    switch (baseCmd) {
      case 'help':
        output = (
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-zinc-400">
            <span className="text-blue-400">whoami</span><span>Display user information</span>
            <span className="text-blue-400">ls [dir]</span><span>List available files and directories</span>
            <span className="text-blue-400">cd [dir]</span><span>Change directory (navigate OS)</span>
            <span className="text-blue-400">cat [file]</span><span>Read a specific file</span>
            <span className="text-blue-400">clear</span><span>Clear the terminal output</span>
          </div>
        );
        break;
      
      case 'whoami':
        output = 'Mokshith Gattu | Data Engineering Intern @ Visa INC | NIT Warangal';
        break;
      
      case 'ls':
        if (!target) {
          output = (
            <div className="flex gap-4">
              <span className="text-blue-400 font-bold">projects/</span>
              <span className="text-blue-400 font-bold">notes/</span>
              <span className="text-green-400">about.txt</span>
              <span className="text-green-400">skills.json</span>
            </div>
          );
        } else if (target === 'projects') {
          output = (
            <div className="flex gap-4 flex-wrap">
              {projects.map(p => <span key={p.id} className="text-blue-400 font-bold">{p.id}/</span>)}
            </div>
          );
        } else if (target === 'notes') {
          output = (
            <div className="flex gap-4 flex-wrap">
              {notes.map(n => <span key={n.id} className="text-green-400">{n.slug}.md</span>)}
            </div>
          );
        } else {
          output = `ls: cannot access '${target}': No such file or directory`;
        }
        break;

      case 'cd':
        if (!target || target === '~' || target === '..') {
          router.push('/');
          output = 'Navigating to home...';
        } else if (target === 'projects') {
          router.push('/projects');
          output = 'Navigating to /projects...';
        } else if (target === 'notes') {
          router.push('/notes');
          output = 'Navigating to /notes...';
        } else if (target.startsWith('projects/')) {
          const projId = target.split('/')[1];
          // Check if project actually exists in data.ts
          if (projects.find(p => p.id === projId || p.link.includes(projId))) {
             router.push(`/projects/${projId}`);
             output = `Navigating to /projects/${projId}...`;
          } else {
             output = `cd: ${target}: No such directory`;
          }
        } else if (target.startsWith('notes/')) {
          const noteSlug = target.split('/')[1].replace('.md', ''); // Allow typing .md or just the slug
          // Check if note actually exists in data.ts
          if (notes.find(n => n.slug === noteSlug)) {
             router.push(`/notes/${noteSlug}`);
             output = `Navigating to /notes/${noteSlug}...`;
          } else {
             output = `cd: ${target}: No such directory`;
          }
        } else {
          output = `cd: ${target}: No such file or directory`;
        }
        break;

      case 'cat':
        if (!target) {
          output = 'cat: missing file operand';
        } else if (target === 'about.txt') {
          output = 'I am a final year student at NIT Warangal, focusing on distributed systems and competitive programming.';
        } else if (target === 'skills.json') {
          output = '{\n  "languages": ["C++", "Python", "TypeScript"],\n  "tools": ["Redis", "Next.js", "Docker", "Kubernetes"]\n}';
        } else if (target.startsWith('notes/')) {
          const noteSlug = target.split('/')[1].replace('.md', '');
          const note = notes.find(n => n.slug === noteSlug);
          if (note) {
            output = (
              <div className="space-y-2 border-l-2 border-zinc-700 pl-4 my-2">
                <div className="text-zinc-200 font-bold">{note.title}</div>
                <div className="text-zinc-500 text-xs">Date: {note.date}</div>
                <div className="text-zinc-400 mt-2">{note.content.substring(0, 150)}...</div>
                <div className="text-blue-400 text-xs mt-2 italic">Type "cd {target.replace('.md', '')}" to read full note.</div>
              </div>
            );
          } else {
            output = `cat: ${target}: No such file or directory`;
          }
        } else {
          output = `cat: ${target}: No such file or directory`;
        }
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'sudo':
        output = 'Nice try. This incident will be reported.';
        break;

      default:
        output = `Command not found: ${baseCmd}. Type "help" for a list of commands.`;
    }

    setHistory(prev => [...prev, { id: Math.random().toString(), command: trimmedCmd, output }]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div 
      className="w-full h-64 bg-zinc-950/80 border border-zinc-800 rounded-xl p-4 font-mono text-sm overflow-y-auto cursor-text shadow-inner"
      onClick={focusInput}
    >
      {history.map((item) => (
        <div key={item.id} className="mb-3">
          {item.command && (
            <div className="flex gap-2">
              <span className="text-green-500">mokshith@os:~$</span>
              <span className="text-zinc-100">{item.command}</span>
            </div>
          )}
          <div className="text-zinc-400 mt-1 whitespace-pre-wrap">{item.output}</div>
        </div>
      ))}
      
      <div className="flex gap-2 mt-2">
        <span className="text-green-500">mokshith@os:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-zinc-100 placeholder-zinc-700 caret-blue-500"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );
};