# VDM Gadget Store

A full-stack e-commerce platform built with Next.js, TypeScript, Tailwind CSS, Redux, and shadcn/ui components.

## Features

### ✅ Implemented

- **Authentication System**: User login/signup with JWT tokens
- **Product Management**: Browse products with search and filtering
- **Shopping Cart**: Add/remove items, update quantities
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **State Management**: Redux Toolkit for global state
- **Type Safety**: Full TypeScript implementation
- **Form Validation**: Zod schemas for form validation
- **UI Components**: shadcn/ui component library

### 🚧 In Progress

- Checkout process
- Order management
- Admin panel
- Payment integration (Paystack & Stripe)
- Email notifications

## Tech Stack

- **Frontend**: Next.js 14+ with TypeScript
- **State Management**: Redux Toolkit & React-Redux
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Payment**: Paystack & Stripe (planned)
- **Email**: SendGrid (planned)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd vdm
```

2. Install dependencies

```bash
npm install
```

3. Create environment file

```bash
cp .env.local.example .env.local
```

4. Update environment variables in `.env.local`

5. Run the development server

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
vdm/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   └── products/      # Product endpoints
│   ├── auth/              # Auth pages
│   ├── cart/              # Cart page
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Layout components
│   ├── products/         # Product components
│   └── providers/        # Context providers
├── lib/                  # Utility functions
├── store/                # Redux store
│   └── slices/           # Redux slices
├── types/                # TypeScript types
└── public/               # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Features Overview

### Authentication

- User registration and login
- JWT token-based authentication
- Protected routes
- Password validation

### Product Catalog

- Product listing with pagination
- Search functionality
- Category filtering
- Product details page
- Responsive product grid

### Shopping Cart

- Add/remove products
- Update quantities
- Persistent cart state
- Cart total calculation

### UI/UX

- Modern, responsive design
- Dark/light theme support
- Loading states
- Error handling
- Form validation

## API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `GET /api/auth/verify` - Verify JWT token

### Products

- `GET /api/products` - Get all products
- `GET /api/products/[id]` - Get product by ID

## Environment Variables

Create a `.env.local` file with the following variables:

```env
JWT_SECRET=your-super-secret-jwt-key-here
NEXT_PUBLIC_PAYSTACK_KEY=your_paystack_public_key
PAYSTACK_SECRET_KEY=your_paystack_secret_key
NEXT_PUBLIC_STRIPE_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@vdmstore.com
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@vdmstore.com or create an issue in the repository.
