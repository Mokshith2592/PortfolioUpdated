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
    let startTime = sessionStorage.getItem("mokshithos_session_start");
    if (!startTime) {
      startTime = Date.now().toString();
      sessionStorage.setItem("mokshithos_session_start", startTime);
    }

    const startTimestamp = parseInt(startTime, 10);

    const updateUptime = () => {
      const diffInSeconds = Math.floor((Date.now() - startTimestamp) / 1000);
      
      const h = Math.floor(diffInSeconds / 3600);
      // BUG FIX: Use modulo 3600 before dividing by 60 so minutes cap at 59!
      const m = Math.floor((diffInSeconds % 3600) / 60).toString().padStart(2, "0");
      const s = (diffInSeconds % 60).toString().padStart(2, "0");

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
  const currentRoute = pathname === "/" ? "~" : `~${pathname}`;
  
  // State to hold your live Gist data
  const [liveConfig, setLiveConfig] = useState({
    currentStatus: "INITIALIZING...", 
    statusColor: "green"
  });

  useEffect(() => {
    // YOUR exact Gist Raw URL. 
    // We added ?cacheBust to force the browser to always fetch the latest version!
    const GIST_URL = `https://gist.githubusercontent.com/Mokshith2592/3249c77aa9ff686e5485db756b298fd2/raw?t=${Date.now()}`;

    fetch(GIST_URL)
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(data => setLiveConfig(data))
      .catch(err => {
        console.error("Failed to fetch OS config", err);
        // Fallback if the fetch fails
        setLiveConfig({ currentStatus: "OFFLINE_MODE" ,statusColor: "red"}); 
      });
  }, []);

  return {
    currentRoute,
    status: liveConfig.currentStatus, // <--- Now fully dynamic!
    statusColor: liveConfig.statusColor,
    counts: {
      projects: 7, 
      notes: 10,
      achievements: 4
    }
  };
};