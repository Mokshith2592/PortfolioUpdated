"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LiveTerminal } from "@/components/terminal/LiveTerminal";
import OSLayout from "@/components/layout/OSLayout";
import { NetworkParticles } from "@/components/layout/NetworkParticles";

const BOOT_LOGS = [
  "Initializing Kernel........... [OK]",
  "Loading Projects.............. [OK]",
  "Loading Notes................. [OK]",
  "Loading Skill Tree............ [OK]",
  "Loading Timeline.............. [OK]",
  "Loading Redis Playground...... [OK]",
  "Starting Services............. [OK]",
  "System Ready.",
];

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default function Home() {
  const [isBooting, setIsBooting] = useState(true);
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
  const [exiting, setExiting] = useState(false);
  const [nowIndex, setNowIndex] = useState(0);

  // --- DYNAMIC NOW STREAM STATE ---
  const [nowItems, setNowItems] = useState<string[]>([
    "Building Redis-Compatible Server",
    "Learning Distributed Systems",
    "Reading DDIA",
    "Improving MokshithOS",
    "Exploring C++ Systems",
  ]);

  const [openWindows, setOpenWindows] = useState<string[]>([]);

  // --- WINDOW MANAGER ---
  useEffect(() => {
    const handleOpenWindow = (e: any) => {
      if (!openWindows.includes(e.detail)) {
        setOpenWindows((prev) => [...prev, e.detail]);
      }
    };
    window.addEventListener("open-os-window", handleOpenWindow);
    return () => window.removeEventListener("open-os-window", handleOpenWindow);
  }, [openWindows]);

  const closeWindow = (id: string) => {
    setOpenWindows((prev) => prev.filter((w) => w !== id));
  };

  // --- BOOT SEQUENCE LOGIC ---
  useEffect(() => {
    if (sessionStorage.getItem("mokshithos_booted")) {
      setIsBooting(false);
      return;
    }

    let cancelled = false;

    const runBoot = async () => {
      for (let i = 0; i < BOOT_LOGS.length; i++) {
        if (cancelled) return;
        setVisibleLogs((prev) => [...prev, BOOT_LOGS[i]]);
        const isLast = i === BOOT_LOGS.length - 1;
        if (isLast) {
          await sleep(900);
          break;
        }
        await sleep(320 + Math.random() * 80);
      }
      if (!cancelled) {
        sessionStorage.setItem("mokshithos_booted", "true");
        setExiting(true);
        await sleep(500);
        setIsBooting(false);
      }
    };

    runBoot();
    return () => {
      cancelled = true;
    };
  }, []);

// --- LIVE GITHUB API INJECTION (RANDOMIZED) ---
  useEffect(() => {
    if (isBooting) return;

    // Fetch the 3 most recently updated repos
    fetch('https://api.github.com/users/Mokshith2592/repos?sort=updated&per_page=3')
      .then(res => {
        if (!res.ok) throw new Error("GitHub API Rate Limited");
        return res.json();
      })
      .then(data => {
        if (data && data.length > 0) {
          // Pick a random repo from the top 3 recent ones
          const randomIndex = Math.floor(Math.random() * data.length);
          const randomRepo = data[randomIndex];

          const repoName = randomRepo.name;
          const language = randomRepo.language ? ` [${randomRepo.language}]` : '';
          
          // Inject the randomly selected repo into the stream
          setNowItems(prev => [
            `Recently active on: ${repoName}${language}`,
            ...prev
          ]);
        }
      })
      .catch((err) => console.log("Fallback to static NOW stream:", err.message));
  }, [isBooting]);

  // --- NOW STREAM TICKER ---
  useEffect(() => {
    if (isBooting) return;
    const interval = setInterval(() => {
      setNowIndex((prev) => (prev + 1) % nowItems.length); // Uses dynamic length now
    }, 4000);
    return () => clearInterval(interval);
  }, [isBooting, nowItems.length]);

  return (
    <>
      {/* Boot screen — Aligned Left-Middle */}
      {isBooting && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            height: "100vh",
            width: "100vw",
            zIndex: 100,
            backgroundColor: "#050505",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: exiting ? 0 : 1,
            transform: exiting ? "translateY(-10px)" : "translateY(0)",
            transition: exiting ? "opacity 0.4s ease, transform 0.4s ease" : "none",
          }}
        >
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "0.875rem",
              lineHeight: "1.75rem",
              width: "100%",
              maxWidth: "500px",
            }}
          >
            <div style={{ marginBottom: "2.5rem" }}>
              <h1 style={{ color: "#f4f4f5", fontSize: "1.25rem", fontWeight: "bold", margin: 0 }}>
                MokshithOS
              </h1>
              <p style={{ color: "#71717a", fontSize: "0.75rem", margin: "0.25rem 0 0 0" }}>
                Personal Engineering Operating System
              </p>
            </div>

            <div style={{ color: "#60a5fa", marginBottom: "1.5rem" }}>
              $ boot mokshithos
            </div>

            {visibleLogs.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  color: log.includes("[OK]") || log.includes("Ready") ? "#22c55e" : "#d4d4d8",
                }}
              >
                {log}
              </motion.div>
            ))}

            <motion.span
              style={{ display: "inline-block", color: "#22c55e" }}
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              █
            </motion.span>
          </div>
        </div>
      )}

      {/* Home page */}
      {!isBooting && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <OSLayout>
            <main className="w-full flex flex-col lg:flex-row bg-black font-sans relative min-h-screen lg:h-screen lg:overflow-hidden">
              <NetworkParticles />
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/10 blur-[180px]" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[180px]" />
              </div>

              {/* LEFT SIDE */}
              <div className="w-full lg:w-1/2 min-h-[60vh] lg:min-h-0 lg:h-full border-b lg:border-b-0 lg:border-r border-zinc-900 flex flex-col items-center justify-center p-8 md:p-12 bg-zinc-950/30 relative z-10">
                <div className="relative">
                  <>
                    <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
                    <div className="absolute inset-0 bg-purple-500/10 blur-3xl rounded-full translate-x-6 translate-y-4" />
                  </>
                  <div className="relative w-64 h-64 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
                    <img
                      src="/your-photo.jpeg"
                      alt="Mokshith"
                      className="w-full h-full object-cover hover:scale-105 transition-all duration-500"
                    />
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <h2 className="text-2xl font-bold text-zinc-100">
                    Mokshith Gattu
                  </h2>
                  <p className="text-zinc-500 mt-2 font-mono text-sm">
                    Data Engineering Intern @ Visa
                  </p>
                  <p className="text-zinc-600 mt-1 font-mono text-xs">
                    NIT Warangal | Final Year
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-zinc-400">
                      BUILDING REDIS SERVER
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="w-full lg:w-1/2 lg:h-full p-6 md:p-12 lg:p-16 flex flex-col justify-center space-y-8 lg:space-y-10 relative z-10 pb-24 lg:pb-16 lg:overflow-y-auto">
                <div className="space-y-2">
                  <h1 className="text-5xl font-bold tracking-tighter text-zinc-100">
                    MokshithOS
                  </h1>
                  <p className="text-zinc-500 font-mono text-sm">
                    /root/home/mokshith
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-bold">
                    Terminal Interface
                  </h3>
                  <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 backdrop-blur overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-2 border-b border-zinc-800">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="p-4">
                      <LiveTerminal />
                    </div>
                  </div>
                </div>

                {/* THE FIXED NOW SECTION */}
                <section className="border border-zinc-800 rounded-lg bg-zinc-900/30 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-bold m-0 leading-none">
                      NOW
                    </p>
                  </div>

                  {/* Container has a strictly fixed height */}
                  <div className="relative h-6 overflow-hidden">
                    <AnimatePresence mode="popLayout">
                      <motion.div
                        key={nowIndex}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="absolute inset-0 text-sm text-blue-400 whitespace-nowrap"
                      >
                        {nowItems[nowIndex]}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </section>
              </div>
            </main>

            {/* --- DRAGGABLE WINDOWS --- */}
            <AnimatePresence>
              {openWindows.map((windowId) => (
                <motion.div
                  key={windowId}
                  drag
                  dragMomentum={false}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="fixed top-1/4 left-1/4 z-[100] w-[350px] md:w-[450px] bg-[#0A0A0C]/90 backdrop-blur-xl border border-zinc-800/80 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
                >
                  {/* Window Title Bar */}
                  <div className="bg-zinc-900/50 p-3 px-4 border-b border-zinc-800/80 flex justify-between items-center cursor-move">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded text-[10px] bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                        M
                      </span>
                      <span className="text-xs font-mono text-zinc-300 capitalize">
                        {windowId}.exe
                      </span>
                    </div>
                    {/* Close Button */}
                    <button
                      onClick={() => closeWindow(windowId)}
                      className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors"
                    />
                  </div>

                  {/* Window Content */}
                  <div className="p-6 text-zinc-300 font-sans min-h-[200px]">
                    {windowId === "projects" && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white">
                          System Projects
                        </h3>
                        <div className="p-3 border border-zinc-800 rounded-lg bg-zinc-950">
                          <p className="text-blue-400 text-sm font-bold">
                            Redis-Compatible Server
                          </p>
                          <p className="text-xs text-zinc-500 mt-1">
                            Built entirely from scratch in C++ handling
                            concurrent TCP connections.
                          </p>
                        </div>
                      </div>
                    )}
                    {windowId === "notes" && (
                      <p className="text-sm text-zinc-400">
                        Loading distributed systems notes...
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </OSLayout>
        </motion.div>
      )}
    </>
  );
}