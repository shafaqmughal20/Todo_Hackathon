# Complete Todo App - Startup Guide

## Overview

This repository contains two implementations:
- **Phase 2**: Todo App (Basic CRUD operations, no AI chatbot)
- **Phase 3**: Todo App + AI Chatbot (All Phase 2 features + Groq LLM integration)

Both phases are fully functional and can run independently.

---

## Phase 2: Todo App (Without AI Chatbot)

### Backend Setup (Phase 2)

**Location:** `Phase_2/todo/backend/`

**Port:** `localhost:8003`

**Commands:**
```bash
# Navigate to Phase 2 backend
cd /mnt/c/Users/DELL/OneDrive/Documents/GitHub/Todo_Hackathon/Phase_2/todo/backend

# Activate virtual environment (if needed, recreate with: python3 -m venv venv)
source venv/bin/activate

# Install dependencies (already installed)
# pip install -r requirements.txt

# Start backend server
./venv/bin/uvicorn src.main:app --host 127.0.0.1 --port 8003 --reload
```

**Environment Variables (.env):**
```env
DATABASE_URL=postgresql://neondb_owner:npg_5h7zkogQRNsD@ep-broad-dream-aijdftpv-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require
BETTER_AUTH_SECRET=your-secret-key-min-32-characters-long-change-in-production-please-use-random-generator
BETTER_AUTH_URL=http://localhost:8003
FRONTEND_URL=http://localhost:3001,http://172.31.113.134:3001
ENVIRONMENT=development
DEBUG=True
```

**Note:** Phase 2 does NOT include:
- GROQ_API_KEY (removed)
- Chat router (removed from main.py)
- AI chatbot functionality

### Frontend Setup (Phase 2)

**Location:** `Phase_2/todo/frontend/`

**Port:** `localhost:3001`

**Commands:**
```bash
# Navigate to Phase 2 frontend
cd /mnt/c/Users/DELL/OneDrive/Documents/GitHub/Todo_Hackathon/Phase_2/todo/frontend

# Install dependencies (already installed)
# npm install

# Start frontend server
npm run dev
```

**Environment Variables (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:8003
NODE_ENV=development
```

### Access Phase 2

- **Frontend:** http://localhost:3001
- **Backend API:** http://localhost:8003
- **API Docs:** http://localhost:8003/docs

### Phase 2 Features

1. User authentication (signup/signin)
2. Create tasks
3. Read/list tasks
4. Update tasks
5. Delete tasks
6. Mark tasks as complete/incomplete

---

## Phase 3: Todo App + AI Chatbot

### Backend Setup (Phase 3)

**Location:** `Phase_3/todo/backend/`

**Port:** `localhost:8002`

**Commands:**
```bash
# Navigate to Phase 3 backend
cd /mnt/c/Users/DELL/OneDrive/Documents/GitHub/Todo_Hackathon/Phase_3/todo/backend

# Activate virtual environment
source venv/bin/activate

# Install dependencies (already installed)
# pip install -r requirements.txt

# Start backend server
./venv/bin/uvicorn src.main:app --host 127.0.0.1 --port 8002 --reload
```

**Environment Variables (.env):**
```env
DATABASE_URL=postgresql://neondb_owner:npg_5h7zkogQRNsD@ep-broad-dream-aijdftpv-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require
BETTER_AUTH_SECRET=your-secret-key-min-32-characters-long-change-in-production-please-use-random-generator
BETTER_AUTH_URL=http://localhost:8002
FRONTEND_URL=http://localhost:3000,http://172.31.113.134:3000
ENVIRONMENT=development
DEBUG=True
GROQ_API_KEY=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
```

**Note:** Phase 3 includes:
- GROQ_API_KEY for AI chatbot
- Chat router in main.py
- Groq SDK (version 1.0.0+)
- bcrypt 4.0.1 (fixed version)

### Frontend Setup (Phase 3)

**Location:** `Phase_3/todo/frontend/`

**Port:** `localhost:3000`

**Commands:**
```bash
# Navigate to Phase 3 frontend
cd /mnt/c/Users/DELL/OneDrive/Documents/GitHub/Todo_Hackathon/Phase_3/todo/frontend

# Install dependencies (already installed)
# npm install

# Start frontend server
npm run dev
```

**Environment Variables (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:8002
NODE_ENV=development
```

### Access Phase 3

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8002
- **API Docs:** http://localhost:8002/docs
- **AI Chat:** http://localhost:3000/chat

### Phase 3 Features

All Phase 2 features PLUS:
1. AI chatbot integration (Groq LLM)
2. Natural language task management
3. Conversation persistence
4. Chat interface at `/chat` route

**AI Chat Examples:**
- "Add a task to buy groceries"
- "Show me all my tasks"
- "Mark task 15 as complete"
- "Update task 16 to 'Prepare presentation for Monday'"
- "Delete task 15"

---

## Quick Start Commands

### Start Phase 3 (Full Stack with AI Chatbot)

**Terminal 1 - Backend:**
```bash
cd /mnt/c/Users/DELL/OneDrive/Documents/GitHub/Todo_Hackathon/Phase_3/todo/backend
./venv/bin/uvicorn src.main:app --host 127.0.0.1 --port 8002 --reload
```

**Terminal 2 - Frontend:**
```bash
cd /mnt/c/Users/DELL/OneDrive/Documents/GitHub/Todo_Hackathon/Phase_3/todo/frontend
npm run dev
```

**Access:** http://localhost:3000

### Start Phase 2 (Basic Todo App)

**Terminal 1 - Backend:**
```bash
cd /mnt/c/Users/DELL/OneDrive/Documents/GitHub/Todo_Hackathon/Phase_2/todo/backend
./venv/bin/uvicorn src.main:app --host 127.0.0.1 --port 8003 --reload
```

**Terminal 2 - Frontend:**
```bash
cd /mnt/c/Users/DELL/OneDrive/Documents/GitHub/Todo_Hackathon/Phase_2/todo/frontend
npm run dev
```

**Access:** http://localhost:3001

---

## Switching Between Phases

### Kill Running Servers

**Kill Backend:**
```bash
# Find and kill uvicorn processes
pkill -f "uvicorn src.main:app"

# Or kill specific port
lsof -ti:8002 | xargs kill -9  # Phase 3
lsof -ti:8003 | xargs kill -9  # Phase 2
```

**Kill Frontend:**
```bash
# Find and kill Next.js processes
pkill -f "next dev"

# Or kill specific port
lsof -ti:3000 | xargs kill -9  # Phase 3
lsof -ti:3001 | xargs kill -9  # Phase 2
```

**Verify all processes are killed:**
```bash
ps aux | grep -E "(next dev|uvicorn)" | grep -v grep
```

---

## Network Access Configuration

### For Localhost Only

**Backend .env:**
```env
BETTER_AUTH_URL=http://localhost:8002  # or 8003 for Phase 2
FRONTEND_URL=http://localhost:3000     # or 3001 for Phase 2
```

**Frontend .env.local:**
```env
NEXT_PUBLIC_API_URL=http://localhost:8002  # or 8003 for Phase 2
```

**Start backend:**
```bash
uvicorn src.main:app --host 127.0.0.1 --port 8002 --reload
```

### For Network Access (Other Devices)

**Backend .env:**
```env
BETTER_AUTH_URL=http://172.31.113.134:8002
FRONTEND_URL=http://localhost:3000,http://172.31.113.134:3000
```

**Frontend .env.local:**
```env
NEXT_PUBLIC_API_URL=http://172.31.113.134:8002
```

**Start backend with network binding:**
```bash
uvicorn src.main:app --host 0.0.0.0 --port 8002 --reload
```

---

## Current Running Status

### Phase 3 (Currently Running)
- ✅ Backend: http://localhost:8002 (Running)
- ✅ Frontend: http://localhost:3000 (Running)
- ✅ Database: Connected to Neon PostgreSQL
- ✅ AI Chatbot: Groq LLM integrated

### Phase 2 (Currently Running)
- ✅ Backend: http://localhost:8003 (Running)
- ✅ Frontend: Ready (dependencies installed)
- ✅ Database: Connected to Neon PostgreSQL
- ❌ AI Chatbot: Not included (by design)

---

## Troubleshooting

### Port Already in Use

If you get "Address already in use" error:
```bash
# Check what's using the port
lsof -i :8002  # or :8003, :3000, :3001

# Kill the process
kill -9 <PID>
```

### Database Connection Issues

Verify DATABASE_URL in .env file is correct and accessible.

### Frontend Can't Connect to Backend

1. Check backend is running: `curl http://localhost:8002/`
2. Verify NEXT_PUBLIC_API_URL in frontend .env.local
3. Check CORS settings in backend allow frontend URL

### AI Chatbot Not Working (Phase 3)

1. Verify GROQ_API_KEY is set in backend .env
2. Check Groq SDK is installed: `pip list | grep groq`
3. Verify chat router is registered in src/main.py

---

## Dependencies

### Phase 2 Backend
- FastAPI 0.104.1
- Uvicorn 0.24.0
- SQLModel 0.0.14
- PostgreSQL (psycopg2-binary 2.9.9)
- Python-Jose 3.3.0
- Passlib 1.7.4
- bcrypt 5.0.0

### Phase 3 Backend
All Phase 2 dependencies PLUS:
- Groq SDK 1.0.0+
- bcrypt 4.0.1 (fixed version)

### Frontend (Both Phases)
- Next.js 16.1.6
- React 19
- TypeScript
- Tailwind CSS

---

## Git Line Ending Configuration

To fix LF/CRLF line ending issues:

```bash
# Configure Git to handle line endings
git config --global core.autocrlf input

# Refresh the repository
git rm --cached -r .
git reset --hard
```

---

## Deployment

### Hugging Face Deployment

1. Ensure all code is error-free
2. Update README.md with deployment instructions
3. Configure environment variables in Hugging Face Spaces
4. Deploy backend and frontend separately or as monorepo

### Vercel Deployment

**Frontend Deployment:**
1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables:
   - NEXT_PUBLIC_API_URL
   - NODE_ENV
4. Deploy

**Backend Deployment:**
1. Use Vercel Serverless Functions or separate hosting
2. Configure environment variables
3. Update CORS settings for Vercel frontend URL

---

## Testing Checklist

### Phase 2 Testing
- [ ] Backend health check: `curl http://localhost:8003/`
- [ ] Frontend loads: http://localhost:3001
- [ ] User signup works
- [ ] User signin works
- [ ] Create task works
- [ ] List tasks works
- [ ] Update task works
- [ ] Delete task works
- [ ] Mark task complete/incomplete works

### Phase 3 Testing
- [ ] Backend health check: `curl http://localhost:8002/`
- [ ] Frontend loads: http://localhost:3000
- [ ] User signup works
- [ ] User signin works
- [ ] All Phase 2 features work
- [ ] Chat interface loads: http://localhost:3000/chat
- [ ] AI chatbot responds to messages
- [ ] Natural language task creation works
- [ ] Natural language task operations work
- [ ] Conversation persistence works

---

## Support

For issues or questions:
1. Check this guide first
2. Review error logs in terminal
3. Verify environment variables
4. Check database connectivity
5. Ensure all dependencies are installed

---

**Last Updated:** 2026-02-11
**Status:** Both Phase 2 and Phase 3 are fully functional and tested
