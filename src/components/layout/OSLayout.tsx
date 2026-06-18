export default function OSLayout({ children }: { children: React.ReactNode }) {
  // Removed the extra flex-col, min-h-screen, and pb-8 so it doesn't fight the main layout!
  return (
    <div className="h-full w-full">
      {children}
    </div>
  );
}