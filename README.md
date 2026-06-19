# MokshithOS Portfolio

Interactive developer portfolio built with Next.js 16, React 19, TypeScript, Tailwind CSS, Framer Motion, and Vercel Analytics.

This project is designed like a personal operating system instead of a traditional portfolio site. The homepage acts like a terminal, and the rest of the site branches into projects, engineering notes, a skill graph, a timeline, achievements, experience, and Redis-themed interactive pages.

## What this portfolio includes

- Boot-screen style landing experience with a terminal-first UI
- Interactive terminal with command history, tab completion, keyboard audio, and session persistence
- Projects dashboard powered by shared data from `src/lib/data.ts`
- Markdown-based notes system with dynamic routes at `/notes/[slug]`
- Interactive skill tree powered by `src/lib/skill-data.ts`
- Engineering timeline powered by `src/lib/timeline-data.ts`
- Achievements and work experience pages
- Redis playground with basic in-browser Redis-like commands
- Redis architecture explainer page
- Global status bar with route info, uptime, live clock, and portfolio counters
- Live integrations for GitHub activity, Spotify now-playing, visitor geolocation, and a remote status config fallback

## Main routes

| Route | Purpose |
| --- | --- |
| `/` | Main MokshithOS home screen with terminal |
| `/projects` | Project grid |
| `/notes` | Notes explorer |
| `/notes/[slug]` | Individual note page rendered from Markdown content |
| `/skill-tree` | Interactive knowledge graph |
| `/timeline` | Engineering growth timeline |
| `/achievements` | Achievement ledger |
| `/experience` | Work history |
| `/redis-playground` | Redis-like command sandbox |
| `/architecture/redis` | Redis internals walkthrough |

Additional routes present in the codebase:

- `/projects/redis`
- `/projects/tnp`
- `/terminal`
- `/about`
- `/build-logs`

## How to use the portfolio

### 1. Homepage terminal

Open the site and use the terminal on `/`.

Core navigation commands:

```bash
help
whoami
ls
cd projects
cd notes
cd timeline
cd skill-tree
cd achievements
cd experience
cd architecture
cd redis-playground
resume
github
contact
clear
```

Useful terminal behavior:

- `Tab` autocompletes supported commands and directory names
- `ArrowUp` and `ArrowDown` cycle through command history
- `Ctrl + L` clears the terminal
- `Ctrl + C` cancels the current input line
- Terminal history is stored in `sessionStorage`
- The boot sequence is shown once per browser session, then skipped
- Not every supported command is surfaced by `help` or the default `ls` output

Other supported commands and easter eggs include:

```bash
pwd
tree
find redis
neofetch
status
diagnostics
roll
ping google.com
open projects
open notes
--reveal-secrets
light-mode
sudo rm -rf /
```

Notes about actual behavior:

- `cd ...` is the main way to navigate to portfolio sections from the terminal
- `resume` opens `public/resume.pdf`
- `github` opens the GitHub profile in a new tab
- `cat notes/<slug>` does not render the full note in-terminal; it nudges the visitor toward the notes page

### 2. Projects

Visit `/projects` or run `cd projects` from the terminal.

Project cards are rendered from `src/lib/data.ts`. Each project entry defines:

- title
- description
- tech stack
- link target

Important maintainer note:

- The projects grid is data-driven, but dedicated project detail pages currently exist only for `/projects/redis` and `/projects/tnp`
- If you add or edit a project `link` in `src/lib/data.ts`, make sure that route actually exists or points to an external URL

### 3. Notes

Visit `/notes` or run `cd notes`.

Notes come from the `notes` array inside `src/lib/data.ts` and are rendered with:

- `react-markdown`
- `remark-gfm`

Each note supports:

- headings
- lists
- inline code
- fenced code blocks
- GitHub-flavored Markdown tables and checklists
- tags and published date metadata

### 4. Skill tree

Visit `/skill-tree` or run `cd skill-tree`.

The page reads from `src/lib/skill-data.ts` and shows:

- grouped skill categories
- completed / learning / future states
- confidence percentage
- related projects
- hover/tap detail cards

### 5. Timeline

Visit `/timeline` or run `cd timeline`.

The page reads from `src/lib/timeline-data.ts`. Each node can be expanded to reveal:

- key learning
- technologies
- retrospective lesson

### 6. Achievements and experience

Visit:

- `/achievements`
- `/experience`

These pages are powered by:

- `src/lib/achievements.ts`
- `src/lib/experience.ts`

### 7. Redis playground

Visit `/redis-playground` or run `cd redis-playground`.

Supported playground commands:

```bash
HELP
SET key value
GET key
DEL key
KEYS *
PING
FLUSHALL
```

This is an in-browser stateful demo, not a real Redis server.

### 8. Redis architecture page

Visit `/architecture/redis` or run `cd architecture`.

This page provides a guided breakdown of:

- client layer
- TCP socket layer
- RESP parser
- command dispatcher
- in-memory store

## Setup on another laptop

### Prerequisites

- Node.js 20.9 or newer
- npm
- Git

Next.js 16 requires Node.js 20.9+.

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd portfolio
```

### 2. Install dependencies

```bash
npm ci
```

If `npm ci` is not suitable in your environment, use:

```bash
npm install
```

### 3. Create local environment variables

Create a `.env.local` file in the project root.

```bash
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token
```

These values are only needed for the Spotify "now playing" integration used by `/api/spotify`.

Without them:

- the app still runs
- the Spotify widget falls back to an offline/paused state

### 4. Start the development server

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

### 5. Production build check

```bash
npm run build
npm run start
```

### 6. Lint the project

```bash
npm run lint
```

Note: in Next.js 16, linting is not automatically run during `next build`.

## Environment and live integrations

This portfolio uses a few live network-dependent features:

- GitHub public API for recent repository activity on the home page
- `/api/spotify` for Spotify now-playing data
- GeoJS for visitor location used by the `diagnostics` terminal command
- a remote Gist for live status-bar config in `usePortfolioStats`
- Vercel Analytics via `@vercel/analytics`

If any of these are unavailable, most of the UI still loads and falls back gracefully.

## Where to update content

### Personal assets

- Profile image: `public/your-photo.jpeg`
- Resume PDF: `public/resume.pdf`
- Favicon/app icon: `src/app/icon.jpg`

### Portfolio data

- Projects: `src/lib/data.ts`
- Notes: `src/lib/data.ts`
- Static "Now" ticker items: `src/lib/data.ts`
- Skills: `src/lib/skill-data.ts`
- Timeline: `src/lib/timeline-data.ts`
- Achievements: `src/lib/achievements.ts`
- Experience: `src/lib/experience.ts`

### Route-level pages and UI

- Homepage terminal experience: `src/app/page.tsx`
- Terminal engine: `src/components/terminal/LiveTerminal.tsx`
- Global status bar: `src/components/StatusBar.tsx`
- Redis playground: `src/app/redis-playground/page.tsx`
- Redis architecture page: `src/app/architecture/redis/page.tsx`
- Notes renderer: `src/app/notes/[slug]/page.tsx`

## Suggested content update workflow

### Add a new project

1. Add a new object to `projects` in `src/lib/data.ts`
2. Set `title`, `description`, `tech`, and `link`
3. If `link` is internal, create the matching route page if needed

### Add a new note

1. Add a new object to `notes` in `src/lib/data.ts`
2. Fill in `title`, `slug`, `date`, `tags`, and `content`
3. Open `/notes/<slug>` to verify rendering

### Update skills, timeline, achievements, or experience

Edit the matching file under `src/lib/`.

## Tech stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- React Markdown
- Remark GFM
- Three.js / React Three Fiber / Drei
- Vercel Analytics

## Project structure

```text
src/
  app/                 App Router routes and layouts
  components/          UI, terminal, timeline, and layout components
  hooks/               Diagnostic hooks
  lib/                 Portfolio content and shared data
public/
  resume.pdf
  your-photo.jpeg
  sounds/
```

## Notes for maintainers

- Most of the portfolio content lives in `src/lib/*`, not in a CMS
- The terminal experience is the main entry point of the project
- Some routes in the codebase are experimental or legacy and are not part of the main home-screen flow
- Keep secrets in `.env.local` only and never hardcode real credentials into documentation
