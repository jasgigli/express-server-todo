# Todo API Server

A minimal Express.js backend for a Todo application, designed to be deployed as serverless functions on Vercel.

## Features

- RESTful API for Todo items (Create, Read, Update, Delete)
- In-memory storage for simplicity
- CORS configuration for frontend communication
- Vercel serverless function compatible

## API Endpoints

- `GET /todos` - Get all todos
- `GET /todos/:id` - Get a specific todo by ID
- `POST /todos` - Create a new todo
- `PATCH /todos/:id` - Update a todo
- `DELETE /todos/:id` - Delete a todo

## Local Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Copy the `.env.example` file to `.env` and adjust as needed:
   ```
   cp .env.example .env
   ```
4. Start the development server:
   ```
   npm run dev
   ```
5. The API will be available at `http://localhost:3000`

## Deployment to Vercel

1. Make sure you have the Vercel CLI installed:
   ```
   npm install -g vercel
   ```

2. Deploy to Vercel:
   ```
   vercel
   ```

3. For production deployment:
   ```
   vercel --prod
   ```

## Environment Variables

- `PORT` - Port for local development (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `CORS_ORIGIN` - Origin allowed for CORS (default: * in development)

## Project Structure

```
server/
├── api/                  # Vercel serverless functions
│   ├── controllers/      # Route controllers
│   ├── routes/           # API routes
│   └── index.js          # Main Express app
├── .env.example          # Example environment variables
├── package.json          # Project dependencies and scripts
├── README.md             # Project documentation
└── vercel.json           # Vercel deployment configuration
```
