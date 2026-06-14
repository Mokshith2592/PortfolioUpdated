"use client"; 
import './globals.css'; 
// Notice we deleted the import { Dock } line!
import { CommandPalette } from '../components/terminal/CommandPalette'; 
import { motion, AnimatePresence } from 'framer-motion'; 

export default function RootLayout({ children }: { children: React.ReactNode }) { 
  return ( 
    <html lang="en"> 
      <body className="bg-black text-white relative"> 
        {/* Safely moved your radial gradient background here */}
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-[radial-gradient(circle_500px_at_var(--x,_50%)_var(--y,_50%),_rgba(30,58,138,0.15),_transparent)]" /> 

        <CommandPalette /> 
        
        <AnimatePresence mode="wait"> 
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }} 
            transition={{ duration: 0.3 }}
          > 
            {children} 
          </motion.div> 
        </AnimatePresence> 
        
        {/* <Dock /> used to be here. It is permanently gone. */}
      </body> 
    </html> 
  ); 
}