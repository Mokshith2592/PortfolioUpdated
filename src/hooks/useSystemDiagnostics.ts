// hooks/useSystemDiagnostics.ts
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

// Import your actual data here! Adjust the paths based on your project structure.
// import { projects } from "@/data/projects";
// import { notes } from "@/data/notes";
// import { achievements } from "@/data/achievements";

export const useClock = () => {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    updateTime(); // initial call
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return time;
};

export const useUptime = () => {
  const [uptime, setUptime] = useState("--m --s");

  useEffect(() => {
    // Save session start to sessionStorage so it persists across page reloads!
    let startTime = sessionStorage.getItem("mokshithos_session_start");
    if (!startTime) {
      startTime = Date.now().toString();
      sessionStorage.setItem("mokshithos_session_start", startTime);
    }

    const startTimestamp = parseInt(startTime, 10);

    const updateUptime = () => {
      const diffInSeconds = Math.floor((Date.now() - startTimestamp) / 1000);
      const m = Math.floor(diffInSeconds / 60).toString().padStart(2, "0");
      const s = (diffInSeconds % 60).toString().padStart(2, "0");
      const h = Math.floor(diffInSeconds / 3600);

      if (h > 0) setUptime(`${h}h ${m}m ${s}s`);
      else setUptime(`${m}m ${s}s`);
    };

    updateUptime();
    const timer = setInterval(updateUptime, 1000);
    return () => clearInterval(timer);
  }, []);

  return uptime;
};

export const usePortfolioStats = () => {
  const pathname = usePathname();
  
  // Format the path to look like a Unix directory (e.g., "/projects" -> "~/projects")
  const currentRoute = pathname === "/" ? "~" : `~${pathname}`;

  return {
    currentRoute,
    status: "BUILDING", // Options: ONLINE, BUILDING, AVAILABLE
    // Replace the numbers below with: projects.length, notes.length, etc.
    counts: {
      projects: 7, 
      notes: 10,
      achievements: 4
    }
  };
};