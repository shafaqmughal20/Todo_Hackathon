Fix Todo app for Hugging Face deployment:

1. Create Dockerfile in Phase_2/phase-2/backend with:
   - Base: python:3.11-slim
   - Install requirements.txt
   - Expose 8002
   - Run: uvicorn src.main:app --host 0.0.0.0 --port 8002

2. Important considerations:
   - Port Configuration: Ensure backend listens on port 8002
   - Environment Variables: Set all required variables for both frontend and backend
   - API Endpoints: Frontend points to correct backend URL and port
   - Firewall: Port 8002 not blocked
   - Database Connection: Correct database URL in backend
   - CORS Settings: Backend allows requests from frontend origin
   - Remove package-lock.json from backend (Python project)