"use client"; 
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'; 
export const ProjectCard = ({ title, desc }: { title: string, desc: string }) => { 
  const x = useMotionValue(0); 
  const y = useMotionValue(0); 
  const rotateX = useSpring(useTransform(y, [-100, 100], [15, -15])); 
  const rotateY = useSpring(useTransform(x, [-100, 100], [-15, 15])); 
  return ( 
    <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }} onMouseMove={(e: any) => { x.set(e.nativeEvent.offsetX - 150); y.set(e.nativeEvent.offsetY - 150); }} onMouseLeave={() => { x.set(0); y.set(0); }} className="w-72 h-96 p-6 bg-zinc-900 border border-zinc-800 rounded-2xl cursor-pointer shadow-xl"> 
      <h3 className="text-xl font-bold">{title}</h3> 
      <p className="mt-4 text-zinc-400">{desc}</p> 
    </motion.div> 
  ); 
}; 
