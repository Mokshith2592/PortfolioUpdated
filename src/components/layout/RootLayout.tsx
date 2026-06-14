import { Dock } from './Dock'; 
export default function RootLayout({ children }: { children: React.ReactNode }) { 
  return ( 
    <main className="min-h-screen bg-black text-white selection:bg-blue-500/30"> 
      {children} 
      <Dock /> 
    </main> 
  ); 
} 
