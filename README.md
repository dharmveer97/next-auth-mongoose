Here's an improved version of your README file for better compatibility and presentation on GitHub:

```markdown
# NextAuth v5 + Next.js 15 + React 19 + Mongoose Starter 🔥

[![Next.js](https://img.shields.io/badge/Next.js-15.1.6-000000?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.13.0-47A248?logo=mongodb)](https://www.mongodb.com/)

A production-ready authentication template using NextAuth v5, MongoDB/Mongoose, and TypeScript. It supports both credentials and OAuth providers.

## 🚀 Quick Start

### 1. Clone the repository:

```bash
git clone https://github.com/dharmveer97/next-auth-mongoose.git
cd next-auth-mongoose
```

### 2. Install dependencies

```bash
npm install
# or
bun install
```

### 3. Create a `.env.local` file

```env
MONGODB_URI="your_mongodb_connection_string"
NEXTAUTH_SECRET="generated_secret_here"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your_google_oauth_id"
GOOGLE_CLIENT_SECRET="your_google_oauth_secret"
```

### 4. Generate `NEXTAUTH_SECRET`

```bash
openssl rand -base64 32
# or
npx auth secret
```

### 5. Start the development server

```bash
npm run dev
# or
bun run dev
```

## 🔧 Key Technologies

- **Authentication**: NextAuth v5
- **Database**: MongoDB + Mongoose ODM
- **Frontend**: React 19 + TypeScript
- **Forms**: Formik + Yup validation
- **Styling**: Tailwind CSS
- **Security**: BcryptJS password hashing

## 📂 Project Structure

```
├── app/
│   ├── api/auth/[...nextauth]/route.ts
│   └── (auth)/
├── components/
│   └── Auth/
├── models/
│   └── User.ts
├── lib/
│   └── mongoose.ts
└── types/
    └── next-auth.d.ts
```

## 🛠️ MongoDB Setup

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas/database).
2. Get your connection string:

```env
MONGODB_URI="mongodb+srv://<user>:<password>@cluster.mongodb.net/dbname?retryWrites=true&w=majority"
```

## 🔐 Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create OAuth 2.0 credentials.
3. Add the authorized redirect URI:

```
http://localhost:3000/api/auth/callback/google
```

## 🧩 TypeScript Models

### `models/User.ts`

```typescript
import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String, select: false },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  emailVerified: { type: Date, default: null },
}, { timestamps: true });

export const User = model('User', UserSchema);
```

## 🚨 Security Features

- Password hashing with bcryptjs
- CSRF protection
- HTTPS-only cookies
- Secure session management
- Environment variable validation
- Type-safe API routes

## 📦 Deployment

### Vercel

1. Set environment variables in project settings.
2. Add the build command: `npm run build`.
3. Enable Serverless Functions.

### Netlify

```yaml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"
```

## 💡 Usage Tips

- Customize the sign-in page in `app/(auth)/login/page.tsx`.
- Add more OAuth providers in `[...nextauth]/route.ts`.
- Extend the User model with additional fields.
- Use `getServerSession()` for server-side authentication.
- Implement rate limiting for authentication endpoints.

---

**Keywords**: Next.js Authentication, MongoDB Auth, NextAuth v5 Tutorial, React 19 Starter, TypeScript Auth Template, Mongoose User Model, Google OAuth Integration, Secure Login System

```
