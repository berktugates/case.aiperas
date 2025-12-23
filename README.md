# Resumable Streaming Chat App  
**Next.js 15 + NestJS (SSE based)**

## Project Overview

This project is a real-time AI chat application built with **Server-Sent Events (SSE)**.
Its core feature is the ability to **resume streaming responses** even after page refreshes or connection drops.

The frontend is built with **Next.js 15**, while the backend uses **NestJS**.
Responses are streamed **word by word** from the server to the client.



## Tech Stack

### Frontend
- Next.js 15
- React
- TypeScript
- Tailwind CSS
- Zustand (persist middleware)

### Backend
- NestJS
- Node.js
- Server-Sent Events (SSE)

### Tooling
- ESLint
- PostCSS
- NPM


## Requirements

- Node.js **v18.18.0 or higher**
- NPM **v9+**

Check Node version:
```bash
node -v
```


## Local Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/berktugates/case.aiperas.git
cd case.aiperas
```

---

### 2️⃣ Backend Setup (NestJS)

```bash
cd backend
npm install
npm run dev:full
```

Backend runs on:
```
http://localhost:3002
```

Chat endpoint:
```
POST /chat
```

---

### 3️⃣ Frontend Setup (Next.js)

```bash
cd ..
npm install
npm run dev:full
```

Frontend runs on:
```
http://localhost:3000
```

## Project Structure

```txt
case.aiperas/
│
├─ backend/          # NestJS backend (SSE & resume logic)
├─ src/              # Next.js frontend source
├─ public/           # Static assets
│
├─ package.json
├─ next.config.ts
├─ tailwind.config.cjs
├─ postcss.config.cjs
├─ eslint.config.mjs
└─ README.md
```

---

## How It Works

1. User sends a message from the frontend.
2. Frontend sends request to:
   ```
   POST http://localhost:3002/chat
   ```
3. Backend streams response word-by-word via SSE.
4. Frontend renders the stream in real time.
5. Each chunk updates `lastIndex` in localStorage.
6. On refresh, chat resumes from last index.


## Resume Logic

- Backend sends each word as a stream chunk
- Frontend stores:
  - streamed content
  - last received index
- On reconnect:
  - frontend sends lastIndex
  - backend continues streaming from that index

Result:
- No data loss  
- Seamless user experience  
