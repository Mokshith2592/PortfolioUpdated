"use client"; 
import { Home, Folder, Terminal, User, BookOpen } from 'lucide-react'; 
import { motion } from 'framer-motion'; 
import Link from 'next/link'; 
export const Dock = () => { 
  const items = [ 
    { icon: Home, path: '/' }, 
    { icon: Folder, path: '/projects' }, 
    { icon: Terminal, path: '/build-logs' }, 
    { icon: BookOpen, path: '/about' } 
  ]; 
  return ( 
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 glass px-6 py-3 rounded-2xl flex gap-6 border border-zinc-800"> 
      {items.map((item, i) => ( 
        <Link key={i} href={item.path}> 
          <motion.div whileHover={{ y: -5 }} className="text-zinc-400 hover:text-white transition-colors"> 
            <item.icon size={20} /> 
          </motion.div> 
        </Link> 
      ))} 
    </nav> 
  ); 
}; 
