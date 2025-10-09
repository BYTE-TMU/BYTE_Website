/**
 * Firebase NoSQL Database Schema for BYTE Website
 *
 * This schema defines the structure for all Firestore collections.
 * Firebase stores data in collections (similar to tables) containing documents (similar to rows).
 * Each document is identified by a unique ID and contains fields (key-value pairs).
 *
 * Based on actual data structures from:
 * - Frontend/src/data/teamData.ts
 * - Frontend/src/data/projectsData.ts
 * - Frontend/src/data/eventsData.ts
 * - Frontend/src/data/announcementsData.ts
 */

// ==================== USERS COLLECTION ====================
export interface User {
  uid: string;                    // Firebase Auth UID (Primary Key)
  username: string;               // Unique username
  email: string;                  // User email (from Firebase Auth)
  createdAt: string;              // ISO timestamp
  updatedAt: string;              // ISO timestamp
  lastLogin?: string;             // ISO timestamp

  // Role-based access control
  role: 'owner' | 'admin' | 'member';  // User role
  isAdmin: boolean;               // Quick admin check (denormalized)
  isOwner: boolean;               // Quick owner check (denormalized)

  // Additional fields
  status: 'active' | 'inactive' | 'suspended';
  emailVerified: boolean;         // From Firebase Auth
}

// ==================== TEAM MEMBERS COLLECTION ====================
export interface TeamMember {
  id: string;                     // Document ID (e.g., 'pres-001', 'vp-tech-001')
  userId?: string;                // Reference to Users collection (optional - for members who have accounts)
  name: string;                   // Member's full name
  position: string;               // Position/role in BYTE (e.g., 'President', 'VP of Technology')
  profilePicUrl: string;          // Profile picture URL
  rank: number;                   // Hierarchy rank (President: 100, VP: 80-90, Director: 60-70, etc.)
  connections?: string[];         // Array of team member IDs they connect to (for org chart)

  // Category grouping
  category: 'Leadership' | 'Strategic Team' | 'Technical Team';

  // Metadata
  createdAt: string;              // ISO timestamp
  updatedAt: string;              // ISO timestamp
  updatedBy?: string;             // User ID who updated this entry
  isActive: boolean;              // Whether member is currently active

  // Optional fields
  bio?: string;                   // Biography/description
  linkedin?: string;              // LinkedIn profile
  github?: string;                // GitHub profile
  email?: string;                 // Contact email
}

// ==================== PROJECTS COLLECTION ====================

export interface Project {
  id: string;                     // Document ID
  title: string;                  // Project title
  status: 'On-going' | 'Completed';  // Project status
  description: string;            // Detailed project description
  technologies: string[];         // Array of technologies used (e.g., ['Python', 'Flask', 'React'])
  githubUrl: string;              // GitHub repository URL
  imageUrl?: string;              // Project thumbnail/banner image
  type: 'current' | 'past';       // Project timeline categorization

  // Metadata
  createdAt: string;              // ISO timestamp
  updatedAt: string;              // ISO timestamp
  createdBy?: string;             // User ID who created this project

  // Additional fields
  featured?: boolean;             // Whether project is featured on homepage
  teamMembers?: string[];         // Array of TeamMember IDs working on project
  liveUrl?: string;               // Live demo URL (if applicable)

  // GitHub stats (can be updated via API)
  stats?: {
    stars?: number;               // GitHub stars
    forks?: number;               // GitHub forks
    contributors?: number;        // Number of contributors
  };
}

// ==================== EVENTS COLLECTION ====================

export interface EventRecap {
  summary: string;                // Event recap summary
  images: string[];               // Array of event photo URLs
}

export interface Event {
  id: string;                     // Document ID
  title: string;                  // Event title
  date: string;                   // Date string (ISO format recommended: 'YYYY-MM-DD')
  description: string;            // Event description
  imageUrl?: string;              // Event banner/poster image URL
  location?: string;              // Event location (physical or virtual)
  type?: 'workshop' | 'hackathon' | 'networking' | 'social' | 'competition';
  registrationUrl?: string;       // External registration URL
  recapUrl?: string;              // URL to full recap (if available)
  recap?: EventRecap;             // Event recap object (for past events)

  // Computed field (based on date)
  isPast: boolean;                // Whether event has already occurred

  // Metadata
  createdAt: string;              // ISO timestamp
  updatedAt: string;              // ISO timestamp
  updatedBy?: string;             // User ID who updated this event

}

// ==================== ANNOUNCEMENTS COLLECTION ====================

export interface Announcement {
  id: string;                     // Document ID
  date: string;                   // Display date string (e.g., 'Sep 12, 2025')
  title: string;                  // Announcement title
  description: string;            // Announcement description/content
  imageUrl?: string;              // Optional image URL

  // Metadata
  createdAt: string;              // ISO timestamp
  updatedAt: string;              // ISO timestamp
  updatedBy?: string;             // User ID who updated this announcement

  link?: string;                  // Optional external link
}



// ==================== ACTIVITY LOG COLLECTION ====================

export interface ActivityLog {
  id: string;                     // Document ID
  userId: string;                 // User who performed the action
  action: string;                 // Action performed (e.g., 'created_project', 'updated_member')
  collection: string;             // Collection affected
  documentId: string;             // Document ID affected
  timestamp: string;              // ISO timestamp

  // Action details
  changes?: {                     // What was changed
    field: string;
    oldValue: any;
    newValue: any;
  }[];

  metadata?: Record<string, any>; // Additional metadata
}

// ==================== COLLECTION PATHS ====================
export const COLLECTIONS = {
  USERS: 'users',
  TEAM_MEMBERS: 'teamMembers',
  PROJECTS: 'projects',
  EVENTS: 'events',
  ANNOUNCEMENTS: 'announcements',
  PROJECT_CONTRIBUTORS: 'projectContributors',
  CONTACT_SUBMISSIONS: 'contactSubmissions',
  EVENT_REGISTRATIONS: 'eventRegistrations',
  ACTIVITY_LOG: 'activityLog',
} as const;

// ==================== FIRESTORE SECURITY RULES GUIDE ====================
/**
 * Recommended Firestore Security Rules:
 *
 * rules_version = '2';
 * service cloud.firestore {
 *   match /databases/{database}/documents {
 *
 *     // Helper functions
 *     function isAuthenticated() {
 *       return request.auth != null;
 *     }
 *
 *     function isOwner() {
 *       return isAuthenticated() &&
 *              get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isOwner == true;
 *     }
 *
 *     function isAdmin() {
 *       return isAuthenticated() &&
 *              get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
 *     }
 *
 *     // Users collection
 *     match /users/{userId} {
 *       allow read: if isAuthenticated();
 *       allow create: if isAuthenticated() && request.auth.uid == userId;
 *       allow update: if isAuthenticated() &&
 *                     (request.auth.uid == userId || isAdmin());
 *       allow delete: if isOwner();
 *     }
 *
 *     // Team Members collection
 *     match /teamMembers/{memberId} {
 *       allow read: if true; // Public read
 *       allow write: if isAdmin();
 *     }
 *
 *     // Projects collection
 *     match /projects/{projectId} {
 *       allow read: if true; // Public read
 *       allow write: if isAdmin();
 *     }
 *
 *     // Events collection
 *     match /events/{eventId} {
 *       allow read: if true; // Public read
 *       allow write: if isAdmin();
 *     }
 *
 *     // Announcements collection
 *     match /announcements/{announcementId} {
 *       allow read: if resource.data.isPublished == true; // Only published announcements are public
 *       allow write: if isAdmin();
 *     }
 *
 *     // Project Contributors collection
 *     match /projectContributors/{contributorId} {
 *       allow read: if true; // Public read
 *       allow write: if isAdmin();
 *     }
 *
 *     // Contact submissions
 *     match /contactSubmissions/{submissionId} {
 *       allow read: if isAdmin();
 *       allow create: if true; // Anyone can submit
 *       allow update, delete: if isAdmin();
 *     }
 *
 *     // Event registrations
 *     match /eventRegistrations/{registrationId} {
 *       allow read: if isAuthenticated() &&
 *                   (request.auth.uid == resource.data.userId || isAdmin());
 *       allow create: if true; // Anyone can register
 *       allow update, delete: if isAdmin();
 *     }
 *
 *     // Activity log
 *     match /activityLog/{logId} {
 *       allow read: if isAdmin();
 *       allow create: if isAdmin();
 *       allow update, delete: if isOwner();
 *     }
 *   }
 * }
 */

// ==================== INDEXES RECOMMENDATIONS ====================
/**
 * Recommended Firestore Composite Indexes:
 *
 * Collection: teamMembers
 * - category (Ascending) + rank (Descending)
 * - category (Ascending) + isActive (Ascending) + rank (Descending)
 * - isActive (Ascending) + createdAt (Descending)
 *
 * Collection: projects
 * - type (Ascending) + status (Ascending)
 * - featured (Ascending) + type (Ascending)
 * - status (Ascending) + updatedAt (Descending)
 *
 * Collection: events
 * - isPast (Ascending) + date (Ascending)
 * - isPast (Ascending) + date (Descending)
 * - type (Ascending) + isPast (Ascending) + date (Ascending)
 * - isPublished (Ascending) + isPast (Ascending) + date (Ascending)
 *
 * Collection: announcements
 * - isPublished (Ascending) + createdAt (Descending)
 * - isPublished (Ascending) + priority (Descending) + createdAt (Descending)
 * - type (Ascending) + isPublished (Ascending) + createdAt (Descending)
 *
 * Collection: projectContributors
 * - projectId (Ascending) + category (Ascending) + rank (Descending)
 * - projectId (Ascending) + rank (Descending)
 *
 * Collection: contactSubmissions
 * - status (Ascending) + createdAt (Descending)
 *
 * Collection: eventRegistrations
 * - eventId (Ascending) + status (Ascending)
 * - userId (Ascending) + registeredAt (Descending)
 * - eventId (Ascending) + status (Ascending) + registeredAt (Descending)
 *
 * Collection: activityLog
 * - userId (Ascending) + timestamp (Descending)
 * - collection (Ascending) + timestamp (Descending)
 * - collection (Ascending) + documentId (Ascending) + timestamp (Descending)
 */

// ==================== MIGRATION GUIDE ====================
/**
 * To migrate existing data from Frontend/src/data/* to Firebase:
 *
 * 1. Team Members (teamData.ts -> teamMembers collection):
 *    - Map meetTheTeamData array to teamMembers collection
 *    - Add category field from TeamCategory.categoryName
 *    - Add metadata fields (createdAt, updatedAt, isActive, etc.)
 *
 * 2. Projects (projectsData.ts -> projects collection):
 *    - Map projectsData array to projects collection
 *    - Add metadata fields
 *    - Optionally fetch GitHub stats via GitHub API
 *
 * 3. Events (eventsData.ts -> events collection):
 *    - Map eventsData array to events collection
 *    - Calculate isPast field based on current date vs event date
 *    - Add isPublished field (default to true for existing events)
 *
 * 4. Announcements (announcementsData.ts -> announcements collection):
 *    - Map announcementsData array to announcements collection
 *    - Add isPublished field (default to true)
 *    - Optionally add priority and type fields
 *
 * 5. Project Contributors (teamData.ts -> projectContributors collection):
 *    - Map projectContributorsData to projectContributors collection
 *    - Link to appropriate projectId
 */
