# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` - Starts Vite development server with HMR
- **Build**: `npm run build` - Creates production build using Vite
- **Lint**: `npm run lint` - Runs ESLint with React and Prettier rules (max 0 warnings)
- **Preview**: `npm run preview` - Preview production build locally

## Architecture Overview

This is a React 18 + Vite SPA portfolio website with multiple specialized tools and project showcases.

### Tech Stack
- **Framework**: React 18 with Vite (SWC for Fast Refresh)
- **Routing**: React Router DOM v6 with lazy loading
- **Styling**: CSS modules, SCSS, Bootstrap 5.3 + React Bootstrap
- **Icons**: Heroicons, React Icons
- **Forms**: React Hook Form
- **Animation**: Framer Motion
- **HTTP**: Axios
- **Deployment**: Heroku with Node.js 18.x

### Project Structure

**Main Application (`src/`)**:
- `App.jsx` - Main router with lazy-loaded pages
- `pages/` - Top-level page components (Welcome, Art, Gallery, Kiln, Plaster, Portfolio)
- `components/` - Shared UI components (FallingLetter, SearchBox)
- `api/` - API utilities and hooks

**Key Pages**:
- **Art** (`pages/Art/`) - Main landing page with art gallery
- **Gallery** (`pages/Gallery/`) - Image gallery with swipeable navigation  
- **Kiln** (`pages/Kiln/`) - Ceramic and glass kiln calculators with firing schedules
- **Plaster Calculator** (`pages/Plaster/`) - Tool for plaster mixing calculations
- **Benefits Project** (`pages/Portfolio/Projects/Benefits/`) - Complex benefits enrollment system

### Benefits Project Architecture
The Benefits project is a substantial React application embedded within the portfolio, featuring:

**Structure**:
- `api/` - Service layer with interceptors for coverage, dependents, session, subscriber data
- `components/` - Modular UI components (cards, modals, steppers, form controls)
- `config/` - Context providers, routing, environment configuration
- `pages/workflows/` - Multi-step enrollment flows (new-hire, open-enrollment, change-coverage, personal-info)
- `scss/` - Shared styling and color variables

**Key Patterns**:
- Context-based state management (SubscriberContext, ErrorContext, etc.)
- Workflow-based navigation with stepper components
- Service layer with axios interceptors
- SCSS modules with shared color variables

### Vite Configuration
- Path aliases configured for Benefits project (`@`, `@scss`, `@/components`)
- Bootstrap integration via alias
- SCSS preprocessing enabled
- SWC plugin for React Fast Refresh

### Code Style
- ESLint with React, Prettier, and import ordering rules
- Automatic import sorting (alphabetical, grouped by type)
- 2-space indentation for JSX
- Key and variable sorting enforced
- PropTypes disabled in favor of modern patterns

### Deployment
- Heroku deployment with Procfile
- Environment variables managed via Heroku Config Vars
- Restart dynos: `heroku restart -a app-name`
- Force rebuild by pushing any change to trigger build

## Development Notes

- The Benefits project uses extensive path aliases - ensure imports use `@` prefix
- Gallery uses react-swipeable for touch navigation
- Kiln tools have complex firing schedule logic
- All pages use lazy loading for performance
- SCSS files are co-located with components