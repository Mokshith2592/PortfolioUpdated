export type SkillStatus = 'completed' | 'learning' | 'future';

export interface Skill {
  name: string;
  status: SkillStatus;
  confidence: number;
  projects: string[];
  desc: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export const skillGraph: SkillCategory[] = [
  {
    category: "Programming",
    skills: [
      { name: "C++", status: "completed", confidence: 90, projects: ["Competitive Programming"], desc: "STL, Templates, Memory Management, and Multithreading." },
      { name: "Python", status: "completed", confidence: 85, projects: ["Digit Recognition"], desc: "Data Analysis, ML, and Automation scripts." }
    ]
  },
  {
    category: "Systems & Infrastructure",
    skills: [
      { name: "Linux / Kernel", status: "completed", confidence: 80, projects: ["MokshithOS"], desc: "System calls, bash scripting, and process management." },
      { name: "Redis Internals", status: "learning", confidence: 70, projects: ["Redis Server"], desc: "Understanding socket communication, event loops, and in-memory stores." },
      { name: "Kubernetes", status: "future", confidence: 10, projects: ["Planned"], desc: "Container orchestration and distributed system scaling." }
    ]
  },
  {
    category: "Databases",
    skills: [
      { name: "SQL", status: "completed", confidence: 85, projects: ["T&P Portal"], desc: "Complex joins, indexing, and query optimization." },
      { name: "Oracle SQL / PL/SQL", status: "completed", confidence: 75, projects: ["Visa Prep"], desc: "Triggers, stored procedures, and enterprise data management." }
    ]
  }
];