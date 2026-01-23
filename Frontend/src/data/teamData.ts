// Team member interfaces
export interface Member {
  id: string
  name: string
  position: string
  roleDescription: string // Description of what this role does at BYTE
  profilePicUrl: string
  rank: number // Higher number = larger circle (President: 100, VP: 80, Director: 60, Manager: 50, Member: 40)
  categories: string[] // Categories this member belongs to (e.g., ['Leadership', 'Technical Team'])
  connections?: string[] // IDs of connected members for network visualization
}

export interface TeamCategory {
  categoryName: string
  members: Member[]
}

// Real team data from BYTE Executive Member List
// Note: Members are now defined once with multiple categories
// The data structure is then transformed to show members in all their categories
const allTeamMembers: Member[] = [
  // Leadership - President & COS
  {
    id: 'pres-001',
    name: 'Meet Patadia',
    position: 'President',
    roleDescription: 'Leads BYTE\'s vision and overall direction, fostering a thriving tech community at TMU while ensuring our organization delivers impactful experiences for all members.',
    profilePicUrl: 'https://picsum.photos/200/200?random=1',
    rank: 100,
    categories: ['Leadership'],
    connections: ['cos-001', 'head-strat-001', 'head-tech-001', 'vp-tech-001', 'vp-events-001', 'vp-community-001', 'vp-marketing-001']
  },
  {
    id: 'cos-001',
    name: 'Pearl Ved',
    position: 'Chief of Staff',
    roleDescription: 'Coordinates cross-team initiatives and ensures seamless operations across BYTE, bridging leadership with all departments to keep our organization running smoothly.',
    profilePicUrl: 'https://picsum.photos/200/200?random=2',
    rank: 95,
    categories: ['Leadership'],
    connections: ['pres-001', 'head-tech-001', 'head-strat-001']
  },

  // Heads - In both Leadership and their respective teams
  {
    id: 'head-strat-001',
    name: 'Yeji Lee',
    position: 'Head of Strategic Operations',
    roleDescription: 'Oversees BYTE\'s strategic initiatives including events, marketing, growth, and operations—ensuring our non-technical teams work in harmony to amplify our impact.',
    profilePicUrl: 'https://picsum.photos/200/200?random=5',
    rank: 85,
    categories: ['Leadership', 'Strategic Team'],
    connections: ['pres-001', 'cos-001', 'vp-events-001', 'vp-community-001', 'vp-marketing-001']
  },
  {
    id: 'head-tech-001',
    name: 'Hetvi Modi',
    position: 'Head of Technical Operations',
    roleDescription: 'Drives BYTE\'s technical vision, leading engineering teams across frontend, backend, and AI/ML to build innovative projects that advance our members\' skills.',
    profilePicUrl: 'https://picsum.photos/200/200?random=8',
    rank: 85,
    categories: ['Leadership', 'Technical Team'],
    connections: ['pres-001', 'cos-001', 'vp-tech-001', 'proj-exp-lead-001']
  },

  // VPs - In both Leadership and their respective teams
  {
    id: 'vp-events-001',
    name: 'Arshiya Das',
    position: 'VP of Events',
    roleDescription: 'Plans and executes BYTE\'s signature events, from workshops to networking nights, creating memorable experiences that bring the TMU tech community together.',
    profilePicUrl: 'https://picsum.photos/200/200?random=4',
    rank: 80,
    categories: ['Strategic Team'],
    connections: ['pres-001', 'head-strat-001', 'events-assoc-001', 'events-assoc-002', 'events-assoc-003']
  },
  {
    id: 'vp-finance-001',
    name: 'Vashisht Pawa',
    position: 'VP of Finance',
    roleDescription: 'Manages BYTE\'s budget and financial strategy, ensuring resources are allocated effectively to support our events, projects, and growth initiatives.',
    profilePicUrl: 'https://picsum.photos/200/200?random=4',
    rank: 80,
    categories: ['Strategic Team'],
    connections: ['pres-001', 'head-strat-001', 'finance-assoc-001', 'finance-assoc-002', 'corp-rel-assoc-001']
  },
  {
    id: 'vp-operations-001',
    name: 'Parth Pawa',
    position: 'VP of Operations',
    roleDescription: 'Ensures BYTE runs like a well-oiled machine, managing logistics, internal processes, and team coordination to support all our initiatives.',
    profilePicUrl: 'https://picsum.photos/200/200?random=4',
    rank: 80,
    categories: ['Strategic Team'],
    connections: ['pres-001', 'head-strat-001', 'operations-assoc-001', 'operations-assoc-002', 'operations-assoc-003']
  },
  {
    id: 'vp-growth-001',
    name: 'Areej Ubaid',
    position: 'VP of Growth',
    roleDescription: 'Expands BYTE\'s reach and membership, developing strategies to attract new members and partners while strengthening our presence in the TMU tech ecosystem.',
    profilePicUrl: 'https://picsum.photos/200/200?random=23',
    rank: 80,
    categories: ['Strategic Team'],
    connections: ['pres-001', 'head-strat-001', 'growth-assoc-001', 'growth-assoc-002']
  },
  {
    id: 'vp-marketing-001',
    name: 'Naetri Niranjan',
    position: 'VP of Marketing',
    roleDescription: 'Shapes BYTE\'s brand and voice, crafting compelling content and campaigns that showcase our events, projects, and community across all platforms.',
    profilePicUrl: 'https://picsum.photos/200/200?random=24',
    rank: 80,
    categories: ['Strategic Team'],
    connections: ['pres-001', 'head-strat-001', 'marketing-assoc-001', 'marketing-assoc-002', 'marketing-assoc-003']
  },
  {
    id: 'vp-tech-001',
    name: 'Jacob Mobin',
    position: 'VP of Technology',
    roleDescription: 'Leads BYTE\'s engineering efforts, guiding technical teams to build cutting-edge projects while fostering a culture of innovation and continuous learning.',
    profilePicUrl: 'https://picsum.photos/200/200?random=3',
    rank: 80,
    categories: ['Technical Team'],
    connections: ['pres-001', 'head-tech-001', 'dir-frontend-001', 'dir-ai-001', 'dir-backend-001']
  },

  // Strategic Team Members (not in Leadership)
  {
    id: 'marketing-assoc-001',
    name: 'Shahd Alkadi',
    position: 'Marketing Associate',
    roleDescription: 'Creates engaging content and graphics that communicate BYTE\'s message, helping spread the word about our events and initiatives to the TMU community.',
    profilePicUrl: 'https://picsum.photos/200/200?random=6',
    rank: 60,
    categories: ['Strategic Team'],
    connections: ['vp-marketing-001']
  },
  {
    id: 'marketing-assoc-002',
    name: 'Areej Shariq',
    position: 'Marketing Associate',
    roleDescription: 'Creates engaging content and graphics that communicate BYTE\'s message, helping spread the word about our events and initiatives to the TMU community.',
    profilePicUrl: 'https://picsum.photos/200/200?random=7',
    rank: 60,
    categories: ['Strategic Team'],
    connections: ['vp-marketing-001']
  },
  {
    id: 'marketing-assoc-003',
    name: 'Cerine Djerouni',
    position: 'Marketing Associate',
    roleDescription: 'Creates engaging content and graphics that communicate BYTE\'s message, helping spread the word about our events and initiatives to the TMU community.',
    profilePicUrl: 'https://picsum.photos/200/200?random=8',
    rank: 60,
    categories: ['Strategic Team'],
    connections: ['vp-marketing-001']
  },
  {
    id: 'events-assoc-001',
    name: 'Nidhi Biswas',
    position: 'Events Associate',
    roleDescription: 'Helps bring BYTE\'s events to life, handling logistics and coordination to ensure every workshop, hackathon, and networking session runs seamlessly.',
    profilePicUrl: 'https://picsum.photos/200/200?random=27',
    rank: 60,
    categories: ['Strategic Team'],
    connections: ['vp-events-001']
  },
  {
    id: 'events-assoc-002',
    name: 'Areej Tariq',
    position: 'Events Associate',
    roleDescription: 'Helps bring BYTE\'s events to life, handling logistics and coordination to ensure every workshop, hackathon, and networking session runs seamlessly.',
    profilePicUrl: 'https://picsum.photos/200/200?random=27',
    rank: 60,
    categories: ['Strategic Team'],
    connections: ['vp-events-001']
  },
  {
    id: 'events-assoc-003',
    name: 'Michael Aya-ay',
    position: 'Events Associate',
    roleDescription: 'Helps bring BYTE\'s events to life, handling logistics and coordination to ensure every workshop, hackathon, and networking session runs seamlessly.',
    profilePicUrl: 'https://picsum.photos/200/200?random=28',
    rank: 60,
    categories: ['Strategic Team'],
    connections: ['vp-events-001']
  },
  {
    id: 'growth-assoc-001',
    name: 'Nyra Thakur',
    position: 'Growth Associate',
    roleDescription: 'Drives member acquisition and engagement strategies, helping BYTE grow its community and build lasting connections with students passionate about tech.',
    profilePicUrl: 'https://picsum.photos/200/200?random=25',
    rank: 60,
    categories: ['Strategic Team'],
    connections: ['vp-growth-001']
  },
  {
    id: 'growth-assoc-002',
    name: 'Abanshaji Lukose',
    position: 'Growth Associate',
    roleDescription: 'Drives member acquisition and engagement strategies, helping BYTE grow its community and build lasting connections with students passionate about tech.',
    profilePicUrl: 'https://picsum.photos/200/200?random=26',
    rank: 60,
    categories: ['Strategic Team'],
    connections: ['vp-growth-001']
  },
  {
    id: 'finance-assoc-001',
    name: 'Umar Muhammad',
    position: 'Finance Associate',
    roleDescription: 'Supports BYTE\'s financial operations, assisting with budgeting, expense tracking, and ensuring our resources are used effectively.',
    profilePicUrl: 'https://picsum.photos/200/200?random=29',
    rank: 60,
    categories: ['Strategic Team'],
    connections: ['vp-finance-001']
  },
  {
    id: 'finance-assoc-002',
    name: 'Angelina Tibayan',
    position: 'Finance Associate',
    roleDescription: 'Supports BYTE\'s financial operations, assisting with budgeting, expense tracking, and ensuring our resources are used effectively.',
    profilePicUrl: 'https://picsum.photos/200/200?random=30',
    rank: 60,
    categories: ['Strategic Team'],
    connections: ['vp-finance-001']
  },
  {
    id: 'operations-assoc-001',
    name: 'Ronald Bessada',
    position: 'Operations Associate',
    roleDescription: 'Keeps BYTE\'s internal operations running smoothly, managing logistics and administrative tasks that power our day-to-day activities.',
    profilePicUrl: 'https://picsum.photos/200/200?random=30',
    rank: 60,
    categories: ['Strategic Team'],
    connections: ['vp-operations-001']
  },
  {
    id: 'operations-assoc-002',
    name: 'Sabesen Pathmanathan',
    position: 'Operations Associate',
    roleDescription: 'Keeps BYTE\'s internal operations running smoothly, managing logistics and administrative tasks that power our day-to-day activities.',
    profilePicUrl: 'https://picsum.photos/200/200?random=30',
    rank: 60,
    categories: ['Strategic Team'],
    connections: ['vp-operations-001']
  },
  {
    id: 'corp-rel-assoc-001',
    name: 'Jacky Jiang',
    position: 'Corporate Relations Associate',
    roleDescription: 'Builds partnerships with industry sponsors and companies, securing opportunities and resources that benefit BYTE members and our tech community.',
    profilePicUrl: 'https://picsum.photos/200/200?random=30',
    rank: 60,
    categories: ['Strategic Team'],
    connections: ['vp-finance-001']
  },

  // Technical Team Members (not in Leadership)
  {
    id: 'proj-exp-lead-001',
    name: 'Rayan Roshan',
    position: 'Project Experience Lead',
    roleDescription: 'Curates the technical project experience at BYTE, ensuring members have meaningful opportunities to build real-world skills through hands-on development.',
    profilePicUrl: 'https://picsum.photos/200/200?random=9',
    rank: 75,
    categories: ['Technical Team'],
    connections: ['head-tech-001', 'vp-tech-001']
  },
  {
    id: 'dir-backend-001',
    name: 'Roxie Reginold',
    position: 'Director of Backend Engineering',
    roleDescription: 'Leads BYTE\'s backend development efforts, architecting scalable APIs and databases that power our projects and teach members server-side skills.',
    profilePicUrl: 'https://picsum.photos/200/200?random=12',
    rank: 70,
    categories: ['Technical Team'],
    connections: ['vp-tech-001', 'backend-eng-001', 'backend-eng-002']
  },
  {
    id: 'frontend-eng-001',
    name: 'Johan Philip',
    position: 'Director of Frontend Engineering',
    roleDescription: 'Leads BYTE\'s frontend development, crafting beautiful user interfaces and mentoring team members in modern web technologies.',
    profilePicUrl: 'https://picsum.photos/200/200?random=13',
    rank: 70,
    categories: ['Technical Team'],
    connections: ['dir-frontend-001']
  },
  {
    id: 'frontend-eng-003',
    name: 'Ethan Cha',
    position: 'Frontend Engineer',
    roleDescription: 'Builds responsive and interactive web experiences for BYTE\'s projects, turning designs into polished, user-friendly interfaces.',
    profilePicUrl: 'https://picsum.photos/200/200?random=21',
    rank: 50,
    categories: ['Technical Team'],
    connections: ['dir-frontend-001']
  },
  {
    id: 'frontend-eng-003',
    name: 'Anthony Ma',
    position: 'Frontend Engineer',
    roleDescription: 'Builds responsive and interactive web experiences for BYTE\'s projects, turning designs into polished, user-friendly interfaces.',
    profilePicUrl: 'https://picsum.photos/200/200?random=21',
    rank: 50,
    categories: ['Technical Team'],
    connections: ['dir-frontend-001']
  },
  {
    id: 'frontend-eng-003',
    name: 'Stephen Nguyen',
    position: 'Frontend Engineer',
    roleDescription: 'Builds responsive and interactive web experiences for BYTE\'s projects, turning designs into polished, user-friendly interfaces.',
    profilePicUrl: 'https://picsum.photos/200/200?random=21',
    rank: 50,
    categories: ['Technical Team'],
    connections: ['dir-frontend-001']
  },
  {
    id: 'aiml-eng-001',
    name: 'Nancy Maliackel',
    position: 'Director of AI/ML Engineering',
    roleDescription: 'Leads BYTE\'s AI and machine learning initiatives, exploring cutting-edge technologies and guiding projects that push the boundaries of innovation.',
    profilePicUrl: 'https://picsum.photos/200/200?random=15',
    rank: 70,
    categories: ['Technical Team'],
    connections: ['dir-ai-001']
  },
  {
    id: 'aiml-eng-001',
    name: 'Akbar Ali',
    position: 'AI/ML Engineer',
    roleDescription: 'Develops machine learning models and AI solutions for BYTE\'s projects, applying data science techniques to solve real-world problems.',
    profilePicUrl: 'https://picsum.photos/200/200?random=15',
    rank: 50,
    categories: ['Technical Team'],
    connections: ['dir-ai-001']
  },
  {
    id: 'aiml-eng-001',
    name: 'Sanjana Urba',
    position: 'AI/ML Engineer',
    roleDescription: 'Develops machine learning models and AI solutions for BYTE\'s projects, applying data science techniques to solve real-world problems.',
    profilePicUrl: 'https://picsum.photos/200/200?random=15',
    rank: 50,
    categories: ['Technical Team'],
    connections: ['dir-ai-001']
  },
  {
    id: 'backend-eng-001',
    name: 'Maha Baig',
    position: 'Backend Engineer',
    roleDescription: 'Builds robust server-side systems and APIs for BYTE\'s projects, ensuring our applications are fast, secure, and scalable.',
    profilePicUrl: 'https://picsum.photos/200/200?random=18',
    rank: 50,
    categories: ['Technical Team'],
    connections: ['dir-backend-001']
  },
  {
    id: 'backend-eng-002',
    name: 'Elena Kim',
    position: 'Backend Engineer',
    roleDescription: 'Builds robust server-side systems and APIs for BYTE\'s projects, ensuring our applications are fast, secure, and scalable.',
    profilePicUrl: 'https://picsum.photos/200/200?random=19',
    rank: 50,
    categories: ['Technical Team'],
    connections: ['dir-backend-001']
  }
]

// Transform the flat member list into categorized structure
// This function groups members by their categories
function getMembersForCategory(categoryName: string): Member[] {
  return allTeamMembers
    .filter(member => member.categories.includes(categoryName))
    .sort((a, b) => b.rank - a.rank) // Sort by rank descending
}

// Export the categorized data structure for use in components
export const meetTheTeamData: TeamCategory[] = [
  {
    categoryName: 'Leadership',
    members: getMembersForCategory('Leadership')
  },
  {
    categoryName: 'Strategic Team',
    members: getMembersForCategory('Strategic Team')
  },
  {
    categoryName: 'Technical Team',
    members: getMembersForCategory('Technical Team')
  }
]

// export const projectContributorsData: TeamCategory[] = [
//   {
//     categoryName: 'Core Team',
//     members: [
//       {
//         id: 'core-001',
//         name: 'Alex Chen',
//         position: 'Lead Developer',
//         profilePicUrl: 'https://picsum.photos/200/200?random=15',
//         rank: 90,
//         categories: ['Core Team']
//       },
//       {
//         id: 'core-002',
//         name: 'Sarah Johnson',
//         position: 'Architecture Lead',
//         profilePicUrl: 'https://picsum.photos/200/200?random=16',
//         rank: 85,
//         categories: ['Core Team']
//       },
//       {
//         id: 'core-003',
//         name: 'Marcus Rodriguez',
//         position: 'Security Lead',
//         profilePicUrl: 'https://picsum.photos/200/200?random=17',
//         rank: 80,
//         categories: ['Core Team']
//       }
//     ]
//   },
//   {
//     categoryName: 'Inner Team',
//     members: [
//       {
//         id: 'inner-001',
//         name: 'Emily Zhang',
//         position: 'Backend Developer',
//         profilePicUrl: 'https://picsum.photos/200/200?random=18',
//         rank: 60,
//         categories: ['Inner Team']
//       },
//       {
//         id: 'inner-002',
//         name: 'David Park',
//         position: 'Frontend Developer',
//         profilePicUrl: 'https://picsum.photos/200/200?random=19',
//         rank: 60,
//         categories: ['Inner Team']
//       },
//       {
//         id: 'inner-003',
//         name: 'Lisa Wang',
//         position: 'AI Specialist',
//         profilePicUrl: 'https://picsum.photos/200/200?random=20',
//         rank: 55,
//         categories: ['Inner Team']
//       },
//       {
//         id: 'inner-004',
//         name: 'James Kim',
//         position: 'DevOps Engineer',
//         profilePicUrl: 'https://picsum.photos/200/200?random=21',
//         rank: 55,
//         categories: ['Inner Team']
//       }
//     ]
//   },
//   {
//     categoryName: 'Solo Developer',
//     members: [
//       {
//         id: 'solo-001',
//         name: 'Sophia Martinez',
//         position: 'Independent Contributor',
//         profilePicUrl: 'https://picsum.photos/200/200?random=22',
//         rank: 50,
//         categories: ['Solo Developer']
//       },
//       {
//         id: 'solo-002',
//         name: 'Ryan Thompson',
//         position: 'Open Source Contributor',
//         profilePicUrl: 'https://picsum.photos/200/200?random=23',
//         rank: 45,
//         categories: ['Solo Developer']
//       },
//       {
//         id: 'solo-003',
//         name: 'Anna Petrov',
//         position: 'Research Contributor',
//         profilePicUrl: 'https://picsum.photos/200/200?random=24',
//         rank: 45,
//         categories: ['Solo Developer']
//       }

//     ]
//   }
// ]
