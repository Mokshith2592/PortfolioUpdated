import React from 'react';

export const CaseStudy = ({ title, overview, motivation, architecture, challenges, github }: any) => {
  return (
    <article className="max-w-4xl mx-auto p-12 space-y-12">
      <header>
        <h1 className="text-5xl font-bold mb-4">{title}</h1>
        <a href={github} className="text-blue-500 font-mono">
          Source Code &gt; GitHub
        </a>
      </header>
      <section>
        <h2 className="text-2xl font-bold mb-4">Overview</h2>
        <p className="text-zinc-400">{overview}</p>
      </section>
      <section className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="font-bold">Motivation</h3>
          <p className="text-zinc-400">{motivation}</p>
        </div>
        <div>
          <h3 className="font-bold">Architecture</h3>
          <p className="text-zinc-400">{architecture}</p>
        </div>
      </section>
      <section>
        <h3 className="font-bold mb-2">Engineering Challenges</h3>
        <ul className="list-disc pl-5 text-zinc-400">
          {challenges.map((c: string, i: number) => <li key={i}>{c}</li>)}
        </ul>
      </section>
    </article>
  );
};