export default function OSLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Added pb-8 so the content doesn't get hidden behind the new global taskbar */}
      <div className="flex-1 pb-8">{children}</div>
      
      {/* 
        The old hardcoded <footer> was completely deleted from here! 
        Your new <StatusBar /> is now handling this from app/layout.tsx 
      */}
    </div>
  );
}