import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { heroData } from '@/data/heroData'

export default function Hero() {
  const [logoLoaded, setLogoLoaded] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    setLogoLoaded(true)
  }, [])

  useEffect(() => {
    if (currentIndex < heroData.mainText.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + heroData.mainText[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [currentIndex])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100
      }
    }
  }

  const logoVariants = {
    hidden: { 
      scale: 0,
      rotateX: -180,
      opacity: 0
    },
    visible: {
      scale: 1,
      rotateX: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 100,
        delay: 0.2
      }
    }
  }

  return (
    <motion.section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      id="home"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-terminal-green/5 to-transparent" />
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        
        <motion.div
          className="mb-8"
          variants={logoVariants}
        >
          <motion.h1 
            className="text-8xl md:text-9xl lg:text-[12rem] font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-r from-[#E6DE19] via-[#31DE2B] to-[#0AB3AC]"
            animate={logoLoaded ? {
              textShadow: [
                '0 0 20px #E6DE19',
                '0 0 40px #E6DE19, 0 0 60px #0AB3AC',
                '0 0 20px #E6DE19'
              ]
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            BYTE
          </motion.h1>
          
          <motion.div
            className="absolute inset-0 text-8xl md:text-9xl lg:text-[12rem] font-orbitron font-black text-[#0AB3AC] opacity-20"
            animate={{
              x: [-2, 2, -1, 1, 0],
              y: [-1, 1, -2, 0, 1]
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              repeatDelay: 5
            }}
          >
            BYTE
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-tech-mono text-ghost-white mb-4">
            <span className="text-glow">
              {displayText}
              <motion.span
                className="inline-block w-1 h-8 bg-[#E6DE19] ml-1"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </span>
          </h2>
          <motion.p
            className="text-lg md:text-xl text-static-gray font-tech-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
          >
            {heroData.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
          <motion.button
            className="relative px-8 py-4 font-tech-mono font-bold text-lg border-2 backdrop-blur-sm transition-all duration-300 border-[#E6DE19] text-[#E6DE19] bg-[#E6DE19]/10 hover:bg-[#E6DE19] hover:text-digital-abyss w-full sm:w-auto"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 30px rgba(230, 222, 25, 0.5)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">{heroData.buttons.primary}</span>
          </motion.button>
          
          <motion.button
            className="relative px-8 py-4 font-tech-mono font-bold text-lg border-2 backdrop-blur-sm transition-all duration-300 border-[#31DE2B] text-[#31DE2B] bg-[#31DE2B]/10 hover:bg-[#31DE2B] hover:text-digital-abyss w-full sm:w-auto"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 30px rgba(49, 222, 43, 0.5)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">{heroData.buttons.secondary}</span>
          </motion.button>
        </motion.div>

        <motion.div
          className="flex flex-col items-center text-[#31DE2B]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4, duration: 1 }}
        >
          <motion.div
            className="flex flex-col items-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="font-tech-mono text-sm mb-2">SCROLL TO EXPLORE</span>
            <div className="w-px h-16 bg-[#31DE2B] relative">
              <motion.div
                className="absolute top-0 w-full h-4 bg-[#E6DE19]"
                animate={{ y: [0, 48, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}