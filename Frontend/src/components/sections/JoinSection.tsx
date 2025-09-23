
import { motion } from 'framer-motion'

interface JoinSectionProps {
  memberUrl: string
  discordUrl: string
  teamUrl: string
}

export default function JoinSection({ memberUrl, discordUrl, teamUrl }: JoinSectionProps) {
  const joinOptions = [
    {
      id: 'member',
      title: 'Become a Member',
      description: 'Fill out our General Member form to start build, test, and deploy AI applications',
      url: memberUrl
    },
    {
      id: 'discord',
      title: 'Join Discord',
      description: 'Connect with BYTE team and other passionate developers via our public Discord',
      url: discordUrl
    },
    {
      id: 'team',
      title: 'Join our Team',
      description: 'Want to build impactful open-source projects? Fill out our interest form',
      url: teamUrl
    }
  ]

  const handleCardClick = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <section className="py-20 bg-digital-abyss relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-terminal-green/20" />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header Area */}
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
            Join BYTE
          </h2>
          
          <p className="text-lg lg:text-xl text-ghost-white max-w-3xl mx-auto leading-relaxed">
            Join our supportive community to build, connect and more!
          </p>
        </motion.div>

        {/* Clickable Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {joinOptions.map((option, index) => (
            <motion.div
              key={option.id}
              className="relative cursor-pointer group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
              onClick={() => handleCardClick(option.url)}
              whileHover={{ y: -5 }}
            >
              <div 
                className="absolute inset-0"
                style={{ 
                  backgroundColor: '#48F5FE',
                  clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)'
                }}
              />
              
              <div 
                className="relative p-6 m-0.5 h-full flex flex-col transition-all duration-200 group-hover:shadow-lg"
                style={{
                  backgroundColor: '#4C5EF6',
                  clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)'
                }}
              >
                {/* User Icon */}
                <div className="mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {option.title}
                </h3>

                <p className="text-white/80 text-sm leading-relaxed flex-grow">
                  {option.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}