-- BYTE Website - Supabase Seed Data
-- Insert queries for all initial data from Frontend
-- Run this after creating the database schema from supabaseSchema.sql

-- ==================== TEAM MEMBERS ====================
-- Insert all team members with their categories and connections

-- Leadership - President & COS
INSERT INTO team_members (id, name, position, profile_pic_url, rank, categories, connections)
VALUES
  ('pres-001', 'Meet Patadia', 'President', 'https://picsum.photos/200/200?random=1', 100,
   ARRAY['Leadership'],
   ARRAY['cos-001', 'head-strat-001', 'head-tech-001', 'vp-tech-001', 'vp-events-001', 'vp-community-001', 'vp-marketing-001']),

  ('cos-001', 'Pearl Ved', 'Chief of Staff', 'https://picsum.photos/200/200?random=2', 95,
   ARRAY['Leadership'],
   ARRAY['pres-001', 'head-tech-001', 'head-strat-001']);

-- Heads - In both Leadership and their respective teams
INSERT INTO team_members (id, name, position, profile_pic_url, rank, categories, connections)
VALUES
  ('head-strat-001', 'Yeji Lee', 'Head of Strategic Operations', 'https://picsum.photos/200/200?random=5', 85,
   ARRAY['Leadership', 'Strategic Team'],
   ARRAY['pres-001', 'cos-001', 'vp-events-001', 'vp-community-001', 'vp-marketing-001']),

  ('head-tech-001', 'Hetvi Modi', 'Head of Technical Operations', 'https://picsum.photos/200/200?random=8', 85,
   ARRAY['Leadership', 'Technical Team'],
   ARRAY['pres-001', 'cos-001', 'vp-tech-001', 'proj-exp-lead-001']);

-- VPs - In both Leadership and their respective teams
INSERT INTO team_members (id, name, position, profile_pic_url, rank, categories, connections)
VALUES
  ('vp-events-001', 'Arshiya Das', 'VP of Events', 'https://picsum.photos/200/200?random=4', 80,
   ARRAY['Leadership', 'Strategic Team'],
   ARRAY['pres-001', 'head-strat-001', 'events-assoc-001', 'events-assoc-002', 'events-assoc-003']),

  ('vp-community-001', 'Areej Ubaid', 'VP of Community', 'https://picsum.photos/200/200?random=23', 80,
   ARRAY['Leadership', 'Strategic Team'],
   ARRAY['pres-001', 'head-strat-001', 'community-assoc-001', 'community-assoc-002']),

  ('vp-marketing-001', 'Naetri Niranjan', 'VP of Marketing', 'https://picsum.photos/200/200?random=24', 80,
   ARRAY['Leadership', 'Strategic Team'],
   ARRAY['pres-001', 'head-strat-001', 'designer-001']),

  ('vp-tech-001', 'Jacob Mobin', 'VP of Technology', 'https://picsum.photos/200/200?random=3', 80,
   ARRAY['Leadership', 'Technical Team'],
   ARRAY['pres-001', 'head-tech-001', 'dir-frontend-001', 'dir-ai-001', 'dir-backend-001']);

-- Strategic Team Members (not in Leadership)
INSERT INTO team_members (id, name, position, profile_pic_url, rank, categories, connections)
VALUES
  ('events-assoc-001', 'Rishita Patel', 'Events Associate', 'https://picsum.photos/200/200?random=6', 60,
   ARRAY['Strategic Team'],
   ARRAY['vp-events-001']),

  ('events-assoc-002', 'Nidhi Biswas', 'Events Associate', 'https://picsum.photos/200/200?random=27', 60,
   ARRAY['Strategic Team'],
   ARRAY['vp-events-001']),

  ('events-assoc-003', 'Michael Aya-ay', 'Events Associate', 'https://picsum.photos/200/200?random=28', 60,
   ARRAY['Strategic Team'],
   ARRAY['vp-events-001']),

  ('community-assoc-001', 'Nyra Thakur', 'Community Associate', 'https://picsum.photos/200/200?random=25', 60,
   ARRAY['Strategic Team'],
   ARRAY['vp-community-001']),

  ('community-assoc-002', 'Abanshaji Lukose', 'Community Associate', 'https://picsum.photos/200/200?random=26', 60,
   ARRAY['Strategic Team'],
   ARRAY['vp-community-001']),

  ('designer-001', 'Zahra Zahra', 'Graphic Designer', 'https://picsum.photos/200/200?random=7', 60,
   ARRAY['Strategic Team'],
   ARRAY['vp-marketing-001']);

-- Technical Team Members (not in Leadership)
INSERT INTO team_members (id, name, position, profile_pic_url, rank, categories, connections)
VALUES
  ('proj-exp-lead-001', 'Rayan Roshan', 'Project Experience Lead', 'https://picsum.photos/200/200?random=9', 75,
   ARRAY['Technical Team'],
   ARRAY['head-tech-001', 'vp-tech-001']),

  ('dir-frontend-001', 'Mashrufa Orchi', 'Director of Frontend Engineering', 'https://picsum.photos/200/200?random=10', 70,
   ARRAY['Technical Team'],
   ARRAY['vp-tech-001', 'frontend-eng-001', 'frontend-eng-002', 'frontend-eng-003']),

  ('dir-ai-001', 'Prisha Thakkar', 'Director of AI/ML Engineering', 'https://picsum.photos/200/200?random=11', 70,
   ARRAY['Technical Team'],
   ARRAY['vp-tech-001', 'aiml-eng-001', 'aiml-eng-002', 'aiml-eng-003']),

  ('dir-backend-001', 'Roxie Reginold', 'Director of Backend Engineering', 'https://picsum.photos/200/200?random=12', 70,
   ARRAY['Technical Team'],
   ARRAY['vp-tech-001', 'backend-eng-001', 'backend-eng-002']),

  ('frontend-eng-001', 'Johan Philip', 'Frontend Engineer', 'https://picsum.photos/200/200?random=13', 50,
   ARRAY['Technical Team'],
   ARRAY['dir-frontend-001']),

  ('frontend-eng-002', 'Alex Nguyen', 'Frontend Engineer', 'https://picsum.photos/200/200?random=14', 50,
   ARRAY['Technical Team'],
   ARRAY['dir-frontend-001']),

  ('frontend-eng-003', 'Ethan Cha', 'Frontend Engineer', 'https://picsum.photos/200/200?random=21', 50,
   ARRAY['Technical Team'],
   ARRAY['dir-frontend-001']),

  ('aiml-eng-001', 'Nancy Maliackel', 'AI/ML Engineer', 'https://picsum.photos/200/200?random=15', 50,
   ARRAY['Technical Team'],
   ARRAY['dir-ai-001']),

  ('aiml-eng-002', 'Joshua Joseph', 'AI/ML Engineer', 'https://picsum.photos/200/200?random=16', 50,
   ARRAY['Technical Team'],
   ARRAY['dir-ai-001']),

  ('aiml-eng-003', 'Gajanan Vigneswaran', 'AI/ML Engineer', 'https://picsum.photos/200/200?random=17', 50,
   ARRAY['Technical Team'],
   ARRAY['dir-ai-001']),

  ('backend-eng-001', 'Maha Baig', 'Backend Engineer', 'https://picsum.photos/200/200?random=18', 50,
   ARRAY['Technical Team'],
   ARRAY['dir-backend-001']),

  ('backend-eng-002', 'Elena Kim', 'Backend Engineer', 'https://picsum.photos/200/200?random=19', 50,
   ARRAY['Technical Team'],
   ARRAY['dir-backend-001']);

-- ==================== PROJECTS ====================
-- Insert current projects

INSERT INTO projects (id, title, status, description, technologies, github_url, type)
VALUES
  ('1', 'SecureBYTE', 'On-going',
   'This project aims to develop a Python-based AI-powered code vulnerability scanner that uses static code analysis and LLMs to detect potential security flaws and logical issues in user-submitted code. The goal is to combine traditional static analysis with natural language reasoning to identify vulnerabilities, offer insights, and suggest remediations. The MVP will focus solely on Python code to ensure high quality and manageable scope within one semester. It will scan for security and logic issues and even develop test cases for the project.',
   ARRAY['Python', 'Flask', 'React', 'JavaScript', 'TailwindCSS', 'Firebase'],
   'https://github.com/byte-org/securebyte',
   'current');

-- ==================== EVENTS ====================
-- Insert past events with recaps

INSERT INTO events (id, title, date, description, image_url, location, type, recap_url, recap, is_past)
VALUES
  ('past-1', 'USSTM Involvement Fair', '2025-08-25',
   'BYTE''s first tabling event to inform students about our AI-focused student organization and gain interest from potential members.',
   'https://picsum.photos/320/180?random=10',
   'TMU Student Centre',
   'networking',
   'https://byte.org/recaps/usstm-fair-2025',
   '{"summary": "Our debut at the USSTM Involvement Fair was a great success! We introduced BYTE to the TMU community, explaining our mission as a student-led, open-source AI organization. Many students showed interest in our hands-on approach to AI development and our upcoming SecureBYTE project. We collected contact information from over 50 interested students.", "images": ["https://picsum.photos/800/600?random=usstm1", "https://picsum.photos/800/600?random=usstm2", "https://picsum.photos/800/600?random=usstm3"]}'::jsonb,
   true),

  ('past-2', 'TMSU Campus Group Fair', '2025-09-04',
   'Another tabling opportunity to showcase BYTE and connect with students interested in AI development and open-source projects.',
   'https://picsum.photos/320/180?random=11',
   'TMU Quad',
   'networking',
   'https://byte.org/recaps/tmsu-fair-2025',
   '{"summary": "The TMSU Campus Group Fair provided another excellent opportunity to expand our reach. We had engaging conversations with students from various programs about AI, machine learning, and our collaborative project approach. The event helped us build momentum leading up to our official launch event.", "images": ["https://picsum.photos/800/600?random=tmsu1", "https://picsum.photos/800/600?random=tmsu2", "https://picsum.photos/800/600?random=tmsu3", "https://picsum.photos/800/600?random=tmsu4"]}'::jsonb,
   true),

  ('past-3', 'BYTE Launch Event', '2025-09-19',
   'The official launch event for BYTE! Join us to learn about our organization, meet the executive team, network with fellow AI enthusiasts, and discover how you can get involved in our projects.',
   'https://picsum.photos/320/180?random=12',
   'TMU Student Learning Centre',
   'social',
   'https://byte.org/recaps/launch-event-2025',
   '{"summary": "Our official launch event exceeded all expectations! Students attended to learn about BYTE''s mission and vision. We presented our SecureBYTE project, conducted networking sessions, and welcomed many new members to our community. The event featured presentations from our executive team, interactive demos, and an exciting roadmap for the semester ahead.", "images": ["https://picsum.photos/800/600?random=launch1", "https://picsum.photos/800/600?random=launch2", "https://picsum.photos/800/600?random=launch3", "https://picsum.photos/800/600?random=launch4", "https://picsum.photos/800/600?random=launch5"]}'::jsonb,
   true);

-- ==================== ANNOUNCEMENTS ====================
-- Insert all announcements

INSERT INTO announcements (id, date, title, description, image_url)
VALUES
  ('ann-1', 'Sep 12, 2025', 'Join Us at the BYTE Launch Event!',
   'Don''t miss our official launch event on September 19th! Meet the executive team, network with fellow AI enthusiasts, learn about our exciting projects including SecureBYTE, and discover how you can get involved in our student-led AI organization.',
   'https://picsum.photos/320/180?random=1'),

  ('ann-2', 'Aug 28, 2025', 'Find BYTE at the TMSU Campus Group Fair',
   'Visit our table at the TMSU Campus Group Fair on September 4th! Learn about our hands-on approach to AI development, our open-source projects, and how you can be part of TMU''s premier AI student organization.',
   'https://picsum.photos/320/180?random=2'),

  ('ann-3', 'Aug 18, 2025', 'Meet BYTE at the USSTM Involvement Fair',
   'Stop by our table at the USSTM Involvement Fair on August 25th! Discover what BYTE is all about - we''re a student-led AI organization focused on building real-world projects and gaining hands-on experience in artificial intelligence.',
   'https://picsum.photos/320/180?random=3'),

  ('ann-4', 'Jun 9, 2025', 'Welcome to BYTE!',
   'BYTE is a student-led, open-source AI organization at Toronto Metropolitan University. We''re like a startup within a university where students don''t just learn about AI - they build it through collaborative, real-world projects.',
   'https://picsum.photos/320/180?random=4');

-- ==================== FAQ ====================
-- Insert all FAQs

INSERT INTO faqs (question, answer, display_order)
VALUES
  ('Who can join BYTE? Do I need prior AI experience?',
   'BYTE is open to all students regardless of experience level. Whether you''re a complete beginner or have advanced AI knowledge, we welcome you! We provide mentorship and learning opportunities to help members at every stage of their journey.',
   1),

  ('What''s the difference between General Members and Team Members?',
   'General Members have access to our Discord community, workshops, networking events, and can choose to contribute to our projects with mentorship from team members. Team Members additionally work on core BYTE projects like SecureBYTE, mentor the general members, and contribute to our events.',
   2),

  ('What types of projects does BYTE work on?',
   'We focus on AI applications that solve real-world problems. Our flagship project SecureBYTE uses AI for code security analysis. We also work on machine learning models, natural language processing tools, computer vision applications, and other innovative AI solutions that benefit the developer community.',
   3),

  ('Does BYTE organize events?',
   'Yes! We regularly host workshops, networking events, and tech talks. We organize both beginner-friendly learning sessions and advanced technical workshops. Check our Events page for upcoming activities and our Discord for real-time updates.',
   4),

  ('How much time commitment is expected?',
   'It depends on your involvement level. General Members can participate as much or as little as they want - attend events, join Discord discussions, etc. Team Members typically commit 5-10 hours per week to project work, but this is flexible around academic schedules.',
   5),

  ('How can I contribute to open-source projects?',
   'All our projects, including SecureBYTE, are community built. General Members can contribute to our project by signing up through the link in our instagram or click join on our website and fill out the form. We provide guidance on making your first open-source contributions and help you build a strong GitHub portfolio.',
   6);

-- ==================== SUMMARY ====================
-- Data insertion complete!
--
-- Inserted:
-- - 23 team members (Leadership, Strategic Team, Technical Team)
-- - 1 project (SecureBYTE)
-- - 3 events (all past events with recaps)
-- - 4 announcements
-- - 6 FAQs
--
-- Next steps:
-- 1. Verify all data was inserted: SELECT COUNT(*) FROM team_members;
-- 2. Check categories work: SELECT * FROM team_members_by_category WHERE category = 'Leadership';
-- 3. Check FAQs: SELECT * FROM faqs ORDER BY display_order;
-- 4. Test the Admin dashboard with real Supabase data
