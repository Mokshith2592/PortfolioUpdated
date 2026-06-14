import { CaseStudy } from '@/components/layout/CaseStudy';
import { HomeButton } from '@/components/ui/HomeButton';

export default function RedisProject() {
  const redisData = {
    title: "Redis-Compatible Server",
    overview: "A high-performance, concurrent key-value store built entirely from scratch in C++. It implements the core RESP (REdis Serialization Protocol) to allow standard Redis CLI clients to connect, send commands, and retrieve data exactly as they would with a native Redis instance.",
    motivation: "I wanted to deeply understand TCP socket programming, the complexities of multithreading, and how production-grade caching layers serialize and deserialize binary data streams over the network.",
    architecture: "Built using a multi-threaded event loop architecture. The TCP Layer listens for connections, handing them off to thread pools. The RESP Parser decodes the byte streams into commands, which are then synchronized using Mutexes before modifying the core KV Store.",
    challenges: [
      "Handling partial TCP socket reads and buffering the byte stream until a complete RESP frame was received.",
      "Implementing thread-safe read/write operations to the hash map without causing massive bottleneck locks.",
      "Parsing complex RESP arrays and bulk strings correctly handling CRLF sequences."
    ],
    github: "https://github.com/yourusername/redis-server" // Replace with your actual link later
  };

  return (
    <main className="min-h-screen bg-black text-zinc-100 font-sans relative pt-12 pb-24">
      <HomeButton />
      <CaseStudy {...redisData} />
    </main>
  );
}