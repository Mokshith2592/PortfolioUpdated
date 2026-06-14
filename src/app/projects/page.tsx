import Link from 'next/link';
import { HomeButton } from '@/components/ui/HomeButton';
import { projects } from '@/lib/data'; // Ensure you created src/lib/data.ts earlier!

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-black text-zinc-100 p-12 md:p-24 font-sans relative">
      <HomeButton />
      
      <div className="max-w-4xl mx-auto mt-12">
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Engineering Projects</h1>
          <p className="text-zinc-400">Systems architecture, backend infrastructure, and full-stack development.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Link 
              href={project.link} 
              key={project.id}
              className="block p-8 border border-zinc-800 rounded-2xl bg-zinc-950 hover:border-blue-500 hover:bg-zinc-900 transition-all duration-300 group"
            >
              <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{project.title}</h2>
              <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="text-xs font-mono px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-zinc-300">
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}