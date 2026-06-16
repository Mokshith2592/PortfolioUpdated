export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  status: 'past' | 'present' | 'future';
  description: string;
  keyLearning: string;
  technologies: string[];
  projects: string[];
  lessonsLearned: string;
}

export const timelineData: TimelineEvent[] = [
  {
    id: "future",
    year: "Future",
    title: "Distributed Systems Architecture",
    status: "future",
    description: "Deep dive into system design and highly available consensus protocols.",
    keyLearning: "Mastering fault tolerance and distributed state machines.",
    technologies: ["System Design", "Raft Consensus", "Kubernetes", "Distributed Databases"],
    projects: ["Planned: Distributed KV Store"],
    lessonsLearned: "Systems fail. Architecting for failure is the only way to ensure uptime."
  },
  {
    id: "2026",
    year: "2026",
    title: "Systems Engineering & Enterprise Data",
    status: "present",
    description: "Building low-latency systems and joining Visa as a Data Engineering Intern.",
    keyLearning: "Understanding network protocols, memory allocation, and enterprise-scale pipelines.",
    technologies: ["C++", "Redis Internals", "Networking", "Distributed Systems"],
    projects: ["Redis-Compatible Server", "Visa Internship"],
    lessonsLearned: "Concurrency is unforgiving. Reading RFCs and official specs is a superpower."
  },
  {
    id: "2025",
    year: "2025",
    title: "Advanced Algorithms & Full-Stack",
    status: "past",
    description: "Intense focus on competitive programming and full-stack application architecture.",
    keyLearning: "Optimizing time/space complexity and designing relational schemas.",
    technologies: ["Advanced DSA", "Oracle SQL", "Next.js", "TypeScript"],
    projects: ["T&P Portal", "Competitive Programming Setup"],
    lessonsLearned: "A beautiful UI is useless if the database queries bottleneck the system."
  },
  {
    id: "2024",
    year: "2024",
    title: "Data Intelligence & Modeling",
    status: "past",
    description: "Expanded into data manipulation and machine learning concepts.",
    keyLearning: "Understanding how algorithms process and recognize patterns in raw data.",
    technologies: ["Python", "Machine Learning", "SQL", "Data Analysis"],
    projects: ["Digit Recognition Project"],
    lessonsLearned: "Data formatting and cleaning take up 80% of the engineering effort in ML."
  },
  {
    id: "2023",
    year: "2023",
    title: "The Core Foundation",
    status: "past",
    description: "Wrote my first lines of code. Discovered a passion for how computers execute logic.",
    keyLearning: "Grasping control flow, loops, and basic memory management.",
    technologies: ["C++", "Console Applications", "Standard Template Library"],
    projects: ["First Console Apps"],
    lessonsLearned: "Pointers are confusing at first, but they unlock how the computer actually works."
  }
];