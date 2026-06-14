export default function OSLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <div className="flex-1">{children}</div>
      {/* OS Taskbar */}
      <footer className="fixed bottom-0 w-full bg-zinc-950 border-t border-zinc-800 p-2 px-4 flex justify-between items-center text-[10px] font-mono text-zinc-500 z-50">
        <div className="flex gap-4">
          <span className="text-blue-500 font-bold">[MokshithOS v1.1.0]</span>
          <span>SYSTEM_KERNEL: ACTIVE</span>
        </div>
        <div className="flex gap-4">
          <span>CPU: IDLE</span>
          <span>MEM: 42MB</span>
          <span className="text-green-500 font-bold">● LIVE</span>
        </div>
      </footer>
    </div>
  );
}