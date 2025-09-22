import { motion } from 'framer-motion'

export default function GridPulseBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      {/* Vertical lines */}
      <div className="grid grid-cols-12 h-full">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="border-r"
            style={{
              borderColor: '#48F5FE'
            }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              boxShadow: [
                `inset 0 0 0px #48F5FE`,
                `inset 0 0 4px #48F5FE40`,
                `inset 0 0 0px #48F5FE`
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Horizontal lines */}
      <div className="absolute inset-0 flex flex-col">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="flex-1 border-b"
            style={{
              borderColor: '#48F5FE'
            }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              boxShadow: [
                `inset 0 0 0px #48F5FE`,
                `inset 0 0 4px #48F5FE40`,
                `inset 0 0 0px #48F5FE`
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Pulse dots at intersections */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            backgroundColor: '#39FF14',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: '0 0 8px #39FF14'
          }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}