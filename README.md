# Bluesky OAuth Next.js Boilerplate

A modern, full-stack boilerplate for building web applications with Bluesky OAuth authentication using Next.js, Prisma, and PostgreSQL.

## Features

- 🔐 **Bluesky OAuth Authentication** - Secure authentication using AT Protocol OAuth
- 🗄️ **PostgreSQL Database** - Robust database with Prisma ORM
- 🍪 **Persistent Sessions** - Session management with iron-session
- ⚡ **Bun Runtime** - Fast package management and development with Bun
- 🎨 **Modern UI** - Built with Tailwind CSS and custom components
- 🔧 **TypeScript** - Full type safety throughout the application
- 📦 **Prisma Models** - Pre-configured models for auth states and sessions

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Runtime**: Bun
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: AT Protocol OAuth (@atproto/oauth-client-node)
- **Session Management**: iron-session
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Code Quality**: Biome (ESLint + Prettier alternative)

## Prerequisites

- [Bun](https://bun.sh/) installed on your machine
- PostgreSQL database
- Environment variables configured

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/pirmax/bluesky-oauth-nextjs
cd bluesky-oauth-nextjs
```

### 2. Install dependencies

```bash
bun install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
# Database
POSTGRES_URL="postgresql://username:password@localhost:5432/your_database"

# App Configuration
NEXT_PUBLIC_URL="http://localhost:3000"

# Session Security
COOKIE_PASSWORD="your-32-characters-secret-key-here"
```

You can generate 32 caracters on [1password.com](https://1password.com/password-generator).

### 4. Set up the database

```bash
# Generate Prisma client
bunx prisma generate

# Run database migrations
bunx prisma migrate dev
```

### 5. Start the development server

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── oauth/             # OAuth authentication routes
│   │   ├── login/         # Login page
│   │   └── callback/      # OAuth callback handler
│   ├── private/           # Protected pages
│   └── client-metadata.json/ # OAuth client metadata
├── components/            # Reusable UI components
│   ├── bluesky-logo.tsx
│   ├── login-button.tsx
│   └── logout-button.tsx
├── functions/             # Business logic
│   └── create-user.ts     # User creation utilities
├── lib/                   # Core utilities
│   ├── actions.ts         # Server actions
│   ├── atproto.ts         # AT Protocol client setup
│   ├── iron.ts            # Session management
│   ├── prisma.ts          # Database client
│   └── storage.ts         # Storage implementations
└── styles/
    └── globals.css        # Global styles
```

## Database Schema

The boilerplate includes two main Prisma models:

### AuthState
Stores OAuth state parameters for security:
```prisma
model AuthState {
  key   String @id
  state String
}
```

### AuthSession
Stores OAuth session data:
```prisma
model AuthSession {
  key     String @id
  session String
}
```

## Authentication Flow

1. **Login**: User clicks login button and is redirected to Bluesky OAuth
2. **Authorization**: User authorizes the application on Bluesky
3. **Callback**: Bluesky redirects back with authorization code
4. **Token Exchange**: Application exchanges code for access tokens
5. **Profile Fetch**: Application fetches user profile from Bluesky
6. **Session Creation**: User data is stored in iron-session cookie

## Available Scripts

```bash
# Development
bun dev              # Start development server with Turbopack

# Production
bun run build        # Build for production
bun start           # Start production server

# Code Quality
bun run lint        # Run Biome linter
bun run format      # Format code with Biome

# Database
bunx prisma generate    # Generate Prisma client
bunx prisma migrate dev # Run database migrations
bunx prisma studio     # Open Prisma Studio
```

## Environment Variables

| Variable          | Description                                | Required |
| ----------------- | ------------------------------------------ | -------- |
| `POSTGRES_URL`    | PostgreSQL connection string               | ✅        |
| `NEXT_PUBLIC_URL` | Your application's public URL              | ✅        |
| `COOKIE_PASSWORD` | 32-character secret for session encryption | ✅        |

## Deployment

### Vercel

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Set up PostgreSQL database (Vercel Postgres or external)
4. Deploy

### Manual Deployment

1. Build the application: `bun run build`
2. Set up PostgreSQL database
3. Run migrations: `bunx prisma migrate deploy`
4. Start the server: `bun start`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Open a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support and questions:
- Open an issue on GitHub
- Check the [AT Protocol documentation](https://atproto.com/)
- Review the [Next.js documentation](https://nextjs.org/)