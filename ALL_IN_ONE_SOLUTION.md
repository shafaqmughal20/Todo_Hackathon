# Complete Todo App Setup for Local & Deployment

## All-in-One Solution

### 1. Create Dockerfile in Phase_2/phase-2/backend/
```
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8002

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8002"]
```

### 2. Remove incorrect package-lock.json from backend
Delete package-lock.json from Phase_2/phase-2/backend/ (this is a Node.js file in a Python directory)

### 3. Create .env.example in Phase_2/phase-2/backend/
```
DATABASE_URL=postgresql://localhost:5432/todoapp
SECRET_KEY=generate_a_secure_random_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7
FRONTEND_URL=http://localhost:3000
ENVIRONMENT=development
```

### 4. Update frontend API calls in Phase_2/phase-2/frontend
Make sure all API calls in frontend point to your backend URL (http://localhost:8002 during local development)

### 5. For local development:
- Backend: cd Phase_2/phase-2/backend && uvicorn src.main:app --port 8002
- Frontend: cd Phase_2/phase-2/frontend && npm run dev

### 6. For deployment:
- Backend will run on port 8002
- Frontend will connect to the deployed backend URL
- All CORS and environment configurations will be properly set