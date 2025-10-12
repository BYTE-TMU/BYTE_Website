# BYTE Website Backend API

A Flask-based REST API backend for the BYTE Website, integrating with Supabase for authentication and data management.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Backend](#running-the-backend)
- [API Documentation](#api-documentation)
- [Authentication & Authorization](#authentication--authorization)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Extending the Backend](#extending-the-backend)
- [Troubleshooting](#troubleshooting)

## Overview

This backend provides RESTful API endpoints for managing:
- Users (admin/owner access only)
- Team members (public read, admin/owner write)
- Projects (public read, admin/owner write)
- Events (public read, admin/owner write)
- Announcements (public read, admin/owner write)
- Activity logs (admin/owner read and insert, owner only for updates/deletes)

## Architecture

- **Framework**: Flask 3.0
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with JWT
- **Authorization**: Role-based (is_admin, is_owner)
- **API Design**: RESTful with JSON responses

## Prerequisites

- Python 3.8 or higher
- Supabase account and project
- pip or poetry for package management

## Installation

### 1. Clone the Repository

```bash
cd Backend
```

### 2. Create Virtual Environment

```bash
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

## Configuration

### 1. Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:

```env
SUPABASE_URL="https://your-project-id.supabase.co"
SUPABASE_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"  # Optional
SECRET_KEY="your-flask-secret-key"
FLASK_DEBUG="True"
```

### 2. Supabase Setup

1. **Create Supabase Project**: Go to [supabase.com](https://supabase.com) and create a new project
2. **Apply Schema**: Run the SQL schema from `supabaseSchema.sql` in the Supabase SQL editor
3. **Get Credentials**: Copy your project URL and anon key from Supabase dashboard → Settings → API

### 3. Obtaining Supabase Credentials

- **SUPABASE_URL**: Found in Project Settings → API → Project URL
- **SUPABASE_KEY**: Found in Project Settings → API → Project API keys → `anon` `public`
- **SUPABASE_SERVICE_ROLE_KEY** (optional): Found in Project Settings → API → Project API keys → `service_role` (use with caution)

## Running the Backend

### Development Mode

```bash
python main.py
```

The server will start at `http://localhost:5000`

### Production Mode

For production, use a production WSGI server like Gunicorn:

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 'main:create_app()'
```

## API Documentation

### Base URL

```
http://localhost:5000/api
```

### Health Check

```
GET /api/health
```

Returns the health status of the API.

### Authentication

All protected endpoints require an `Authorization` header:

```
Authorization: Bearer <your-jwt-token>
```

### API Endpoints Summary

#### Users (`/api/users`)
- `GET /api/users` - Get all users (Admin/Owner only)
- `GET /api/users/<uid>` - Get user by ID (Admin/Owner only)
- `GET /api/users/me` - Get current user profile (Authenticated)
- `POST /api/users` - Create user (Admin/Owner only)
- `PUT/PATCH /api/users/<uid>` - Update user (Owner only)
- `DELETE /api/users/<uid>` - Delete user (Owner only)

#### Team Members (`/api/team-members`)
- `GET /api/team-members` - Get all team members (Public)
- `GET /api/team-members/<id>` - Get team member by ID (Public)
- `GET /api/team-members/category/<category>` - Get team members by category (Public)
- `POST /api/team-members` - Create team member (Admin/Owner only)
- `PUT/PATCH /api/team-members/<id>` - Update team member (Admin/Owner only)
- `DELETE /api/team-members/<id>` - Delete team member (Admin/Owner only)

#### Projects (`/api/projects`)
- `GET /api/projects` - Get all projects (Public)
- `GET /api/projects/<id>` - Get project by ID (Public)
- `GET /api/projects/type/<type>` - Get projects by type (Public)
- `POST /api/projects` - Create project (Admin/Owner only)
- `PUT/PATCH /api/projects/<id>` - Update project (Admin/Owner only)
- `DELETE /api/projects/<id>` - Delete project (Admin/Owner only)

#### Events (`/api/events`)
- `GET /api/events` - Get all events (Public)
- `GET /api/events/<id>` - Get event by ID (Public)
- `GET /api/events/upcoming` - Get upcoming events (Public)
- `GET /api/events/past` - Get past events (Public)
- `POST /api/events` - Create event (Admin/Owner only)
- `PUT/PATCH /api/events/<id>` - Update event (Admin/Owner only)
- `DELETE /api/events/<id>` - Delete event (Admin/Owner only)

#### Announcements (`/api/announcements`)
- `GET /api/announcements` - Get all announcements (Public)
- `GET /api/announcements/<id>` - Get announcement by ID (Public)
- `GET /api/announcements/recent` - Get recent announcements (Public)
- `POST /api/announcements` - Create announcement (Admin/Owner only)
- `PUT/PATCH /api/announcements/<id>` - Update announcement (Admin/Owner only)
- `DELETE /api/announcements/<id>` - Delete announcement (Admin/Owner only)

#### Activity Log (`/api/activity-log`)
- `GET /api/activity-log` - Get all activity logs (Admin/Owner only)
- `GET /api/activity-log/<id>` - Get activity log by ID (Admin/Owner only)
- `GET /api/activity-log/user/<user_id>` - Get logs by user (Admin/Owner only)
- `GET /api/activity-log/collection/<collection>` - Get logs by collection (Admin/Owner only)
- `GET /api/activity-log/document/<collection>/<document_id>` - Get logs by document (Admin/Owner only)
- `POST /api/activity-log` - Create activity log (Admin/Owner only)
- `PUT/PATCH /api/activity-log/<id>` - Update activity log (Owner only)
- `DELETE /api/activity-log/<id>` - Delete activity log (Owner only)

## Authentication & Authorization

### Roles

The system uses three levels of access:

1. **Public**: No authentication required (GET requests for content)
2. **Admin** (`is_admin=true`): Can create, update, and delete content
3. **Owner** (`is_owner=true`): Has all admin privileges plus user management

### Authorization Rules

#### GET Routes
- **Content tables** (team_members, projects, events, announcements): Public access
- **Users table**: Admin/Owner only
- **Activity log**: Admin/Owner only

#### POST Routes
- All POST operations require Admin or Owner privileges

#### PUT/PATCH Routes
- **Users table**: Owner only (for role changes)
- **All other tables**: Admin/Owner required
- **Activity log updates**: Owner only

#### DELETE Routes
- **Users table**: Owner only
- **All other tables**: Admin/Owner required
- **Activity log**: Owner only

### How Authentication Works

1. User signs in through Supabase Auth
2. Supabase returns a JWT token
3. Client includes token in `Authorization: Bearer <token>` header
4. Backend verifies token with Supabase
5. Backend checks user's `is_admin` and `is_owner` fields
6. Authorization middleware grants/denies access

## Project Structure

```
Backend/
├── main.py                 # Application entry point
├── config.py              # Configuration management
├── database.py            # Supabase client initialization
├── requirements.txt       # Python dependencies
├── .env                   # Environment variables (not in git)
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore rules
├── README.md             # This file
│
├── middleware/           # Authentication & authorization
│   ├── __init__.py
│   └── auth.py          # Auth decorators and token verification
│
├── routes/              # API route handlers
│   ├── __init__.py
│   ├── users.py        # User management routes
│   ├── team_members.py # Team member routes
│   ├── projects.py     # Project routes
│   ├── events.py       # Event routes
│   ├── announcements.py # Announcement routes
│   └── activity_log.py # Activity log routes
│
└── utils/              # Utility functions
    ├── __init__.py
    ├── responses.py    # Response formatting helpers
    ├── validators.py   # Input validation functions
    └── error_handlers.py # Global error handlers
```

## Testing

### Using Postman

See [POSTMAN_TESTING.md](POSTMAN_TESTING.md) for detailed testing instructions with Postman.

### Manual Testing

1. Start the backend server
2. Test health endpoint:
   ```bash
   curl http://localhost:5000/api/health
   ```
3. Test public endpoints (no auth required):
   ```bash
   curl http://localhost:5000/api/team-members
   curl http://localhost:5000/api/projects
   ```
4. Test protected endpoints (requires auth token):
   ```bash
   curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:5000/api/users
   ```

## Extending the Backend

### Adding a New Route

1. **Create route file** in `routes/` directory:
   ```python
   # routes/my_new_route.py
   from flask import Blueprint
   from middleware.auth import require_admin

   my_route_bp = Blueprint('my_route', __name__)

   @my_route_bp.route('', methods=['GET'])
   @require_admin
   def get_items():
       # Your logic here
       pass
   ```

2. **Register blueprint** in `main.py`:
   ```python
   from routes.my_new_route import my_route_bp

   app.register_blueprint(my_route_bp, url_prefix='/api/my-route')
   ```

### Adding New Middleware

1. Create middleware function in `middleware/` directory
2. Apply as decorator to routes or register globally

### Modifying Authorization Rules

Edit the decorators in [middleware/auth.py](middleware/auth.py):
- `@require_auth` - Any authenticated user
- `@require_admin` - Admin or Owner
- `@require_owner` - Owner only
- `@optional_auth` - Authentication optional

## Troubleshooting

### Common Issues

#### 1. "Missing required environment variables"
- Ensure `.env` file exists and contains all required variables
- Check that `SUPABASE_URL` and `SUPABASE_KEY` are set correctly

#### 2. "Invalid or expired token"
- Token may have expired (check Supabase Auth settings)
- Ensure token is in correct format: `Bearer <token>`
- Verify user exists in `users` table

#### 3. "User not found" after successful authentication
- User may not exist in `users` table
- Create user record in `users` table matching the Auth user's UID

#### 4. Database connection errors
- Verify Supabase URL and credentials
- Check that Supabase project is running
- Ensure Row Level Security policies are correctly configured

#### 5. CORS errors
- Check CORS configuration in `main.py`
- Ensure frontend URL is in allowed origins
- Verify request headers are allowed

### Debug Mode

Enable debug mode in `.env`:
```env
FLASK_DEBUG="True"
```

This provides detailed error messages and auto-reloading.

### Logging

Flask logs are printed to console. For production, configure proper logging:

```python
import logging
logging.basicConfig(level=logging.INFO)
```

## Security Considerations

1. **Never commit `.env` file** - Contains sensitive credentials
2. **Use HTTPS in production** - Protects tokens in transit
3. **Rotate secrets regularly** - Update JWT secret keys periodically
4. **Validate all inputs** - Use validation utilities before database operations
5. **Enable RLS in Supabase** - Row Level Security provides additional protection
6. **Use service role key carefully** - Only for admin operations, never expose to frontend

## Support

For issues or questions:
1. Check this README and [POSTMAN_TESTING.md](POSTMAN_TESTING.md)
2. Review Supabase documentation: https://supabase.com/docs
3. Review Flask documentation: https://flask.palletsprojects.com/
4. Contact the development team

## License

[Your License Here]
