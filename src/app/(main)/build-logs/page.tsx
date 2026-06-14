"use client"; 
import { useState } from 'react'; 
import { motion } from 'framer-motion'; 
export default function BuildLogs() { 
  const logs = [ { title: 'RESP Parser', detail: 'Approach: Token-based state machine. Outcome: High-throughput.' } ]; 
  const [openIndex, setOpenIndex] = useState(null as number | null); 
  return ( 
    <div className="p-20 max-w-2xl mx-auto"> 
      {logs.map((log, i) => ( 
        <div key={i} className="cursor-pointer mb-6" onClick={() => setOpenIndex(openIndex === i ? null : i)}> 
          <h4 className="text-xl font-bold">{log.title}</h4> 
          {openIndex === i && ( 
            <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="text-zinc-400 mt-2">{log.detail}</motion.p> 
          )} 
        </div> 
      ))} 
    </div> 
  ); 
} 
