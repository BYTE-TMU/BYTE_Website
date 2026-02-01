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
  email?: string // Optional email address
  linkedInUrl?: string // Optional LinkedIn profile URL
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
    profilePicUrl: '/images/BYTE Website - Member Photos/Meet_Patadia.jpg',
    rank: 100,
    categories: ['Leadership'],
    connections: ['cos-001', 'head-strat-001', 'head-tech-001', 'vp-tech-001', 'vp-events-001', 'vp-community-001', 'vp-marketing-001'],
    email: 'mpatadia@torontomu.ca',
    linkedInUrl: 'https://www.linkedin.com/in/meet-patadia-958729282/'
  },
  {
    id: 'cos-001',
    name: 'Pearl Ved',
    position: 'Chief of Staff',
    roleDescription: 'Coordinates cross-team initiatives and ensures seamless operations across BYTE, bridging leadership with all departments to keep our organization running smoothly.',
    profilePicUrl: '/images/BYTE Website - Member Photos/strategy_image_default.jpg',
    rank: 95,
    categories: ['Leadership'],
    connections: ['pres-001', 'head-tech-001', 'head-strat-001'],
    email: 'pearl.ved@torontomu.ca',
    linkedInUrl: 'https://www.linkedin.com/in/pearlved/'
  },

  // Heads - In both Leadership and their respective teams
  {
    id: 'head-strat-001',
    name: 'Yeji Lee',
    position: 'Head of Strategic Operations',
    roleDescription: 'Oversees BYTE\'s strategic initiatives including events, marketing, growth, and operations—ensuring our non-technical teams work in harmony to amplify our impact.',
    profilePicUrl: '/images/BYTE Website - Member Photos/strategy_image_default.jpg',
    rank: 85,
    categories: ['Leadership', 'Strategic Team'],
    connections: ['pres-001', 'cos-001', 'vp-events-001', 'vp-community-001', 'vp-marketing-001'],
    email: 'yeji1.lee@torontomu.ca',
    linkedInUrl: 'https://www.linkedin.com/in/yeji-lee3/'
  },
  {
    id: 'head-tech-001',
    name: 'Hetvi Modi',
    position: 'Head of Technical Operations',
    roleDescription: 'Drives BYTE\'s technical vision, leading engineering teams across frontend, backend, and AI/ML to build innovative projects that advance our members\' skills.',
    profilePicUrl: '/images/BYTE Website - Member Photos/technology_image_default.jpg',
    rank: 85,
    categories: ['Leadership', 'Technical Team'],
    connections: ['pres-001', 'cos-001', 'vp-tech-001', 'proj-exp-lead-001'],
    email: 'hetvi.modi@torontomu.ca',
    linkedInUrl: 'https://www.linkedin.com/in/hetvi-m-3a670025b/'
  },

  // VPs - In both Leadership and their respective teams
  {
    id: 'vp-events-001',
    name: 'Arshiya Das',
    position: 'VP of Events',
    roleDescription: 'Plans and executes BYTE\'s signature events, from workshops to networking nights, creating memorable experiences that bring the TMU tech community together.',
    profilePicUrl: '/images/BYTE Website - Member Photos/Arshiya_Das.jpeg',
    rank: 80,
    categories: ['Strategic Team'],
    connections: ['pres-001', 'head-strat-001', 'events-assoc-001', 'events-assoc-002', 'events-assoc-003'],
    email: 'arshiya.das@torontomu.ca',
    linkedInUrl: 'https://www.linkedin.com/in/arshiya-das-b97209331/'
  },
  {
    id: 'vp-finance-001',
    name: 'Vashisht Pawa',
    position: 'VP of Finance',
    roleDescription: 'Manages BYTE\'s budget and financial strategy, ensuring resources are allocated effectively to support our events, projects, and growth initiatives.',
    profilePicUrl: '/images/BYTE Website - Member Photos/vashisht_pawa.png',
    rank: 80,
    categories: ['Strategic Team'],
    connections: ['pres-001', 'head-strat-001', 'finance-assoc-001', 'finance-assoc-002', 'corp-rel-assoc-001'],
    email: 'vpawa@torontomu.ca',
    linkedInUrl: 'https://www.linkedin.com/in/vpawa/'
  },
  {
    id: 'vp-operations-001',
    name: 'Parth Pawa',
    position: 'VP of Operations',
    roleDescription: 'Ensures BYTE runs like a well-oiled machine, managing logistics, internal processes, and team coordination to support all our initiatives.',
    profilePicUrl: '/images/BYTE Website - Member Photos/Parth Pawa_7.JPG',
    rank: 80,
    categories: ['Strategic Team'],
    connections: ['pres-001', 'head-strat-001', 'operations-assoc-001', 'operations-assoc-002', 'operations-assoc-003'],
    email: 'parth.pawa@torontomu.ca',
    linkedInUrl: 'https://www.linkedin.com/in/parth-pawa-7ab14a222/'
  },
  {
    id: 'vp-growth-001',
    name: 'Areej Ubaid',
    position: 'VP of Growth',
    roleDescription: 'Expands BYTE\'s reach and membership, developing strategies to attract new members and partners while strengthening our presence in the TMU tech ecosystem.',
    profilePicUrl: '/images/BYTE Website - Member Photos/areej_ubaid.png',
    rank: 80,
    categories: ['Strategic Team'],
    connections: ['pres-001', 'head-strat-001', 'growth-assoc-001', 'growth-assoc-002'],
    email: 'areej.ubaid@torontomu.ca',
    linkedInUrl: 'https://www.linkedin.com/in/areej-ubaid/'
  },
  {
    id: 'vp-marketing-001',
    name: 'Naetri Niranjan',
    position: 'VP of Marketing',
    roleDescription: 'Shapes BYTE\'s brand and voice, crafting compelling content and campaigns that showcase our events, projects, and community across all platforms.',
    profilePicUrl: '/images/BYTE Website - Member Photos/Naetri_Niranjan.png',
    rank: 80,
    categories: ['Strategic Team'],
    connections: ['pres-001', 'head-strat-001', 'marketing-assoc-001', 'marketing-assoc-002', 'marketing-assoc-003', 'marketing-assoc-004'],
    email: 'naetri.niranjan@torontomu.ca',
    linkedInUrl: 'https://www.linkedin.com/in/naetri-niranjan/'
  },
  {
    id: 'vp-tech-001',
    name: 'Jacob Mobin',
    position: 'VP of Technology',
    roleDescription: 'Leads BYTE\'s engineering efforts, guiding technical teams to build cutting-edge projects while fostering a culture of innovation and continuous learning.',
    profilePicUrl: '/images/BYTE Website - Member Photos/technology_image_default.jpg',
    rank: 80,
    categories: ['Technical Team'],
    connections: ['pres-001', 'head-tech-001', 'dir-frontend-001', 'dir-ai-001', 'dir-backend-001'],
    email: 'jacob.mobin@torontomu.ca',
    linkedInUrl: 'https://www.linkedin.com/in/jacob-mobin/'
  },

  // Strategic Team Members (not in Leadership)
  {
    id: 'marketing-assoc-001',
    name: 'Shahd Alkadi',
    position: 'Marketing Associate',
    roleDescription: 'Creates engaging content and graphics that communicate BYTE\'s message, helping spread the word about our events and initiatives to the TMU community.',
    profilePicUrl: '/images/BYTE Website - Member Photos/Shahd_Alkadi.jpg',
    rank: 60,
    categories: ['Strategic Team'],
    connections: ['vp-marketing-001'],
    email: 'shahd.alkadi@torontomu.ca',
    linkedInUrl: 'https://www.linkedin.com/in/shahd-alkadi/'
  },
  {
    id: 'marketing-assoc-002',
    name: 'Areej Shariq',
    position: 'Marketing Associate',
    roleDescription: 'Creates engaging content and graphics that communicate BYTE\'s message, helping spread the word about our events and initiatives to the TMU community.',
    profilePicUrl: '/images/BYTE Website - Member Photos/Areej_s.jpeg',
    rank: 60,
    categories: ['Strategic Team'],
    connections: ['vp-marketing-001'],
    email: 'areej.shariq@torontomu.ca',
    linkedInUrl: 'https://www.linkedin.com/in/areejs/'
  },
  {
    id: 'marketing-assoc-003',
    name: 'Cerine Djerouni',
    position: 'Marketing Associate',
    roleDescription: 'Creates engaging content and graphics that communicate BYTE\'s message, helping spread the word about our events and initiatives to the TMU community.',
    profilePicUrl: '/images/BYTE Website - Member Photos/Cérine_Djerouni.JPG',
    rank: 60,
    categories: ['Strategic Team'],
    connections: ['vp-marketing-001'],
    email: 'cerine.djerouni@torontomu.ca',
    linkedInUrl: 'https://www.linkedin.com/in/c%C3%A9rine-djerouni-785803334/'
  },
  {
    id: 'marketing-assoc-004',
    name: 'Yuvin Cho',
    position: 'Marketing Associate',
    roleDescription: 'Creates engaging content and graphics that communicate BYTE\'s message, helping spread the word about our events and initiatives to the TMU community.',
    profilePicUrl: '/images/BYTE Website - Member Photos/Yuvin_Cho.jpg',
    rank: 60,
    categories: ['Strategic Team'],
    connections: ['vp-marketing-001'],
    email: 'yuvin.cho@torontomu.ca'
  },
  {
    id: 'events-assoc-001',
    name: 'Nidhi Biswas',
    position: 'Events Associate',
    roleDescription: 'Helps bring BYTE\'s events to life, handling logistics and coordination to ensure every workshop, hackathon, and networking session runs seamlessly.',
    profilePicUrl: '/images/BYTE Website - Member Photos/Nidhi_Biswas.JPG',
    rank: 60,
    categories: ['Strategic Team'],
    connections: ['vp-events-001'],
    email: 'nidhi.biswas@torontomu.ca'
  },
  {
    id: 'events-assoc-002',
    name: 'Areej Tariq',
    position: 'Events Associate',
    roleDescription: 'Helps bring BYTE\'s events to life, handling logistics and coordination to ensure every workshop, hackathon, and networking session runs seamlessly.',
    profilePicUrl: '/images/BYTE Website - Member Photos/Areej_Tariq.jpg',
    rank: 60,
    categories: ['Strategic Team'],
    connections: ['vp-events-001'],
    email: 'areej1.tariq@torontomu.ca',
    linkedInUrl: 'https://www.linkedin.com/in/-areejtariq-/'
  },
  {
    id: 'events-assoc-003',
    name: 'Michael Aya-ay',
    position: 'Events Associate',
    roleDescription: 'Helps bring BYTE\'s events to life, handling logistics and coordination to ensure every workshop, hackathon, and networking session runs seamlessly.',
    profilePicUrl: '/images/BYTE Website - Member Photos/Michael_Aya-ay.PNG',
    rank: 60,
    categories: ['Strategic Team'],
    connections: ['vp-events-001'],
    email: 'michael.aya@torontomu.ca',
    linkedInUrl: 'https://www.linkedin.com/in/michael-aya-ay-397634246/'
  },
  {
    id: 'growth-assoc-001',
    name: 'Nyra Thakur',
    position: 'Growth Associate',
    roleDescription: 'Drives member acquisition and engagement strategies, helping BYTE grow its community and build lasting connections with students passionate about tech.',
    profilePicUrl: '/images/BYTE Website - Member Photos/strategy_image_default.jpg',
    rank: 60,
    categories: ['Strategic Team'],
    connections: ['vp-growth-001'],
    email: 'nyra.thakur@torontomu.ca'
  },
  {
    id: 'growth-assoc-002',
    name: 'Abanshaji Lukose',
    position: 'Growth Associate',
    roleDescription: 'Drives member acquisition and engagement strategies, helping BYTE grow its community and build lasting connections with students passionate about tech.',
    profilePicUrl: '/images/BYTE Website - Member Photos/abanshaji_lukose.jpg',
    rank: 60,
    categories: ['Strategic Team'],
    connections: ['vp-growth-001'],
    email: 'abanshaji.lukose@torontomu.ca',
    linkedInUrl: 'https://www.linkedin.com/in/abanshaji/'
  },
  {
    id: 'finance-assoc-001',
    name: 'Umar Muhammad',
    position: 'Finance Associate',
    roleDescription: 'Supports BYTE\'s financial operations, assisting with budgeting, expense tracking, and ensuring our resources are used effectively.',
    profilePicUrl: '/images/BYTE Website - Member Photos/umar_muhammad.jpeg',
    rank: 60,
    categories: ['Strategic Team'],
    connections: ['vp-finance-001'],
    email: 'u1muhammad@torontomu.ca',
    linkedInUrl: 'https://www.linkedin.com/in/umarmoe/'
  },
  {
    id: 'finance-assoc-002',
    name: 'Angelina Tibayan',
    position: 'Finance Associate',
    roleDescription: 'Supports BYTE\'s financial operations, assisting with budgeting, expense tracking, and ensuring our resources are used effectively.',
    profilePicUrl: '/images/BYTE Website - Member Photos/Angelina_Tibayan.jpg',
    rank: 60,
    categories: ['Strategic Team'],
    connections: ['vp-finance-001'],
    email: 'angelina.tibayan@torontomu.ca',
    linkedInUrl: 'https://www.linkedin.com/in/angelina-tibayan/'
  },
  {
    id: 'operations-assoc-001',
    name: 'Ronald Bessada',
    position: 'Operations Associate',
    roleDescription: 'Keeps BYTE\'s internal operations running smoothly, managing logistics and administrative tasks that power our day-to-day activities.',
    profilePicUrl: '/images/BYTE Website - Member Photos/strategy_image_default.jpg',
    rank: 60,
    categories: ['Strategic Team'],
    connections: ['vp-operations-001'],
    email: 'ronald.bessada@torontomu.ca',
    linkedInUrl: 'https://www.linkedin.com/in/ronald-bessada-3b176a34a/'
  },
  {
    id: 'operations-assoc-002',
    name: 'Sabesen Pathmanathan',
    position: 'Operations Associate',
    roleDescription: 'Keeps BYTE\'s internal operations running smoothly, managing logistics and administrative tasks that power our day-to-day activities.',
    profilePicUrl: '/images/BYTE Website - Member Photos/sabesen_pathmanathan.jpg',
    rank: 60,
    categories: ['Strategic Team'],
    connections: ['vp-operations-001'],
    email: 'sabesen.pathmanathan@torontomu.ca',
    linkedInUrl: 'https://www.linkedin.com/in/sabesen-pathmanathan/'
  },
  {
    id: 'corp-rel-assoc-001',
    name: 'Jacky Jiang',
    position: 'Corporate Relations Associate',
    roleDescription: 'Builds partnerships with industry sponsors and companies, securing opportunities and resources that benefit BYTE members and our tech community.',
    profilePicUrl: '/images/BYTE Website - Member Photos/strategy_image_default.jpg',
    rank: 60,
    categories: ['Strategic Team'],
    connections: ['vp-finance-001'],
    email: 'jacky.jiang@torontomu.ca',
    linkedInUrl: 'https://www.linkedin.com/in/jacky-wx-jiang/'
  },
  {
    id: 'corp-rel-assoc-002',
    name: 'Aayan Areejo',
    position: 'Corporate Relations Associate',
    roleDescription: 'Builds partnerships with industry sponsors and companies, securing opportunities and resources that benefit BYTE members and our tech community.',
    profilePicUrl: '/images/BYTE Website - Member Photos/Aayan_Areejo.JPG',
    rank: 60,
    categories: ['Strategic Team'],
    connections: ['vp-finance-001'],
    email: 'aayan.areejo@torontomu.ca',
    linkedInUrl: 'https://www.linkedin.com/in/aayanareejo/'
  },
  {
    id: 'digital-media-mgr-001',
    name: 'Karunya Purohit',
    position: 'Digital Media Manager',
    roleDescription: 'Manages BYTE\'s digital media presence, creating and curating content across social platforms to engage the TMU tech community and showcase our initiatives.',
    profilePicUrl: '/images/BYTE Website - Member Photos/strategy_image_default.jpg',
    rank: 80,
    categories: ['Strategic Team'],
    connections: ['vp-marketing-001'],
    email: 'karunya.purohit@torontomu.ca',
    linkedInUrl: 'https://www.linkedin.com/in/karunya-purohit-288540328/'
  },
  {
    id: 'hr-mgr-001',
    name: 'Chris Ahn',
    position: 'HR Manager',
    roleDescription: 'Oversees BYTE\'s human resources and team culture, managing recruitment, member relations, and fostering a positive environment for all team members.',
    profilePicUrl: '/images/BYTE Website - Member Photos/Chris_Ahn.jpg',
    rank: 80,
    categories: ['Strategic Team'],
    connections: ['vp-operations-001'],
    email: 'chris.ahn@torontomu.ca',
    linkedInUrl: 'https://www.linkedin.com/in/chris-ahn1/'
  },

  // Technical Team Members (not in Leadership)
  {
    id: 'proj-exp-lead-001',
    name: 'Rayan Roshan',
    position: 'Project Experience Lead',
    roleDescription: 'Curates the technical project experience at BYTE, ensuring members have meaningful opportunities to build real-world skills through hands-on development.',
    profilePicUrl: '/images/BYTE Website - Member Photos/Rayan_Roshan.jpg',
    rank: 75,
    categories: ['Technical Team'],
    connections: ['head-tech-001', 'vp-tech-001'],
    email: 'rayan.roshan@torontomu.ca'
  },
  {
    id: 'dir-backend-001',
    name: 'Roxie Reginold',
    position: 'Director of Backend Engineering',
    roleDescription: 'Leads BYTE\'s backend development efforts, architecting scalable APIs and databases that power our projects and teach members server-side skills.',
    profilePicUrl: '/images/BYTE Website - Member Photos/technology_image_default.jpg',
    rank: 70,
    categories: ['Technical Team'],
    connections: ['vp-tech-001', 'backend-eng-001', 'backend-eng-002'],
    email: 'roxie.reginold@torontomu.ca',
    linkedInUrl: 'https://www.linkedin.com/in/roxie-reginold/'
  },
  {
    id: 'dir-frontend-001',
    name: 'Johan Philip',
    position: 'Director of Frontend Engineering',
    roleDescription: 'Leads BYTE\'s frontend development, crafting beautiful user interfaces and mentoring team members in modern web technologies.',
    profilePicUrl: '/images/BYTE Website - Member Photos/johan_philip.jpg',
    rank: 70,
    categories: ['Technical Team'],
    connections: ['dir-frontend-001'],
    email: 'johan.philip@torontomu.ca',
    linkedInUrl: 'https://www.linkedin.com/in/johanbphilip/'
  },
  {
    id: 'frontend-eng-001',
    name: 'Ethan Cha',
    position: 'Frontend Engineer',
    roleDescription: 'Builds responsive and interactive web experiences for BYTE\'s projects, turning designs into polished, user-friendly interfaces.',
    profilePicUrl: '/images/BYTE Website - Member Photos/ethan_cha.png',
    rank: 50,
    categories: ['Technical Team'],
    connections: ['dir-frontend-001'],
    email: 'e1cha@torontomu.ca',
    linkedInUrl: 'https://www.linkedin.com/in/ethan-cha-5692b8372/'
  },
  {
    id: 'frontend-eng-002',
    name: 'Anthony Ma',
    position: 'Frontend Engineer',
    roleDescription: 'Builds responsive and interactive web experiences for BYTE\'s projects, turning designs into polished, user-friendly interfaces.',
    profilePicUrl: '/images/BYTE Website - Member Photos/technology_image_default.jpg',
    rank: 50,
    categories: ['Technical Team'],
    connections: ['dir-frontend-001'],
    email: 'a1ma@torontomu.ca'
  },
  {
    id: 'frontend-eng-003',
    name: 'Stephen Nguyen',
    position: 'Frontend Engineer',
    roleDescription: 'Builds responsive and interactive web experiences for BYTE\'s projects, turning designs into polished, user-friendly interfaces.',
    profilePicUrl: '/images/BYTE Website - Member Photos/technology_image_default.jpg',
    rank: 50,
    categories: ['Technical Team'],
    connections: ['dir-frontend-001'],
    email: 'stephen1.nguyen@torontomu.ca',
    linkedInUrl: 'https://www.linkedin.com/in/stphenguy/'
  },
  {
    id: 'dir-aiml-001',
    name: 'Nancy Maliackel',
    position: 'Director of AI/ML Engineering',
    roleDescription: 'Leads BYTE\'s AI and machine learning initiatives, exploring cutting-edge technologies and guiding projects that push the boundaries of innovation.',
    profilePicUrl: '/images/BYTE Website - Member Photos/technology_image_default.jpg',
    rank: 70,
    categories: ['Technical Team'],
    connections: ['dir-ai-001'],
    email: 'nancy.maliackel@torontomu.ca',
    linkedInUrl: 'https://www.linkedin.com/in/nancy-maliackel/'
  },
  {
    id: 'aiml-eng-001',
    name: 'Akbar Ali',
    position: 'AI/ML Engineer',
    roleDescription: 'Develops machine learning models and AI solutions for BYTE\'s projects, applying data science techniques to solve real-world problems.',
    profilePicUrl: '/images/BYTE Website - Member Photos/technology_image_default.jpg',
    rank: 50,
    categories: ['Technical Team'],
    connections: ['dir-ai-001'],
    email: 'akbar.ali@torontomu.ca',
    linkedInUrl: 'https://www.linkedin.com/in/akbar-ali06/'
  },
  {
    id: 'aiml-eng-002',
    name: 'Sanjana Urba',
    position: 'AI/ML Engineer',
    roleDescription: 'Develops machine learning models and AI solutions for BYTE\'s projects, applying data science techniques to solve real-world problems.',
    profilePicUrl: '/images/BYTE Website - Member Photos/sanjana_urba.JPG',
    rank: 50,
    categories: ['Technical Team'],
    connections: ['dir-ai-001'],
    email: 'surba@torontomu.ca',
    linkedInUrl: 'https://www.linkedin.com/in/sanjanaurba/'
  },
  {
    id: 'backend-eng-001',
    name: 'Maha Baig',
    position: 'Backend Engineer',
    roleDescription: 'Builds robust server-side systems and APIs for BYTE\'s projects, ensuring our applications are fast, secure, and scalable.',
    profilePicUrl: '/images/BYTE Website - Member Photos/Maha Baig',
    rank: 50,
    categories: ['Technical Team'],
    connections: ['dir-backend-001'],
    email: 'Maha1.baig@torontomu.ca',
    linkedInUrl: 'https://www.linkedin.com/in/maha-baig-79752b292/'
  },
  {
    id: 'backend-eng-002',
    name: 'Elena Kim',
    position: 'Backend Engineer',
    roleDescription: 'Builds robust server-side systems and APIs for BYTE\'s projects, ensuring our applications are fast, secure, and scalable.',
    profilePicUrl: '/images/BYTE Website - Member Photos/elena_kim.JPG',
    rank: 50,
    categories: ['Technical Team'],
    connections: ['dir-backend-001'],
    email: 'e15kim@torontomu.ca',
    linkedInUrl: 'https://www.linkedin.com/in/elenanakim/'
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
