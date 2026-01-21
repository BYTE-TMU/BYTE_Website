
import { motion } from 'framer-motion'
import InfoCard from './InfoCard'

export interface InfoCard {
  id: number
  iconName: string
  title: string
  description: string
  image: string
}

const aboutData = {
  title: "What is BYTE?",
  description: "We're an open-source student group that focuses on AI. By joining us, you'll get to gain hands-on experience in real-world AI development by working collaboratively on projects that make a difference.",
  cards: [
    {
      id: 1,
      iconName: 'build-projects',
      title: 'Build Real Projects',
      description: 'Work on open-source AI tools, productivity apps, ML research and more',
      image: '/src/images/buidingprojects.jpg'
    },
    {
      id: 2,
      iconName: 'learn-by-doing',
      title: 'Learn by Doing',
      description: 'Whether you\'re a beginner or advanced, you\'ll learn what matters.',
      image: '/src/images/learnbydoing.jpeg'
    },
    {
      id: 3,
      iconName: 'leadership',
      title: 'Leadership Opportunities',
      description: 'Be more than just a member. We actively mentor contributors into executive roles.',
      image: '/src/images/leadershipopportunity image.JPG'
    },
    {
      id: 4,
      iconName: 'community',
      title: 'Community & Networking',
      description: "Join a community of like-minded students passionate about AI and all things tech.",
      image: '/src/images/hero(community).JPG'
    }
  ] as InfoCard[]
};

export default function About() {
  return (
    <section className="py-20 bg-digital-abyss relative overflow-hidden" id="about">
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-terminal-green/20" />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-5xl lg:text-6xl font-orbitron font-black mb-8 text-transparent bg-clip-text"
            style={{ background: 'linear-gradient(to right, #2B9398, #48F5FE)', WebkitBackgroundClip: 'text' }}
          >
            {aboutData.title}
          </h2>
          <p className="text-lg lg:text-xl text-ghost-white max-w-4xl mx-auto leading-relaxed">
            {aboutData.description}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 items-stretch"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {aboutData.cards.map((card, index) => (
            <InfoCard
              key={card.id}
              card={card}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}