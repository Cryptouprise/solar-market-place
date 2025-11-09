# Solar Market Place

A comprehensive, modern solar panel marketplace built with Next.js 14, TypeScript, Prisma, and Tailwind CSS.

## Features

- Product catalog with advanced filtering
- User authentication (Buyer/Seller/Admin roles)
- Shopping cart and checkout
- Order management with tracking
- Review and rating system
- Responsive design

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Prisma ORM + SQLite
- NextAuth.js v5
- Tailwind CSS
- Zod validation

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up environment variables in `.env`:

   ```env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   ```

3. Initialize database:

   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. Run development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Scripts

- `npm run dev` - Development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run format` - Format with Prettier
- `npm run test` - Run tests

Built with ❤️ using Next.js 14
