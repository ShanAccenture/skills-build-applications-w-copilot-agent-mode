# OctoFit Tracker Backend

Node.js + Express + TypeScript backend API for the OctoFit Tracker application.

## Prerequisites

- Node.js LTS
- MongoDB (`mongodb-org` package)
- npm

## Installation

```bash
npm install
```

## Environment Variables

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

Key variables:
- `PORT` - API server port (default: 8000)
- `MONGODB_URI` - MongoDB connection string (default: mongodb://localhost:27017/octofit_db)
- `NODE_ENV` - Environment (development/production)
- `CODESPACE_NAME` - GitHub Codespaces name (auto-detected for Codespaces URLs)

## Running the Server

### Development Mode (with hot reload)

```bash
npm run dev
```

The server will be available at:
- **Local:** http://localhost:8000
- **Codespaces:** https://{CODESPACE_NAME}-8000.app.github.dev

### Production Build

```bash
npm run build
npm start
```

## API Routes

All routes are prefixed with `/api`.

### Users
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

### Activities
- `POST /api/activities` - Log new activity
- `GET /api/activities` - Get user activities
- `GET /api/activities/:id` - Get activity details
- `PUT /api/activities/:id` - Update activity
- `DELETE /api/activities/:id` - Delete activity

### Teams
- `POST /api/teams` - Create team
- `GET /api/teams` - Get teams
- `GET /api/teams/:id` - Get team details
- `PUT /api/teams/:id` - Update team
- `DELETE /api/teams/:id` - Delete team
- `POST /api/teams/:id/members` - Add member to team
- `DELETE /api/teams/:id/members/:userId` - Remove member from team

### Workouts
- `POST /api/workouts` - Create workout plan
- `GET /api/workouts` - Get workout plans
- `GET /api/workouts/:id` - Get workout details
- `PUT /api/workouts/:id` - Update workout
- `DELETE /api/workouts/:id` - Delete workout
- `GET /api/workouts/user/:userId` - Get user's workouts

### Leaderboard
- `GET /api/leaderboard` - Get global leaderboard
- `GET /api/leaderboard/:userId` - Get user's leaderboard rank

## Database Models

The application uses Mongoose for MongoDB data access with the following models:

- **User** - User profiles and authentication
- **Activity** - User activity logs
- **Team** - Team management
- **Workout** - Personalized workout suggestions
- **Leaderboard** - Competitive rankings

## Development

- TypeScript for type safety
- Express for routing
- Mongoose for MongoDB integration
- CORS enabled for frontend communication
- Dotenv for environment configuration

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Run production build
- `npm run lint` - Run ESLint

## Testing

Use `curl` to validate endpoints after implementation:

```bash
curl http://localhost:8000/api/health
```

Expected response:
```json
{"status":"Server is running"}
```
