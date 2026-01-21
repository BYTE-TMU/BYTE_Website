// Team member interfaces
export interface Member {
  id: string
  name: string
  position: string
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
    profilePicUrl: 'https://picsum.photos/200/200?random=1',
    rank: 100,
    categories: ['Leadership'],
    connections: ['cos-001', 'head-strat-001', 'head-tech-001', 'vp-tech-001', 'vp-events-001', 'vp-community-001', 'vp-marketing-001']
  },
  {
    id: 'cos-001',
    name: 'Pearl Ved',
    position: 'Chief of Staff',
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
    profilePicUrl: 'https://picsum.photos/200/200?random=5',
    rank: 85,
    categories: ['Leadership', 'Strategic Team'],
    connections: ['pres-001', 'cos-001', 'vp-events-001', 'vp-community-001', 'vp-marketing-001']
  },
  {
    id: 'head-tech-001',
    name: 'Hetvi Modi',
    position: 'Head of Technical Operations',
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
    profilePicUrl: 'https://picsum.photos/200/200?random=4',
    rank: 80,
    categories: ['Strategic Team'],
    connections: ['pres-001', 'head-strat-001', 'events-assoc-001', 'events-assoc-002', 'events-assoc-003']
  },
  {
    id: 'vp-operations-001',
    name: 'Parth Patel',
    position: 'VP of Operations',
    profilePicUrl: 'https://picsum.photos/200/200?random=4',
    rank: 80,
    categories: ['Strategic Team'],
    connections: ['pres-001', 'head-strat-001', 'events-assoc-001', 'events-assoc-002', 'events-assoc-003']
  },
  {
    id: 'vp-community-001',
    name: 'Areej Ubaid',
    position: 'VP of Community',
    profilePicUrl: 'https://picsum.photos/200/200?random=23',
    rank: 80,
    categories: ['Strategic Team'],
    connections: ['pres-001', 'head-strat-001', 'community-assoc-001', 'community-assoc-002']
  },
  {
    id: 'vp-marketing-001',
    name: 'Naetri Niranjan',
    position: 'VP of Marketing',
    profilePicUrl: 'https://picsum.photos/200/200?random=24',
    rank: 80,
    categories: ['Strategic Team'],
    connections: ['pres-001', 'head-strat-001', 'designer-001']
  },
  {
    id: 'vp-tech-001',
    name: 'Jacob Mobin',
    position: 'VP of Technology',
    profilePicUrl: 'https://picsum.photos/200/200?random=3',
    rank: 80,
    categories: ['Technical Team'],
    connections: ['pres-001', 'head-tech-001', 'dir-frontend-001', 'dir-ai-001', 'dir-backend-001']
  },

  // Strategic Team Members (not in Leadership)
  {
    id: 'events-assoc-001',
    name: 'Rishita Patel',
    position: 'Events Associate',
    profilePicUrl: 'https://picsum.photos/200/200?random=6',
    rank: 60,
    categories: ['Strategic Team'],
    connections: ['vp-events-001']
  },
  {
    id: 'events-assoc-002',
    name: 'Nidhi Biswas',
    position: 'Events Associate',
    profilePicUrl: 'https://picsum.photos/200/200?random=27',
    rank: 60,
    categories: ['Strategic Team'],
    connections: ['vp-events-001']
  },
  {
    id: 'events-assoc-003',
    name: 'Michael Aya-ay',
    position: 'Events Associate',
    profilePicUrl: 'https://picsum.photos/200/200?random=28',
    rank: 60,
    categories: ['Strategic Team'],
    connections: ['vp-events-001']
  },
  {
    id: 'community-assoc-001',
    name: 'Nyra Thakur',
    position: 'Community Associate',
    profilePicUrl: 'https://picsum.photos/200/200?random=25',
    rank: 60,
    categories: ['Strategic Team'],
    connections: ['vp-community-001']
  },
  {
    id: 'community-assoc-002',
    name: 'Abanshaji Lukose',
    position: 'Community Associate',
    profilePicUrl: 'https://picsum.photos/200/200?random=26',
    rank: 60,
    categories: ['Strategic Team'],
    connections: ['vp-community-001']
  },

  // Technical Team Members (not in Leadership)
  {
    id: 'proj-exp-lead-001',
    name: 'Rayan Roshan',
    position: 'Project Experience Lead',
    profilePicUrl: 'https://picsum.photos/200/200?random=9',
    rank: 75,
    categories: ['Technical Team'],
    connections: ['head-tech-001', 'vp-tech-001']
  },
  {
    id: 'dir-backend-001',
    name: 'Roxie Reginold',
    position: 'Director of Backend Engineering',
    profilePicUrl: 'https://picsum.photos/200/200?random=12',
    rank: 70,
    categories: ['Technical Team'],
    connections: ['vp-tech-001', 'backend-eng-001', 'backend-eng-002']
  },
  {
    id: 'frontend-eng-001',
    name: 'Johan Philip',
    position: 'Director of Frontend Engineering',
    profilePicUrl: 'https://picsum.photos/200/200?random=13',
    rank: 70,
    categories: ['Technical Team'],
    connections: ['dir-frontend-001']
  },
  {
    id: 'frontend-eng-003',
    name: 'Ethan Cha',
    position: 'Frontend Engineer',
    profilePicUrl: 'https://picsum.photos/200/200?random=21',
    rank: 50,
    categories: ['Technical Team'],
    connections: ['dir-frontend-001']
  },
  {
    id: 'aiml-eng-001',
    name: 'Nancy Maliackel',
    position: 'Director of AI/ML Engineering',
    profilePicUrl: 'https://picsum.photos/200/200?random=15',
    rank: 70,
    categories: ['Technical Team'],
    connections: ['dir-ai-001']
  },
  {
    id: 'aiml-eng-001',
    name: 'Akbar Ali',
    position: 'AI/ML Engineer',
    profilePicUrl: 'https://picsum.photos/200/200?random=15',
    rank: 50,
    categories: ['Technical Team'],
    connections: ['dir-ai-001']
  },
  {
    id: 'aiml-eng-001',
    name: 'Sanjana Urba',
    position: 'AI/ML Engineer',
    profilePicUrl: 'https://picsum.photos/200/200?random=15',
    rank: 50,
    categories: ['Technical Team'],
    connections: ['dir-ai-001']
  },
  {
    id: 'backend-eng-001',
    name: 'Maha Baig',
    position: 'Backend Engineer',
    profilePicUrl: 'https://picsum.photos/200/200?random=18',
    rank: 50,
    categories: ['Technical Team'],
    connections: ['dir-backend-001']
  },
  {
    id: 'backend-eng-002',
    name: 'Elena Kim',
    position: 'Backend Engineer',
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
