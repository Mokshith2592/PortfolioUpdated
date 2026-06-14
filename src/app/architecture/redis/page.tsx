"use client";
import { useState } from 'react';
import { HomeButton } from '@/components/ui/HomeButton';

const nodes = [
  { 
    id: 'client', label: '1. Client', 
    desc: 'The client initiates the connection and serializes commands into the RESP protocol.',
    rationale: 'RESP is optimized for rapid parsing while remaining human-readable for debugging.',
    perf: 'Persistent TCP connections eliminate repetitive SYN/ACK handshake latency.',
    code: 'socket.write("*2\r\n$3\r\nGET\r\n$3\r\nkey\r\n");'
  },
  { 
    id: 'tcp', label: '2. TCP Socket Layer', 
    desc: 'Uses non-blocking I/O multiplexing (epoll) to handle thousands of concurrent file descriptors.',
    rationale: 'Eliminates the 1-thread-per-client model, saving memory that would be lost to thread stacks.',
    perf: 'O(1) connection management regardless of total connection count.',
    code: 'epoll_wait(epoll_fd, events, MAX_EVENTS, -1);'
  },
  { 
    id: 'resp', label: '3. RESP Parser', 
    desc: 'A deterministic finite automaton (DFA) that tokenizes byte streams into command structs.',
    rationale: 'Single-pass tokenization ensures zero-copy buffer reads, keeping CPU cache hot.',
    perf: 'O(N) throughput; optimized for minimal memory allocation.',
    code: 'if (buffer[0] == \'*\') parse_array(buffer);'
  },
  { 
    id: 'dispatcher', label: '4. Command Dispatcher', 
    desc: 'Maps the command string to a global execution function pointer table.',
    rationale: 'Decouples command logic from the core engine, allowing O(1) routing to execution.',
    perf: 'Constant-time O(1) command lookup.',
    code: 'cmd_table["GET"](args);'
  },
  { 
    id: 'store', label: '5. In-Memory Store', 
    desc: 'A chained hash map performing atomic lookups in volatile RAM.',
    rationale: 'Single-threaded architecture bypasses mutex lock contention and context-switching overhead.',
    perf: 'O(1) time complexity for reads and writes.',
    code: 'dictFetchValue(db, key);'
  }
];

export default function RedisArchitecture() {
  const [selected, setSelected] = useState(nodes[0]);

  return (
    <main className="p-12 min-h-screen bg-black text-zinc-300 font-mono">
      <HomeButton />
      <h1 className="text-3xl font-bold text-white mb-2">Redis Internal Pipeline</h1>
      <p className="text-zinc-500 mb-8 italic">"The request-to-response journey inside the Mokshith Redis Engine"</p>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          {nodes.map((node) => (
            <button 
              key={node.id}
              onClick={() => setSelected(node)}
              className={`w-full p-6 border rounded-xl text-left transition-all ${
                selected.id === node.id ? 'border-blue-500 bg-blue-900/10' : 'border-zinc-800 bg-zinc-950'
              }`}
            >
              <div className="font-bold text-white text-lg">{node.label}</div>
            </button>
          ))}
        </div>

        <div className="border border-zinc-800 bg-zinc-950 p-8 rounded-xl h-fit shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6">{selected.label} Internals</h2>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-blue-400 text-[10px] font-bold uppercase mb-1 tracking-widest">Functional Description</h4>
              <p className="text-zinc-300 text-sm">{selected.desc}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-900 p-4 rounded border border-zinc-800">
                <h4 className="text-blue-400 text-[10px] font-bold uppercase mb-1 tracking-widest">Engineering Rationale</h4>
                <p className="text-zinc-400 text-xs">{selected.rationale}</p>
              </div>
              <div className="bg-zinc-900 p-4 rounded border border-zinc-800">
                <h4 className="text-blue-400 text-[10px] font-bold uppercase mb-1 tracking-widest">Performance Metric</h4>
                <p className="text-zinc-400 text-xs">{selected.perf}</p>
              </div>
            </div>

            <div>
              <h4 className="text-blue-400 text-[10px] font-bold uppercase mb-1 tracking-widest">Core Implementation</h4>
              <div className="bg-black p-4 rounded border border-zinc-800 text-blue-300 text-xs font-mono">
                <code>{selected.code}</code>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-12 p-6 border border-zinc-800 rounded-xl bg-zinc-900/10">
        <h4 className="text-white font-bold mb-2">Systems Engineering Summary</h4>
        <p className="text-zinc-500 text-sm leading-relaxed">
          The core advantage of this pipeline is the avoidance of <strong>mutex contention</strong> and <strong>context switching</strong>. By keeping execution within a single thread and memory-bound, the engine maintains O(1) performance even under extreme load.
        </p>
      </div>
    </main>
  );
}