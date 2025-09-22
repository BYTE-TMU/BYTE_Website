import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const heroData = {
  mainText: "Build Your Technical Experience",
  subtitle: "TMU's First Student-Led AI Innovation Lab",
  buttons: {
    primary: "Join the Revolution",
    secondary: "Explore Projects"
  }
}

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
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#48F5FE]/5 to-transparent" />
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        
        <motion.div
          className="mb-8 mt-16"
          variants={logoVariants}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white" style={{ fontFamily: 'Lastica, sans-serif' }}>
            {displayText}
            <motion.span
              className="inline-block w-1 h-8 bg-[#48F5FE] ml-1"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </h1>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <motion.p
            className="text-lg md:text-xl text-static-gray font-tech-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {heroData.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
          <motion.a
            className="relative px-6 py-3 text-digital-abyss font-bold text-sm transition-all duration-200"
            style={{
              background: 'linear-gradient(to bottom, #48F5FE, #2B9398)',
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 16px 100%, 0 calc(100% - 16px))'
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">{heroData.buttons.primary}</span>
          </motion.a>
          
          <motion.a
            className="relative px-6 py-3 text-white font-bold text-sm transition-all duration-200"
            style={{
              background: 'linear-gradient(to bottom, #4C5EF6, #2C3790)',
              clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)'
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">{heroData.buttons.secondary}</span>
          </motion.a>
        </motion.div>

        <motion.div
          className="flex flex-col items-center text-[#4C5EF6]"
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
            <div className="w-px h-16 bg-[#4C5EF6] relative">
              <motion.div
                className="absolute top-0 w-full h-4 bg-[#48F5FE]"
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