# OctoFit Tracker Frontend

React 19 + Vite frontend for the OctoFit Tracker application.

## Prerequisites

- Node.js LTS
- npm

## Installation

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

The frontend will be available at:
- **Local:** http://localhost:5173
- **Codespaces:** https://{CODESPACE_NAME}-5173.app.github.dev

## Building

Create a production build:

```bash
npm run build
```

The build output will be in the `dist/` directory.

## Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Technologies

- **React 19** - Latest React version
- **Vite** - Lightning-fast frontend build tool
- **Bootstrap 5** - CSS framework for styling
- **React Router DOM** - Client-side routing

## Project Structure

```
src/
├── main.jsx          - Entry point with Bootstrap CSS import
├── App.jsx           - Main application component
├── App.css           - App styles
├── index.css         - Global styles
└── assets/           - Static assets (images, icons, etc.)
```

## Features to Implement

- [ ] User Authentication (Login/Register)
- [ ] User Dashboard
- [ ] Activity Logging UI
- [ ] Team Management
- [ ] Leaderboard Display
- [ ] Workout Suggestions
- [ ] Profile Management
- [ ] Navigation with React Router

## API Integration

The frontend communicates with the backend API at:
- **Local:** http://localhost:8000/api
- **Codespaces:** https://{CODESPACE_NAME}-8000.app.github.dev/api

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm run lint` - Run code linter

## Styling with Bootstrap

Bootstrap CSS is imported in `src/main.jsx`. You can use Bootstrap classes directly in your JSX:

```jsx
<div className="container mt-5">
  <div className="row">
    <div className="col-md-6">
      <button className="btn btn-primary">Click me</button>
    </div>
  </div>
</div>
```

## Environment Variables

Create a `.env` file if needed for environment-specific configuration:

```bash
VITE_API_BASE_URL=http://localhost:8000/api
```

Access in code with `import.meta.env.VITE_API_BASE_URL`
