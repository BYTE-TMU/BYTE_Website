
import { motion } from 'framer-motion'

const joinData = {
  headline: "Join BYTE",
  subheadline: "Start your technical experience today",
  buttons: {
    discord: {
      text: "Join Discord",
      url: "https://discord.gg/byte-community"
    },
    form: {
      text: "Fill out form",
      url: "https://docs.google.com/forms/d/e/1FAIpQLSdt0k68McJahUKvRU7iIog92G-tq6UYU7rnVL_I_zsaB0AKUw/viewform"
    }
  },
  additionalInfo: "Join our community of innovators, developers, and tech enthusiasts at Toronto Metropolitan University"
};

export default function Join() {
  const handleJoinDiscord = () => {
    window.open(joinData.buttons.discord.url, '_blank', 'noopener,noreferrer')
  }

  const handleFillForm = () => {
    window.open(joinData.buttons.form.url, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="py-20 bg-digital-abyss relative overflow-hidden" id="join">
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-terminal-green/20" />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div
            className="p-12 lg:p-16"
            style={{
              backgroundColor: '#48f5FE',
              clipPath: 'polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 32px 100%, 0 calc(100% - 32px))'
            }}
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-left lg:flex-1">
                <motion.h2
                  className="text-5xl lg:text-6xl font-orbitron font-black text-digital-abyss mb-4"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  {joinData.headline}
                </motion.h2>

                <motion.p
                  className="text-xl lg:text-2xl text-digital-abyss/80 font-medium"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  {joinData.subheadline}
                </motion.p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 lg:flex-shrink-0">
                <motion.button
                  onClick={handleJoinDiscord}
                  className="relative px-8 py-4 text-white font-bold text-lg transition-all duration-200"
                  style={{
                    background: 'linear-gradient(to bottom, #4C5EF6, #2C3790)',
                    clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)'
                  }}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -3,
                    boxShadow: '0 10px 25px rgba(49, 222, 43, 0.3)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">{joinData.buttons.discord.text}</span>
                </motion.button>

                <motion.button
                  onClick={handleFillForm}
                  className="relative px-8 py-4 text-white font-bold text-lg transition-all duration-200"
                  style={{
                    background: 'linear-gradient(to bottom, #4C5EF6, #2C3790)',
                    clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)'
                  }}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -3,
                    boxShadow: '0 10px 25px rgba(49, 222, 43, 0.3)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">{joinData.buttons.form.text}</span>
                </motion.button>
              </div>
            </div>
          </div>

          <motion.div
            className="absolute -inset-4 opacity-30 blur-xl"
            style={{
              background: 'linear-gradient(45deg, #48f5FE, #2C3790)',
              clipPath: 'polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 32px 100%, 0 calc(100% - 32px))',
              zIndex: -1
            }}
            animate={{
              scale: [1, 1.02, 1],
              opacity: [0.3, 0.4, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-ghost-white/60 font-tech-mono text-sm">
            {joinData.additionalInfo}
          </p>
        </motion.div>

        <div className="absolute top-10 left-10 w-2 h-2 bg-terminal-green rounded-full animate-pulse" />
        <div className="absolute bottom-10 right-10 w-2 h-2 bg-acid-yellow rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-20 w-1 h-1 bg-glitch-cyan rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    </section>
  )
}