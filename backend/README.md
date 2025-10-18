# VDM Backend

A TypeScript Node.js backend for the VDM ecommerce platform.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp .env.example .env
# Edit .env with your database and API keys
```

3. Set up PostgreSQL database:

```bash
# Create database
createdb vdm_backend

# Run migrations
npm run prisma:migrate

# Seed database
npm run seed
```

4. Start development server:

```bash
npm run dev
```

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `STRIPE_SECRET_KEY`: Stripe API secret key
- `PAYSTACK_SECRET_KEY`: Paystack API secret key
- `FRONTEND_URL`: Frontend URL for CORS

## API Endpoints

### Auth

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user (requires auth)

### Products

- `GET /api/products` - List products (with search and category filters)
- `GET /api/products/:id` - Get product details

### Orders

- `POST /api/orders` - Create order (requires auth)
- `GET /api/orders` - List user orders (requires auth)
- `GET /api/orders/:id` - Get order details (requires auth)

### Events

- `POST /api/events` - Track events for analytics

## Database Schema

The database uses Prisma with PostgreSQL and includes models for:

- Users (with authentication)
- Products (with categories, variants, inventory)
- Orders (with payment integration)
- Reviews and Wishlists
- Events (for analytics)

## Payment Integration

- **Stripe**: For international payments
- **Paystack**: For Nigerian payments

Both payment providers are integrated with webhook support for payment confirmation.
