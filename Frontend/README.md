# Frontend (React/TypeScript)

This folder contains all code and configuration for the Smart-Rail web frontend.

## Structure
- `src/` — All React components, pages, hooks, and integrations
- `public/` — Static assets
- Config files: `vite.config.ts`, `tailwind.config.ts`, `postcss.config.js`, etc.

## Getting Started
1. Install dependencies:
   ```sh
   npm install --legacy-peer-deps
   ```
2. Start the development server:
   ```sh
   npm run dev
   ```
3. Build for production:
   ```sh
   npm run build
   ```

## Notes
- The frontend communicates with the backend API (see `/backend`).
- Update environment variables and API endpoints as needed for your deployment.
