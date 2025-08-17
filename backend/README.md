# Backend (Express API)

This folder is for the Express.js backend services for Smart-Rail.

## Structure
- `controllers/` — Request handlers for each feature (trip planner, chatbot, etc.)
- `routes/` — API endpoint definitions
- `services/` — Core business logic

## Getting Started
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the server:
   ```sh
   npm run dev
   ```

## Notes
- Connects to AI microservices and the database.
- Add new controllers/services as you expand features.
