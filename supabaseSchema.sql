-- ==================== SUPABASE POSTGRESQL DATABASE SCHEMA ====================
-- Database schema for BYTE Website
-- Based on data structures from:
-- - Frontend/src/data/teamData.ts
-- - Frontend/src/data/projectsData.ts
-- - Frontend/src/data/eventsData.ts
-- - Frontend/src/data/announcementsData.ts
-- ==================================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable Row Level Security (RLS) on all tables
-- Supabase uses RLS for fine-grained access control

-- ==================== USERS TABLE ====================
-- Stores user authentication and profile information
-- Integrates with Supabase Auth

CREATE TABLE users (
  uid UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_login TIMESTAMPTZ,

  -- Role-based access control
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,
  is_owner BOOLEAN NOT NULL DEFAULT FALSE,

  -- User status
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  email_verified BOOLEAN NOT NULL DEFAULT FALSE
);

-- Index for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = uid);

CREATE POLICY "Admins can view all users" ON users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE uid = auth.uid() AND is_admin = TRUE
    )
  );

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = uid);

CREATE POLICY "Owners can update user roles" ON users
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users WHERE uid = auth.uid() AND is_owner = TRUE
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM users WHERE uid = auth.uid() AND is_owner = TRUE
    )
  );


-- ==================== TEAM MEMBERS TABLE ====================
-- Stores information about BYTE team members
-- Based on teamData.ts structure

CREATE TABLE team_members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  profile_pic_url TEXT NOT NULL,
  rank INTEGER NOT NULL,
  connections TEXT[], -- Array of team member IDs

  -- Category grouping (Leadership, Strategic Team, Technical Team)
  -- Members can belong to multiple categories
  categories TEXT[] NOT NULL,

  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by UUID REFERENCES users(uid) ON DELETE SET NULL
);

-- Indexes for queries
CREATE INDEX idx_team_members_categories ON team_members USING GIN(categories); -- GIN index for array queries
CREATE INDEX idx_team_members_rank ON team_members(rank DESC);

-- Enable RLS
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Public read, admin write
CREATE POLICY "Anyone can view team members" ON team_members
  FOR SELECT USING (TRUE);

CREATE POLICY "Admins can insert team members" ON team_members
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users WHERE uid = auth.uid() AND is_admin = TRUE
    )
  );

CREATE POLICY "Admins can update team members" ON team_members
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users WHERE uid = auth.uid() AND is_admin = TRUE
    )
  );

CREATE POLICY "Admins can delete team members" ON team_members
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM users WHERE uid = auth.uid() AND is_admin = TRUE
    )
  );


-- ==================== PROJECTS TABLE ====================
-- Stores BYTE projects information
-- Based on projectsData.ts structure

CREATE TABLE projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('On-going', 'Completed')),
  description TEXT NOT NULL,
  technologies TEXT[] NOT NULL, -- Array of technology names
  github_url TEXT NOT NULL,
  image_url TEXT,
  type TEXT NOT NULL CHECK (type IN ('current', 'past')),

  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID REFERENCES users(uid) ON DELETE SET NULL
);

-- Indexes
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_type ON projects(type);
CREATE INDEX idx_projects_type_status ON projects(type, status);
CREATE INDEX idx_projects_updated_at ON projects(updated_at DESC);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Public read, admin write
CREATE POLICY "Anyone can view projects" ON projects
  FOR SELECT USING (TRUE);

CREATE POLICY "Admins can insert projects" ON projects
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users WHERE uid = auth.uid() AND is_admin = TRUE
    )
  );

CREATE POLICY "Admins can update projects" ON projects
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users WHERE uid = auth.uid() AND is_admin = TRUE
    )
  );

CREATE POLICY "Admins can delete projects" ON projects
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM users WHERE uid = auth.uid() AND is_admin = TRUE
    )
  );


-- ==================== EVENTS TABLE ====================
-- Stores BYTE events information
-- Based on eventsData.ts structure

CREATE TABLE events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  location TEXT,
  type TEXT CHECK (type IN ('workshop', 'hackathon', 'networking', 'social', 'competition')),
  registration_url TEXT,
  recap_url TEXT,

  -- Event recap (stored as JSONB for flexibility)
  recap JSONB, -- Structure: { summary: string, images: string[] }

  -- Computed/denormalized field
  is_past BOOLEAN NOT NULL DEFAULT FALSE,

  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by UUID REFERENCES users(uid) ON DELETE SET NULL
);

-- Indexes
CREATE INDEX idx_events_date ON events(date DESC);
CREATE INDEX idx_events_is_past ON events(is_past);
CREATE INDEX idx_events_is_past_date ON events(is_past, date);
CREATE INDEX idx_events_type ON events(type);
CREATE INDEX idx_events_type_date ON events(type, date);

-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Public read, admin write
CREATE POLICY "Anyone can view events" ON events
  FOR SELECT USING (TRUE);

CREATE POLICY "Admins can insert events" ON events
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users WHERE uid = auth.uid() AND is_admin = TRUE
    )
  );

CREATE POLICY "Admins can update events" ON events
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users WHERE uid = auth.uid() AND is_admin = TRUE
    )
  );

CREATE POLICY "Admins can delete events" ON events
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM users WHERE uid = auth.uid() AND is_admin = TRUE
    )
  );


-- ==================== ANNOUNCEMENTS TABLE ====================
-- Stores website announcements
-- Based on announcementsData.ts structure

CREATE TABLE announcements (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL, -- Display date string (e.g., 'Sep 12, 2025')
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,

  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by UUID REFERENCES users(uid) ON DELETE SET NULL
);

-- Indexes
CREATE INDEX idx_announcements_created_at ON announcements(created_at DESC);

-- Enable RLS
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Public read, admin write
CREATE POLICY "Anyone can view announcements" ON announcements
  FOR SELECT USING (TRUE);

CREATE POLICY "Admins can insert announcements" ON announcements
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users WHERE uid = auth.uid() AND is_admin = TRUE
    )
  );

CREATE POLICY "Admins can update announcements" ON announcements
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users WHERE uid = auth.uid() AND is_admin = TRUE
    )
  );

CREATE POLICY "Admins can delete announcements" ON announcements
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM users WHERE uid = auth.uid() AND is_admin = TRUE
    )
  );


-- ==================== FAQ TABLE ====================
-- Stores frequently asked questions
-- Based on faqData.ts structure

CREATE TABLE faqs (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,

  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by UUID REFERENCES users(uid) ON DELETE SET NULL
);

-- Indexes
CREATE INDEX idx_faqs_display_order ON faqs(display_order ASC);

-- Enable RLS
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Public read, admin write
CREATE POLICY "Anyone can view faqs" ON faqs
  FOR SELECT USING (TRUE);

CREATE POLICY "Admins can insert faqs" ON faqs
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users WHERE uid = auth.uid() AND is_admin = TRUE
    )
  );

CREATE POLICY "Admins can update faqs" ON faqs
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users WHERE uid = auth.uid() AND is_admin = TRUE
    )
  );

CREATE POLICY "Admins can delete faqs" ON faqs
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM users WHERE uid = auth.uid() AND is_admin = TRUE
    )
  );


-- ==================== ACTIVITY LOG TABLE ====================
-- Stores audit trail of admin actions

CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(uid) ON DELETE CASCADE,
  action TEXT NOT NULL, -- e.g., 'created_project', 'updated_member', 'deleted_event'
  collection TEXT NOT NULL, -- Table name
  document_id TEXT NOT NULL, -- ID of affected record
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Change details (stored as JSONB)
  changes JSONB, -- Structure: [{ field: string, old_value: any, new_value: any }]
  metadata JSONB -- Additional metadata
);

-- Indexes
CREATE INDEX idx_activity_log_user_id ON activity_log(user_id);
CREATE INDEX idx_activity_log_timestamp ON activity_log(timestamp DESC);
CREATE INDEX idx_activity_log_collection ON activity_log(collection);
CREATE INDEX idx_activity_log_collection_document ON activity_log(collection, document_id);

-- Enable RLS
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Admin only
CREATE POLICY "Admins can view activity log" ON activity_log
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE uid = auth.uid() AND is_admin = TRUE
    )
  );

CREATE POLICY "Admins can insert activity log" ON activity_log
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users WHERE uid = auth.uid() AND is_admin = TRUE
    )
  );


-- ==================== TRIGGERS ====================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON announcements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();



-- Function to automatically update is_past field for events
CREATE OR REPLACE FUNCTION update_event_is_past()
RETURNS TRIGGER AS $$
BEGIN
  NEW.is_past = (NEW.date < CURRENT_DATE);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_events_is_past BEFORE INSERT OR UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_event_is_past();


-- ==================== VIEWS ====================

-- View for active team members grouped by category
-- This view unnests the categories array so each member appears in all their categories
CREATE VIEW team_members_by_category AS
SELECT
  category,
  json_agg(
    json_build_object(
      'id', id,
      'name', name,
      'position', position,
      'profilePicUrl', profile_pic_url,
      'rank', rank,
      'connections', connections,
      'categories', categories
    ) ORDER BY rank DESC
  ) as members
FROM team_members, unnest(categories) as category
GROUP BY category;

-- View for upcoming events
CREATE VIEW upcoming_events AS
SELECT * FROM events
WHERE is_past = FALSE
ORDER BY date ASC;

-- View for past events
CREATE VIEW past_events AS
SELECT * FROM events
WHERE is_past = TRUE
ORDER BY date DESC;

-- View for current projects
CREATE VIEW current_projects AS
SELECT * FROM projects
WHERE type = 'current'
ORDER BY updated_at DESC;

-- View for past projects
CREATE VIEW past_projects AS
SELECT * FROM projects
WHERE type = 'past'
ORDER BY updated_at DESC;


-- ==================== MIGRATION NOTES ====================
-- To migrate data from the frontend data files:
--
-- 1. Team Members (teamData.ts -> team_members table):
--    INSERT INTO team_members (id, name, position, profile_pic_url, rank, connections, categories)
--    VALUES (...) for each member in meetTheTeamData
--
-- 2. Projects (projectsData.ts -> projects table):
--    INSERT INTO projects (id, title, status, description, technologies, github_url, image_url, type)
--    VALUES (...) for each project in projectsData
--
-- 3. Events (eventsData.ts -> events table):
--    INSERT INTO events (id, title, date, description, image_url, location, type, registration_url, recap_url, recap)
--    VALUES (...) for each event in eventsData
--
-- 4. Announcements (announcementsData.ts -> announcements table):
--    INSERT INTO announcements (id, date, title, description, image_url)
--    VALUES (...) for each announcement in announcementsData

-- ==================== DATABASE MIGRATION QUERY ====================
-- If you already have the team_members table with 'category TEXT' column,
-- use this query to migrate to 'categories TEXT[]':

-- Step 1: Add new categories column
-- ALTER TABLE team_members ADD COLUMN categories TEXT[];

-- Step 2: Migrate existing data (wrap single category in array)
-- UPDATE team_members SET categories = ARRAY[category];

-- Step 3: Drop old category column
-- ALTER TABLE team_members DROP COLUMN category;

-- Step 4: Add NOT NULL constraint
-- ALTER TABLE team_members ALTER COLUMN categories SET NOT NULL;

-- Step 5: Update indexes
-- DROP INDEX IF EXISTS idx_team_members_category;
-- DROP INDEX IF EXISTS idx_team_members_category_rank;
-- CREATE INDEX idx_team_members_categories ON team_members USING GIN(categories);
