# Deployment Guide - Todo App

This guide covers deployment options for both Phase 2 (Todo App) and Phase 3 (Todo App + AI Chatbot).

---

## Hugging Face Spaces Deployment

### Prerequisites
- Hugging Face account
- Git installed
- Code pushed to GitHub repository

### Phase 3 Deployment (Recommended for Hugging Face)

Hugging Face Spaces is ideal for Phase 3 as it supports both frontend and backend with AI integration.

#### Step 1: Prepare the Application

**Backend Preparation:**
```bash
cd Phase_3/todo/backend

# Ensure requirements.txt is up to date
cat requirements.txt
# Should include:
# - fastapi==0.104.1
# - uvicorn[standard]==0.24.0
# - groq>=1.0.0
# - bcrypt==4.0.1
# - All other dependencies
```

**Create Dockerfile for Backend:**
```dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8002

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8002"]
```

**Frontend Preparation:**
```bash
cd Phase_3/todo/frontend

# Ensure package.json has correct build scripts
npm run build  # Test build locally
```

#### Step 2: Create Hugging Face Space

1. Go to https://huggingface.co/spaces
2. Click "Create new Space"
3. Choose:
   - **Name:** todo-app-ai-chatbot
   - **License:** MIT
   - **SDK:** Docker (for full-stack app)
   - **Hardware:** CPU Basic (free tier)

#### Step 3: Configure Environment Variables

In Hugging Face Space settings, add:

```env
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require
BETTER_AUTH_SECRET=your-secret-key-min-32-characters-long-change-in-production-please-use-random-generator
BETTER_AUTH_URL=https://your-space-name.hf.space
FRONTEND_URL=https://your-space-name.hf.space
ENVIRONMENT=production
DEBUG=False
GROQ_API_KEY=YOUR_GROQ_API_KEY_HERE
```

#### Step 4: Create Multi-Container Setup

**Create docker-compose.yml:**
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8002:8002"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - BETTER_AUTH_SECRET=${BETTER_AUTH_SECRET}
      - BETTER_AUTH_URL=${BETTER_AUTH_URL}
      - FRONTEND_URL=${FRONTEND_URL}
      - GROQ_API_KEY=${GROQ_API_KEY}
      - ENVIRONMENT=production
      - DEBUG=False
    restart: unless-stopped

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:8002
      - NODE_ENV=production
    depends_on:
      - backend
    restart: unless-stopped
```

#### Step 5: Deploy

```bash
# Clone your Hugging Face Space repository
git clone https://huggingface.co/spaces/YOUR_USERNAME/todo-app-ai-chatbot
cd todo-app-ai-chatbot

# Copy your application files
cp -r Phase_3/todo/* .

# Commit and push
git add .
git commit -m "Deploy Todo App with AI Chatbot"
git push
```

#### Step 6: Verify Deployment

1. Wait for build to complete (check Space logs)
2. Access your app at: https://your-space-name.hf.space
3. Test all features:
   - User signup/signin
   - Task CRUD operations
   - AI chatbot functionality

---

## Vercel Deployment

Vercel is ideal for Next.js frontend deployment. Backend should be deployed separately.

### Phase 3 Frontend Deployment

#### Step 1: Prepare Frontend

```bash
cd Phase_3/todo/frontend

# Update .env.local for production
cat > .env.production << EOF
NEXT_PUBLIC_API_URL=https://your-backend-url.com
NODE_ENV=production
EOF

# Test build
npm run build
npm start  # Test production build locally
```

#### Step 2: Deploy to Vercel

**Option A: Using Vercel CLI**
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd Phase_3/todo/frontend
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? todo-app-frontend
# - Directory? ./
# - Override settings? No
```

**Option B: Using Vercel Dashboard**
1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset:** Next.js
   - **Root Directory:** Phase_3/todo/frontend
   - **Build Command:** npm run build
   - **Output Directory:** .next
   - **Install Command:** npm install

#### Step 3: Configure Environment Variables

In Vercel project settings, add:
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com
NODE_ENV=production
```

#### Step 4: Deploy Backend

**Option A: Vercel Serverless Functions**

Not recommended for this app due to database connections and AI integration complexity.

**Option B: Railway.app (Recommended)**

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
cd Phase_3/todo/backend
railway init

# Add environment variables
railway variables set DATABASE_URL="postgresql://..."
railway variables set BETTER_AUTH_SECRET="..."
railway variables set GROQ_API_KEY="..."
railway variables set FRONTEND_URL="https://your-vercel-app.vercel.app"

# Deploy
railway up
```

**Option C: Render.com**

1. Go to https://render.com
2. Create new "Web Service"
3. Connect GitHub repository
4. Configure:
   - **Name:** todo-app-backend
   - **Environment:** Python 3
   - **Build Command:** pip install -r requirements.txt
   - **Start Command:** uvicorn src.main:app --host 0.0.0.0 --port $PORT
   - **Root Directory:** Phase_3/todo/backend

5. Add environment variables in Render dashboard

#### Step 5: Update CORS Settings

Update backend `src/main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://your-vercel-app.vercel.app",  # Add Vercel URL
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

#### Step 6: Verify Deployment

1. Frontend: https://your-vercel-app.vercel.app
2. Backend: https://your-backend-url.com/docs
3. Test all features end-to-end

---

## Phase 2 Deployment

Phase 2 (without AI chatbot) follows the same process but:
- Remove GROQ_API_KEY from environment variables
- Use Phase_2/todo/ directories instead of Phase_3/todo/
- Backend runs on different port (8003 locally, configure for production)

---

## Database Considerations

### Current Setup (Neon PostgreSQL)

The app currently uses Neon PostgreSQL (already configured):
```
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require
```

**Advantages:**
- Serverless PostgreSQL
- Free tier available
- Automatic scaling
- No maintenance required

**For Production:**
- Consider upgrading to paid tier for better performance
- Enable connection pooling
- Set up automated backups
- Monitor query performance

### Alternative Database Options

**Option 1: Supabase**
- PostgreSQL with built-in auth
- Free tier: 500MB database
- Real-time subscriptions
- Built-in REST API

**Option 2: PlanetScale**
- MySQL-compatible
- Serverless architecture
- Branching for development
- Free tier: 5GB storage

**Option 3: Railway PostgreSQL**
- Integrated with Railway deployment
- Simple setup
- Pay-as-you-go pricing

---

## Security Checklist

Before deploying to production:

- [ ] Change BETTER_AUTH_SECRET to a strong random value
- [ ] Rotate GROQ_API_KEY if exposed
- [ ] Enable HTTPS only (no HTTP)
- [ ] Set DEBUG=False in production
- [ ] Configure proper CORS origins (no wildcards)
- [ ] Enable rate limiting on API endpoints
- [ ] Set up monitoring and logging
- [ ] Configure database connection pooling
- [ ] Enable database SSL connections
- [ ] Set up automated backups
- [ ] Configure environment-specific secrets
- [ ] Review and update dependencies for security patches

---

## Monitoring and Logging

### Recommended Tools

**Application Monitoring:**
- Sentry (error tracking)
- LogRocket (session replay)
- DataDog (full-stack monitoring)

**Database Monitoring:**
- Neon built-in metrics
- pganalyze (PostgreSQL monitoring)

**Uptime Monitoring:**
- UptimeRobot (free tier available)
- Pingdom
- Better Uptime

### Setup Example (Sentry)

```bash
# Install Sentry SDK
pip install sentry-sdk[fastapi]

# Add to backend src/main.py
import sentry_sdk

sentry_sdk.init(
    dsn="your-sentry-dsn",
    environment="production",
    traces_sample_rate=1.0,
)
```

---

## Performance Optimization

### Backend Optimization

1. **Enable Gzip Compression:**
```python
from fastapi.middleware.gzip import GZipMiddleware
app.add_middleware(GZipMiddleware, minimum_size=1000)
```

2. **Add Caching:**
```python
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
```

3. **Database Connection Pooling:**
Already configured in SQLModel, but verify pool size for production.

### Frontend Optimization

1. **Enable Next.js Image Optimization:**
Already using Next.js Image component.

2. **Add Caching Headers:**
Configure in `next.config.js`:
```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

3. **Enable Compression:**
Vercel handles this automatically.

---

## Rollback Strategy

### Vercel Rollback

```bash
# List deployments
vercel ls

# Rollback to previous deployment
vercel rollback [deployment-url]
```

### Railway Rollback

```bash
# List deployments
railway status

# Rollback
railway rollback
```

### Hugging Face Rollback

```bash
# Revert to previous commit
git revert HEAD
git push
```

---

## Cost Estimation

### Free Tier Setup
- **Frontend:** Vercel (Free)
- **Backend:** Railway/Render (Free tier)
- **Database:** Neon (Free tier - 500MB)
- **AI:** Groq (Free tier with limits)
- **Total:** $0/month

### Production Setup
- **Frontend:** Vercel Pro ($20/month)
- **Backend:** Railway ($5-20/month)
- **Database:** Neon Scale ($19/month)
- **AI:** Groq Pay-as-you-go (~$10-50/month)
- **Monitoring:** Sentry ($26/month)
- **Total:** ~$80-135/month

---

## Support and Troubleshooting

### Common Deployment Issues

**Issue: Build fails on Vercel**
- Check Node.js version compatibility
- Verify all dependencies are in package.json
- Check build logs for specific errors

**Issue: Backend can't connect to database**
- Verify DATABASE_URL is correct
- Check SSL mode is enabled
- Verify firewall rules allow connections

**Issue: CORS errors in production**
- Update CORS origins in backend
- Verify FRONTEND_URL environment variable
- Check browser console for specific errors

**Issue: AI chatbot not working**
- Verify GROQ_API_KEY is set
- Check Groq API rate limits
- Review backend logs for API errors

---

## Next Steps After Deployment

1. Set up custom domain (optional)
2. Configure SSL certificate (automatic on Vercel/Railway)
3. Set up CI/CD pipeline
4. Configure automated testing
5. Set up staging environment
6. Enable monitoring and alerts
7. Document API endpoints
8. Create user documentation

---

**Last Updated:** 2026-02-11
**Status:** Ready for deployment
