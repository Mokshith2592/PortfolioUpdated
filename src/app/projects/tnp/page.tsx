import { CaseStudy } from '@/components/layout/CaseStudy';
import { HomeButton } from '@/components/ui/HomeButton';

export default function TnpProject() {
  const tnpData = {
    title: "NITW T&P Portal",
    overview: "A comprehensive full-stack portal built for the National Institute of Technology Warangal to manage the entire campus placement lifecycle.",
    motivation: "The existing process was heavily manual. I wanted to architect a scalable system that could handle high-traffic bursts during placement season while maintaining strict data integrity.",
    architecture: "The frontend is built with React, interfacing with a Node.js/Express backend. Data is persisted in PostgreSQL, utilizing complex relational schemas to map students, recruiters, and application statuses.",
    challenges: [
      "Designing a secure, role-based authentication system (JWT) for Students, Admins, and Corporate HRs.",
      "Optimizing database queries to quickly filter thousands of student records based on complex eligibility criteria.",
      "Implementing real-time status updates and email notifications."
    ],
    github: "https://github.com/Rohan0444/NITW_TNP_PORTAL" 
  };

  return (
    <main className="min-h-screen bg-black text-zinc-100 font-sans relative pt-12 pb-24">
      <HomeButton />
      <CaseStudy {...tnpData} />
    </main>
  );
}