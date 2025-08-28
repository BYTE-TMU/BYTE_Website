// Team member interfaces
export interface Member {
  id: string
  name: string
  position: string
  profilePicUrl: string
  rank: number // Higher number = larger circle (President: 100, VP: 80, Director: 60, Manager: 50, Member: 40)
}

export interface TeamCategory {
  categoryName: string
  members: Member[]
}

// Real team data from BYTE Executive Member List
export const meetTheTeamData: TeamCategory[] = [
  {
    categoryName: 'Leadership',
    members: [
      {
        id: 'pres-001',
        name: 'Meet Patadia',
        position: 'President',
        profilePicUrl: 'https://picsum.photos/200/200?random=1',
        rank: 100
      },
      {
        id: 'cos-001',
        name: 'Pearl Ved',
        position: 'Chief of Staff',
        profilePicUrl: 'https://picsum.photos/200/200?random=2',
        rank: 95
      },
      {
        id: 'vp-tech-001',
        name: 'Jacob Mobin',
        position: 'VP of Technology',
        profilePicUrl: 'https://picsum.photos/200/200?random=3',
        rank: 90
      },
      {
        id: 'vp-events-001',
        name: 'Arshiya Das',
        position: 'VP of Events',
        profilePicUrl: 'https://picsum.photos/200/200?random=4',
        rank: 90
      }
    ]
  },
  {
    categoryName: 'Strategic Team',
    members: [
      {
        id: 'head-strat-001',
        name: 'Yeji Lee',
        position: 'Head of Strategic Operations',
        profilePicUrl: 'https://picsum.photos/200/200?random=5',
        rank: 80
      },
      {
        id: 'events-assoc-001',
        name: 'Rishita Patel',
        position: 'Events Associate',
        profilePicUrl: 'https://picsum.photos/200/200?random=6',
        rank: 60
      },
      {
        id: 'designer-001',
        name: 'Zahra Zahra',
        position: 'Graphic Designer',
        profilePicUrl: 'https://picsum.photos/200/200?random=7',
        rank: 60
      }
    ]
  },
  {
    categoryName: 'Technical Team',
    members: [
      {
        id: 'head-tech-001',
        name: 'Hetvi Modi',
        position: 'Head of Technical Operations',
        profilePicUrl: 'https://picsum.photos/200/200?random=8',
        rank: 80
      },
      {
        id: 'proj-exp-lead-001',
        name: 'Rayan Roshan',
        position: 'Project Experience Lead',
        profilePicUrl: 'https://picsum.photos/200/200?random=9',
        rank: 75
      },
      {
        id: 'dir-frontend-001',
        name: 'Mashrufa Orchi',
        position: 'Director of Frontend Engineering',
        profilePicUrl: 'https://picsum.photos/200/200?random=10',
        rank: 70
      },
      {
        id: 'dir-ai-001',
        name: 'Prisha Thakkar',
        position: 'Director of AI/ML Engineering',
        profilePicUrl: 'https://picsum.photos/200/200?random=11',
        rank: 70
      },
      {
        id: 'dir-backend-001',
        name: 'Roxie Reginold',
        position: 'Director of Backend Engineering',
        profilePicUrl: 'https://picsum.photos/200/200?random=12',
        rank: 70
      },
      {
        id: 'frontend-eng-001',
        name: 'Johan Philip',
        position: 'Frontend Engineer',
        profilePicUrl: 'https://picsum.photos/200/200?random=13',
        rank: 50
      },
      {
        id: 'frontend-eng-002',
        name: 'Alex Nguyen',
        position: 'Frontend Engineer',
        profilePicUrl: 'https://picsum.photos/200/200?random=14',
        rank: 50
      },
      {
        id: 'aiml-eng-001',
        name: 'Nancy Maliackel',
        position: 'AI/ML Engineer',
        profilePicUrl: 'https://picsum.photos/200/200?random=15',
        rank: 50
      },
      {
        id: 'aiml-eng-002',
        name: 'Joshua Joseph',
        position: 'AI/ML Engineer',
        profilePicUrl: 'https://picsum.photos/200/200?random=16',
        rank: 50
      },
      {
        id: 'aiml-eng-003',
        name: 'Gajanan Vigneswaran',
        position: 'AI/ML Engineer',
        profilePicUrl: 'https://picsum.photos/200/200?random=17',
        rank: 50
      },
      {
        id: 'backend-eng-001',
        name: 'Maha Baig',
        position: 'Backend Engineer',
        profilePicUrl: 'https://picsum.photos/200/200?random=18',
        rank: 50
      },
      {
        id: 'backend-eng-002',
        name: 'Elena Kim',
        position: 'Backend Engineer',
        profilePicUrl: 'https://picsum.photos/200/200?random=19',
        rank: 50
      }
    ]
  }
]

export const projectContributorsData: TeamCategory[] = [
  {
    categoryName: 'Core Team',
    members: [
      {
        id: 'core-001',
        name: 'Alex Chen',
        position: 'Lead Developer',
        profilePicUrl: 'https://picsum.photos/200/200?random=15',
        rank: 90
      },
      {
        id: 'core-002',
        name: 'Sarah Johnson',
        position: 'Architecture Lead',
        profilePicUrl: 'https://picsum.photos/200/200?random=16',
        rank: 85
      },
      {
        id: 'core-003',
        name: 'Marcus Rodriguez',
        position: 'Security Lead',
        profilePicUrl: 'https://picsum.photos/200/200?random=17',
        rank: 80
      }
    ]
  },
  {
    categoryName: 'Inner Team',
    members: [
      {
        id: 'inner-001',
        name: 'Emily Zhang',
        position: 'Backend Developer',
        profilePicUrl: 'https://picsum.photos/200/200?random=18',
        rank: 60
      },
      {
        id: 'inner-002',
        name: 'David Park',
        position: 'Frontend Developer',
        profilePicUrl: 'https://picsum.photos/200/200?random=19',
        rank: 60
      },
      {
        id: 'inner-003',
        name: 'Lisa Wang',
        position: 'AI Specialist',
        profilePicUrl: 'https://picsum.photos/200/200?random=20',
        rank: 55
      },
      {
        id: 'inner-004',
        name: 'James Kim',
        position: 'DevOps Engineer',
        profilePicUrl: 'https://picsum.photos/200/200?random=21',
        rank: 55
      }
    ]
  },
  {
    categoryName: 'Solo Developer',
    members: [
      {
        id: 'solo-001',
        name: 'Sophia Martinez',
        position: 'Independent Contributor',
        profilePicUrl: 'https://picsum.photos/200/200?random=22',
        rank: 50
      },
      {
        id: 'solo-002',
        name: 'Ryan Thompson',
        position: 'Open Source Contributor',
        profilePicUrl: 'https://picsum.photos/200/200?random=23',
        rank: 45
      },
      {
        id: 'solo-003',
        name: 'Anna Petrov',
        position: 'Research Contributor',
        profilePicUrl: 'https://picsum.photos/200/200?random=24',
        rank: 45
      }
      
    ]
  }
]