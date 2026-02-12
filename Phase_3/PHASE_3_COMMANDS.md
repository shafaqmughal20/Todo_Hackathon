# Phase 3 Todo AI Chatbot - Complete Command Guide

## ✅ Verification Status

**All Phase 3 features are working correctly:**
- ✅ Backend running on localhost:8002
- ✅ Frontend running on localhost:3000
- ✅ AI Chatbot integration working (Groq LLM)
- ✅ All 5 task operations via chat (add, list, complete, update, delete)
- ✅ Conversation persistence working
- ✅ Authentication working (signup/signin)
- ✅ Phase 2 features still working (dashboard, manual task management)

---

## 🚀 Phase 3 Commands (Todo App WITH AI Chatbot)

### Prerequisites
```bash
# Ensure you're in the correct directory
cd /mnt/c/Users/DELL/OneDrive/Documents/GitHub/Todo_Hackathon/Phase_2/phase-2
```

### Backend Setup (Phase 3)

1. **Navigate to backend directory:**
```bash
cd /mnt/c/Users/DELL/OneDrive/Documents/GitHub/Todo_Hackathon/Phase_2/phase-2/backend
```

2. **Activate virtual environment:**
```bash
source venv/bin/activate
```

3. **Verify environment variables (.env file should contain):**
```bash
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require
BETTER_AUTH_SECRET=your-secret-key-min-32-characters-long-change-in-production-please-use-random-generator
BETTER_AUTH_URL=http://localhost:8002
FRONTEND_URL=http://localhost:3000,http://172.31.113.134:3000
ENVIRONMENT=development
DEBUG=True
GROQ_API_KEY=YOUR_GROQ_API_KEY_HERE
```

4. **Start backend server (localhost only):**
```bash
uvicorn src.main:app --reload --port 8002
```

5. **Start backend server (network access - accessible from other devices):**
```bash
uvicorn src.main:app --reload --port 8002 --host 0.0.0.0
```

### Frontend Setup (Phase 3)

1. **Open a NEW terminal and navigate to frontend directory:**
```bash
cd /mnt/c/Users/DELL/OneDrive/Documents/GitHub/Todo_Hackathon/Phase_2/phase-2/frontend
```

2. **Verify environment variables (.env.local file should contain):**

   **For localhost access:**
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:8002
   NODE_ENV=development
   ```

   **For network access (from other devices):**
   ```bash
   NEXT_PUBLIC_API_URL=http://172.31.113.134:8002
   NODE_ENV=development
   ```

3. **Start frontend server:**
```bash
npm run dev
```

### Access Phase 3 Application

- **Localhost:** http://localhost:3000
- **Network Access:** http://172.31.113.134:3000

### Phase 3 Features to Test

1. **Sign Up:** Create a new account at http://localhost:3000/signup
2. **Sign In:** Login at http://localhost:3000/signin
3. **Dashboard:** View and manage tasks manually at http://localhost:3000/dashboard
4. **AI Chat:** Use natural language at http://localhost:3000/chat

**AI Chat Examples:**
- "Add a task to buy groceries"
- "Show me all my tasks"
- "Mark task 15 as complete"
- "Update task 16 to 'Prepare presentation for Monday'"
- "Delete task 15"

---

## 🔄 Phase 2 Commands (Todo App WITHOUT AI Chatbot)

Phase 2 uses the same codebase but you can disable the chat feature by simply not navigating to `/chat`.

### Backend Setup (Phase 2)

**Same as Phase 3 backend commands above.** The backend supports both Phase 2 and Phase 3 features.

### Frontend Setup (Phase 2)

**Same as Phase 3 frontend commands above.** Simply don't use the `/chat` route.

### Access Phase 2 Application

- **Localhost:** http://localhost:3000
- **Network Access:** http://172.31.113.134:3000

### Phase 2 Features (Manual Task Management)

1. **Sign Up:** http://localhost:3000/signup
2. **Sign In:** http://localhost:3000/signin
3. **Dashboard:** http://localhost:3000/dashboard (manual task CRUD operations)

---

## 🛑 How to Kill Phase 3 and Start Phase 2

### Kill Running Servers

1. **Kill Backend:**
   - Find the terminal running `uvicorn`
   - Press `Ctrl+C`
   - Or use: `pkill -f "uvicorn src.main:app"`

2. **Kill Frontend:**
   - Find the terminal running `npm run dev`
   - Press `Ctrl+C`
   - Or use: `pkill -f "next dev"`

3. **Verify all processes are killed:**
```bash
ps aux | grep -E "(next dev|uvicorn)" | grep -v grep
```

### Start Phase 2 (Clean Start)

Since Phase 2 and Phase 3 use the same codebase, you just start the servers normally:

**Terminal 1 - Backend:**
```bash
cd /mnt/c/Users/DELL/OneDrive/Documents/GitHub/Todo_Hackathon/Phase_2/phase-2/backend
source venv/bin/activate
uvicorn src.main:app --reload --port 8002
```

**Terminal 2 - Frontend:**
```bash
cd /mnt/c/Users/DELL/OneDrive/Documents/GitHub/Todo_Hackathon/Phase_2/phase-2/frontend
npm run dev
```

**Access:** http://localhost:3000/dashboard (use dashboard only, avoid /chat)

---

## 🌐 Network Access Configuration

### For Localhost Only

**Backend .env:**
```bash
BETTER_AUTH_URL=http://localhost:8002
FRONTEND_URL=http://localhost:3000
```

**Frontend .env.local:**
```bash
NEXT_PUBLIC_API_URL=http://localhost:8002
```

**Start backend:**
```bash
uvicorn src.main:app --reload --port 8002
```

### For Network Access (Other Devices)

**Backend .env:**
```bash
BETTER_AUTH_URL=http://172.31.113.134:8002
FRONTEND_URL=http://localhost:3000,http://172.31.113.134:3000
```

**Frontend .env.local:**
```bash
NEXT_PUBLIC_API_URL=http://172.31.113.134:8002
```

**Start backend with network binding:**
```bash
uvicorn src.main:app --reload --port 8002 --host 0.0.0.0
```

---

## 🐛 Bugs Fixed in This Session

1. **Bcrypt Version Incompatibility**
   - Error: `AttributeError: module 'bcrypt' has no attribute '__about__'`
   - Fix: Downgraded bcrypt from 5.0.0 to 4.0.1
   - Command: `pip install bcrypt==4.0.1`

2. **Missing GROQ_API_KEY Configuration**
   - Error: `ValidationError: Extra inputs are not permitted`
   - Fix: Added `groq_api_key: str` field to Settings class in `src/config.py`

3. **Chat Router Not Registered**
   - Error: 404 Not Found on /api/chat
   - Fix: Added chat router import and registration in `src/main.py`

4. **Groq SDK Compatibility**
   - Error: `Client.__init__() got an unexpected keyword argument 'proxies'`
   - Fix: Upgraded Groq SDK from 0.4.0 to 1.0.0
   - Command: `pip install --upgrade groq`

5. **AI Chat List Tasks Bug**
   - Error: `'NoneType' object does not support item assignment`
   - Fix: Updated `src/services/agent.py` to use `"content": ""` instead of `"content": None`

---

## 📊 Verification Results

### Backend Logs Show:
- ✅ Database tables created (users, tasks, conversations, messages)
- ✅ User signup/signin working
- ✅ Task operations working (add, list, complete, update, delete)
- ✅ Chat endpoint working
- ✅ Groq LLM integration working
- ✅ Conversation persistence working

### Tested Operations:
- ✅ "Add a task to buy groceries and milk" → Task ID 15 created
- ✅ "Show me all my tasks" → Returns task list
- ✅ "Mark task 15 as complete" → Task marked complete
- ✅ "Add a task to prepare presentation for tomorrow" → Task ID 16 created

---

## 🎯 Quick Start (Phase 3)

**Terminal 1:**
```bash
cd /mnt/c/Users/DELL/OneDrive/Documents/GitHub/Todo_Hackathon/Phase_2/phase-2/backend
source venv/bin/activate
uvicorn src.main:app --reload --port 8002
```

**Terminal 2:**
```bash
cd /mnt/c/Users/DELL/OneDrive/Documents/GitHub/Todo_Hackathon/Phase_2/phase-2/frontend
npm run dev
```

**Browser:**
- Open http://localhost:3000
- Sign up / Sign in
- Go to http://localhost:3000/chat
- Start chatting with the AI!

---

## 📝 Notes

- Phase 2 and Phase 3 share the same codebase
- Phase 3 adds AI chat functionality on top of Phase 2
- All Phase 2 features remain fully functional in Phase 3
- The chat feature is accessible at `/chat` route
- Backend supports both manual API calls and AI chat simultaneously
