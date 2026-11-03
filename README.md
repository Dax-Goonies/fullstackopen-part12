# 🐳 Full Stack Open — Part 12: Containers

Containerized development and production environments for the todo app (Parts 12's main exercise), using Docker, Docker Compose, and Nginx as a reverse proxy.

## 📂 Project Structure

### 🌐 Frontend (`todo-frontend/`)
* `Dockerfile` — Multi-stage production build (tests, builds static assets, and serves via Nginx).
* `dev.Dockerfile` — Development setup configured with bind mounts for live reloading.

### ⚙️ Backend (`todo-backend/`)
* `Dockerfile` — Production container for the Node.js/Express API.
* `dev.Dockerfile` — Development container utilizing Nodemon for automatic restarts.
* `mongo/mongo-init.js` — Database initialization script run on first start.

### 🔀 Networking & Orchestration
* **Reverse Proxy:**
  * `nginx.conf` — Production reverse proxy routing traffic.
  * `nginx.dev.conf` — Development reverse proxy configured with WebSocket support for Vite HMR (Hot Module Replacement).
* **Docker Compose:**
  * `docker-compose.yml` — Runs the full production stack.
  * `docker-compose.dev.yml` — Runs the full development stack.

## 🛠️ Running in development mode

```bash
docker compose -f docker-compose.dev.yml up --build
```

- App available at [http://localhost:8080](http://localhost:8080)
- Source files are bind-mounted into the containers, so edits to the frontend or backend take effect live (Vite HMR / nodemon)
- MongoDB and Redis data persist across restarts via bind-mounted volumes

## 🚀 Running in production mode

```bash
docker compose -f docker-compose.yml up --build
```

- App available at [http://localhost:8080](http://localhost:8080)
- Images are built once (tests run as part of the build) and contain no live file syncing
- Frontend is served as static files via Nginx; backend runs without nodemon

## 📦 How it's containerized

- **Nginx** is the single public entry point (port 8080). It serves the frontend and proxies `/api/*` requests to the backend, stripping the `/api` prefix since the backend's own routes are mounted at root.
- **Frontend, backend, MongoDB, and Redis have no exposed ports** of their own — they're only reachable internally, by service name, over the Docker network Compose creates automatically.
- A Redis-backed counter tracks the number of todos created, exposed via `/api/statistics`.
- The production frontend image is built in two stages: dependencies are installed and tests are run first, then the app is built and the static output is copied into a lightweight Nginx image — if the tests fail, the build fails too.

## 🔗 Links

- Repository for Full Stack Open Part 12 Containers answers: https://github.com/Dax-Goonies/fullstackopen-part12
- Own containerized app exercise (bloglist): https://github.com/Dax-Goonies/fullstackopen-part12-exo22-23
- Todo app source (original template): https://github.com/fullstack-hy2020/fs-containers