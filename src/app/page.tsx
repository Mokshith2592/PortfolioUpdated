"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LiveTerminal } from "@/components/terminal/LiveTerminal";
import OSLayout from "@/components/layout/OSLayout";
import { NetworkParticles } from "@/components/layout/NetworkParticles";
import { STATIC_NOW_ITEMS } from "@/lib/data";

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

  // --- FEATURE 2 DETECTOR: LIVE API INJECTIONS & SHUFFLER ---
  // --- LIVE DATA INJECTION: GITHUB + SPOTIFY ---
  useEffect(() => {
    if (isBooting) return;

    // Inside your useEffect...
    const fetchLiveData = async () => {
      // 1. Fetch GitHub
      const gitRes = await fetch(
        "https://api.github.com/users/Mokshith2592/repos?sort=updated&per_page=3",
      )
        .then((res) => res.json())
        .catch(() => []);

      // 2. Fetch Spotify
      const spotifyRes = await fetch("/api/spotify")
        .then((res) => res.json())
        .catch(() => ({ playing: false }));

      // 3. Selection Logic
      const finalStream: string[] = [];

      // Slot A: Spotify (1)
      if (spotifyRes.playing) {
        finalStream.push(
          `🎵 Listening: ${spotifyRes.title} - ${spotifyRes.artist}`,
        );
      } else {
        finalStream.push("🎵 Spotify offline/paused");
      }

      // Slot B: Random Git (1)
      if (gitRes.length > 0) {
        const randomGit = gitRes[Math.floor(Math.random() * gitRes.length)];
        finalStream.push(`Recently active on: ${randomGit.name}`);
      }

      // Slot C: Random Static (3)
      const shuffledStatic = [...STATIC_NOW_ITEMS].sort(
        () => 0.5 - Math.random(),
      );
      finalStream.push(...shuffledStatic.slice(0, 3));

      // Final Shuffle of the 5 items so the Spotify/Git/Static slots aren't predictable
      setNowItems(finalStream.sort(() => 0.5 - Math.random()));
    };

    fetchLiveData();
  }, [isBooting]);

  // --- NOW STREAM TICKER ---
  useEffect(() => {
    if (isBooting) return;
    const interval = setInterval(() => {
      setNowIndex((prev) => (prev + 1) % nowItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isBooting, nowItems]); // Watch 'nowItems' so it updates when data arrives

  // Location API
  const [visitorContext, setVisitorContext] = useState<any>(null);

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => setVisitorContext(data))
      .catch(() => console.log("Geo lookup failed, skipping."));
  }, []);

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
            transition: exiting
              ? "opacity 0.4s ease, transform 0.4s ease"
              : "none",
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
              <h1
                style={{
                  color: "#f4f4f5",
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  margin: 0,
                }}
              >
                MokshithOS
              </h1>
              <p
                style={{
                  color: "#71717a",
                  fontSize: "0.75rem",
                  margin: "0.25rem 0 0 0",
                }}
              >
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
                  color:
                    log.includes("[OK]") || log.includes("Ready")
                      ? "#22c55e"
                      : "#d4d4d8",
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
              {/* 1. Removed justify-center and space-y-8 so we can manually control flex spacing */}
              <div className="w-full lg:w-1/2 lg:h-full p-6 md:p-12 lg:p-16 flex flex-col relative z-10 pb-24 lg:pb-16">

                {/* HEADER - shrink-0 prevents this from getting crushed */}
                <div className="space-y-2 shrink-0 mb-6 lg:mb-8">
                  <h1 className="text-5xl font-bold tracking-tighter text-zinc-100">
                    MokshithOS
                  </h1>
                  <p className="text-zinc-500 font-mono text-sm">
                    /root/home/mokshith
                  </p>
                </div>

                {/* TERMINAL INTERFACE */}
                <div className="flex-1 flex flex-col space-y-4 mb-6 lg:mb-8 overflow-hidden min-h-[350px]">
                  <h3 className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-bold shrink-0">
                    Terminal Interface
                  </h3>
                  
                  {/* Outer Terminal Box - Changed min-h-0 to min-h-[350px] */}
                  <div className="flex-1 min-h-[350px] flex flex-col rounded-xl border border-zinc-800 bg-zinc-950/80 backdrop-blur overflow-hidden">
                    <div className="shrink-0 flex items-center gap-2 px-4 py-2 border-b border-zinc-800">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    
                    {/* Inner Terminal Container */}
                    <div className="flex-1 overflow-hidden p-4 relative">
                      <LiveTerminal visitorContext={visitorContext}/>
                    </div>
                  </div>
                </div>

                {/* THE FIXED NOW SECTION - shrink-0 locks it to the bottom */}
                <section className="shrink-0 border border-zinc-800 rounded-lg bg-zinc-900/30 p-4">
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
