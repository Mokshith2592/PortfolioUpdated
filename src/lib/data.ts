export const projects = [
  {
    id: 'redis',
    title: 'Redis-Compatible Server',
    description: 'A high-performance, concurrent key-value store implementing the RESP protocol from scratch in C++.',
    tech: ['C++', 'TCP/IP', 'Concurrency', 'Multithreading'],
    link: '/projects/redis'
  },
  {
    id: 'tnp-portal',
    title: 'NITW T&P Portal',
    description: 'Full-stack placement portal managing student data, authentication, and corporate recruitment pipelines.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Express'],
    link: '/projects/tnp'
  }
];

export const notes = [
{
    id: '1',
    title: 'Advanced Binary Search Patterns',
    slug: 'binary-search',
    date: '2026-06-14',
    tags: ['C++', 'Algorithms'],
    // Note the backticks (` `) around the entire string to allow multiple lines
    content: `
### The Monotonic Rule

When optimizing high-dimensional spaces, binary search on the answer is often the most efficient approach. You just need to prove the function is **strictly monotonic**.

Here is the standard template I use for competitive programming:

\`\`\`cpp
int left = 0, right = n - 1;
int ans = -1;

while (left <= right) {
    int mid = left + (right - left) / 2;
    
    if (isValid(mid)) {
        ans = mid;       // Store potential answer
        right = mid - 1; // Try to find a smaller valid answer
    } else {
        left = mid + 1;
    }
}
\`\`\`

* Always use \`left + (right - left) / 2\` to prevent integer overflow.
* Isolate the logic into an \`isValid()\` boolean function to keep the core loop clean.
    `
  },
  {
    id: '2',
    title: 'Deploying Redis on Kubernetes',
    slug: 'redis-k8s', // This becomes /notes/redis-k8s
    date: '2026-06-10',
    tags: ['Infrastructure', 'Docker'],
    content: 'Stateful sets are critical when dealing with distributed caching mechanisms...'
  }
];