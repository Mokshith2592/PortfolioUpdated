# 💻 MokshithOS v1.0.0

A highly interactive, terminal-driven developer portfolio that simulates a UNIX-like operating system.

Instead of a traditional portfolio website, MokshithOS presents projects, engineering case studies, algorithmic notes, and technical documentation through a custom virtual file system powered by terminal commands.

Built to showcase systems engineering, software architecture, machine learning projects, and competitive programming knowledge in a way that feels authentic to developers.

![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge\&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge\&logo=typescript\&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge\&logo=tailwind-css\&logoColor=white)
![React Markdown](https://img.shields.io/badge/React_Markdown-20232A?style=for-the-badge\&logo=react\&logoColor=61DAFB)

---

## 🚀 Overview

MokshithOS is not a static portfolio template.

It is a fully interactive operating-system-inspired experience built using modern React and Next.js architecture. Visitors can navigate through projects and notes using familiar terminal commands such as:

```bash
ls
cd
cat
help
clear
```

The application behaves like a lightweight virtual file system, allowing users to explore content through a command-line interface rather than conventional navigation menus.

---

## ✨ Key Features

### 🖥️ Interactive Terminal Engine

A custom-built terminal experience that supports:

* Directory navigation
* File discovery
* Content previews
* Dynamic routing
* Command parsing

Supported commands:

```bash
help
whoami
ls
cd
cat
clear
sudo rm -rf /
```

---

### 📂 Virtual File System

Projects and notes are exposed through a simulated file structure.

Example:

```bash
projects/
├── redis-server
├── digit-recognition
└── earthquake-analysis

notes/
├── binary-search.md
├── trie-notes.md
└── resp-protocol.md
```

The terminal validates paths and dynamically routes users to the correct pages.

---

### ⚡ Dynamic Project Pages

Projects are generated automatically from centralized data.

Example routes:

```text
/projects/redis-server
/projects/digit-recognition
/projects/earthquake-analysis
```

No hardcoded page creation required.

---

### 📝 Markdown-Powered Knowledge Base

Technical notes are stored as GitHub-Flavored Markdown and rendered using:

* react-markdown
* remark-gfm

Supports:

* Headings
* Tables
* Checklists
* Code blocks
* Syntax highlighting
* Multi-line documentation

Example:

```markdown
# Understanding RESP Protocol

RESP is the protocol used by Redis for communication between
clients and servers.
```

---

### 🔄 Centralized Data Layer

All content is managed from a single source of truth.

```text
src/lib/data.ts
```

Contains:

* Projects
* Technical notes
* Metadata
* File system structure

Adding content requires editing only one file.

---

## 🏗️ System Architecture

### Live Terminal Flow

```text
User Input
      │
      ▼
Command Parser
      │
      ▼
Path Validator
      │
      ▼
Data Layer
      │
      ▼
Router / Content Renderer
      │
      ▼
Terminal Output
```

---

### Project Architecture

```text
src/
├── app/
│   ├── globals.css
│   ├── page.tsx
│   │
│   ├── projects/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   │
│   └── notes/
│       ├── page.tsx
│       └── [slug]/page.tsx
│
├── components/
│   ├── terminal/
│   │   └── LiveTerminal.tsx
│   │
│   └── ui/
│       └── HomeButton.tsx
│
└── lib/
    └── data.ts
```

---

## ⚙️ Core Components

### 📟 LiveTerminal.tsx

The heart of MokshithOS.

Responsibilities:

* Command parsing
* Virtual navigation
* File resolution
* Route generation
* Output rendering

Supported command types:

```bash
ls
cd
cat
whoami
help
clear
```

---

### 📦 data.ts

Acts as the database for the entire application.

Stores:

* Project definitions
* Technical notes
* Metadata
* Virtual file system entries

The terminal engine and dynamic routes both consume data from this file.

---

### 📄 Dynamic Routes

Uses Next.js App Router dynamic segments:

```text
/projects/[slug]
/notes/[slug]
```

Allows unlimited scalability without creating individual page files.

---

## ⌨️ Available Commands

### help

Lists all available commands.

```bash
help
```

---

### whoami

Displays profile information.

```bash
whoami
```

---

### ls

Lists contents of a directory.

```bash
ls

ls projects

ls notes
```

---

### cd

Navigate to a directory or project.

```bash
cd projects/redis-server

cd notes
```

---

### cat

Preview file content directly inside the terminal.

```bash
cat notes/binary-search.md
```

---

### clear

Clear terminal history.

```bash
clear
```

---

### sudo rm -rf /

```bash
sudo rm -rf /
```

Response:

```text
Unauthorized access blocked.
```

---

## 🛠️ Local Development

### Prerequisites

* Node.js 18+
* npm
* Git

---

### Clone Repository

```bash
git clone https://github.com/Mokshith2592/PortfolioUpdated.git
```

---

### Enter Project

```bash
cd PortfolioUpdated
```

---

### Install Dependencies

```bash
npm install
```

---

### Run Development Server

```bash
npm run dev
```

---

### Launch MokshithOS

Open:

```text
http://localhost:3000
```

---

## 📝 Adding New Content

The platform is designed to scale effortlessly.

No new page files are required.

### Step 1

Open:

```text
src/lib/data.ts
```

---

### Step 2

Locate:

```typescript
projects = [...]
```

or

```typescript
notes = [...]
```

---

### Step 3

Add a new object following the existing schema.

Example:

```typescript
{
  slug: "redis-server",
  title: "Redis-Compatible Server",
  summary: "Built a Redis clone from scratch in C++."
}
```

---

### Step 4

Save the file.

The system automatically:

* Generates routes
* Updates terminal navigation
* Updates file listings
* Enables dynamic rendering

No additional configuration required.

---

## 🎯 Design Philosophy

Most portfolios are resumes with animations.

MokshithOS takes a different approach.

The goal is to create a developer experience that reflects:

* Curiosity
* Systems thinking
* Engineering craftsmanship
* Technical depth

Instead of scrolling through sections, visitors interact with a virtual operating system and discover content through exploration.

---

## 🔮 Future Roadmap

Planned features:

* Interactive Redis architecture visualizations
* Command history persistence
* Terminal themes
* Search functionality
* Build logs timeline
* Competitive programming dashboard
* Technical note tagging system
* Live GitHub activity integration
* Engineering journal mode

---

## 👨‍💻 Author

**Mokshith Gattu**

Computer Science Student — NIT Warangal

Interests:

* Systems Programming
* Distributed Systems
* Machine Learning
* Competitive Programming

Currently Building:

```text
Redis-Compatible Server
```

---

*"Build. Learn. Iterate."*
