export const projects = [
  {
    id: 'redis',
    title: 'Redis-Compatible Server',
    description: 'A high-performance, concurrent key-value store implementing the RESP protocol from scratch in C++.',
    tech: ['C++', 'TCP/IP', 'Concurrency', 'Multithreading'],
    link: '/projects/redis'
  },
  {
    id: 'tnp-portal',
    title: 'NITW T&P Portal',
    description: 'Full-stack placement portal managing student data, authentication, and corporate recruitment pipelines.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Express'],
    link: '/projects/tnp'
  }
];

export const notes = [
{
    id: '1',
    title: 'Advanced Binary Search Patterns',
    slug: 'binary-search',
    date: '2026-06-14',
    tags: ['C++', 'Algorithms'],
    // Note the backticks (` `) around the entire string to allow multiple lines
    content: `
### The Monotonic Rule

When optimizing high-dimensional spaces, binary search on the answer is often the most efficient approach. You just need to prove the function is **strictly monotonic**.

Here is the standard template I use for competitive programming:

\`\`\`cpp
int left = 0, right = n - 1;
int ans = -1;

while (left <= right) {
    int mid = left + (right - left) / 2;
    
    if (isValid(mid)) {
        ans = mid;       // Store potential answer
        right = mid - 1; // Try to find a smaller valid answer
    } else {
        left = mid + 1;
    }
}
\`\`\`

* Always use \`left + (right - left) / 2\` to prevent integer overflow.
* Isolate the logic into an \`isValid()\` boolean function to keep the core loop clean.
    `
  },
  {
    id: '2',
    title: 'Deploying Redis on Kubernetes',
    slug: 'redis-k8s', // This becomes /notes/redis-k8s
    date: '2026-06-10',
    tags: ['Infrastructure', 'Docker'],
    content: 'Stateful sets are critical when dealing with distributed caching mechanisms...'
  }
];

export interface SkillNode {
  id: string;
  label: string;
  progress: number; // 0 to 100
  dependencies?: string[];
  description: string;
  resources: string[];
}

export const skillTree: Record<string, SkillNode[]> = {
  programming: [
    { id: 'cpp', label: 'C++', progress: 95, description: 'Core language for competitive programming and high-performance engineering.', resources: ['Effective Modern C++', 'Cppreference'] },
    { id: 'python', label: 'Python', progress: 85, description: 'Used for machine learning pipeline prototyping and scripting.', resources: ['Fluent Python'] },
    { id: 'sql', label: 'SQL', progress: 80, description: 'Relational database query optimization and schema design.', resources: ['SQL Antipatterns'] }
  ],
  systems: [
    { id: 'linux', label: 'Linux & Tooling', progress: 85, description: 'POSIX environments, shell scripting, process trees, and file systems.', resources: ['The Linux Programming Interface'] },
    { id: 'tcp', label: 'TCP/IP Socket Layer', progress: 90, description: 'Custom network programming, buffer management, non-blocking I/O.', resources: ['Unix Network Programming'] },
    { id: 'threads', label: 'Multi-Threading', progress: 80, dependencies: ['linux'], description: 'Mutexes, condition variables, race conditions, and thread pools.', resources: ['C++ Concurrency in Action'] },
    { id: 'redis_sys', label: 'Redis Architecture', progress: 95, dependencies: ['tcp', 'threads'], description: 'RESP parsing, event loops, single-threaded processing models, in-memory structures.', resources: ['Redis Internals Documentation'] }
  ]
};

export const engineeringTimeline = [
  {
    year: '2024',
    title: 'Started Machine Learning',
    project: 'Digit Recognition Engine',
    lessons: 'Mastered matrix transformations, backpropagation mechanics, and vectorized calculation structures using Python.',
    difficulty: 'Medium'
  },
  {
    year: '2025',
    title: 'Advanced DSA & Competitive Programming',
    project: 'High-Dimensional Space Optimizers',
    lessons: 'Applied binary search patterns, monotonic function proofs, and swarm intelligence (Grey Wolf Optimization) to scale systems handling massive datasets.',
    difficulty: 'Hard'
  },
  {
    year: '2026',
    title: 'Custom Redis Server Implementation',
    project: 'Mokshith Redis Engine',
    lessons: 'Built a multi-protocol non-blocking TCP server handling the RESP parser specification entirely from scratch.',
    difficulty: 'Expert'
  }
];

export const currentNowStatus = {
  building: 'MokshithOS Interactive Architecture Engine and dynamic command parser hooks.',
  learning: 'Distributed systems consensus algorithms (Raft, Paxos) and advanced Kubernetes orchestration networking.',
  challenge: 'Optimizing memory footprint for processing >1 GB calculation streams within customized intelligence systems.',
  reading: '"Designing Data-Intensive Applications" by Martin Kleppmann.',
  goal: 'Deploying cloud-native distributed components at Visa INC during the upcoming engineering cycle.'
};

export const achievements = [
  { id: '001', title: 'Biweekly Contest 182', detail: 'Top percentile performance in algorithmic logic & optimization.' },
  { id: '002', title: 'NITW T&P Portal Lead', detail: 'Architected and deployed full-stack solution for university placements.' },
  { id: '003', title: 'Systems Programming Cert', detail: 'Advanced proficiency in low-level resource management.' }
];

export const nowStatus = {
  building: "MokshithOS: Refining the Redis core engine and internal systems architecture to demonstrate low-latency systems proficiency.",
  diving: "Memory management strategies in C++ and optimizing non-blocking I/O event loops for high-concurrency systems.",
  focus: "Transitioning to SDE role at Visa, focusing on large-scale distributed transaction systems."
};

// Add this to the bottom of src/lib/data.ts
export const skills = [
  { 
    category: "Systems", 
    items: ["C++", "Redis Internals", "Raft Consensus", "Systems Programming"] 
  },
  { 
    category: "Infrastructure", 
    items: ["Kubernetes", "Docker", "Linux Kernel", "Distributed Systems"] 
  },
  { 
    category: "Full-Stack", 
    items: ["Next.js 16", "TypeScript", "Tailwind CSS", "PostgreSQL"] 
  },
];