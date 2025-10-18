#!/bin/bash

# VDM Development Startup Script
echo "🚀 Starting VDM Development Environment..."

# Check if backend directory exists
if [ ! -d "backend" ]; then
    echo "❌ Backend directory not found!"
    exit 1
fi

# Check if .env file exists in backend
if [ ! -f "backend/.env" ]; then
    echo "⚠️  Backend .env file not found. Creating from example..."
    cat > backend/.env << EOF
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
DATABASE_URL="postgresql://username:password@localhost:5432/vdm_db"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
STRIPE_SECRET_KEY=""
PAYSTACK_SECRET_KEY=""
EOF
    echo "✅ Created backend/.env file. Please update the DATABASE_URL with your actual database connection string."
fi

# Install backend dependencies if needed
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend && npm install && cd ..
fi

# Install frontend dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

echo "🎯 Starting servers..."
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Start backend in background
cd backend && npm run dev &
BACKEND_PID=$!

# Start frontend
npm run dev &
FRONTEND_PID=$!

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Wait for both processes
wait
