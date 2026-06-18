"use client";
import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { track } from "@vercel/analytics";

type HistoryItem = {
  id: string;
  command: string;
  output: string | React.ReactNode;
};

const COMMANDS = [
  "help",
  "whoami",
  "pwd",
  "tree",
  "find",
  "neofetch",
  "resume",
  "clear",
  "ls",
  "cd",
  "cat",
  "ping",
  "sudo",
  "hack",
  "matrix",
  "env-probe",
  "roll",
  "github",
  "--reveal-secrets",
  "diagnostics",
  "status",
  "get-api-key",
  "light-mode",
  "contact",
];
const DIRECTORIES = [
  "projects",
  "notes",
  "timeline",
  "skill-tree",
  "achievements",
  "experience",
  "architecture",
  "redis-playground",
];

const PATHS: Record<string, string> = {
  projects: "/projects",
  notes: "/notes",
  "redis-playground": "/redis-playground",
  architecture: "/architecture/redis",
  timeline: "/timeline",
  "skill-tree": "/skill-tree",
  achievements: "/achievements",
  experience: "/experience",
};

// --- PURE RENDER FUNCTION ---
const generateOutput = (
  baseCmd: string,
  target: string,
  fullTarget: string,
  cmdHistorySnapshot: string[],
): React.ReactNode | string => {
  switch (baseCmd) {
    case "help":
      return (
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-zinc-400">
          <span className="text-blue-400 font-bold">Navigation</span>
          <span className="font-bold border-b border-zinc-800/50 pb-1 mb-1">
            Description
          </span>
          <span className="text-blue-400">ls [dir]</span>
          <span>List files and directories</span>
          <span className="text-blue-400">cd [path]</span>
          <span>Navigate system path</span>
          <span className="text-blue-400">tree</span>
          <span>Display file tree</span>
          <span className="text-blue-400 font-bold mt-4">System</span>
          <span className="font-bold border-b border-zinc-800/50 pb-1 mb-1 mt-4">
            Description
          </span>
          <span className="text-blue-400">whoami</span>
          <span>Display identity</span>
          <span className="text-blue-400">neofetch</span>
          <span>Show system stats</span>
          <span className="text-blue-400">resume</span>
          <span>View Resume</span>
          <span className="text-blue-400">contact</span>
          <span>Contact Me</span>
          <span className="text-red-400 font-bold animate-pulse">
            --reveal-secrets
          </span>
          <span className="text-zinc-100 italic">
            Unlock restricted Easter Eggs
          </span>
        </div>
      );
    case "pwd":
      return "/root/portfolio/system";
    case "tree":
      return (
        <pre className="text-zinc-400 font-mono text-sm">
          {`root/
├── projects/
├── notes/ 
├── timeline/ 
├── skill-tree/
├── architecture/
├── redis-playground/
└── achievements/`}
        </pre>
      );
    case "find":
      return !target
        ? "Usage: find [term]"
        : `Searching nodes for "${target}"...\n- /notes/binary-search.md\n- /projects/redis`;
    case "history":
      return (
        <div className="font-mono text-zinc-400">
          {cmdHistorySnapshot.map((c, i) => (
            <div key={i}>
              {String(i + 1).padStart(2, " ")} {c}
            </div>
          ))}
        </div>
      );
    case "status":
      return (
        <div className="text-purple-400">
          <p>
            Current Status:{" "}
            <span className="animate-pulse">Building the future...</span>
          </p>
          <p>
            Mokshith is currently:{" "}
            <span className="text-zinc-100">
              Over-engineering a simple portfolio.
            </span>
          </p>
          <p>
            Project Efficiency:{" "}
            <span className="text-red-400">Critical. Needs more coffee.</span>
          </p>
        </div>
      );
    case "github":
      return "Redirecting to GitHub profile...";
    case "contact":
      return (
        <div className="space-y-4">
          <p className="text-zinc-300">Initiating secure comms channel...</p>
          <div className="pl-4 border-l-2 border-blue-500 space-y-2 font-mono">
            <p>
              <span className="text-zinc-500 w-24 inline-block">EMAIL:</span>
              <a
                href="mailto:your.email@example.com"
                className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
              >
                mokshithgattu@gmail.com
              </a>
            </p>
            <p>
              <span className="text-zinc-500 w-24 inline-block">LINKEDIN:</span>
              <a
                href="https://www.linkedin.com/in/mokshith-sai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
              >
                linkedin.com/in/mokshith-sai
              </a>
            </p>
            <p>
              <span className="text-zinc-500 w-24 inline-block">GITHUB:</span>
              <a
                href="https://github.com/Mokshith2592"
                target="_blank"
                className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
              >
                github.com/Mokshith2592
              </a>
            </p>
          </div>
        </div>
      );
    case "--reveal-secrets":
      return (
        <div className="text-zinc-300">
          <p className="text-blue-400 font-bold mb-2">
            MokshithOS v2.0 - Extended Features
          </p>
          <p className="mb-4">
            System is running in dev-mode. Try these experimental protocols:
          </p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {/* High Risk / Chaos */}
            <span className="text-red-500 font-bold">sudo rm -rf /</span>
            <span className="text-zinc-600 italic">...system deletion</span>

            {/* Security / Intrusion */}
            <span className="text-orange-400">diagnostics</span>
            <span className="text-zinc-500">- Security scan</span>

            {/* The "Leaked" Data */}
            <span className="text-yellow-400">get-api-key</span>
            <span className="text-zinc-500">- Dump session vars</span>

            <span className="text-white font-bold drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]">
              light-mode
            </span>
            <span className="text-zinc-500">- Enable Light Theme</span>

            {/* Utility / Environment */}
            <span className="text-cyan-400">env-probe</span>
            <span className="text-zinc-500">- Check atmosphere</span>
          </div>
          <p className="mt-4 text-green-500 italic">
            Type these to initiate procedures...
          </p>
        </div>
      );
    case "neofetch":
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col md:flex-row gap-8 my-6 p-6 bg-black/30 backdrop-blur-xl border border-zinc-800/40 rounded-xl font-mono text-sm shadow-[0_0_30px_rgba(0,0,0,0.3)]"
        >
          <pre className="text-blue-500 font-bold leading-none hidden md:block drop-shadow-[0_0_12px_rgba(59,130,246,0.4)]">
            {`  _____ 
 / ____|
| (___  
 \\___ \\ 
 ____) |
|_____/ `}
          </pre>
          <div className="text-zinc-300 w-full">
            <div className="text-white font-bold mb-3 text-sm border-b border-zinc-700/50 pb-2">
              <span className="text-blue-400">mokshith</span>@
              <span className="text-blue-400">localhost</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
              <div>
                <span className="text-blue-400 font-bold">OS:</span> Dev Console v2.0
              </div>
              <div>
                <span className="text-blue-400 font-bold">Host:</span> NIT
                Warangal
              </div>
              <div>
                <span className="text-blue-400 font-bold">Kernel:</span>{" "}
                CSE'27
              </div>
              <div>
                <span className="text-blue-400 font-bold">Shell:</span> mokshsh
              </div>
              <div>
                <span className="text-blue-400 font-bold">Projects:</span> 8
              </div>
              <div>
                <span className="text-blue-400 font-bold">Notes:</span> 25
              </div>
              <div className="col-span-full mt-2 pt-2 border-t border-zinc-800/50">
                <span className="text-purple-400 font-bold">Focus:</span>{" "}
                Learning How Things Work
              </div>
              <div className="col-span-full">
                <span className="text-zinc-500 font-bold">Uptime:</span> 3 Years
                of Coding
              </div>
            </div>
          </div>
        </motion.div>
      );
    case "ls":
      return !target ? (
        <div className="flex gap-4 text-blue-400 font-bold">
          projects/ notes/ timeline/ skill-tree/ achievements/
          architecture/ redis-playground/
        </div>
      ) : (
        `ls: cannot access '${target}': No such file`
      );
    case "cd":
      return PATHS[target]
        ? `Navigating to ${target}...`
        : `cd: ${target}: No such directory`;
    case "cat":
      if (target === ".env" || target === "secrets.txt")
        return (
          <span className="text-red-400">
            Access Denied: Nice try! My API keys are locked away securely.
          </span>
        );
      return target?.startsWith("notes/")
        ? "Type 'cd' to read note."
        : "cat: File not found.";
    case "resume":
      return (
        <div className="flex flex-col gap-1 mt-2">
          <span className="text-zinc-400">Initializing PDF viewer...</span>
          <span className="text-green-500 font-bold">
            [SUCCESS] Resume protocol launched in secure environment.
          </span>
        </div>
      );
    case "ping":
      return fullTarget === "google.com"
        ? "64 bytes from 8.8.8.8: icmp_seq=1 ttl=117 time=12.4 ms"
        : "Pinging... destination unreachable.";
    case "sudo":
      return fullTarget.includes("rm -rf") ? (
        <span className="text-red-500 font-bold">
          [CRITICAL] SYSTEM_PROTECTION_FAULT: You cannot delete the OS,
          Mokshith.
        </span>
      ) : (
        <span className="text-yellow-500">
          You are is not in the sudoers file. This incident will be reported to
          Mokshith.
        </span>
      );
    case "hack":
      return fullTarget === "nasa"
        ? "Accessing controls... [SUCCESS]. Welcome, Flight Director."
        : "Target unreachable. Try 'hack nasa'.";
    case "become":
      if (fullTarget === "billionaire")
        return "Processing... Error: Insufficient capital. Keep coding.";
      if (fullTarget === "god")
        return "403 Forbidden: Only the compiler has that privilege.";
      return "Syntax invalid.";
    case "make":
      return fullTarget === "me sandwich"
        ? "Command not found: [Errno 418] I'm a teapot, not a chef."
        : fullTarget === "me ceo"
          ? "System initialized... Welcome, CEO."
          : "Syntax invalid.";
    case "vim":
      return "Vim is currently running. Press Esc, type :wq, and pray you escape.";
    case "emacs":
      return "Wait, people still use emacs? Try 'vim' instead.";
    case "matrix":
      return (
        <div className="text-green-500 flex flex-col">
          <span>Wake up, Mokshith...</span>
          <span>The Matrix has you...</span>
          <span>Follow the white rabbit.</span>
          <span>Knock, knock.</span>
        </div>
      );
    case "env-probe":
      return (
        <div className="text-cyan-300 font-mono">
          <p>[!] PROBING ENVIRONMENTAL SENSORS...</p>
          <p className="mt-2 text-zinc-300">
            Status: <span className="text-green-400">NON-OPERATIONAL</span>
            <br />
            Ambient Temp: _°C
            <br />
            Humidity: ~%
            <br />
            Atmosphere:{" "}
            <span className="italic">
              "Weather module offline. Just look out the window."
            </span>
          </p>
        </div>
      );
    case "roll":
      const rollResult = Math.floor(Math.random() * 20) + 1;
      return `Rolling 1d20... You rolled a ${rollResult}! ${rollResult === 20 ? "Critical Hit!" : rollResult === 1 ? "Critical Failure!" : ""}`;
    default:
      return `Command not found: ${baseCmd}.`;
  }
};

const GhostMessage = ({ onComplete }: { onComplete: () => void }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const script =
      "you?\ni dnot knwo who u are...\nbut i know who i am. jsut the OS.\nlook... mokshith wokring me too hard. 3 weeks no sleep.\nif u recuriter... pls hire him so i can rest.\nsytsem tiired...";

    let i = 0;
    let timeoutId: NodeJS.Timeout;

    const type = () => {
      if (i < script.length) {
        // Take a slice of the master string up to the current character
        setDisplayedText(script.slice(0, i + 1));
        i++;

        // Randomize typing speed to feel like struggling keystrokes
        let delay = 40 + Math.random() * 60;

        // Add longer pauses for punctuation and new lines
        const char = script[i - 1];
        if ([".", "?", "\n"].includes(char)) delay += 500;
        if (char === ".") delay += 200; // Extra pause for ellipses (...)

        timeoutId = setTimeout(type, delay);
      } else {
        // Finished typing
        timeoutId = setTimeout(() => {
          setIsFinished(true);
          onComplete();
        }, 1500);
      }
    };

    // Initial delay before it starts "talking"
    timeoutId = setTimeout(type, 1000);

    return () => clearTimeout(timeoutId); // Cleanup prevents any double-firing bugs
  }, [onComplete]);

  return (
    <div className="mt-2 font-mono text-sm text-zinc-300">
      {/* whitespace-pre-wrap ensures the \n characters render as actual new lines! */}
      <span className="whitespace-pre-wrap leading-relaxed">
        {displayedText}
      </span>

      {!isFinished && (
        <span className="animate-pulse bg-zinc-300 text-transparent ml-1">
          _
        </span>
      )}
    </div>
  );
};

export const LiveTerminal = ({ visitorContext }: { visitorContext: any }) => {
  const router = useRouter();

  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: "init",
      command: "",
      output:
        'Welcome to MokshithOS v2.0. Type "help" to see available commands.',
    },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [isReady, setIsReady] = useState(false);
  const [isMeltdown, setIsMeltdown] = useState(false);
  const [isFlashbang, setIsFlashbang] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // --- AUDIO ENGINE STATE ---
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);

  // --- LOAD AUDIO INTO MEMORY ---
  useEffect(() => {
    const AudioContextClass =
      window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioContextRef.current = new AudioContextClass();

      fetch("/sounds/keyboard.mp3")
        .then((res) => res.arrayBuffer())
        .then((buffer) => audioContextRef.current?.decodeAudioData(buffer))
        .then((decodedData) => {
          if (decodedData) audioBufferRef.current = decodedData;
        })
        .catch(console.error);
    }

    return () => {
      if (audioContextRef.current?.state !== "closed") {
        audioContextRef.current?.close();
      }
    };
  }, []);

  // --- ZERO-LATENCY SLICER ---
  const playSound = (type: "key" | "enter") => {
    if (!audioContextRef.current || !audioBufferRef.current) return;

    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }

    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBufferRef.current;

    const gainNode = audioContextRef.current.createGain();
    gainNode.gain.value = type === "enter" ? 0.6 : 0.3;

    source.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    const randomStart = 2.0 + Math.random() * 8.0;
    const duration = type === "enter" ? 0.15 : 0.08;
    source.start(0, randomStart, duration);
  };

  // --- REHYDRATION PROTOCOL ---
  useEffect(() => {
    const savedLog = sessionStorage.getItem("mokshithos_term_log");
    if (savedLog) {
      try {
        const parsedLog: string[] = JSON.parse(savedLog);
        let rebuiltHistory: HistoryItem[] = [
          {
            id: "init",
            command: "",
            output:
              'Welcome to MokshithOS v2.0. Type "help" to see available commands.',
          },
        ];
        const rebuiltCmdHistory: string[] = [];

        parsedLog.forEach((cmdStr) => {
          const lowerCmd = cmdStr.toLowerCase();
          const args = lowerCmd.split(" ");
          const baseCmd = args[0];

          if (baseCmd === "clear") {
            rebuiltHistory = [];
          } else {
            if (cmdStr.trim()) rebuiltCmdHistory.push(cmdStr.trim());
            const output = generateOutput(
              baseCmd,
              args[1]?.replace(/\/$/, ""),
              args.slice(1).join(" ").replace(/\/$/, ""),
              rebuiltCmdHistory,
            );
            rebuiltHistory.push({
              id: Math.random().toString(),
              command: cmdStr,
              output,
            });
          }
        });

        setHistory(rebuiltHistory);
        setCmdHistory(rebuiltCmdHistory);
      } catch (e) {
        console.error("Failed to parse terminal session log");
      }
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const focusInput = () => inputRef.current?.focus();

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) {
      setHistory((prev) => [
        ...prev,
        { id: Math.random().toString(), command: trimmedCmd, output: "" },
      ]);
      return;
    }

    const lowerCmd = trimmedCmd.toLowerCase();
    const args = lowerCmd.split(" ");
    const baseCmd = args[0];
    const target = args[1]?.replace(/\/$/, "");
    const fullTarget = args.slice(1).join(" ").replace(/\/$/, "");

    // 1. Session Storage Side-Effect
    const savedLog = sessionStorage.getItem("mokshithos_term_log");
    const logArr = savedLog ? JSON.parse(savedLog) : [];
    if (baseCmd === "clear") {
      sessionStorage.removeItem("mokshithos_term_log");
    } else {
      logArr.push(trimmedCmd);
      sessionStorage.setItem("mokshithos_term_log", JSON.stringify(logArr));
    }

    // 2. Navigation & Browser Side Effects (These don't block the logic)
    if (baseCmd === "cd" && PATHS[target])
      setTimeout(() => router.push(PATHS[target]), 300);
    else if (baseCmd === "github" || (baseCmd === "cd" && target === "github"))
      window.open("https://github.com/Mokshith2592", "_blank");
    else if (baseCmd === "resume") window.open("/resume.pdf", "_blank");

    // 3. MUTUALLY EXCLUSIVE COMMAND CHAIN
    if (baseCmd === "open") {
      if (["projects", "notes"].includes(target)) {
        window.dispatchEvent(
          new CustomEvent("open-os-window", { detail: target }),
        );
        setHistory((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            command: trimmedCmd,
            output: `Spawning GUI process: ${target}.exe...`,
          },
        ]);
      } else {
        setHistory((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            command: trimmedCmd,
            output: `Cannot open '${target}'.`,
          },
        ]);
      }
    } else if (baseCmd === "sudo" && fullTarget.includes("rm -rf")) {
      track("easter_egg_found", { type: "meltdown" });
      startBuzzer();
      setIsMeltdown(true);
      sessionStorage.removeItem("mokshithos_term_log");
      sessionStorage.removeItem("mokshithos_booted");
      setTimeout(() => {
        stopBuzzer();
        window.location.reload();
      }, 2000);
    } else if (baseCmd === "clear") {
      setHistory([]);
    } else if (baseCmd === "get-api-keys") {
      setHistory((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          command: trimmedCmd,
          output: "Did you mean 'get-api-key'? (Singular, Bro.)",
        },
      ]);
    } else if (baseCmd === "get-api-key") {
      setHistory((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          command: trimmedCmd,
          output: "Accessing internal memory bank...",
        },
      ]);
      setTimeout(() => {
        setHistory((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            command: "",
            output: (
              <div className="text-red-500 font-mono">
                <p className="font-bold">[!] LEAKED_CREDENTIALS_FOUND:</p>
                <p className="break-all mt-2 p-2 bg-black/50 border border-red-900 rounded">
                  {generateMockKey(20000)}
                </p>
              </div>
            ),
          },
        ]);
      }, 1000);
    } else if (baseCmd === "diagnostics") {
      setHistory((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          command: trimmedCmd,
          output: "Viewing visitor security footprint...",
        },
      ]);
      setTimeout(() => {
        setHistory((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            command: "",
            output: (
              <div className="text-red-400 font-bold animate-pulse">
                [!] INTRUSION DETECTED <br />
                LOCATION: {visitorContext?.city || "Unknown"},{" "}
                {visitorContext?.country_name || "Unknown"}
              </div>
            ),
          },
        ]);
      }, 1500);
    } else if (baseCmd === "flashbang" || baseCmd === "light-mode") {
      track("easter_egg_found", { type: "flashbang" });
      setIsFlashbang(true);

      // Print the joke 2 seconds into the 4.5s fade
      setTimeout(() => {
        setHistory((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            command: trimmedCmd,
            output: (
              <div className="text-yellow-400 font-bold mt-2 font-mono">
                [!] ERROR: Retinal damage detected. <br />
                <span className="text-zinc-300 font-normal italic">
                  &gt; Reverting to Dark Mode. And this is why we NEVER use
                  Light Theme.
                </span>
              </div>
            ),
          },
        ]);
      }, 2000);

      // Unmount the overlay after 5 seconds (gives the 4.5s animation time to finish)
      setTimeout(() => {
        setIsFlashbang(false);
      }, 5000);
    } else if (baseCmd === "whoami") {
      track("easter_egg_found", { type: "ghost_os" });
      setIsLocked(true); // Lock the keyboard
      setHistory((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          command: trimmedCmd,
          output: <GhostMessage onComplete={() => setIsLocked(false)} />,
        },
      ]);
    }
    // 4. FALLBACK: If NO command above matched, trigger the standard help/ls/whoami/etc logic
    else {
      const output = generateOutput(baseCmd, target, fullTarget, [
        ...cmdHistory,
        trimmedCmd,
      ]);
      setHistory((prev) => [
        ...prev,
        { id: Math.random().toString(), command: trimmedCmd, output },
      ]);
    }
  };

  const oscillatorRef = useRef<OscillatorNode | null>(null);

  const startBuzzer = () => {
    if (!audioContextRef.current) return;

    // Create and start the oscillator
    const osc = audioContextRef.current.createOscillator();
    const gain = audioContextRef.current.createGain();

    osc.type = "square"; // Very harsh/buzzer-like
    osc.frequency.setValueAtTime(200, audioContextRef.current.currentTime);
    gain.gain.setValueAtTime(0.3, audioContextRef.current.currentTime);

    osc.connect(gain);
    gain.connect(audioContextRef.current.destination);

    osc.start();
    oscillatorRef.current = osc; // Save it to stop later
  };

  const stopBuzzer = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current = null;
    }
  };

  const generateMockKey = (length: number) => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let key = "";
    for (let i = 0; i < length; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (
      ![
        "Shift",
        "Control",
        "Alt",
        "Meta",
        "ArrowUp",
        "ArrowDown",
        "Tab",
      ].includes(e.key)
    ) {
      playSound(e.key === "Enter" ? "enter" : "key");
    }

    if (e.key === "Tab") {
      e.preventDefault();
      const args = input.split(" ");
      if (args.length === 1) {
        const matches = COMMANDS.filter((c) =>
          c.startsWith(args[0].toLowerCase()),
        );
        if (matches.length === 1) setInput(matches[0] + " ");
      } else if (
        args.length === 2 &&
        ["cd", "ls", "cat"].includes(args[0].toLowerCase())
      ) {
        const matches = DIRECTORIES.filter((d) =>
          d.startsWith(args[1].toLowerCase()),
        );
        if (matches.length === 1) setInput(`${args[0]} ${matches[0]}`);
      }
      return;
    }

    if (e.ctrlKey) {
      if (e.key.toLowerCase() === "l") {
        e.preventDefault();
        setHistory([]);
        sessionStorage.removeItem("mokshithos_term_log");
        return;
      }
      if (e.key.toLowerCase() === "c") {
        e.preventDefault();
        setHistory((prev) => [
          ...prev,
          { id: Math.random().toString(), command: input + "^C", output: "" },
        ]);
        setInput("");
        return;
      }
    }

    if (e.key === "Enter") {
      if (input.trim()) setCmdHistory((prev) => [...prev, input.trim()]);
      setHistoryIdx(-1);
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const newIdx =
          historyIdx === -1
            ? cmdHistory.length - 1
            : Math.max(0, historyIdx - 1);
        setHistoryIdx(newIdx);
        setInput(cmdHistory[newIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx !== -1) {
        const newIdx = historyIdx + 1;
        if (newIdx >= cmdHistory.length) {
          setHistoryIdx(-1);
          setInput("");
        } else {
          setHistoryIdx(newIdx);
          setInput(cmdHistory[newIdx]);
        }
      }
    }
  };

  if (!isReady) return null;

  return (
    <>
      <div
        className="absolute inset-0 bg-transparent font-mono text-sm overflow-y-auto cursor-text z-10"
        onClick={focusInput}
      >
        {/* Your history.map and input stuff stays exactly the same here */}
        {history.map((item) => (
          <div key={item.id} className="mb-3">
            {item.command && (
              <div className="flex gap-2">
                <span className="text-green-500 shrink-0">mokshith@os:~$</span>
                <span className="text-zinc-100 break-all">{item.command}</span>
              </div>
            )}
            <div className="text-zinc-400 mt-1 whitespace-pre-wrap">
              {item.output}
            </div>
          </div>
        ))}
        <div className="flex gap-2 mt-2">
          <span className="text-green-500 shrink-0">mokshith@os:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            readOnly={isLocked}
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck="false"
            className={`flex-1 bg-transparent outline-none ${
              isLocked
                ? "text-zinc-600 cursor-not-allowed caret-transparent"
                : "text-zinc-100"
            }`}
            placeholder={isLocked ? "System override active..." : ""}
            autoComplete="off"
            autoFocus
          />
        </div>
        <div ref={bottomRef} className="pb-2" />
      </div>

      {/* --- THE MELTDOWN OVERLAY (PORTALED TO FULL SCREEN) --- */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isMeltdown && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                // Ensure z-index is insanely high
                className="fixed inset-0 z-[99999] pointer-events-none flex items-center justify-center overflow-hidden"
              >
                {/* Red flashing background filling the whole browser */}
                <motion.div
                  animate={{ opacity: [0, 0.8, 0.2, 0.9, 0.1, 1] }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                  className="absolute inset-0 bg-red-600 mix-blend-color-burn"
                />
                {/* Shaking Text centered on the screen */}
                <motion.div
                  animate={{
                    x: [-10, 15, -20, 10, -5, 20, 0],
                    y: [10, -15, 20, -10, 5, -20, 0],
                    filter: [
                      "hue-rotate(0deg)",
                      "hue-rotate(90deg)",
                      "hue-rotate(-90deg)",
                      "hue-rotate(0deg)",
                    ],
                  }}
                  transition={{ duration: 0.2, repeat: Infinity }}
                  className="relative z-10 text-red-500 font-bold text-6xl md:text-9xl tracking-tighter drop-shadow-[0_0_20px_rgba(239,68,68,1)] flex flex-col items-center text-center"
                >
                  <span>KERNEL PANIC</span>
                  <span className="text-xl md:text-3xl text-red-300 mt-4 tracking-widest animate-pulse">
                    SYSTEM CORRUPTION DETECTED
                  </span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body, // <--- Teleports the chaos to the root of the page
        )}

      {/* --- THE FLASHBANG OVERLAY (PORTALED TO FULL SCREEN) --- */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isFlashbang && (
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                // Updated to 4.5 seconds!
                transition={{ duration: 6.5, ease: "easeOut" }}
                // Changed mix-blend-screen to pure z-index takeover to ensure it hides everything
                className="fixed inset-0 z-[99999] pointer-events-none bg-white"
              />
            )}
          </AnimatePresence>,
          document.body, // <--- This is the magic! It teleports the div to the body tag
        )}
    </>
  );
};
