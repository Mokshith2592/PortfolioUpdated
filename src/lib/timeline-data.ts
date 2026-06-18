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
    title: "Engineering Beyond The Classroom",
    status: "future",
    description: "Applying fundamentals from computer science to build reliable software, scalable systems, and meaningful products.",
    keyLearning: "Understanding how great engineering emerges from balancing performance, simplicity, and maintainability.",
    technologies: ["System Design", "Data Engineering", "Distributed Systems"],
    projects: ["Open Source Contributions", "Production-Scale Applications"],
    lessonsLearned: "The best engineers never stop being students."
  },

  {
    id: "2026",
    year: "2026",
    title: "Data Engineering & Enterprise Development",
    status: "present",
    description: "Working as a Software Engineering Intern at Visa while building low-level systems in C++.",
    keyLearning: "Understanding enterprise data pipelines, networking fundamentals, and production software engineering.",
    technologies: ["C++", "PySpark", "Scala" , "Java", "Talend ETL", "Denodo" ,"Linux", "Networking"],
    projects: ["Redis-Compatible Server", "Low-Latency Financial Matching Engine", "Talend to PySpark Migration"],
    lessonsLearned: ""
  },

  {
    id: "2025",
    year: "2025",
    title: "Full-Stack Development & Competitive Programming",
    status: "past",
    description: "Built multiple web applications while pushing problem-solving skills through competitive programming.",
    keyLearning: "Learning how databases, APIs, and frontend applications work together.",
    technologies: ["HTML" ,"CSS" ,"JavaScript" ,"React", "Node.js", "Express.js", "MongoDB", "Oracle SQL"],
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
    technologies: ["Python","Keras", "TensorFlow" , "Machine Learning"],
    projects: ["Digit Recognition", "Sonar Rock vs Mine Prediction" ,"Time Series Analysis" ,"Basic ML Projects"],
    lessonsLearned: "Better data often beats a more complex model."
  },

  {
    id: "2023",
    year: "2023",
    title: "Beginning the Journey",
    status: "past",
    description: "Started B.Tech in Computer Science at NIT Warangal and began exploring programming and problem solving.",
    keyLearning: "Learning programming fundamentals, data structures, and algorithmic thinking.",
    technologies: ["C++" , "OOP", "Basic DSA"],
    projects: ["Console Applications", "File Zipper using Huffman Encoding" ,"Basic CPP Projects"],
    lessonsLearned: "Consistency compounds faster than talent."
  }
];