"use client";
import { experiences } from "@/lib/experience";

export default function ExperiencePage() {
  return (
    <div className="max-w-3xl mx-auto p-8 font-mono">
      <h1 className="text-3xl font-bold text-zinc-100 mb-8">/work-history</h1>
      
      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <div key={index} className="border-l border-zinc-800 pl-6 space-y-4">
            <div>
              <h2 className="text-xl font-bold text-blue-400">{exp.role}</h2>
              <div className="text-zinc-500 text-sm">{exp.company} | {exp.period}</div>
            </div>
            
            <p className="text-zinc-300">{exp.description}</p>
            
            <ul className="list-disc ml-4 text-zinc-400 space-y-2">
              {exp.points.map((point, i) => <li key={i}>{point}</li>)}
            </ul>

            <div className="flex gap-2 mt-4">
              {exp.techStack.map((tech) => (
                <span key={tech} className="bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs px-2 py-1 rounded">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}