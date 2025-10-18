# VDM Setup Guide

## Quick Start

### Option 1: Use the startup script (Recommended)

```bash
./start-dev.sh
```

### Option 2: Manual setup

1. **Backend Setup:**

   ```bash
   cd backend
   npm install

   # Create .env file (copy from .env.example if it exists)
   # Set up your database connection string
   npm run dev
   ```

2. **Frontend Setup:**
   ```bash
   npm install
   npm run dev
   ```

## Environment Configuration

### Backend (.env)

Create a `.env` file in the `backend/` directory with:

```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
DATABASE_URL="your-database-connection-string"
JWT_SECRET="your-jwt-secret"
```

### Frontend

The frontend will automatically connect to `http://localhost:5000/api` for the backend.

## Architecture

- **Frontend**: Next.js with RTK Query for data fetching
- **Backend**: Express.js with Prisma ORM
- **Database**: PostgreSQL (configurable)

## How it works

1. **RTK Query** handles all API calls from the frontend
2. **Backend unavailable**: Automatically falls back to dummy data
3. **Backend available**: Uses real data from your database
4. **Components**: Use custom hooks (`useProducts`, `useProduct`) that wrap RTK Query

## Development Mode

- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- API: http://localhost:5000/api

## Notes

- The system is designed to work with or without the backend running
- When backend is unavailable, dummy data is served automatically
- All components use RTK Query hooks for consistent data fetching
- Authentication and other features will work when backend is properly configured
