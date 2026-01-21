export interface Project {
  id: string
  title: string
  status: 'On-going' | 'Completed'
  description: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  imageUrl?: string
  videoUrl?: string
  type: 'current' | 'past'
}

export const projectsData: Project[] = [
  {
    id: '1',
    title: 'SecureBYTE',
    status: 'Completed',
    description: 'A Python-based AI vulnerability scanner that integrates static analysis and LLMs to identify security flaws and logical issues. It combines traditional analysis with natural language reasoning to provide insights, suggest remediations, and generate automated test cases.',
    technologies: ['Python', 'Flask', 'React', 'JavaScript', 'TailwindCSS', 'Firebase'],
    liveUrl: 'https://securebyte.vercel.app/',
    githubUrl: 'https://github.com/byte-org/securebyte',
    videoUrl: '/src/media/Project video demos/securebyte.mp4',
    type: 'current'
  },
  {
    id: '2',
    title: 'Yapp',
    status: 'On-going',
    description: 'Yapp is the revolutionary campus social platform designed exclusively for TMU students. Connect with your community, discover amazing events across downtown Toronto, and explore your urban campus like never before.',
    technologies: ['Python', 'Flask', 'React', 'JavaScript', 'TailwindCSS', 'MongoDB', 'AWS'],
    liveUrl: 'https://yap-mu.vercel.app',
    videoUrl: '/src/media/Project video demos/securebyte.mp4',
    type: 'current'
  }
];