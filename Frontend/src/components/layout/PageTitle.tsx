import React from 'react'
import { motion } from 'framer-motion'

interface PageTitleProps {
  title: string
  subtitle: string
}

export default function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <section className="min-h-screen bg-digital-abyss relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-terminal-green/20" />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <motion.h1
          className="text-6xl lg:text-8xl font-orbitron font-black mb-8"
          style={{ color: '#ECE000' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {title}
        </motion.h1>
        
        <motion.p
          className="text-xl lg:text-2xl text-ghost-white max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  )
}