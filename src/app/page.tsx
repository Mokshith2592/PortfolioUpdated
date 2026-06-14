import { LiveTerminal } from '@/components/terminal/LiveTerminal';

export default function Home() {
  return (
    <main className="h-screen w-full flex bg-black overflow-hidden font-sans relative">
      {/* Hero Profile Section */}
      <div className="w-1/2 border-r border-zinc-900 flex flex-col items-center justify-center p-12 bg-zinc-950">
        <div className="w-64 h-64 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl shadow-blue-500/10">
          <img 
            src="/your-photo.jpeg" 
            alt="Mokshith" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
          />
        </div>
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold text-zinc-100">Mokshith</h2>
          <p className="text-zinc-500 mt-2">Data Engineering Intern @ Visa INC</p>
          <p className="text-zinc-500 mt-1">Final Yr Student @ NIT Warangal</p>
        </div>
      </div>

      {/* OS Status */}
      <div className="w-1/2 p-16 flex flex-col justify-center space-y-12">
        <h1 className="text-5xl font-bold tracking-tighter text-zinc-100">Mokshith Gattu</h1>
        
        <div className="space-y-4">
          <h3 className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-bold">
            Terminal Interface (Type 'help' to navigate)
          </h3>
          <LiveTerminal />
        </div>

        {/* Tech Focus Cards */}
        <section className="grid grid-cols-2 gap-4">
          {['Redis Server', 'Networking', 'Raft', 'Kubernetes'].map((tech) => (
            <div key={tech} className="p-5 bg-zinc-900/30 border border-zinc-800 rounded-xl hover:bg-zinc-800/50 hover:border-zinc-600 transition-all cursor-default">
              <span className="text-sm font-semibold text-zinc-200">{tech}</span>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}