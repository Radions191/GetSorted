# GetSorted

GetSorted is an information management system built with React, TypeScript, Node.js, Express, Prisma, and PostgreSQL.

The application provides an information screen, news feed, operational messages, articles, and an administration panel. It supports multiple languages and customizable themes.

## Features

- Information screen for displaying content
- News feed using the Hacker News API
- Operational messages (Driftsmeldinger)
- Article management
- Screen management
- Administration panel
- Multilingual interface: Norwegian, English, Russian, and Ukrainian
- Light and dark themes
- PostgreSQL database with Prisma ORM

## Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Axios
- React Router
- Lucide React

### Backend
- Node.js
- Express 5
- TypeScript
- Prisma ORM
- PostgreSQL 15
- Axios
- dotenv

### Development Tools
- Docker Compose
- ESLint
- Git

## Project Structure

```text
GetSorted/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── assets/
│   ├── .env.example
│   └── package.json
│
├── server/                 # Express backend
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── routes/
│   │   └── index.ts
│   ├── docker-compose.yml
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
```

## Requirements

Before running the project, make sure you have:

- Node.js and npm
- Docker Desktop
- Git

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Radions191/GetSorted.git
cd GetSorted
```

### 2. Install frontend dependencies

```bash
cd client
npm ci
```

Create a `.env` file based on `.env.example`:

```bash
copy .env.example .env
```

The default configuration is:

```env
VITE_API_URL=http://localhost:3001
```

### 3. Install backend dependencies

Open another terminal in the project root:

```bash
cd server
npm ci
```

Create your local environment file:

```bash
copy .env.example .env
```

Open `server/.env` and replace the example PostgreSQL password with your own password.

### 4. Start PostgreSQL

Make sure Docker Desktop is running.

From the `server` directory:

```bash
docker compose up -d
```

This starts PostgreSQL 15 in a Docker container.

The default configuration maps:
- Host port: `5433`
- Container port: `5432`
- Database: `getsorted`

The database data is stored in a persistent Docker volume.

Make sure `DATABASE_URL` in `server/.env` uses the same host port configured by `DB_PORT`.

### 5. Generate Prisma Client

From the `server` directory:

```bash
npm run db:generate
```

### 6. Apply database migrations

Once PostgreSQL is running:

```bash
npm run db:migrate
```

This applies the existing Prisma migrations and creates the required database tables.

### 7. Start the backend

```bash
npm run dev
```

The backend will run at:

`http://localhost:3001`

### 8. Start the frontend

In another terminal:

```bash
cd client
npm run dev
```

Vite will display the local frontend URL in the terminal, usually:

`http://localhost:5173`

## Available Scripts

### Frontend (`client/`)

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the frontend for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build |

### Backend (`server/`)

| Command | Description |
|---|---|
| `npm run dev` | Start the backend in development mode |
| `npm run build` | Compile TypeScript |
| `npm start` | Start the compiled backend |
| `npm run db:generate` | Generate Prisma Client |
| `npm run db:migrate` | Apply database migrations |

## API Endpoints

The backend provides the following API routes:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/news` | Retrieve news from Hacker News |
| GET | `/api/articles` | Retrieve articles |
| POST | `/api/articles` | Create an article |
| DELETE | `/api/articles/:id` | Delete an article |
| GET | `/api/screens` | Retrieve screens |
| POST | `/api/screens` | Create a screen |
| PUT | `/api/screens/:id` | Update a screen |
| DELETE | `/api/screens/:id` | Delete a screen |
| GET | `/api/driftsmeldinger` | Retrieve operational messages |
| POST | `/api/driftsmeldinger` | Create an operational message |
| PUT | `/api/driftsmeldinger/:id` | Update an operational message |
| DELETE | `/api/driftsmeldinger/:id` | Delete an operational message |

## Environment Variables

Environment example files are provided:

- `client/.env.example`
- `server/.env.example`

Copy these files to `.env` and adjust the values for your local environment.

**Important:** Never commit real `.env` files, database passwords, API keys, or other sensitive information.

## Security Notice

The current backend API does not include authentication or authorization for administrative endpoints.

This project is intended for local development and testing. Before deploying it publicly, implement appropriate authentication, authorization, input validation, and other security measures.

## Database

GetSorted uses PostgreSQL with Prisma ORM.

Database models and migration history are located in:

```text
server/prisma/
```

To inspect the database visually during development, you can use:

```bash
npx prisma studio
```

Run this command from the `server` directory.

## License

No license has been specified yet. All rights remain with the respective copyright holders unless a license is added.