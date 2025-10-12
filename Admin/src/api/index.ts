// Mock API Layer
// This simulates backend API calls following the supabaseSchema.sql structure
// All functions return Promises to mimic async API behavior
// Easy to swap with real API calls later

import type {
  TeamMember,
  Project,
  Event,
  Announcement,
  FAQ,
  User,
  ApiResponse,
  TeamMemberFormData,
  ProjectFormData,
  EventFormData,
  AnnouncementFormData,
  FAQFormData,
} from '../types'

import {
  mockDB,
  persistTeamMembers,
  persistProjects,
  persistEvents,
  persistAnnouncements,
  persistFAQs,
  persistUsers,
  getCurrentUser,
  setCurrentUser,
} from './mockData'

// Simulate network delay
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms))

// Generate unique IDs
const generateId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

// ==================== AUTHENTICATION ====================
export const authAPI = {
  async login(email: string, password: string): Promise<ApiResponse<User>> {
    await delay()

    // Mock authentication - in real app, this would validate against backend
    const user = mockDB.users.find(u => u.email === email)

    if (!user) {
      return { error: 'Invalid credentials' }
    }

    // For demo purposes, accept any password
    // In production, this would validate password hash
    const updatedUser = {
      ...user,
      last_login: new Date().toISOString(),
    }

    setCurrentUser(updatedUser)
    return { data: updatedUser, message: 'Login successful' }
  },

  async logout(): Promise<ApiResponse<null>> {
    await delay()
    setCurrentUser(null)
    return { message: 'Logged out successfully' }
  },

  async getCurrentUser(): Promise<ApiResponse<User>> {
    await delay()
    const user = getCurrentUser()
    if (!user) {
      return { error: 'Not authenticated' }
    }
    return { data: user }
  },
}

// ==================== TEAM MEMBERS API ====================
export const teamMembersAPI = {
  async getAll(): Promise<ApiResponse<TeamMember[]>> {
    await delay()
    return { data: [...mockDB.teamMembers] }
  },

  async getById(id: string): Promise<ApiResponse<TeamMember>> {
    await delay()
    const member = mockDB.teamMembers.find(m => m.id === id)
    if (!member) {
      return { error: 'Team member not found' }
    }
    return { data: member }
  },

  async getByCategory(category: string): Promise<ApiResponse<TeamMember[]>> {
    await delay()
    const members = mockDB.teamMembers.filter(m => m.categories.includes(category))
    return { data: members }
  },

  async create(data: TeamMemberFormData): Promise<ApiResponse<TeamMember>> {
    await delay()
    const currentUser = getCurrentUser()

    const newMember: TeamMember = {
      ...data,
      id: data.id || generateId('member'),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      updated_by: currentUser?.uid,
    }

    mockDB.teamMembers.push(newMember)
    persistTeamMembers(mockDB.teamMembers)

    return { data: newMember, message: 'Team member created successfully' }
  },

  async update(id: string, data: Partial<TeamMemberFormData>): Promise<ApiResponse<TeamMember>> {
    await delay()
    const index = mockDB.teamMembers.findIndex(m => m.id === id)

    if (index === -1) {
      return { error: 'Team member not found' }
    }

    const currentUser = getCurrentUser()
    const updatedMember: TeamMember = {
      ...mockDB.teamMembers[index],
      ...data,
      id, // Ensure ID doesn't change
      updated_at: new Date().toISOString(),
      updated_by: currentUser?.uid,
    }

    mockDB.teamMembers[index] = updatedMember
    persistTeamMembers(mockDB.teamMembers)

    return { data: updatedMember, message: 'Team member updated successfully' }
  },

  async delete(id: string): Promise<ApiResponse<null>> {
    await delay()
    const index = mockDB.teamMembers.findIndex(m => m.id === id)

    if (index === -1) {
      return { error: 'Team member not found' }
    }

    mockDB.teamMembers.splice(index, 1)
    persistTeamMembers(mockDB.teamMembers)

    return { message: 'Team member deleted successfully' }
  },
}

// ==================== PROJECTS API ====================
export const projectsAPI = {
  async getAll(): Promise<ApiResponse<Project[]>> {
    await delay()
    return { data: [...mockDB.projects] }
  },

  async getById(id: string): Promise<ApiResponse<Project>> {
    await delay()
    const project = mockDB.projects.find(p => p.id === id)
    if (!project) {
      return { error: 'Project not found' }
    }
    return { data: project }
  },

  async create(data: ProjectFormData): Promise<ApiResponse<Project>> {
    await delay()
    const currentUser = getCurrentUser()

    const newProject: Project = {
      ...data,
      id: data.id || generateId('project'),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: currentUser?.uid,
      github_stars: 0,
      github_forks: 0,
      github_contributors: 0,
    }

    mockDB.projects.push(newProject)
    persistProjects(mockDB.projects)

    return { data: newProject, message: 'Project created successfully' }
  },

  async update(id: string, data: Partial<ProjectFormData>): Promise<ApiResponse<Project>> {
    await delay()
    const index = mockDB.projects.findIndex(p => p.id === id)

    if (index === -1) {
      return { error: 'Project not found' }
    }

    const updatedProject: Project = {
      ...mockDB.projects[index],
      ...data,
      id,
      updated_at: new Date().toISOString(),
    }

    mockDB.projects[index] = updatedProject
    persistProjects(mockDB.projects)

    return { data: updatedProject, message: 'Project updated successfully' }
  },

  async delete(id: string): Promise<ApiResponse<null>> {
    await delay()
    const index = mockDB.projects.findIndex(p => p.id === id)

    if (index === -1) {
      return { error: 'Project not found' }
    }

    mockDB.projects.splice(index, 1)
    persistProjects(mockDB.projects)

    return { message: 'Project deleted successfully' }
  },
}

// ==================== EVENTS API ====================
export const eventsAPI = {
  async getAll(): Promise<ApiResponse<Event[]>> {
    await delay()
    return { data: [...mockDB.events] }
  },

  async getById(id: string): Promise<ApiResponse<Event>> {
    await delay()
    const event = mockDB.events.find(e => e.id === id)
    if (!event) {
      return { error: 'Event not found' }
    }
    return { data: event }
  },

  async create(data: EventFormData): Promise<ApiResponse<Event>> {
    await delay()
    const currentUser = getCurrentUser()

    // Calculate is_past based on date
    const eventDate = new Date(data.date)
    const isPast = eventDate < new Date()

    const newEvent: Event = {
      ...data,
      id: data.id || generateId('event'),
      is_past: isPast,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      updated_by: currentUser?.uid,
    }

    mockDB.events.push(newEvent)
    persistEvents(mockDB.events)

    return { data: newEvent, message: 'Event created successfully' }
  },

  async update(id: string, data: Partial<EventFormData>): Promise<ApiResponse<Event>> {
    await delay()
    const index = mockDB.events.findIndex(e => e.id === id)

    if (index === -1) {
      return { error: 'Event not found' }
    }

    const currentUser = getCurrentUser()
    const eventDate = new Date(data.date || mockDB.events[index].date)
    const isPast = eventDate < new Date()

    const updatedEvent: Event = {
      ...mockDB.events[index],
      ...data,
      id,
      is_past: isPast,
      updated_at: new Date().toISOString(),
      updated_by: currentUser?.uid,
    }

    mockDB.events[index] = updatedEvent
    persistEvents(mockDB.events)

    return { data: updatedEvent, message: 'Event updated successfully' }
  },

  async delete(id: string): Promise<ApiResponse<null>> {
    await delay()
    const index = mockDB.events.findIndex(e => e.id === id)

    if (index === -1) {
      return { error: 'Event not found' }
    }

    mockDB.events.splice(index, 1)
    persistEvents(mockDB.events)

    return { message: 'Event deleted successfully' }
  },
}

// ==================== ANNOUNCEMENTS API ====================
export const announcementsAPI = {
  async getAll(): Promise<ApiResponse<Announcement[]>> {
    await delay()
    return { data: [...mockDB.announcements] }
  },

  async getById(id: string): Promise<ApiResponse<Announcement>> {
    await delay()
    const announcement = mockDB.announcements.find(a => a.id === id)
    if (!announcement) {
      return { error: 'Announcement not found' }
    }
    return { data: announcement }
  },

  async create(data: AnnouncementFormData): Promise<ApiResponse<Announcement>> {
    await delay()
    const currentUser = getCurrentUser()

    const newAnnouncement: Announcement = {
      ...data,
      id: data.id || generateId('announcement'),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      updated_by: currentUser?.uid,
    }

    mockDB.announcements.push(newAnnouncement)
    persistAnnouncements(mockDB.announcements)

    return { data: newAnnouncement, message: 'Announcement created successfully' }
  },

  async update(id: string, data: Partial<AnnouncementFormData>): Promise<ApiResponse<Announcement>> {
    await delay()
    const index = mockDB.announcements.findIndex(a => a.id === id)

    if (index === -1) {
      return { error: 'Announcement not found' }
    }

    const currentUser = getCurrentUser()
    const updatedAnnouncement: Announcement = {
      ...mockDB.announcements[index],
      ...data,
      id,
      updated_at: new Date().toISOString(),
      updated_by: currentUser?.uid,
    }

    mockDB.announcements[index] = updatedAnnouncement
    persistAnnouncements(mockDB.announcements)

    return { data: updatedAnnouncement, message: 'Announcement updated successfully' }
  },

  async delete(id: string): Promise<ApiResponse<null>> {
    await delay()
    const index = mockDB.announcements.findIndex(a => a.id === id)

    if (index === -1) {
      return { error: 'Announcement not found' }
    }

    mockDB.announcements.splice(index, 1)
    persistAnnouncements(mockDB.announcements)

    return { message: 'Announcement deleted successfully' }
  },
}

// ==================== USERS API ====================
export const usersAPI = {
  async getAll(): Promise<ApiResponse<User[]>> {
    await delay()
    return { data: [...mockDB.users] }
  },

  async getById(uid: string): Promise<ApiResponse<User>> {
    await delay()
    const user = mockDB.users.find(u => u.uid === uid)
    if (!user) {
      return { error: 'User not found' }
    }
    return { data: user }
  },

  async updateRole(uid: string, newRole: 'owner' | 'admin' | 'member'): Promise<ApiResponse<User>> {
    await delay()
    const currentUser = getCurrentUser()

    // Only owners can update roles
    if (!currentUser?.is_owner) {
      return { error: 'Only owners can change user roles' }
    }

    const index = mockDB.users.findIndex(u => u.uid === uid)

    if (index === -1) {
      return { error: 'User not found' }
    }

    const updatedUser: User = {
      ...mockDB.users[index],
      role: newRole,
      is_admin: newRole === 'admin' || newRole === 'owner',
      is_owner: newRole === 'owner',
      updated_at: new Date().toISOString(),
    }

    mockDB.users[index] = updatedUser
    persistUsers(mockDB.users)

    // If updating current user, update session
    if (uid === currentUser.uid) {
      setCurrentUser(updatedUser)
    }

    return { data: updatedUser, message: 'User role updated successfully' }
  },
}

// ==================== FAQ API ====================
export const faqsAPI = {
  async getAll(): Promise<ApiResponse<FAQ[]>> {
    await delay()
    return { data: [...mockDB.faqs].sort((a, b) => a.display_order - b.display_order) }
  },

  async getById(id: number): Promise<ApiResponse<FAQ>> {
    await delay()
    const faq = mockDB.faqs.find(f => f.id === id)
    if (!faq) {
      return { error: 'FAQ not found' }
    }
    return { data: faq }
  },

  async create(data: FAQFormData): Promise<ApiResponse<FAQ>> {
    await delay()
    const currentUser = getCurrentUser()

    // Generate new ID (simulate SERIAL)
    const maxId = mockDB.faqs.length > 0 ? Math.max(...mockDB.faqs.map(f => f.id)) : 0
    const newFAQ: FAQ = {
      ...data,
      id: maxId + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      updated_by: currentUser?.uid,
    }

    mockDB.faqs.push(newFAQ)
    persistFAQs(mockDB.faqs)

    return { data: newFAQ, message: 'FAQ created successfully' }
  },

  async update(id: number, data: Partial<FAQFormData>): Promise<ApiResponse<FAQ>> {
    await delay()
    const index = mockDB.faqs.findIndex(f => f.id === id)

    if (index === -1) {
      return { error: 'FAQ not found' }
    }

    const currentUser = getCurrentUser()
    const updatedFAQ: FAQ = {
      ...mockDB.faqs[index],
      ...data,
      id,
      updated_at: new Date().toISOString(),
      updated_by: currentUser?.uid,
    }

    mockDB.faqs[index] = updatedFAQ
    persistFAQs(mockDB.faqs)

    return { data: updatedFAQ, message: 'FAQ updated successfully' }
  },

  async delete(id: number): Promise<ApiResponse<null>> {
    await delay()
    const index = mockDB.faqs.findIndex(f => f.id === id)

    if (index === -1) {
      return { error: 'FAQ not found' }
    }

    mockDB.faqs.splice(index, 1)
    persistFAQs(mockDB.faqs)

    return { message: 'FAQ deleted successfully' }
  },
}

// Export all APIs
export const api = {
  auth: authAPI,
  teamMembers: teamMembersAPI,
  projects: projectsAPI,
  events: eventsAPI,
  announcements: announcementsAPI,
  faqs: faqsAPI,
  users: usersAPI,
}
