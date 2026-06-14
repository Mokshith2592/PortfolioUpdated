import Link from 'next/link';

export const HomeButton = () => {
  return (
    <Link 
      href="/" 
      className="fixed top-8 left-8 flex items-center gap-2 text-zinc-500 hover:text-blue-400 transition-colors duration-200 z-50 group font-mono text-sm"
    >
      <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M19 12H5"></path>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
      <span>cd ~</span>
    </Link>
  );
};