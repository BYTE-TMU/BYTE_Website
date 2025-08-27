import React, { useState } from 'react'
import { motion, AnimatePresence, type PanInfo } from 'framer-motion'
import { projectsData } from '@/data/projectsData'
import ProjectCard from './ProjectCard'

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const currentProject = projectsData[currentIndex]
  const totalProjects = projectsData.length

  const nextProject = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % totalProjects)
  }

  const prevProject = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + totalProjects) % totalProjects)
  }

  const handleDragEnd = (event: any, info: PanInfo) => {
    const swipeThreshold = 50
    if (info.offset.x > swipeThreshold) {
      prevProject()
    } else if (info.offset.x < -swipeThreshold) {
      nextProject()
    }
  }

  return (
    <section className="py-20 bg-digital-abyss relative overflow-hidden" id="projects">
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-terminal-green/20" />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-r from-acid-yellow via-terminal-green to-glitch-cyan mb-4">
            Our Projects
          </h2>
          <div className="w-24 h-1 bg-terminal-green mx-auto" />
        </motion.div>

        <motion.div
          className="mb-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-ghost-white/80 font-tech-mono text-lg">
            {currentProject.type === 'current' ? 'Current Project' : 'Past Project'}
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <ProjectCard
              key={currentProject.id}
              project={currentProject}
              direction={direction}
              onDragEnd={handleDragEnd}
            />
          </AnimatePresence>
        </div>

        <motion.div
          className="flex items-center justify-center mt-8 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            <div 
              className="absolute inset-0"
              style={{ 
                backgroundColor: '#ECE000',
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 16px 100%, 0 calc(100% - 16px))'
              }}
            />
            
            <motion.button
              onClick={prevProject}
              className="relative p-3 bg-digital-abyss m-0.5 transition-all duration-200 hover:shadow-lg"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 16px 100%, 0 calc(100% - 16px))'
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous project"
            >
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </div>

          <span className="font-tech-mono text-ghost-white/80 text-lg">
            {currentIndex + 1} of {totalProjects}
          </span>

          <div className="relative">
            <div 
              className="absolute inset-0"
              style={{ 
                backgroundColor: '#ECE000',
                clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)'
              }}
            />
            
            <motion.button
              onClick={nextProject}
              className="relative p-3 bg-digital-abyss m-0.5 transition-all duration-200 hover:shadow-lg"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)'
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next project"
            >
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}