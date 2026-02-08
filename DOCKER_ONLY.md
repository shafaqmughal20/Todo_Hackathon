Create Dockerfile in Phase_2/phase-2/backend with:
- Base: python:3.11-slim
- Install requirements.txt
- Expose 8002
- Run: uvicorn src.main:app --host 0.0.0.0 --port 8002