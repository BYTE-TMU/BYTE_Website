# BYTE Admin Dashboard

A comprehensive React + TypeScript + Vite admin panel for managing the BYTE website content. This admin system provides a complete CRUD interface for managing team members, projects, events, and announcements with a design language that matches the main BYTE website.

## 🚀 Quick Start

```bash
# Navigate to Admin directory
cd Admin

# Install dependencies (if not already done)
npm install

# Run development server
npm run dev
```

The admin panel will be available at `http://localhost:5173`

## 🔐 Default Login Credentials

```
Email: admin@byte.org
Password: [any password works - mock authentication]
```

## 📋 Features

### ✅ Complete CRUD for All Content Types

1. **Team Members** - Manage team with multi-category support
2. **Projects** - Manage ongoing and completed projects
3. **Events** - Manage events with recap support
4. **Announcements** - Manage website announcements

### ✅ Built-in Features

- Mock API layer with localStorage persistence
- Protected routes with authentication
- Form validation on all inputs
- Real-time previews
- Responsive design matching Frontend
- TypeScript types from database schema

## 🏗️ Architecture

- **Mock API Layer**: Simulates backend with localStorage (`src/api/`)
- **Type Safety**: All types from `supabaseSchema.sql` (`src/types/`)
- **Authentication**: Context-based auth with protected routes
- **Design System**: Matches Frontend exactly (Tailwind + custom styles)

## 🔄 Migrating to Real Backend

Replace API functions in `src/api/index.ts` with Supabase calls:

```typescript
// Install Supabase
npm install @supabase/supabase-js

// Replace mock with real API
const { data, error } = await supabase
  .from('team_members')
  .select('*')
```

See full migration guide in the comprehensive documentation below.

## 📁 Key Files

```
src/
├── api/index.ts          # Mock API (replace with real backend)
├── types/index.ts        # TypeScript types from schema
├── context/AuthContext.tsx   # Authentication
├── pages/               # All CRUD pages
├── components/          # Reusable UI components
└── App.tsx             # Routing
```

## 🎨 Design System

Matches Frontend exactly:
- **Colors**: digital-abyss, terminal-green, acid-yellow, etc.
- **Fonts**: Orbitron (headings), Fira Code (body)
- **Styles**: Notched corners, grid patterns, pulse animations

## 📖 Full Documentation

For complete documentation including:
- Detailed API usage
- Migration to Supabase
- Adding new entity types
- Form validation details
- Troubleshooting guide

See the inline documentation in each file and refer to `supabaseSchema.sql` for database structure.

---

**Built for BYTE @ Toronto Metropolitan University**
