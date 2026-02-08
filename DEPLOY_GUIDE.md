# Deployment Guide

## Frontend (Vercel):
- Repo: GitHub
- Root: Phase_2/phase-2/frontend
- Build: npm run build

## Backend (Render):
- Repo: GitHub
- Root: Phase_2/phase-2/backend
- Build: pip install -r requirements.txt
- Start: uvicorn src.main:app --host 0.0.0.0 --port $PORT