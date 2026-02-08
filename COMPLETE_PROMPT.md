# Complete Todo App Setup & Deployment Guide

## Task: Setup and Deploy Full-Stack Todo Application

### Phase 1: Project Cleanup
1. Remove package-lock.json from Phase_2/phase-2/backend (it's a Python directory)
2. Create .env.example in Phase_2/phase-2/backend with:
   ```
   DATABASE_URL=postgresql://username:password@localhost/dbname
   SECRET_KEY=your-secret-key-here
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   FRONTEND_URL=http://localhost:3000
   ENVIRONMENT=development
   ```

### Phase 2: Docker Setup
Create Dockerfile in Phase_2/phase-2/backend/ with:
```
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Phase 3: Deployment Setup

#### Frontend Deployment (Vercel):
1. Go to vercel.com and sign in
2. Click "New Project"
3. Import your GitHub repo
4. Set Root Directory to: Phase_2/phase-2/frontend
5. Build Command: npm run build
6. Output Directory: .next (auto-detected)
7. Environment Variables: NEXT_PUBLIC_API_BASE_URL=https://your-backend-url.onrender.com

#### Backend Deployment (Render):
1. Go to render.com and sign in
2. Create "Web Service"
3. Connect GitHub repo
4. Set Root Directory to: Phase_2/phase-2/backend
5. Runtime: Python
6. Build Command: pip install -r requirements.txt
7. Start Command: uvicorn src.main:app --host 0.0.0.0 --port $PORT
8. Environment Variables: Set from .env.example

### Phase 4: API Configuration
Adjust API endpoints in frontend to match deployed backend:
- In Phase_2/phase-2/frontend, update any API calls to use the deployed backend URL
- Modify src/lib/api.ts or similar files to point to your backend
- Update middleware.ts if needed for API routing

### Phase 5: Verification
1. After deployment, test backend API endpoints
2. Update frontend with deployed backend URL
3. Test complete application functionality

### Important Notes:
- Backend must be deployed first
- Adjust API URLs in frontend to match your deployed backend
- Both deployments should work without errors
- Test all authentication and task management features after deployment