# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 14+ application for "הלכה למעשה" (Halacha Lemaaseh), a Hebrew religious educational website with admin functionality. The project uses TypeScript, Prisma ORM with PostgreSQL, and Tailwind CSS.

## Development Commands

```bash
# Development server
npm run dev

# Production build (includes Prisma generation)
npm run build

# Start production server on port 3001
npm start

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# View database in Prisma Studio
npx prisma studio
```

## Architecture

### Core Stack
- **Framework**: Next.js 14+ with App Router
- **Database**: PostgreSQL via Prisma ORM
- **Styling**: Tailwind CSS
- **Authentication**: Custom cookie-based auth in `/app/api/auth/`
- **File Storage**: Local filesystem (`/public/uploads/`, `/public/Sfarim/`)
- **External Integration**: Google Drive API for course content

### Key Directories
- `/app/` - Next.js App Router pages and API routes
- `/components/` - Reusable React components
- `/data/` - Static Hebrew data organized by categories (brachot, kelim, muktzeh, etc.)
- `/services/` - Business logic and data access layers
- `/prisma/` - Database schema and migrations

### Database Models
- **Rabbi**: Rabbis with topics, categories, and Q&A associations
- **Book**: Books with ordering, pricing, and external links
- **QA**: Questions and answers with status tracking
- **Course**: Online courses linked to Google Drive
- **Distributor**: Physical book distributors by city

### Admin Features
Located at `/admin/*` with managers for:
- Books (CRUD with image upload and reordering)
- Courses (Google Drive sync)
- Q&A (Moderation and assignment to rabbis)
- Distributors (City-based management)
- Weekly content uploads

### API Structure
All APIs follow RESTful patterns at `/app/api/*`:
- Standard CRUD operations for all models
- Special endpoints for Google Drive streaming (`/api/courses/stream/[id]`)
- Image proxy endpoint (`/api/images/[...path]`)
- File upload handling for books and weekly content

### Data Organization
Hebrew content in `/data/` is organized alphabetically by Hebrew letters, with each category (brachot, kelim, muktzeh, etc.) having its own structure.