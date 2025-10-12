# Quick Start Guide - BYTE Backend

This guide will get you up and running with the BYTE backend in under 5 minutes.

## Prerequisites

- Python 3.8+ installed
- Supabase account with a project created
- Git (optional)

## Step 1: Install Dependencies (2 minutes)

```bash
# Navigate to Backend directory
cd Backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

## Step 2: Configure Environment (1 minute)

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Supabase credentials:
   ```env
   SUPABASE_URL="https://your-project-id.supabase.co"
   SUPABASE_KEY="your-anon-key"
   SECRET_KEY="any-random-string-for-flask"
   FLASK_DEBUG="True"
   ```

   **Get Supabase credentials:**
   - Go to your Supabase project dashboard
   - Navigate to Settings → API
   - Copy Project URL and anon/public key

## Step 3: Set Up Database (1 minute)

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `../supabaseSchema.sql`
4. Click "Run" to create all tables and views

## Step 4: Run the Backend (30 seconds)

```bash
python main.py
```

You should see:
```
 * Running on http://0.0.0.0:5000
```

## Step 5: Test It Works (30 seconds)

Open your browser or use curl:

```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Test public endpoint
curl http://localhost:5000/api/team-members
```

Expected response:
```json
{"status": "healthy"}
```

## Next Steps

### Create Test User in Supabase

1. Go to Supabase Dashboard → Authentication → Users
2. Click "Add User"
3. Create a user with email/password
4. Go to SQL Editor and create a corresponding user record:

```sql
INSERT INTO users (uid, username, email, role, is_admin, is_owner)
VALUES (
  'paste-auth-user-uid-here',
  'admin',
  'admin@example.com',
  'owner',
  true,
  true
);
```

### Get Authentication Token

Use the Supabase client to sign in and get a token:

```javascript
// In Node.js or browser console
const { createClient } = require('@supabase/supabase-js')
const supabase = createClient('YOUR_URL', 'YOUR_KEY')

const { data, error } = await supabase.auth.signInWithPassword({
  email: 'admin@example.com',
  password: 'your-password'
})

console.log('Token:', data.session.access_token)
```

### Test Protected Endpoints

```bash
# Replace YOUR_TOKEN with the token from above
curl -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:5000/api/users
```

## File Structure Overview

```
Backend/
├── main.py              # Application entry point - START HERE
├── config.py            # Configuration settings
├── database.py          # Supabase connection
├── requirements.txt     # Python dependencies
│
├── middleware/          # Authentication & authorization
│   └── auth.py         # Auth decorators (@require_admin, etc.)
│
├── routes/             # API endpoints
│   ├── users.py
│   ├── team_members.py
│   ├── projects.py
│   ├── events.py
│   ├── announcements.py
│   └── activity_log.py
│
└── utils/              # Helper functions
    ├── responses.py    # JSON response helpers
    ├── validators.py   # Input validation
    └── error_handlers.py
```

## Common Issues

### Issue: "Missing required environment variables"

**Solution:** Make sure `.env` file exists and contains SUPABASE_URL and SUPABASE_KEY

### Issue: "Module not found"

**Solution:** Activate virtual environment and reinstall dependencies:
```bash
pip install -r requirements.txt
```

### Issue: Database tables don't exist

**Solution:** Run the SQL schema in Supabase SQL Editor

### Issue: CORS errors from frontend

**Solution:** Add your frontend URL to allowed origins in `main.py`:
```python
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:3000", "YOUR_FRONTEND_URL"],
        ...
    }
})
```

## Testing with Postman

See [POSTMAN_TESTING.md](POSTMAN_TESTING.md) for complete API testing guide.

Quick test in Postman:
1. Create new request
2. Set URL: `http://localhost:5000/api/team-members`
3. Method: GET
4. Click Send

## Further Reading

- [README.md](README.md) - Complete documentation
- [POSTMAN_TESTING.md](POSTMAN_TESTING.md) - API testing guide
- [Supabase Docs](https://supabase.com/docs) - Database and auth
- [Flask Docs](https://flask.palletsprojects.com/) - Web framework

## Support

If you encounter issues:
1. Check that Supabase project is active
2. Verify environment variables are set correctly
3. Check Python version (must be 3.8+)
4. Review error logs in terminal

---

**Ready to code?** The backend is now running and ready to serve your frontend! 🚀
