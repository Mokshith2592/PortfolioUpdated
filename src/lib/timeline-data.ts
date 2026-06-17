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
    title: "Distributed Systems & Scalable Infrastructure",
    status: "future",
    description: "Exploring distributed systems, cloud-native architectures, and large-scale backend infrastructure.",
    keyLearning: "Building systems that remain reliable under scale and failure.",
    technologies: ["Kubernetes", "Distributed Systems", "Cloud Computing", "System Design"],
    projects: ["Distributed KV Store", "Scalable Backend Services"],
    lessonsLearned: "Every system works until it scales."
  },

  {
    id: "2026",
    year: "2026",
    title: "Systems Engineering & Enterprise Development",
    status: "present",
    description: "Working as a Software Engineering Intern at Visa while building low-level systems in C++.",
    keyLearning: "Understanding enterprise data pipelines, networking fundamentals, and production software engineering.",
    technologies: ["C++", "PySpark", "Java", "Talend ETL", "Linux", "Networking"],
    projects: ["Redis-Compatible Server", "Expense Tracker", "Talend to PySpark Migration"],
    lessonsLearned: "Production systems are more about reliability than clever code."
  },

  {
    id: "2025",
    year: "2025",
    title: "Full-Stack Development & Competitive Programming",
    status: "past",
    description: "Built multiple web applications while pushing problem-solving skills through competitive programming.",
    keyLearning: "Learning how databases, APIs, and frontend applications work together.",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "Oracle SQL"],
    projects: ["Travel Diary", "Todo App", "AI Chatbot", "Portfolio Website"],
    lessonsLearned: "Building products teaches lessons that tutorials never can."
  },

  {
    id: "2024",
    year: "2024",
    title: "Machine Learning & Core CS",
    status: "past",
    description: "Explored machine learning and strengthened computer science fundamentals.",
    keyLearning: "Understanding how models learn patterns and how algorithms impact performance.",
    technologies: ["Python", "TensorFlow", "Keras", "Machine Learning", "SQL"],
    projects: ["Digit Recognition", "Sonar Rock vs Mine Prediction"],
    lessonsLearned: "Better data often beats a more complex model."
  },

  {
    id: "2023",
    year: "2023",
    title: "Beginning the Journey",
    status: "past",
    description: "Started B.Tech in Computer Science at NIT Warangal and began exploring programming and problem solving.",
    keyLearning: "Learning programming fundamentals, data structures, and algorithmic thinking.",
    technologies: ["C++", "STL", "OOP", "Basic DSA"],
    projects: ["Console Applications", "File Zipper using Huffman Encoding"],
    lessonsLearned: "Consistency compounds faster than talent."
  }
];