export const projects = [
  {
    id: 'redis',
    title: 'Redis-Compatible Server',
    description:
      'A Redis-inspired in-memory key-value database being built from scratch in C++. The project is focused on understanding how production-grade databases handle network communication, protocol parsing, request processing, and efficient data storage. I am implementing TCP socket communication, the Redis Serialization Protocol (RESP), and a modular command execution pipeline while exploring concepts such as event-driven architectures, concurrency, memory management, and systems programming. Through this project, I am gaining a deeper understanding of how high-performance backend systems operate under the hood.',

    tech: ['C++', 'Linux', 'TCP/IP', 'Sockets', 'RESP'],
    link: '/projects/redis'
  },

  {
    id: 'expense-tracker',
    title: 'Expense Tracker',
    description:
      'A personal finance management application designed to help users monitor expenses, analyze spending patterns, and develop better financial habits. The application provides categorized expense tracking, intuitive visualizations, and meaningful insights into user spending behavior. Beyond the core functionality, the project focuses on creating a polished user experience, scalable architecture, and maintainable code structure while exploring modern mobile application development practices.',

    tech: ['Flutter', 'Dart', 'SQLite'],
    link: '/projects/expense-tracker'
  },

  {
    id: 'chatbot',
    title: 'AI Chatbot',
    description:
      'An AI-powered conversational assistant built using modern web technologies and integrated with a generative AI API. The application supports real-time interactions through a responsive chat interface while handling asynchronous API communication and dynamic message rendering. Building this project helped me understand API integration, frontend state management, prompt engineering, and the practical challenges involved in developing applications powered by large language models.',

    tech: ['HTML', 'CSS', 'JavaScript', 'REST APIs'],
    link: '/projects/chatbot'
  },

  {
    id: 'todo-app',
    title: 'MERN Todo Application',
    description:
      'A full-stack task management application developed using the MERN stack. The project supports complete CRUD functionality, persistent storage, and API-driven communication between the frontend and backend. While building it, I gained practical experience in designing REST APIs, managing application state, structuring backend services, and working with MongoDB for data persistence. This project strengthened my understanding of end-to-end web application development.',

    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    link: '/projects/todo'
  },

  {
    id: 'digit-recognition',
    title: 'Handwritten Digit Recognition',
    description:
      'A machine learning project focused on recognizing handwritten digits using neural networks. Built using TensorFlow and Keras, the project explores the complete machine learning workflow including data preprocessing, model training, evaluation, and prediction. Through this project, I developed a foundational understanding of supervised learning, deep learning concepts, model optimization, and the importance of data quality in achieving reliable predictions.',

    tech: ['Python', 'TensorFlow', 'Keras', 'Machine Learning'],
    link: '/projects/digit-recognition'
  },

  {
    id: 'portfolio',
    title: 'Terminal Portfolio',
    description:
      'A terminal-inspired developer portfolio designed to showcase projects, technical notes, skills, and engineering experiences through an interactive command-line interface. Rather than following a traditional portfolio design, the project experiments with a developer-centric user experience that reflects my interests in systems programming and terminal environments. It serves as both a personal brand platform and a playground for exploring modern frontend technologies.',

    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    link: '/projects/portfolio'
  },

  {
    id: 'huffman-zipper',
    title: 'File Zipper Using Huffman Encoding',
    description:
      'A lossless file compression utility built around the Huffman Encoding algorithm. The project compresses data by assigning shorter binary codes to frequently occurring characters and longer codes to less frequent ones. Implementing the complete compression and decompression pipeline provided hands-on experience with trees, priority queues, greedy algorithms, binary file handling, and the practical application of information theory concepts.',

    tech: ['C++', 'Data Structures', 'Greedy Algorithms'],
    link: '/projects/huffman-zipper'
  }
];

export const notes = [
  {
  id: '1',
  title: 'When O(n) Beats O(log n)',
  slug: 'cache-locality',
  date: '2026-06-18',
  tags: ['Systems', 'Performance', 'C++'],
  content: `
### Why Big-O Analysis Is Sometimes Misleading

One of the strangest lessons I learned is that a theoretically worse algorithm can outperform a better one in practice.

Most programmers are taught that:

O(log n) < O(n)

which is mathematically true.

However modern CPUs care about something else:

**cache locality**.

Consider two approaches:

1. Binary Search on a sorted array.
2. Linear Scan through a small contiguous array.

Binary search performs fewer comparisons, but every comparison jumps to a different memory location.

Linear scan performs more comparisons, yet accesses memory sequentially.

Modern CPUs aggressively preload nearby memory into cache lines (typically 64 bytes).

When data is laid out sequentially, the CPU can often fetch multiple future values before they are needed.

This means:

\`\`\`
Linear Scan:
1 -> 2 -> 3 -> 4 -> 5

Cache Friendly ✓
\`\`\`

while

\`\`\`
Binary Search:
512 -> 256 -> 768 -> 640

Cache Friendly ✗
\`\`\`

The result is surprising.

For small and medium-sized datasets, a linear scan can outperform binary search despite having a worse asymptotic complexity.

This is one reason why high-performance databases, game engines, and compilers spend enormous effort optimizing memory layouts.

A common mistake among beginners is focusing only on algorithmic complexity while ignoring memory access patterns.

The real performance hierarchy often looks like:

Cache Hit > Good Algorithm > Fast CPU

Understanding cache locality fundamentally changed how I think about optimization. Sometimes the fastest code is not the one doing fewer operations. It is the one touching memory more intelligently.
`
},
{
  id: '2',
  title: 'The Secret Behind Redis Performance',
  slug: 'redis-single-thread',
  date: '2026-06-18',
  tags: ['Redis', 'Systems', 'Networking'],
  content: `
### How Redis Handles Millions Of Requests Without Multiple Worker Threads

When I first started reading Redis internals, one thing seemed impossible.

How can a mostly single-threaded server outperform systems that use dozens of worker threads?

The answer lies in avoiding costs rather than adding resources.

Many servers follow this model:

\`\`\`
Client -> Thread
Client -> Thread
Client -> Thread
\`\`\`

As the number of clients increases, the operating system spends more time performing:

* Context Switching
* Thread Scheduling
* Lock Management
* Cache Synchronization

These operations do not perform useful work.

They are coordination overhead.

Redis takes a different approach.

Instead of assigning a thread to every client, it uses an **event loop**.

The server registers sockets with the kernel and asks:

"Notify me only when a socket becomes ready."

The loop looks conceptually like:

\`\`\`cpp
while(true) {
    readySockets = poll();
    processEvents();
}
\`\`\`

This approach eliminates thousands of unnecessary thread switches.

Even more importantly, Redis avoids most locking because requests are processed sequentially.

No mutex contention.

No race conditions.

No lock hierarchies.

No deadlock debugging.

This design also improves CPU cache behavior.

The server repeatedly executes the same code paths on the same thread, which keeps instructions hot inside the CPU cache.

Redis is fast not because it does more work.

Redis is fast because it removes work.

That idea appears repeatedly in systems engineering:

The highest-performance systems are often the ones that eliminate complexity rather than parallelize it.
`
},
{
  id: '3',
  title: 'Why Hash Tables Usually Double In Size',
  slug: 'hash-table-resizing',
  date: '2026-06-18',
  tags: ['Data Structures', 'Systems', 'Performance'],
  content: `
### The Real Reason Behind Power-of-Two Capacities

Most developers know that hash tables resize when they become too full.

What many people don't know is why capacities are often chosen as:

16 -> 32 -> 64 -> 128 -> 256

instead of:

10 -> 20 -> 40 -> 80

or some random sequence.

The answer comes down to replacing expensive arithmetic with a single CPU instruction.

Suppose a hash table contains 1024 buckets.

To determine which bucket stores a key, we typically compute:

\`\`\`cpp
index = hash % capacity;
\`\`\`

Modulo division is relatively expensive.

However, when capacity is a power of two, the same operation becomes:

\`\`\`cpp
index = hash & (capacity - 1);
\`\`\`

For example:

\`\`\`
capacity = 1024
capacity - 1 = 1023

hash & 1023
\`\`\`

This extracts only the lowest 10 bits of the hash value.

The CPU performs this using a single bitwise instruction.

No division required.

Another interesting consequence appears during resizing.

When a table grows from:

1024 -> 2048

every element either:

1. Stays in the same bucket.
2. Moves exactly 1024 positions forward.

Modern implementations exploit this property to perform extremely efficient rehashing.

This is why Java HashMap, Redis dictionaries, and many high-performance hash table implementations strongly prefer power-of-two capacities.

The lesson is simple:

Many systems optimizations are not about clever algorithms. They are about turning expensive CPU operations into cheaper ones.
`
},
{
  id: '4',
  title: 'False Sharing: When Threads Fight Without Sharing Data',
  slug: 'false-sharing',
  date: '2026-06-18',
  tags: ['Concurrency', 'CPU Architecture', 'Systems'],
  content: `
### The Multithreading Bug That Doesn't Break Correctness

Most concurrency bugs cause incorrect results.

False sharing is different.

Your program produces correct output while becoming dramatically slower.

Consider two threads:

\`\`\`cpp
struct Counter {
    int a;
    int b;
};
\`\`\`

Thread A updates:

\`\`\`cpp
counter.a++;
\`\`\`

Thread B updates:

\`\`\`cpp
counter.b++;
\`\`\`

At first glance there is no shared data.

Different variables.

No locks required.

Yet performance may collapse.

The reason lies inside CPU cache lines.

Modern processors transfer memory in chunks called cache lines, typically 64 bytes.

Both a and b likely occupy the same cache line.

When Thread A modifies a, its CPU core gains ownership of that cache line.

Moments later Thread B modifies b.

Now ownership must move to another core.

The cache line bounces between CPUs thousands or millions of times per second.

This process is known as cache line ping-pong.

The threads are not sharing variables.

They are sharing cache lines.

A common fix is padding:

\`\`\`cpp
struct Counter {
    alignas(64) int a;
    alignas(64) int b;
};
\`\`\`

Now each variable occupies a separate cache line.

Nothing about the algorithm changes.

Nothing about correctness changes.

Yet throughput can improve dramatically.

This is one of the reasons performance engineering often requires understanding hardware rather than just software.
`
},
{
  id: '6',
  title: 'TCP Head-of-Line Blocking',
  slug: 'tcp-head-of-line-blocking',
  date: '2026-06-18',
  tags: ['Computer Networks', 'TCP'],
  content: `
### Why A Single Lost Packet Can Delay Everything

TCP guarantees in-order delivery.

This means data must be delivered to the application exactly in the order it was sent.

Suppose a sender transmits:

Packet 1
Packet 2
Packet 3
Packet 4

Now imagine Packet 2 gets lost.

Even if Packets 3 and 4 successfully reach the receiver, the application cannot process them immediately.

TCP must wait for Packet 2 to be retransmitted before exposing later packets.

The receiver already has Packets 3 and 4.

The problem is that TCP refuses to deliver them.

This phenomenon is known as Head-of-Line Blocking.

The issue becomes especially noticeable in HTTP/2 where multiple requests share a single TCP connection.

A single packet loss can delay completely unrelated requests.

This limitation was one of the primary motivations behind QUIC.

QUIC runs over UDP and maintains independent streams.

If one stream experiences packet loss, the others continue making progress.

Many people think network latency is caused only by physical distance.

In reality, protocol design decisions often contribute just as much to perceived delays.

Head-of-Line Blocking is a perfect example of how reliability guarantees can sometimes reduce performance.
`
},
{
  id: '7',
  title: 'The Magic Behind fork()',
  slug: 'copy-on-write',
  date: '2026-06-18',
  tags: ['Operating Systems', 'Memory Management'],
  content: `
### Why fork() Doesn't Actually Copy Memory

The fork() system call creates a new process.

At first glance this sounds expensive.

If a parent process uses 2GB of memory, creating a child process should require copying all 2GB.

Yet fork() is surprisingly fast.

The reason is Copy-on-Write.

Instead of copying memory immediately, the operating system allows parent and child processes to share the same physical pages.

Both page tables point to identical memory.

The pages are marked read-only.

As long as neither process modifies the memory, no copying occurs.

When one process attempts to write:

1. A page fault occurs.
2. The OS allocates a new page.
3. The page contents are copied.
4. The write proceeds normally.

Only the modified pages are duplicated.

Everything else remains shared.

This optimization makes process creation extremely efficient and is one of the reasons UNIX-style process management scales so well.

The elegant part is that most programs never notice it happening.

Copy-on-Write demonstrates a recurring systems principle:

The fastest work is often the work that never happens.
`
},
{
  id: '8',
  title: 'The Thundering Herd Problem',
  slug: 'thundering-herd',
  date: '2026-06-18',
  tags: ['Operating Systems', 'Networking'],
  content: `
### When Waking Up More Threads Makes Performance Worse

Imagine a web server with 100 worker threads waiting for incoming connections.

A new request arrives.

The operating system wakes all 100 threads.

However only one thread can actually accept the connection.

The remaining 99 threads immediately discover there is no work available and go back to sleep.

This creates unnecessary:

* Context switches
* Scheduler overhead
* Cache invalidations

The server spends significant CPU time waking threads that accomplish nothing.

This phenomenon is called the Thundering Herd Problem.

Historically, large servers suffered heavily from this issue.

Modern kernels solve it using mechanisms such as:

* epoll
* IOCP
* kqueue
* Event-driven architectures

Instead of waking every waiting thread, the kernel wakes only the threads that can make progress.

The lesson is subtle but important.

Performance problems are not always caused by doing too little work.

Sometimes they arise from doing far too much unnecessary work.

Many modern high-performance systems are designed around avoiding wakeups whenever possible.
`
},
{
  id: '9',
  title: 'Why DNS Is One Of The Most Important Systems On The Internet',
  slug: 'dns-internals',
  date: '2026-06-18',
  tags: ['Computer Networks', 'Internet Infrastructure'],
  content: `
### The Internet Would Be Practically Unusable Without DNS

Most explanations of DNS stop at:

"DNS converts domain names into IP addresses."

While true, that description dramatically understates its importance.

Imagine a world without DNS.

Instead of visiting:

google.com

you would need to remember something like:

142.250.183.206

for every website you use.

As the Internet grew from a few hundred machines to billions of devices, this approach became impossible.

DNS solved the problem by creating a distributed naming system that maps human-readable names to machine-readable addresses.

But DNS does much more than simple translation.

### A Giant Distributed Database

DNS is one of the largest distributed databases ever built.

No single server stores every domain name.

Instead, responsibility is divided hierarchically.

When you visit:

api.example.com

your resolver typically performs:

1. Root Server Lookup
2. Top-Level Domain (.com) Lookup
3. Authoritative Server Lookup

This design allows the system to scale globally without a central bottleneck.

### Why DNS Is Surprisingly Fast

At first glance, performing multiple lookups for every website sounds slow.

The reason it works is caching.

Resolvers, operating systems, browsers, and ISPs all cache DNS records.

A lookup that might require multiple network requests the first time can often be answered locally afterward.

For popular websites, many users never contact the authoritative DNS server at all.

### DNS Controls Traffic Flow

Many people assume load balancing happens only inside application servers.

In reality, DNS often performs the first level of traffic management.

A DNS response can direct users to:

* Different geographic regions
* Different data centers
* Different cloud providers
* Backup infrastructure during outages

When you access a global service, DNS may route you to the nearest server before any application logic executes.

### A Single Failure Can Break Everything

One reason DNS is so critical is that every internet service depends on it.

Websites.
Email.
Cloud platforms.
APIs.
Streaming services.

Even if a server is perfectly healthy, users cannot reach it if DNS resolution fails.

This is why DNS outages frequently appear larger than application outages.

The service may still be running, but users effectively lose access to it.

### The Real Lesson

DNS is often described as the Internet's phonebook.

A better analogy is that DNS acts as the Internet's navigation system.

It not only tells you where something is, but often determines the path you take to reach it.

The remarkable part is that billions of DNS queries occur every day, usually completing in milliseconds and remaining invisible to end users.

Few systems operate at such scale while receiving so little attention.
`
},
{
  id: '10',
  title: 'Why Threads Are Cheaper Than Processes (And When They Aren’t)',
  slug: 'threads-vs-processes',
  date: '2026-06-18',
  tags: ['Operating Systems', 'Concurrency'],
  content: `
### The Popular Myth

One of the first things taught in Operating Systems is:

"Threads are cheaper than processes."

While generally true, the reason has very little to do with CPU speed and everything to do with what the operating system must manage.

A process is an independent execution environment.

It owns:

* Virtual address space
* Page tables
* Open file descriptors
* Security context
* Memory mappings

Creating a process means setting up all of this state.

Historically, this was extremely expensive.

Modern operating systems optimize process creation using techniques such as Copy-on-Write, but processes still carry significant overhead.

Threads are different.

Multiple threads inside the same process share:

* Address space
* Heap memory
* Open files
* Shared libraries
* Global variables

The operating system only needs to allocate:

* A stack
* CPU registers
* Scheduling metadata

for each new thread.

This is why spawning a thread is usually much faster than creating a completely new process.

### The Hidden Cost of Sharing

The same thing that makes threads efficient also makes them dangerous.

Because threads share memory, they can accidentally modify the same data simultaneously.

Consider:

\`\`\`cpp
counter++;
\`\`\`

If two threads execute this operation at the same time, the result may be incorrect.

Preventing these issues requires:

* Mutexes
* Semaphores
* Condition Variables
* Atomic Operations

These synchronization mechanisms introduce overhead.

As the number of threads increases, contention often becomes the real bottleneck.

### When Threads Stop Being Cheap

Suppose a program creates hundreds of worker threads.

Only a handful are actively doing work.

The operating system must still:

* Schedule them
* Save CPU registers
* Restore CPU registers
* Manage run queues

This process is called a context switch.

A context switch performs no useful application work.

It is purely administrative overhead.

When thousands of threads compete for CPU time, the scheduler can spend a surprising amount of time managing threads instead of running them.

### Why Some Systems Avoid Large Thread Pools

High-performance systems such as Redis, Nginx, and many event-driven servers often avoid assigning one thread per client.

Instead, they use event loops.

A single thread handles many connections by reacting only when work becomes available.

This eliminates large amounts of scheduling and synchronization overhead.

The result is often higher throughput despite using fewer threads.

### The Real Lesson

Threads are cheaper than processes because they reuse resources instead of creating new ones.

However, shared resources introduce synchronization costs, contention, and scheduling overhead.

At small scales, threads are usually the right choice.

At very large scales, the question is no longer:

"How many threads can I create?"

but rather:

"How many threads do I actually need?"

Many of the fastest systems in the world achieve performance not by creating more threads, but by carefully avoiding unnecessary ones.
`
}
];

export const STATIC_NOW_ITEMS = [
  "Building a Redis-Compatible Server in C++",
  "Reading Designing Data-Intensive Applications",
  "Learning Socket Programming",
  "Exploring Computer Networks & OS Internals",
  "Understanding System Designs",
  "Implementing the RESP Protocol",
  "Working on an Expense Tracker",
  "Practicing Data Structures & Algorithms",
  "Turning Curiosity into Projects",
  "Turning Ideas Into Weekend Projects",
  "Building Things I Don't Yet Know How To Build"
];