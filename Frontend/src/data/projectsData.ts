export interface Project {
  id: string
  title: string
  status: 'On-going' | 'Completed'
  description: string
  technologies: string[]
  githubUrl: string
  imageUrl?: string
  videoUrl?: string
  type: 'current' | 'past'
}

export const projectsData: Project[] = [
  {
    id: '1',
    title: 'SecureBYTE',
    status: 'On-going',
    description: 'This project aims to develop a Python-based AI-powered code vulnerability scanner that uses static code analysis and LLMs to detect potential security flaws and logical issues in user-submitted code. The goal is to combine traditional static analysis with natural language reasoning to identify vulnerabilities, offer insights, and suggest remediations. The MVP will focus solely on Python code to ensure high quality and manageable scope within one semester. It will scan for security and logic issues and even develop test cases for the project.',
    technologies: ['Python', 'Flask', 'React', 'JavaScript', 'TailwindCSS', 'Firebase'],
    githubUrl: 'https://github.com/byte-org/securebyte',
    videoUrl: '/src/media/Project video demos/securebyte.mp4',
    type: 'current'
  }
];