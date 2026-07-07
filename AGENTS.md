# AGENTS.md

You are contributing to Portfolio CMS.

## Tech Stack

- React (Vite)
- Tailwind CSS
- Node.js
- Express.js
- MongoDB
- Mongoose

## Architecture

Use feature-based architecture.

Each feature should contain:

- controller
- service
- model
- routes
- validation

## API Response Format

{
  "success": true,
  "message": "Success",
  "data": {}
}

## Coding Rules

- Use async/await.
- Never use callbacks.
- Validate all inputs.
- Keep controllers thin.
- Put business logic in services.
- Write reusable code.
- Use ES Modules.
- Add comments only when necessary.