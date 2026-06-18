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
      { name: "C++", status: "completed", confidence: 90, projects: ["Competitive Programming", "Redis Server"], desc: "STL, OOP, Memory Management." },
      { name: "Python", status: "completed", confidence: 70, projects: ["Digit Recognition"], desc: "Data Analysis, Machine Learning, Deep Learning, and Automation scripts." },
      { name: "JavaScript", status: "completed", confidence: 60, projects: ["AI Chatbot", "Portfolio", "Todo App"], desc: "ES6+, DOM Manipulation, Async Programming, and API Integration." } ,
      { name: "Java", status: "completed", confidence: 70, projects: ["Applets"], desc: "Multithreading"}
    ]
  },

  {
    category: "Web Development",
    skills: [
      { name: "HTML", status: "completed", confidence: 90, projects: ["Portfolio", "AI Chatbot", "Spotify Clone"], desc: "Semantic HTML, Forms, Accessibility, and Responsive Layouts." },
      { name: "CSS", status: "completed", confidence: 85, projects: ["Portfolio", "Spotify Clone"], desc: "Flexbox, Grid, Animations, Responsive Design, and Modern UI Development." },
      { name: "React", status: "completed", confidence: 80, projects: ["Portfolio", "Todo App"], desc: "Hooks, Component Architecture, State Management, and API Integration." },
      { name: "Node.js", status: "completed", confidence: 80, projects: ["Todo App"], desc: "Backend Development, REST APIs, and Server-side JavaScript." },
      { name: "Express.js", status: "completed", confidence: 80, projects: ["Todo App"], desc: "Routing, Middleware, API Development, and Backend Services." },
      { name: "MongoDB", status: "completed", confidence: 75, projects: ["Todo App"], desc: "Document Databases, CRUD Operations, and Data Modeling." },
      { name: "Mongoose", status: "completed", confidence: 75, projects: ["Todo App"], desc: "Schema Design, Validation, and Database Interaction." }
    ]
  },

  {
    category: "Artificial Intelligence & Machine Learning",
    skills: [
      { name: "Machine Learning", status: "completed", confidence: 75, projects: ["Digit Recognition"], desc: "Supervised Learning, Model Training, and Evaluation." },
      { name: "Deep Learning", status: "completed", confidence: 70, projects: ["Digit Recognition"], desc: "Neural Networks, CNN Fundamentals, and Model Optimization." },
      { name: "TensorFlow", status: "completed", confidence: 70, projects: ["Digit Recognition"], desc: "Model Building, Training, and Deployment Workflows." },
      { name: "Keras", status: "completed", confidence: 75, projects: ["Digit Recognition"], desc: "High-level Deep Learning API for Rapid Prototyping." }
    ]
  },

  {
    category: "Systems & Infrastructure",
    skills: [
      { name: "Linux", status: "completed", confidence: 80, projects: ["Redis Server"], desc: "Shell Commands, Process Management, File Systems, and Development Environment Setup." },
      { name: "Socket Programming", status: "learning", confidence: 70, projects: ["Redis Server"], desc: "TCP Communication, Client-Server Architecture, and Network Programming." },
      { name: "Redis Internals", status: "learning", confidence: 70, projects: ["Redis Server"], desc: "RESP Protocol, Event Loops, Socket Communication, and In-Memory Data Stores." },
      { name: "Kubernetes", status: "future", confidence: 10, projects: ["Planned"], desc: "Container Orchestration and Distributed System Scaling." }
    ]
  },

  {
    category: "Databases",
    skills: [
      { name: "SQL", status: "completed", confidence: 85, projects: ["Todo App", "Academic Projects"], desc: "Joins, Aggregations, Indexing, Query Optimization, and Database Design." },
      { name: "Oracle SQL", status: "completed", confidence: 80, projects: ["DBMS Coursework"], desc: "Advanced Queries, Functions, Views, and Database Management." },
      { name: "PL/SQL", status: "completed", confidence: 75, projects: ["DBMS Coursework"], desc: "Triggers, Procedures, Functions, Cursors, and Packages." }
    ]
  },

  {
    category: "Tools & Version Control",
    skills: [
      { name: "Git", status: "completed", confidence: 80, projects: ["All Projects"], desc: "Branching, Merging, Version Control, and Collaborative Development." },
      { name: "GitHub", status: "completed", confidence: 85, projects: ["All Projects"], desc: "Repository Management, Pull Requests, and Open Source Workflows." },
      { name: "VS Code", status: "completed", confidence: 90, projects: ["All Projects"], desc: "Extensions, Debugging, and Development Workflows." }
    ]
  }
];