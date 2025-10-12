// TypeScript types based on supabaseSchema.sql

// ==================== USER TYPES ====================
export interface User {
  uid: string
  username: string
  email: string
  created_at: string
  updated_at: string
  last_login?: string
  role: 'owner' | 'admin' | 'member'
  is_admin: boolean
  is_owner: boolean
  status: 'active' | 'inactive' | 'suspended'
  email_verified: boolean
}

// ==================== TEAM MEMBER TYPES ====================
export interface TeamMember {
  id: string
  user_id?: string
  name: string
  position: string
  profile_pic_url: string
  rank: number
  connections?: string[]
  categories: string[] // Can belong to multiple categories
  created_at?: string
  updated_at?: string
  updated_by?: string
}

export interface TeamCategory {
  categoryName: string
  members: TeamMember[]
}

// ==================== PROJECT TYPES ====================
export interface Project {
  id: string
  title: string
  status: 'On-going' | 'Completed'
  description: string
  technologies: string[]
  github_url: string
  image_url?: string
  type: 'current' | 'past'
  created_at?: string
  updated_at?: string
  created_by?: string
  github_stars?: number
  github_forks?: number
  github_contributors?: number
}

// ==================== EVENT TYPES ====================
export interface EventRecap {
  summary: string
  images: string[]
}

export interface Event {
  id: string
  title: string
  date: string // DATE field
  description: string
  image_url?: string
  location?: string
  type?: 'workshop' | 'hackathon' | 'networking' | 'social' | 'competition'
  registration_url?: string
  recap_url?: string
  recap?: EventRecap
  is_past: boolean
  created_at?: string
  updated_at?: string
  updated_by?: string
}

// ==================== ANNOUNCEMENT TYPES ====================
export interface Announcement {
  id: string
  date: string // Display date string
  title: string
  description: string
  image_url?: string
  link?: string
  created_at?: string
  updated_at?: string
  updated_by?: string
}

// ==================== FAQ TYPES ====================
export interface FAQ {
  id: number
  question: string
  answer: string
  display_order: number
  created_at?: string
  updated_at?: string
  updated_by?: string
}

// ==================== ACTIVITY LOG TYPES ====================
export interface ActivityLogChange {
  field: string
  old_value: any
  new_value: any
}

export interface ActivityLog {
  id: string
  user_id: string
  action: string
  collection: string
  document_id: string
  timestamp: string
  changes?: ActivityLogChange[]
  metadata?: Record<string, any>
}

// ==================== FORM TYPES ====================
export interface TeamMemberFormData extends Omit<TeamMember, 'created_at' | 'updated_at' | 'updated_by'> {}
export interface ProjectFormData extends Omit<Project, 'created_at' | 'updated_at' | 'created_by' | 'github_stars' | 'github_forks' | 'github_contributors'> {}
export interface EventFormData extends Omit<Event, 'created_at' | 'updated_at' | 'updated_by' | 'is_past'> {}
export interface AnnouncementFormData extends Omit<Announcement, 'created_at' | 'updated_at' | 'updated_by'> {}
export interface FAQFormData extends Omit<FAQ, 'id' | 'created_at' | 'updated_at' | 'updated_by'> {}

// ==================== API RESPONSE TYPES ====================
export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  page_size: number
}
