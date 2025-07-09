# FundedXam Capital - Financial Investment Platform

## Overview

FundedXam Capital is a financial investment platform offering a 9% fixed annual return with capital protection through bank contracts. The application is built as a modern frontend-only web application targeting conservative investors and financial advisors, emphasizing trust, legal structure, and capital protection.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Library**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom design system
- **Typography**: Playfair Display for headings, Inter for body text
- **Color Scheme**: Navy blue (#001F3F), warm white backgrounds, gold accents (#DAA520)
- **State Management**: TanStack Query for server state, React hooks for local state
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Removed**: All backend functionality removed for frontend-only deployment
- **Static Server**: Simple Express.js server for static file serving in development
- **API Simulation**: Form submissions and calculations handled client-side with local downloads

### Key Components

#### Client-Side Features
- **Calculator**: Interactive investment simulation with downloadable results
- **Lead Forms**: Contact information capture with local file generation
- **Document Downloads**: Static file downloads for user information

#### Frontend Sections
- **Hero Section**: Video background with main value proposition
- **Security Features**: Trust indicators and legal structure details
- **Investment Strategy**: Portfolio composition and methodology
- **Calculator Tool**: Interactive investment simulation
- **Comparison Table**: Competitive analysis against traditional products
- **Process Flow**: Step-by-step onboarding for different user types
- **Downloads**: Document access with lead capture
- **Advisor Portal**: Dedicated section for financial advisors
- **Company Story**: Brand narrative and founder information

## Data Flow

1. **Lead Generation**: Users interact with forms across multiple sections
2. **Client-Side Processing**: All form validation and calculations done in browser
3. **Local Downloads**: Contact info and calculator results saved as text files
4. **Manual Processing**: Lead data processed manually from downloaded files

## External Dependencies

### Core Dependencies
- **Database**: Neon Database (serverless PostgreSQL)
- **UI Components**: Radix UI primitives
- **Form Handling**: React Hook Form with Hookform Resolvers
- **Date Manipulation**: date-fns library
- **Styling**: Tailwind CSS with class-variance-authority

### Planned Integrations
- **Calendar Booking**: Calendly integration for appointment scheduling
- **Document Signing**: DocuSign for legal document execution
- **CRM System**: Customer relationship management integration
- **Email Service**: Automated document delivery

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with hot reload
- **Database**: Environment variable configuration for DATABASE_URL
- **Build Process**: TypeScript compilation with esbuild for server bundle

### Production Deployment
- **Frontend**: Static assets built and served from `/dist/public`
- **Backend**: Node.js server bundle in `/dist/index.js`
- **Database Migrations**: Drizzle Kit for schema management
- **Environment**: Production configuration via NODE_ENV

### Build Commands
- `npm run dev` - Development server with hot reload
- `npm run build` - Production build (frontend + backend)
- `npm run start` - Production server
- `npm run db:push` - Database schema deployment

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- July 09, 2025. Converted to frontend-only application for static deployment
- July 09, 2025. Reorganized content structure for better user experience navigation
- July 09, 2025. Successfully migrated from Replit Agent to standard Replit environment
- July 09, 2025. Updated header with translucent background and SVG logo per user request
- July 05, 2025. Initial setup