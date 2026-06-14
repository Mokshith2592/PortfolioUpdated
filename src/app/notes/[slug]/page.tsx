import { notFound } from 'next/navigation';
import { HomeButton } from '@/components/ui/HomeButton';
import { notes } from '@/lib/data';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default async function SingleNote({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = notes.find((n) => n.slug === slug);

  if (!note) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-zinc-100 p-12 md:p-24 font-sans relative">
      <HomeButton />
      <article className="max-w-3xl mx-auto mt-12">
        <header className="mb-12 border-b border-zinc-800 pb-8">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">{note.title}</h1>
          <div className="flex items-center gap-4 font-mono text-sm text-zinc-500">
            <span>{note.date}</span>
            <span>//</span>
            <div className="flex gap-2">
              {note.tags.map(tag => <span key={tag}>{tag}</span>)}
            </div>
          </div>
        </header>
        
        {/* The Override Engine */}
        <div className="max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // Hijack Headers
              h3: ({node, ...props}) => <h3 className="text-2xl font-bold text-zinc-100 mt-10 mb-4 border-b border-zinc-900 pb-2" {...props} />,
              
              // Hijack Paragraphs
              p: ({node, ...props}) => <p className="text-zinc-300 leading-relaxed mb-6 text-lg" {...props} />,
              
              // Hijack Bold Text
              strong: ({node, ...props}) => <strong className="font-bold text-white" {...props} />,
              
              // Hijack Lists
              ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-6 text-zinc-300 space-y-2 marker:text-zinc-600" {...props} />,
              
              // Hijack Code Blocks (both inline and multi-line)
              code: ({node, className, children, ...props}: any) => {
                // If it has a language class, it's a multi-line block (```cpp)
                const isBlock = /language-(\w+)/.exec(className || '');
                
                if (isBlock) {
                  return (
                    <div className="bg-[#09090b] border border-zinc-800 rounded-xl p-6 my-8 overflow-x-auto shadow-2xl">
                      <code className="text-blue-400 font-mono text-sm leading-loose block" {...props}>
                        {children}
                      </code>
                    </div>
                  );
                }
                
                // Otherwise, it's an inline snippet (`code`)
                return (
                  <code className="bg-zinc-900 text-zinc-200 px-1.5 py-0.5 rounded-md font-mono text-sm border border-zinc-800" {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {note.content}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
}