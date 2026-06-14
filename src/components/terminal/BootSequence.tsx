"use client"; 
import { motion } from 'framer-motion'; 
export const BootSequence = ({ onComplete }: { onComplete: () => void }) => { 
  return ( 
    <motion.div initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ delay: 2, duration: 1 }} onAnimationComplete={onComplete} className="fixed inset-0 z-50 bg-black flex flex-col justify-center p-12 font-mono text-blue-500"> 
      <p>INITIALIZING SYSTEM...</p> 
      <p>Loading Projects...</p> 
      <p>SYSTEM READY</p> 
    </motion.div> 
  ); 
}; 
