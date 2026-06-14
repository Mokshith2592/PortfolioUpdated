"use client"; 
import { useEffect, useState } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion'; 
import { useRouter } from 'next/navigation'; 
export const CommandPalette = () => { 
  const [isOpen, setIsOpen] = useState(false); 
  const [query, setQuery] = useState(''); 
  const router = useRouter(); 
  const commands = [
    { name: 'Go to Projects', path: '/projects' },
    { name: 'View Build Logs', path: '/build-logs' },
    { name: 'About Me', path: '/about' },
    { name: 'Open Terminal', path: '/terminal' },
  ];
  useEffect(() => { 
    const handleKeyDown = (e: KeyboardEvent) => { 
      if (e.ctrlKey && e.key === 'k') { e.preventDefault(); setIsOpen((prev) => !prev); } 
    }; 
    window.addEventListener('keydown', handleKeyDown); 
    return () => window.removeEventListener('keydown', handleKeyDown); 
  }, []); 
  return ( 
    <AnimatePresence> 
      {isOpen && ( 
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/60 backdrop-blur-sm"> 
          <motion.div initial={{ y: -20 }} animate={{ y: 0 }} className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl"> 
            <input autoFocus className="w-full p-4 bg-transparent outline-none text-white border-b border-zinc-800" placeholder="Search commands..." onChange={(e) => setQuery(e.target.value)} /> 
            <div className="p-2"> 
              {commands.filter(c => c.name.toLowerCase().includes(query.toLowerCase())).map((cmd) => ( 
                <button key={cmd.path} className="w-full p-3 text-left hover:bg-blue-600/20 rounded-lg transition-colors" onClick={() => { router.push(cmd.path); setIsOpen(false); }}> 
                  {cmd.name} 
                </button> 
              ))} 
            </div> 
          </motion.div> 
        </motion.div> 
      )} 
    </AnimatePresence> 
  ); 
}; 
