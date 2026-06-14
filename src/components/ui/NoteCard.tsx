export const NoteCard = ({ title, date, readingTime, tags }: any) => (
  <div className="p-6 border border-zinc-800 rounded-xl bg-zinc-900/50 hover:border-blue-500 transition-colors">
    <h3 className="text-xl font-bold">{title}</h3>
    <div className="flex gap-4 text-sm text-zinc-500 mt-2">
      <span>{date}</span>
      <span>{readingTime}</span>
    </div>
    <div className="flex gap-2 mt-4">
      {tags.map((t: string) => (
        <span key={t} className="px-2 py-1 bg-zinc-800 rounded text-xs text-blue-400">
          #{t}
        </span>
      ))}
    </div>
  </div>
);
