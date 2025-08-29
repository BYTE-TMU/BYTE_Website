export interface Member {
  id: string;
  name: string;
  role: string;
  team: 'leadership' | 'technical' | 'strategic';
  avatar: string;
  bio: string;
  connections?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  stats: {
    stars: number;
    forks: number;
    contributors: number;
  };
}

export interface Event {
  id: string;
  title: string;
  date: string;
  type: 'workshop' | 'hackathon' | 'social';
  location: string;
  posterUrl: string;
  registrationUrl?: string;
  status: 'upcoming' | 'past';
  spotsAvailable?: number;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  type: 'news' | 'event' | 'update';
}

export const members: Member[] = [
  // Leadership Level
  {
    id: '1',
    name: 'Meet Patadia',
    role: 'President',
    team: 'leadership',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Defines BYTE\'s mission, values, and long-term vision. Oversees all internal and external teams.',
    connections: ['2', '3', '4'] // connects to Chief of Staff, Head of Technical, Head of Strategic
  },
  {
    id: '2',
    name: 'Pearl Ved',
    role: 'Chief of Staff',
    team: 'leadership',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Ensures seamless collaboration across all departments. Turns the President\'s vision into concrete initiatives.',
    connections: ['1', '3', '4'] // connects to President, both Heads
  },
  
  // Department Heads
  {
    id: '3',
    name: 'Hetvi Modi',
    role: 'Head of Technical Operations',
    team: 'leadership',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Oversees the entire technical side of all BYTE projects. Works with VPs and Directors to ensure cross-team synergy.',
    connections: ['1', '2', '5', '7', '8', '9'] // connects to leadership and technical VPs/Directors
  },
  {
    id: '4',
    name: 'Yeji Lee',
    role: 'Head of Strategic Operations',
    team: 'leadership',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Manages finance, events, operations, and community team. Plans future events and workshops.',
    connections: ['1', '2', '17'] // connects to leadership and VP of Events
  },

  // Technical Leadership
  {
    id: '5',
    name: 'Jacob Mobin',
    role: 'VP of Technology',
    team: 'technical',
    avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Oversees all technical teams at BYTE and ensures smooth collaboration. Leads sprint planning and technical architecture.',
    connections: ['3', '6', '7', '8', '9'] // connects to Head of Tech and all Directors
  },
  {
    id: '6',
    name: 'Rayan Roshan',
    role: 'Project Experience Lead',
    team: 'technical',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Contributes to tech roadmap and evaluates new tools for BYTE\'s evolving stack.',
    connections: ['3', '5'] // connects to Head of Tech and VP of Tech
  },

  // Technical Directors
  {
    id: '7',
    name: 'Roxie Reginold',
    role: 'Director of Backend Engineering',
    team: 'technical',
    avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Leads backend development efforts across BYTE projects. Designs overall backend architecture.',
    connections: ['3', '5', '14', '15'] // connects to leadership and backend engineers
  },
  {
    id: '8',
    name: 'Mashrufa Orchi',
    role: 'Director of Frontend Engineering',
    team: 'technical',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Leads frontend architecture and UI/UX decisions. Defines best practices for frontend development.',
    connections: ['3', '5', '11', '20'] // connects to leadership and frontend engineers
  },
  {
    id: '9',
    name: 'Prisha Thakkar',
    role: 'Director of AI/ML Engineering',
    team: 'technical',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Leads research, development, and integration of AI/ML features in BYTE projects.',
    connections: ['3', '5', '12', '13', '21'] // connects to leadership and AI/ML engineers
  },

  // Technical Engineers
  {
    id: '11',
    name: 'Johan Philip',
    role: 'Frontend Engineer',
    team: 'technical',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Builds user interfaces using React and frontend frameworks. Translates design mockups into interactive features.',
    connections: ['8'] // connects to Director of Frontend
  },
  {
    id: '12',
    name: 'Nancy Maliackel',
    role: 'AI/ML Engineer',
    team: 'technical',
    avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Assists in training and fine-tuning machine learning models. Works on integrating AI models with backend APIs.',
    connections: ['9'] // connects to Director of AI/ML
  },
  {
    id: '13',
    name: 'Joshua Joseph',
    role: 'AI/ML Engineer',
    team: 'technical',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Researches and experiments with model architecture, prompts, and datasets.',
    connections: ['9'] // connects to Director of AI/ML
  },
  {
    id: '14',
    name: 'Maha Baig',
    role: 'Backend Engineer',
    team: 'technical',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Develops and maintains backend features and APIs. Integrates databases and third-party services.',
    connections: ['7'] // connects to Director of Backend
  },
  {
    id: '15',
    name: 'Elena Kim',
    role: 'Backend Engineer',
    team: 'technical',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Tests, debugs, and optimizes backend code. Works on database integration.',
    connections: ['7'] // connects to Director of Backend
  },
  {
    id: '20',
    name: 'Alex Nguyen',
    role: 'Frontend Engineer',
    team: 'technical',
    avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Works closely with Backend Engineers to connect frontend to backend systems.',
    connections: ['8'] // connects to Director of Frontend
  },
  {
    id: '21',
    name: 'Gajanan Vigneswaran',
    role: 'AI/ML Engineer',
    team: 'technical',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Contributes to documentation of AI pipelines, models, and results.',
    connections: ['9'] // connects to Director of AI/ML
  },

  // Strategic Team
  {
    id: '17',
    name: 'Arshiya Das',
    role: 'VP of Events',
    team: 'strategic',
    avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Organizes workshops, hackathons, mentorship programs, and AI educational initiatives.',
    connections: ['4', '18'] // connects to Head of Strategic and Events Associate
  },
  {
    id: '18',
    name: 'Rishita Patel',
    role: 'Events Associate',
    team: 'strategic',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Assists in planning BYTE-hosted events. Helps with logistics and event coordination.',
    connections: ['17'] // connects to VP of Events
  },
  {
    id: '19',
    name: 'Zahra Zahra',
    role: 'Graphic Designer',
    team: 'strategic',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Creates visuals for social media, events, recruitment, and sponsors. Maintains BYTE\'s brand identity.',
    connections: ['17'] // connects to strategic team leadership
  }
];

export const projects: Project[] = [
  {
    id: '1',
    title: 'Neural Network Visualizer',
    description: 'Interactive tool for visualizing neural network architectures and training processes',
    thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    techStack: ['React', 'Python', 'TensorFlow', 'D3.js'],
    githubUrl: 'https://github.com/byte-tmu/neural-viz',
    liveUrl: 'https://neural-viz.byte-tmu.dev',
    featured: true,
    stats: { stars: 324, forks: 67, contributors: 12 }
  },
  {
    id: '2',
    title: 'AI Ethics Framework',
    description: 'Comprehensive framework for evaluating AI systems through ethical lens',
    thumbnail: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    techStack: ['Python', 'Jupyter', 'Pandas', 'Matplotlib'],
    githubUrl: 'https://github.com/byte-tmu/ai-ethics',
    featured: true,
    stats: { stars: 156, forks: 23, contributors: 8 }
  },
  {
    id: '3',
    title: 'Campus Assistant Bot',
    description: 'AI-powered chatbot helping TMU students navigate campus resources',
    thumbnail: 'https://images.pexels.com/photos/8386427/pexels-photo-8386427.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    techStack: ['Node.js', 'OpenAI', 'Discord.js', 'MongoDB'],
    githubUrl: 'https://github.com/byte-tmu/campus-bot',
    featured: false,
    stats: { stars: 89, forks: 34, contributors: 6 }
  }
];

export const events: Event[] = [
  {
    id: '1',
    title: 'AI Workshop Series: Neural Networks',
    date: '2025-02-15T14:00:00Z',
    type: 'workshop',
    location: 'TMU Innovation Lab',
    posterUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    registrationUrl: 'https://eventbrite.com/byte-neural-workshop',
    status: 'upcoming',
    spotsAvailable: 15
  },
  {
    id: '2',
    title: 'BYTE Hackathon 2025',
    date: '2025-03-08T09:00:00Z',
    type: 'hackathon',
    location: 'TMU Student Learning Centre',
    posterUrl: 'https://images.pexels.com/photos/3861959/pexels-photo-3861959.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    registrationUrl: 'https://eventbrite.com/byte-hackathon-2025',
    status: 'upcoming',
    spotsAvailable: 100
  },
  {
    id: '3',
    title: 'Tech Talk: Future of AI',
    date: '2024-12-10T18:00:00Z',
    type: 'workshop',
    location: 'Virtual Event',
    posterUrl: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    status: 'past'
  }
];

export const announcements: Announcement[] = [
  {
    id: '1',
    title: 'New AI Research Lab Partnership',
    content: 'BYTE partners with Vector Institute to provide exclusive research opportunities for members.',
    timestamp: '2025-01-20T10:00:00Z',
    priority: 'high',
    type: 'news'
  },
  {
    id: '2',
    title: 'Winter Workshop Series Starting Soon',
    content: 'Our comprehensive AI workshop series begins February 15th. Limited spots available.',
    timestamp: '2025-01-18T15:30:00Z',
    priority: 'medium',
    type: 'event'
  },
  {
    id: '3',
    title: 'Open Source Contributions Recognition',
    content: 'Congratulations to our team for contributing over 50,000 lines of code to open source projects this year!',
    timestamp: '2025-01-15T12:00:00Z',
    priority: 'medium',
    type: 'update'
  }
];

export const mockStats = {
  members: 47,
  projects: 12,
  events: 23,
  linesOfCode: 50847
};