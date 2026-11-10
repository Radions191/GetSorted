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

Vite will display the local frontend
