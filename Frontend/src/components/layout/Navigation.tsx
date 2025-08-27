import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { menuItems } from '@/data/navigationData'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      setIsScrolled(currentScrollY > 50)
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const handleNavigation = (href: string) => {
    if (href.startsWith('#')) {
      // If we're already on home page, scroll to section
      if (location.pathname === '/') {
        const element = document.getElementById(href.slice(1))
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        // Navigate to home page and then scroll
        navigate('/')
        setTimeout(() => {
          const element = document.getElementById(href.slice(1))
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      }
    } else {
      // Navigate to page
      navigate(href)
    }
    setIsMenuOpen(false)
  }

  const handleJoinClick = () => {
    if (location.pathname === '/') {
      const element = document.getElementById('join')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      navigate('/')
      setTimeout(() => {
        const element = document.getElementById('join')
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
    setIsMenuOpen(false)
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-digital-abyss/95 backdrop-blur-md border-b border-terminal-green/20' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      aria-label="Main navigation"
    >
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link to="/">
            <motion.div
              className="flex items-center pt-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <img 
                src="/BYTE-Logo.png" 
                alt="BYTE Logo" 
                className="h-20 w-auto"
              />
            </motion.div>
          </Link>

          <div className="hidden lg:flex items-center">
            <div className="relative">
              <div 
                className="absolute inset-0"
                style={{ 
                  backgroundColor: '#ECE000',
                  clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)'
                }}
              />
              
              <div 
                className="relative flex items-center bg-gray-600 m-0.5"
                style={{ 
                  clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)'
                }}
              >
                <div className="flex items-center">
                  {menuItems.map((item) => (
                    <motion.button
                      key={item.label}
                      onClick={() => handleNavigation(item.href)}
                      className="relative px-4 py-2 text-sm font-medium text-ghost-white/80 hover:text-white transition-colors duration-200"
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="relative z-10">{item.label}</span>
                      <motion.div
                        className="absolute inset-0 bg-white/10 opacity-0"
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.button>
                  ))}
                </div>

                <motion.button
                  onClick={handleJoinClick}
                  className="relative text-digital-abyss font-bold px-4 py-2 text-sm transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-green-400/50"
                  style={{
                    backgroundColor: '#31DE2B',
                    clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">JOIN BYTE</span>
                </motion.button>
              </div>
            </div>
          </div>

          <motion.button
            className="lg:hidden relative w-8 h-8 flex flex-col justify-center items-center space-y-1.5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle mobile menu"
            aria-expanded={isMenuOpen}
          >
            <motion.div
              className="w-6 h-0.5 bg-terminal-green origin-center"
              animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.div
              className="w-6 h-0.5 bg-terminal-green"
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.div
              className="w-6 h-0.5 bg-terminal-green origin-center"
              animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
          </motion.button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden absolute top-full left-0 right-0 bg-digital-abyss/95 backdrop-blur-md border-t border-terminal-green/20"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-6 py-8 space-y-6">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    onClick={() => handleNavigation(item.href)}
                    className="block w-full text-left py-3 px-4 text-ghost-white/80 hover:text-terminal-green hover:bg-terminal-green/10 rounded-lg transition-all duration-200"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
                
                <motion.button
                  onClick={handleJoinClick}
                  className="w-full bg-terminal-green text-digital-abyss font-bold py-4 px-6 rounded-lg text-center transition-all duration-200 hover:bg-acid-yellow focus:outline-none focus:ring-2 focus:ring-terminal-green/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.6 }}
                  whileTap={{ scale: 0.98 }}
                >
                  JOIN BYTE
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}