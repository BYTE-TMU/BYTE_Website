// Mock data store that simulates a backend database
// This uses localStorage for persistence during development
// Can be easily swapped with real API calls later

import type { TeamMember, Project, Event, Announcement, FAQ, User } from '../types'

// Storage keys
const STORAGE_KEYS = {
  TEAM_MEMBERS: 'admin_team_members',
  PROJECTS: 'admin_projects',
  EVENTS: 'admin_events',
  ANNOUNCEMENTS: 'admin_announcements',
  FAQS: 'admin_faqs',
  USERS: 'admin_users',
  CURRENT_USER: 'admin_current_user',
}

// Initialize data from Frontend mock data or localStorage
function getStoredData<T>(key: string, defaultData: T[]): T[] {
  const stored = localStorage.getItem(key)
  return stored ? JSON.parse(stored) : defaultData
}

function setStoredData<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data))
}

// Initial data seeded from Frontend data files
const initialData = {
  teamMembers: [
    // Leadership - President & COS
    {
      id: 'pres-001',
      name: 'Meet Patadia',
      position: 'President',
      profile_pic_url: 'https://picsum.photos/200/200?random=1',
      rank: 100,
      categories: ['Leadership'],
      connections: ['cos-001', 'head-strat-001', 'head-tech-001', 'vp-tech-001', 'vp-events-001', 'vp-community-001', 'vp-marketing-001']
    },
    {
      id: 'cos-001',
      name: 'Pearl Ved',
      position: 'Chief of Staff',
      profile_pic_url: 'https://picsum.photos/200/200?random=2',
      rank: 95,
      categories: ['Leadership'],
      connections: ['pres-001', 'head-tech-001', 'head-strat-001']
    },
    // Heads - In both Leadership and their respective teams
    {
      id: 'head-strat-001',
      name: 'Yeji Lee',
      position: 'Head of Strategic Operations',
      profile_pic_url: 'https://picsum.photos/200/200?random=5',
      rank: 85,
      categories: ['Leadership', 'Strategic Team'],
      connections: ['pres-001', 'cos-001', 'vp-events-001', 'vp-community-001', 'vp-marketing-001']
    },
    {
      id: 'head-tech-001',
      name: 'Hetvi Modi',
      position: 'Head of Technical Operations',
      profile_pic_url: 'https://picsum.photos/200/200?random=8',
      rank: 85,
      categories: ['Leadership', 'Technical Team'],
      connections: ['pres-001', 'cos-001', 'vp-tech-001', 'proj-exp-lead-001']
    },
    // VPs - In both Leadership and their respective teams
    {
      id: 'vp-events-001',
      name: 'Arshiya Das',
      position: 'VP of Events',
      profile_pic_url: 'https://picsum.photos/200/200?random=4',
      rank: 80,
      categories: ['Leadership', 'Strategic Team'],
      connections: ['pres-001', 'head-strat-001', 'events-assoc-001', 'events-assoc-002', 'events-assoc-003']
    },
    {
      id: 'vp-community-001',
      name: 'Areej Ubaid',
      position: 'VP of Community',
      profile_pic_url: 'https://picsum.photos/200/200?random=23',
      rank: 80,
      categories: ['Leadership', 'Strategic Team'],
      connections: ['pres-001', 'head-strat-001', 'community-assoc-001', 'community-assoc-002']
    },
    {
      id: 'vp-marketing-001',
      name: 'Naetri Niranjan',
      position: 'VP of Marketing',
      profile_pic_url: 'https://picsum.photos/200/200?random=24',
      rank: 80,
      categories: ['Leadership', 'Strategic Team'],
      connections: ['pres-001', 'head-strat-001', 'designer-001']
    },
    {
      id: 'vp-tech-001',
      name: 'Jacob Mobin',
      position: 'VP of Technology',
      profile_pic_url: 'https://picsum.photos/200/200?random=3',
      rank: 80,
      categories: ['Leadership', 'Technical Team'],
      connections: ['pres-001', 'head-tech-001', 'dir-frontend-001', 'dir-ai-001', 'dir-backend-001']
    },
    // Strategic Team Members (not in Leadership)
    {
      id: 'events-assoc-001',
      name: 'Rishita Patel',
      position: 'Events Associate',
      profile_pic_url: 'https://picsum.photos/200/200?random=6',
      rank: 60,
      categories: ['Strategic Team'],
      connections: ['vp-events-001']
    },
    {
      id: 'events-assoc-002',
      name: 'Nidhi Biswas',
      position: 'Events Associate',
      profile_pic_url: 'https://picsum.photos/200/200?random=27',
      rank: 60,
      categories: ['Strategic Team'],
      connections: ['vp-events-001']
    },
    {
      id: 'events-assoc-003',
      name: 'Michael Aya-ay',
      position: 'Events Associate',
      profile_pic_url: 'https://picsum.photos/200/200?random=28',
      rank: 60,
      categories: ['Strategic Team'],
      connections: ['vp-events-001']
    },
    {
      id: 'community-assoc-001',
      name: 'Nyra Thakur',
      position: 'Community Associate',
      profile_pic_url: 'https://picsum.photos/200/200?random=25',
      rank: 60,
      categories: ['Strategic Team'],
      connections: ['vp-community-001']
    },
    {
      id: 'community-assoc-002',
      name: 'Abanshaji Lukose',
      position: 'Community Associate',
      profile_pic_url: 'https://picsum.photos/200/200?random=26',
      rank: 60,
      categories: ['Strategic Team'],
      connections: ['vp-community-001']
    },
    {
      id: 'designer-001',
      name: 'Zahra Zahra',
      position: 'Graphic Designer',
      profile_pic_url: 'https://picsum.photos/200/200?random=7',
      rank: 60,
      categories: ['Strategic Team'],
      connections: ['vp-marketing-001']
    },
    // Technical Team Members (not in Leadership)
    {
      id: 'proj-exp-lead-001',
      name: 'Rayan Roshan',
      position: 'Project Experience Lead',
      profile_pic_url: 'https://picsum.photos/200/200?random=9',
      rank: 75,
      categories: ['Technical Team'],
      connections: ['head-tech-001', 'vp-tech-001']
    },
    {
      id: 'dir-frontend-001',
      name: 'Mashrufa Orchi',
      position: 'Director of Frontend Engineering',
      profile_pic_url: 'https://picsum.photos/200/200?random=10',
      rank: 70,
      categories: ['Technical Team'],
      connections: ['vp-tech-001', 'frontend-eng-001', 'frontend-eng-002', 'frontend-eng-003']
    },
    {
      id: 'dir-ai-001',
      name: 'Prisha Thakkar',
      position: 'Director of AI/ML Engineering',
      profile_pic_url: 'https://picsum.photos/200/200?random=11',
      rank: 70,
      categories: ['Technical Team'],
      connections: ['vp-tech-001', 'aiml-eng-001', 'aiml-eng-002', 'aiml-eng-003']
    },
    {
      id: 'dir-backend-001',
      name: 'Roxie Reginold',
      position: 'Director of Backend Engineering',
      profile_pic_url: 'https://picsum.photos/200/200?random=12',
      rank: 70,
      categories: ['Technical Team'],
      connections: ['vp-tech-001', 'backend-eng-001', 'backend-eng-002']
    },
    {
      id: 'frontend-eng-001',
      name: 'Johan Philip',
      position: 'Frontend Engineer',
      profile_pic_url: 'https://picsum.photos/200/200?random=13',
      rank: 50,
      categories: ['Technical Team'],
      connections: ['dir-frontend-001']
    },
    {
      id: 'frontend-eng-002',
      name: 'Alex Nguyen',
      position: 'Frontend Engineer',
      profile_pic_url: 'https://picsum.photos/200/200?random=14',
      rank: 50,
      categories: ['Technical Team'],
      connections: ['dir-frontend-001']
    },
    {
      id: 'frontend-eng-003',
      name: 'Ethan Cha',
      position: 'Frontend Engineer',
      profile_pic_url: 'https://picsum.photos/200/200?random=21',
      rank: 50,
      categories: ['Technical Team'],
      connections: ['dir-frontend-001']
    },
    {
      id: 'aiml-eng-001',
      name: 'Nancy Maliackel',
      position: 'AI/ML Engineer',
      profile_pic_url: 'https://picsum.photos/200/200?random=15',
      rank: 50,
      categories: ['Technical Team'],
      connections: ['dir-ai-001']
    },
    {
      id: 'aiml-eng-002',
      name: 'Joshua Joseph',
      position: 'AI/ML Engineer',
      profile_pic_url: 'https://picsum.photos/200/200?random=16',
      rank: 50,
      categories: ['Technical Team'],
      connections: ['dir-ai-001']
    },
    {
      id: 'aiml-eng-003',
      name: 'Gajanan Vigneswaran',
      position: 'AI/ML Engineer',
      profile_pic_url: 'https://picsum.photos/200/200?random=17',
      rank: 50,
      categories: ['Technical Team'],
      connections: ['dir-ai-001']
    },
    {
      id: 'backend-eng-001',
      name: 'Maha Baig',
      position: 'Backend Engineer',
      profile_pic_url: 'https://picsum.photos/200/200?random=18',
      rank: 50,
      categories: ['Technical Team'],
      connections: ['dir-backend-001']
    },
    {
      id: 'backend-eng-002',
      name: 'Elena Kim',
      position: 'Backend Engineer',
      profile_pic_url: 'https://picsum.photos/200/200?random=19',
      rank: 50,
      categories: ['Technical Team'],
      connections: ['dir-backend-001']
    }
  ] as TeamMember[],

  projects: [
    {
      id: '1',
      title: 'SecureBYTE',
      status: 'On-going' as const,
      description: 'This project aims to develop a Python-based AI-powered code vulnerability scanner that uses static code analysis and LLMs to detect potential security flaws and logical issues in user-submitted code. The goal is to combine traditional static analysis with natural language reasoning to identify vulnerabilities, offer insights, and suggest remediations. The MVP will focus solely on Python code to ensure high quality and manageable scope within one semester. It will scan for security and logic issues and even develop test cases for the project.',
      technologies: ['Python', 'Flask', 'React', 'JavaScript', 'TailwindCSS', 'Firebase'],
      github_url: 'https://github.com/byte-org/securebyte',
      type: 'current' as const
    }
  ] as Project[],

  events: [
    {
      id: 'past-1',
      title: 'USSTM Involvement Fair',
      date: '2025-08-25',
      description: 'BYTE\'s first tabling event to inform students about our AI-focused student organization and gain interest from potential members.',
      image_url: 'https://picsum.photos/320/180?random=10',
      location: 'TMU Student Centre',
      type: 'networking' as const,
      recap_url: 'https://byte.org/recaps/usstm-fair-2025',
      recap: {
        summary: 'Our debut at the USSTM Involvement Fair was a great success! We introduced BYTE to the TMU community, explaining our mission as a student-led, open-source AI organization. Many students showed interest in our hands-on approach to AI development and our upcoming SecureBYTE project. We collected contact information from over 50 interested students.',
        images: [
          'https://picsum.photos/800/600?random=usstm1',
          'https://picsum.photos/800/600?random=usstm2',
          'https://picsum.photos/800/600?random=usstm3'
        ]
      },
      is_past: true
    },
    {
      id: 'past-2',
      title: 'TMSU Campus Group Fair',
      date: '2025-09-04',
      description: 'Another tabling opportunity to showcase BYTE and connect with students interested in AI development and open-source projects.',
      image_url: 'https://picsum.photos/320/180?random=11',
      location: 'TMU Quad',
      type: 'networking' as const,
      recap_url: 'https://byte.org/recaps/tmsu-fair-2025',
      recap: {
        summary: 'The TMSU Campus Group Fair provided another excellent opportunity to expand our reach. We had engaging conversations with students from various programs about AI, machine learning, and our collaborative project approach. The event helped us build momentum leading up to our official launch event.',
        images: [
          'https://picsum.photos/800/600?random=tmsu1',
          'https://picsum.photos/800/600?random=tmsu2',
          'https://picsum.photos/800/600?random=tmsu3',
          'https://picsum.photos/800/600?random=tmsu4'
        ]
      },
      is_past: true
    },
    {
      id: 'past-3',
      title: 'BYTE Launch Event',
      date: '2025-09-19',
      description: 'The official launch event for BYTE! Join us to learn about our organization, meet the executive team, network with fellow AI enthusiasts, and discover how you can get involved in our projects.',
      image_url: 'https://picsum.photos/320/180?random=12',
      location: 'TMU Student Learning Centre',
      type: 'social' as const,
      recap_url: 'https://byte.org/recaps/launch-event-2025',
      recap: {
        summary: 'Our official launch event exceeded all expectations! Over 120 students attended to learn about BYTE\'s mission and vision. We presented our SecureBYTE project, conducted networking sessions, and welcomed many new members to our community. The event featured presentations from our executive team, interactive demos, and an exciting roadmap for the semester ahead.',
        images: [
          'https://picsum.photos/800/600?random=launch1',
          'https://picsum.photos/800/600?random=launch2',
          'https://picsum.photos/800/600?random=launch3',
          'https://picsum.photos/800/600?random=launch4',
          'https://picsum.photos/800/600?random=launch5'
        ]
      },
      is_past: true
    }
  ] as Event[],

  announcements: [
    {
      id: 'ann-1',
      date: 'Sep 12, 2025',
      title: 'Join Us at the BYTE Launch Event!',
      description: 'Don\'t miss our official launch event on September 19th! Meet the executive team, network with fellow AI enthusiasts, learn about our exciting projects including SecureBYTE, and discover how you can get involved in our student-led AI organization.',
      image_url: 'https://picsum.photos/320/180?random=1'
    },
    {
      id: 'ann-2',
      date: 'Aug 28, 2025',
      title: 'Find BYTE at the TMSU Campus Group Fair',
      description: 'Visit our table at the TMSU Campus Group Fair on September 4th! Learn about our hands-on approach to AI development, our open-source projects, and how you can be part of TMU\'s premier AI student organization.',
      image_url: 'https://picsum.photos/320/180?random=2'
    },
    {
      id: 'ann-3',
      date: 'Aug 18, 2025',
      title: 'Meet BYTE at the USSTM Involvement Fair',
      description: 'Stop by our table at the USSTM Involvement Fair on August 25th! Discover what BYTE is all about - we\'re a student-led AI organization focused on building real-world projects and gaining hands-on experience in artificial intelligence.',
      image_url: 'https://picsum.photos/320/180?random=3'
    },
    {
      id: 'ann-4',
      date: 'Jun 9, 2025',
      title: 'Welcome to BYTE!',
      description: 'BYTE is a student-led, open-source AI organization at Toronto Metropolitan University. We\'re like a startup within a university where students don\'t just learn about AI - they build it through collaborative, real-world projects.',
      image_url: 'https://picsum.photos/320/180?random=4'
    }
  ] as Announcement[],

  faqs: [
    {
      id: 1,
      question: 'Who can join BYTE? Do I need prior AI experience?',
      answer: 'BYTE is open to all students regardless of experience level. Whether you\'re a complete beginner or have advanced AI knowledge, we welcome you! We provide mentorship and learning opportunities to help members at every stage of their journey.',
      display_order: 1
    },
    {
      id: 2,
      question: 'What\'s the difference between General Members and Team Members?',
      answer: 'General Members have access to our Discord community, workshops, and networking events. Team Members additionally work on core BYTE projects like SecureBYTE, have direct mentorship from leads, and contribute to our open-source initiatives with more responsibility and learning opportunities.',
      display_order: 2
    },
    {
      id: 3,
      question: 'What types of projects does BYTE work on?',
      answer: 'We focus on AI applications that solve real-world problems. Our flagship project SecureBYTE uses AI for code security analysis. We also work on machine learning models, natural language processing tools, computer vision applications, and other innovative AI solutions that benefit the developer community.',
      display_order: 3
    },
    {
      id: 4,
      question: 'Does BYTE organize hackathons and events?',
      answer: 'Yes! We regularly host workshops, networking events, tech talks, and participate in hackathons. We organize both beginner-friendly learning sessions and advanced technical workshops. Check our Events page for upcoming activities and our Discord for real-time updates.',
      display_order: 4
    },
    {
      id: 5,
      question: 'Are there research opportunities available?',
      answer: 'Absolutely! BYTE collaborates with faculty on AI research projects and encourages members to pursue independent research. Team Members often have opportunities to co-author papers, present at conferences, and work on cutting-edge AI research alongside experienced mentors.',
      display_order: 5
    },
    {
      id: 6,
      question: 'How much time commitment is expected?',
      answer: 'It depends on your involvement level. General Members can participate as much or as little as they want - attend events, join Discord discussions, etc. Team Members typically commit 5-10 hours per week to project work, but this is flexible around academic schedules.',
      display_order: 6
    },
    {
      id: 7,
      question: 'How can I contribute to open-source projects?',
      answer: 'All our projects, including SecureBYTE, are open-source on GitHub. General Members can contribute through our public repositories, while Team Members work on core development. We provide guidance on making your first open-source contributions and help you build a strong GitHub portfolio.',
      display_order: 7
    }
  ] as FAQ[],

  users: [
    {
      uid: 'owner-001',
      username: 'admin',
      email: 'admin@byte.org',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      role: 'owner' as const,
      is_admin: true,
      is_owner: true,
      status: 'active' as const,
      email_verified: true,
    },
  ] as User[],
}

// Mock database
export const mockDB = {
  teamMembers: getStoredData(STORAGE_KEYS.TEAM_MEMBERS, initialData.teamMembers),
  projects: getStoredData(STORAGE_KEYS.PROJECTS, initialData.projects),
  events: getStoredData(STORAGE_KEYS.EVENTS, initialData.events),
  announcements: getStoredData(STORAGE_KEYS.ANNOUNCEMENTS, initialData.announcements),
  faqs: getStoredData(STORAGE_KEYS.FAQS, initialData.faqs),
  users: getStoredData(STORAGE_KEYS.USERS, initialData.users),
}

// Persistence helpers
export function persistTeamMembers(data: TeamMember[]) {
  mockDB.teamMembers = data
  setStoredData(STORAGE_KEYS.TEAM_MEMBERS, data)
}

export function persistProjects(data: Project[]) {
  mockDB.projects = data
  setStoredData(STORAGE_KEYS.PROJECTS, data)
}

export function persistEvents(data: Event[]) {
  mockDB.events = data
  setStoredData(STORAGE_KEYS.EVENTS, data)
}

export function persistAnnouncements(data: Announcement[]) {
  mockDB.announcements = data
  setStoredData(STORAGE_KEYS.ANNOUNCEMENTS, data)
}

export function persistFAQs(data: FAQ[]) {
  mockDB.faqs = data
  setStoredData(STORAGE_KEYS.FAQS, data)
}

export function persistUsers(data: User[]) {
  mockDB.users = data
  setStoredData(STORAGE_KEYS.USERS, data)
}

// Current user session
export function setCurrentUser(user: User | null) {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user))
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
  }
}

export function getCurrentUser(): User | null {
  const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_USER)
  return stored ? JSON.parse(stored) : null
}

// Reset all data (useful for development)
export function resetMockData() {
  localStorage.clear()
  mockDB.teamMembers = []
  mockDB.projects = []
  mockDB.events = []
  mockDB.announcements = []
  mockDB.faqs = []
  mockDB.users = initialData.users
}
