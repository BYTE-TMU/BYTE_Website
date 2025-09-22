import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import FooterSection from './FooterSection'
import SystemStatus from './SystemStatus'

export interface FooterLink {
  label: string
  href: string
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

const footerData = {
  sections: {
    joinByte: {
      title: 'JOIN BYTE',
      links: [
        { label: 'Become a Member', href: '/#join' },
        { label: 'Join our Team', href: '/#join' }
      ]
    },
    about: {
      title: 'ABOUT',
      links: [
        { label: 'Why BYTE?', href: '/#about' },
        { label: 'Core Team', href: '/about#team' }
      ]
    },
    projects: {
      title: 'PROJECTS',
      links: [
        { label: 'Current Project', href: '/#projects' },
        { label: 'Past Projects', href: '/#projects' }
      ]
    },
    events: {
      title: 'EVENTS',
      links: [
        { label: 'Upcoming Events', href: '/#events' },
        { label: 'Past Events', href: '/#events' }
      ]
    },
    connect: {
      title: 'CONNECT',
      links: [
        { label: 'Contact Us', href: '/support#contact' },
        { label: 'Social Media', href: 'https://instagram.com/tmu.byte' }
      ]
    },
    legal: {
      title: '',
      links: [
        { label: 'Terms of Service', href: '#terms' },
        { label: 'Privacy', href: '#privacy' }
      ]
    }
  },
  matrixCharacters: '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン',
  brandingInfo: {
    description: "Building Toronto Metropolitan University's premier AI innovation ecosystem through collaborative learning and cutting-edge research.",
    status: {
      current: 'ACTIVE',
      version: '2.0.1',
      uptime: '99.9%'
    }
  },
  copyright: '©2025 BYTE. All Rights Reserved.',
  systemStatus: [
    { label: 'NEURAL_NETWORK', status: 'ONLINE', color: 'terminal-green' },
    { label: 'DATABASE', status: 'SYNCED', color: 'glitch-cyan' },
    { label: 'SECURITY', status: 'ENCRYPTED', color: 'acid-yellow' }
  ]
};

export default function Footer() {
  const matrixRef = useRef<HTMLCanvasElement>(null)
  const [logoGlitch, setLogoGlitch] = useState(false)

  useEffect(() => {
    if (!matrixRef.current) return

    const canvas = matrixRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const updateCanvasSize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    
    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops = Array(columns).fill(0)

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 14, 27, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#48F5FE'
      ctx.font = `${fontSize}px 'Share Tech Mono', monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = footerData.matrixCharacters[Math.floor(Math.random() * footerData.matrixCharacters.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        ctx.fillText(text, x, y)

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 50)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', updateCanvasSize)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setLogoGlitch(true)
      setTimeout(() => setLogoGlitch(false), 200)
    }, 10000)
    
    return () => clearInterval(interval)
  }, [])

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.slice(1))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else if (href.startsWith('/')) {
      // Internal navigation - use same tab
      window.location.href = href
    } else {
      // External links - open in new tab
      window.open(href, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <footer className="relative bg-gradient-to-b from-digital-abyss to-digital-abyss border-t border-[#48F5FE]/30 overflow-hidden">
      <canvas
        ref={matrixRef}
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ width: '100%', height: '100%' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 lg:grid-rows-2 gap-12 mb-12">
          <div className="lg:row-span-2">
            <motion.div
              className="mb-8"
              onMouseEnter={() => setLogoGlitch(true)}
              onMouseLeave={() => setLogoGlitch(false)}
              style={{
                transform: logoGlitch ? 'translateX(2px) translateY(1px)' : 'none',
                filter: logoGlitch ? 'hue-rotate(90deg) saturate(200%)' : 'none'
              }}
            >
              <motion.h3 
                className="text-4xl font-orbitron font-black text-transparent bg-clip-text mb-4"
                style={{ background: 'linear-gradient(to right, #2B9398, #48F5FE)', WebkitBackgroundClip: 'text' }}
                animate={{
                  textShadow: [
                    '0 0 10px #48F5FE',
                    '0 0 20px #48F5FE, 0 0 30px #4C5EF6',
                    '0 0 10px #48F5FE'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                BYTE
              </motion.h3>
              
              <motion.div
                className="absolute inset-0 text-4xl font-orbitron font-black text-red-500 opacity-20"
                animate={{
                  x: [-1, 1, -1, 0],
                  y: [-1, 0, 1, 0]
                }}
                transition={{
                  duration: 0.2,
                  repeat: Infinity,
                  repeatDelay: 8
                }}
              >
                BYTE
              </motion.div>
            </motion.div>
            
            <p className="font-tech-mono text-ghost-white/70 text-sm leading-relaxed mb-6">
              {footerData.brandingInfo.description}
            </p>

            <div className="space-y-2 font-tech-mono text-xs">
              <div style={{ color: '#48F5FE' }}>
                STATUS: <span style={{ color: '#CEFE00' }}>{footerData.brandingInfo.status.current}</span>
              </div>
              <div style={{ color: '#4C5EF6' }}>
                VERSION: <span className="text-ghost-white">{footerData.brandingInfo.status.version}</span>
              </div>
              <div style={{ color: '#2B9398' }}>
                UPTIME: <span className="text-ghost-white">{footerData.brandingInfo.status.uptime}</span>
              </div>
            </div>
          </div>

          <FooterSection
            section={footerData.sections.joinByte}
            index={0}
            onLinkClick={scrollToSection}
          />
          <FooterSection
            section={footerData.sections.about}
            index={1}
            onLinkClick={scrollToSection}
          />
          <FooterSection
            section={footerData.sections.projects}
            index={2}
            onLinkClick={scrollToSection}
          />

          <FooterSection
            section={footerData.sections.events}
            index={3}
            onLinkClick={scrollToSection}
          />
          <FooterSection
            section={footerData.sections.connect}
            index={4}
            onLinkClick={scrollToSection}
          />
          <FooterSection
            section={footerData.sections.legal}
            index={5}
            onLinkClick={scrollToSection}
          />
        </div>

        <motion.div
          className="border-t border-[#48F5FE]/20 pt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="font-tech-mono text-ghost-white/60 text-xs">
              {footerData.copyright}
            </div>
            
            <div className="flex items-center space-x-6 font-tech-mono text-xs">
              {footerData.systemStatus.map((status, index) => (
                <SystemStatus 
                  key={index}
                  label={status.label} 
                  status={status.status} 
                  color={status.color} 
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#48F5FE] to-transparent opacity-50" />
      
      <motion.div
        className="absolute top-0 left-0 w-full h-px"
        style={{ background: 'linear-gradient(to right, transparent, #48F5FE, transparent)' }}
        animate={{
          opacity: [0.3, 0.8, 0.3],
          scaleX: [0.8, 1, 0.8]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </footer>
  )
}