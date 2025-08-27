export interface PastEvent {
  id: string
  title: string
  description: string
  recapUrl?: string
}

export const pastEventsData: PastEvent[] = [
  {
    id: "past-1",
    title: "BYTE Kick-off 2024",
    description: "Learn about BYTE, our team and how you can get involved",
    recapUrl: "https://byte.org/recaps/kickoff-2024"
  },
  {
    id: "past-2",
    title: "JavaScript Fundamentals",
    description: "Master the basics of JavaScript programming language"
  },
  {
    id: "past-3", 
    title: "Git & GitHub Workshop",
    description: "Version control essentials for every developer",
    recapUrl: "https://byte.org/recaps/git-workshop-2024"
  },
  {
    id: "past-4",
    title: "Web Development Bootcamp",
    description: "Build your first web application from scratch"
  },
  {
    id: "past-5",
    title: "Database Design Workshop",
    description: "Learn SQL and database design principles",
    recapUrl: "https://byte.org/recaps/database-workshop-2024"
  },
  {
    id: "past-6",
    title: "API Development Masterclass",
    description: "Create RESTful APIs using modern frameworks"
  },
  {
    id: "past-7",
    title: "Cloud Computing Seminar",
    description: "Introduction to AWS, Azure, and cloud services",
    recapUrl: "https://byte.org/recaps/cloud-seminar-2024"
  },
  {
    id: "past-8",
    title: "Mobile App Development",
    description: "Build cross-platform mobile apps with React Native"
  },
  {
    id: "past-9",
    title: "DevOps Workshop",
    description: "CI/CD pipelines and deployment automation",
    recapUrl: "https://byte.org/recaps/devops-workshop-2024"
  },
  {
    id: "past-10",
    title: "Cybersecurity Basics",
    description: "Essential security practices for developers"
  }
]