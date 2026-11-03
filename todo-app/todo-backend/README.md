# Express application

Install dependencies with `npm install`

Run with `npm start`

Or in development mode with `npm run dev`

# Visit counter

When running the server, visit http://localhost:3000 to see visit counter, or give environment variable `PORT` to change the port.

# MongoDB

The application has /todos crud which requires a MongoDB. Pass connection url with env `MONGO_URL`

# Redis

Pass connection url with env `REDIS_URL`

# Backend

docker compose -f docker-compose.dev.yml up -d

npx cross-env MONGO_URL=mongodb://root:example@localhost:3456/the_database?authSource=admin REDIS_URL=redis://localhost:6379 npm run dev

## Dev Backend

docker compose -f docker-compose.dev.yml up --build

# Frontend

docker build -t todo-frontend .

docker run -p 5001:80 todo-frontend

## Dev Frontend

docker compose -f docker-compose.dev.yml up --build

## Production

docker compose up --build