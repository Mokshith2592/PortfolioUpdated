import Link from 'next/link';
import { HomeButton } from '@/components/ui/HomeButton';
import { notes } from '@/lib/data';

export default function NotesPage() {
  return (
    <main className="min-h-screen bg-black text-zinc-100 p-12 md:p-24 font-sans relative">
      <HomeButton />
      <div className="max-w-4xl mx-auto mt-12">
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Engineering Notes</h1>
          <p className="text-zinc-400">Documentation, algorithm patterns, and system design thoughts.</p>
        </header>

        <div className="space-y-4">
          {notes.map((note) => (
            <Link 
              href={`/notes/${note.slug}`} 
              key={note.id}
              className="flex items-center justify-between p-6 border border-zinc-800 rounded-xl bg-zinc-950 hover:border-blue-500 hover:bg-zinc-900 transition-all duration-200 group"
            >
              <div>
                <h2 className="text-lg font-bold group-hover:text-blue-400 transition-colors">{note.title}</h2>
                <div className="flex gap-2 mt-2">
                  {note.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-mono px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-zinc-500 uppercase">{tag}</span>
                  ))}
                </div>
              </div>
              <span className="text-sm font-mono text-zinc-600">{note.date}</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}