export interface InfoCard {
  id: number
  iconName: string
  title: string
  description: string
}

export const aboutData = {
  title: "What is BYTE?",
  description: "We're an open-source student group that focuses on AI. By joining us, you'll get to gain hands-on experience in real-world AI development by working collaboratively on projects that make a difference.",
  cards: [
    {
      id: 1,
      iconName: 'build-projects',
      title: 'Build Real Projects',
      description: 'Work on open-source AI tools, productivity apps, ML research and more'
    },
    {
      id: 2,
      iconName: 'learn-by-doing',
      title: 'Learn by Doing',
      description: 'Whether you\'re a beginner or advanced, you\'ll learn what matters.'
    },
    {
      id: 3,
      iconName: 'leadership',
      title: 'Leadership Opportunities',
      description: 'Be more than just a member. We actively mentor contributors into executive roles.'
    },
    {
      id: 4,
      iconName: 'community',
      title: 'Community & Networking',
      description: "Join a community of like-minded students passionate about AI and all things tech."
    }
  ] as InfoCard[]
};