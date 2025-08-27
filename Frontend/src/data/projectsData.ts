export interface Project {
  id: string
  title: string
  status: 'On-going' | 'Completed'
  description: string
  technologies: string[]
  githubUrl: string
  imageUrl?: string
  type: 'current' | 'past'
}

export const projectsData: Project[] = [
  {
    id: '1',
    title: 'SecureBYTE',
    status: 'On-going',
    description: 'A comprehensive cybersecurity platform that provides real-time threat detection and analysis. Built with advanced machine learning algorithms to identify potential security vulnerabilities and protect digital infrastructure from emerging cyber threats.',
    technologies: ['React', 'JavaScript', 'TailwindCSS', 'Firebase'],
    githubUrl: 'https://github.com/byte-org/securebyte',
    type: 'current'
  },
  {
    id: '2',
    title: 'AI StudyBuddy',
    status: 'On-going',
    description: 'An intelligent study companion that uses natural language processing to help students organize their learning materials, create personalized study schedules, and provide interactive Q&A sessions for better understanding of complex topics.',
    technologies: ['Python', 'TensorFlow', 'React', 'Node.js', 'MongoDB'],
    githubUrl: 'https://github.com/byte-org/ai-studybuddy',
    type: 'current'
  },
  {
    id: '3',
    title: 'EcoTracker',
    status: 'Completed',
    description: 'A mobile application designed to help users track their carbon footprint and environmental impact. Features include daily activity logging, sustainability tips, and community challenges to promote eco-friendly lifestyle choices.',
    technologies: ['React Native', 'TypeScript', 'Supabase', 'Expo'],
    githubUrl: 'https://github.com/byte-org/ecotracker',
    type: 'past'
  },
  {
    id: '4',
    title: 'CodeReview AI',
    status: 'Completed',
    description: 'An automated code review tool that uses machine learning to analyze code quality, suggest improvements, and identify potential bugs before they reach production. Supports multiple programming languages and integrates with popular version control systems.',
    technologies: ['Python', 'FastAPI', 'Docker', 'PostgreSQL', 'OpenAI API'],
    githubUrl: 'https://github.com/byte-org/codereview-ai',
    type: 'past'
  },
  {
    id: '5',
    title: 'Campus Navigator',
    status: 'On-going',
    description: 'An interactive campus navigation system specifically designed for Toronto Metropolitan University. Provides real-time directions, building information, and accessibility features to help students and visitors navigate the campus efficiently.',
    technologies: ['Vue.js', 'MapBox', 'Node.js', 'Express', 'MySQL'],
    githubUrl: 'https://github.com/byte-org/campus-navigator',
    type: 'current'
  }
];