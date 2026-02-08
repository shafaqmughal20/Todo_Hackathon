# Deployment Tasks

## Deploy to:
1. Vercel - Frontend (Next.js in Phase_2/phase-2/frontend)
2. Render - Backend (FastAPI in Phase_2/phase-2/backend)

## Vercel:
- Connect GitHub repo
- Set root: Phase_2/phase-2/frontend
- Build: npm run build

## Render:
- Connect GitHub repo  
- Set root: Phase_2/phase-2/backend
- Build: pip install -r requirements.txt
- Start: uvicorn src.main:app --host 0.0.0.0 --port $PORT