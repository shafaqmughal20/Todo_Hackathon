# Phase 3 Chatbot Setup Guide

## 🚀 Quick Start Commands (WSL)

### Terminal 1 - Backend:
```bash
cd Phase_3/todo/backend
source venv/bin/activate
uvicorn src.main:app --reload --port 8002
```

### Terminal 2 - Frontend:
```bash
cd Phase_3/todo/frontend
npm run dev
```

---

## 🌐 Access URLs

### Chat Page (Main):
```
http://localhost:3000/chat
```

### Dashboard:
```
http://localhost:3000/dashboard
```

### Sign In:
```
http://localhost:3000/signin
```

### Network Access (Mobile/Other Devices):
```
http://172.31.113.134:3000/chat
```

---

## 🛑 Kill Busy Ports

### Kill Port 8002 (Backend):
```bash
lsof -ti:8002 | xargs kill -9
```

### Kill Port 3000 (Frontend):
```bash
lsof -ti:3000 | xargs kill -9
```

### Kill Port 3001 (If used):
```bash
lsof -ti:3001 | xargs kill -9
```

### Kill All Node Processes:
```bash
pkill -f node
```

### Kill All Uvicorn Processes:
```bash
pkill -f uvicorn
```

---

## 📁 Project Structure

```
Phase_3/
├── todo/
│   ├── backend/          # FastAPI + Groq AI
│   │   ├── src/
│   │   │   ├── api/
│   │   │   │   └── chat.py       # Chat endpoints
│   │   │   ├── services/
│   │   │   │   ├── agent.py      # Groq AI agent
│   │   │   │   └── mcp_server.py # Task tools
│   │   │   └── models/
│   │   │       ├── conversation.py
│   │   │       └── message.py
│   │   └── .env          # GROQ_API_KEY here
│   └── frontend/         # Next.js
│       ├── src/
│       │   ├── app/
│       │   │   └── chat/
│       │   │       └── page.tsx  # Chat UI
│       │   └── services/
│       │       └── chat.ts       # Chat API client
│       └── .env.local    # API URL config
```

---

## ⚙️ Configuration Files

### Backend `.env`:
```env
DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:8002
FRONTEND_URL=http://localhost:3000
GROQ_API_KEY=gsk_...
```

### Frontend `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8002
NODE_ENV=development
```

---

## 🤖 Chatbot Features

### Natural Language Commands:
- "Add a task to buy groceries"
- "Show me my tasks"
- "Mark task 1 as complete"
- "Update task 2 to 'buy milk and bread'"
- "Delete task 3"

### MCP Tools (5 Tools):
1. `add_task()` - Create new task
2. `list_tasks()` - Get all tasks
3. `complete_task()` - Mark task complete
4. `update_task()` - Update task title
5. `delete_task()` - Delete task

### Tech Stack:
- **AI**: Groq API (llama-3.3-70b-versatile)
- **Backend**: FastAPI, SQLModel, PostgreSQL
- **Frontend**: Next.js 16, React 18, TypeScript
- **Auth**: JWT tokens

---

## 🔧 Troubleshooting

### Error: "Not authenticated"
**Solution:** Sign in first at `http://localhost:3000/signin`

### Error: "Address already in use"
**Solution:** Kill the port:
```bash
lsof -ti:8002 | xargs kill -9  # Backend
lsof -ti:3000 | xargs kill -9  # Frontend
```

### Error: "Failed to fetch conversations"
**Solution:** 
1. Check backend is running on port 8002
2. Check `.env.local` has correct API URL
3. Restart frontend after config changes

### Error: "groq_api_key field required"
**Solution:** Add `GROQ_API_KEY` to `Phase_3/todo/backend/.env`

### Frontend on wrong port (3001 instead of 3000)
**Solution:**
```bash
# Kill port 3000
lsof -ti:3000 | xargs kill -9
# Restart frontend
cd Phase_3/todo/frontend && npm run dev
```

---

## 📝 Development Workflow

### 1. Start Development:
```bash
# Terminal 1
cd Phase_3/todo/backend
source venv/bin/activate
uvicorn src.main:app --reload --port 8002

# Terminal 2
cd Phase_3/todo/frontend
npm run dev
```

### 2. Test Chat:
- Open: `http://localhost:3000/chat`
- Sign in if needed
- Try: "Add a task to test the chatbot"

### 3. Stop Development:
- Press `Ctrl + C` in both terminals

---

## 🌐 Network Access Setup

### For Mobile/Other Devices:

1. **Get your IP:**
```bash
hostname -I
```

2. **Update Backend `.env`:**
```env
BETTER_AUTH_URL=http://0.0.0.0:8002
FRONTEND_URL=http://localhost:3000,http://YOUR_IP:3000
```

3. **Update Frontend `.env.local`:**
```env
NEXT_PUBLIC_API_URL=http://YOUR_IP:8002
```

4. **Start with network binding:**
```bash
# Backend
uvicorn src.main:app --reload --host 0.0.0.0 --port 8002

# Frontend
npm run dev -- -H 0.0.0.0
```

5. **Access from any device:**
```
http://YOUR_IP:3000/chat
```

---

## ✅ Quick Checklist

- [ ] Backend running on port 8002
- [ ] Frontend running on port 3000
- [ ] GROQ_API_KEY configured in backend `.env`
- [ ] Database connected (Neon PostgreSQL)
- [ ] Signed in to the app
- [ ] Chat page accessible at `/chat`

---

## 🎯 Key Differences: Phase 2 vs Phase 3

### Phase 2 (Todo App):
- Manual task management via forms
- Dashboard UI only
- No AI features

### Phase 3 (Todo + Chatbot):
- Everything from Phase 2 +
- AI chatbot for natural language task management
- Chat interface at `/chat`
- Conversation history saved to database
- Groq API integration

---

## 📚 Additional Resources

- **Groq API Docs**: https://console.groq.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **FastAPI Docs**: https://fastapi.tiangolo.com

---

**Last Updated:** February 11, 2026
**Version:** Phase 3 - AI Chatbot Integration
