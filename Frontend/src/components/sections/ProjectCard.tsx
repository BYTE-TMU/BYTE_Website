import React from 'react'
import { motion } from 'framer-motion'
import type { PanInfo } from 'framer-motion'
import { Project } from '@/data/projectsData'

interface ProjectCardProps {
  project: Project
  direction: number
  onDragEnd: (event: any, info: PanInfo) => void
}

export default function ProjectCard({ project, direction, onDragEnd }: ProjectCardProps) {
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  return (
    <motion.div
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
      onDragEnd={onDragEnd}
      className="p-8 cursor-grab active:cursor-grabbing"
      style={{ 
        backgroundColor: '#48F5FE',
        clipPath: 'polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 28px 100%, 0 calc(100% - 28px))'
      }}
    >
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <div className="flex items-center">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              project.status === 'On-going' 
                ? 'bg-green-500 text-white' 
                : 'bg-blue-500 text-white'
            }`}>
              {project.status}
            </span>
          </div>

          <h3 className="text-3xl font-orbitron font-bold text-digital-abyss">
            {project.title}
          </h3>

          <p className="text-digital-abyss/80 leading-relaxed text-base">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech, index) => (
              <motion.span
                key={tech}
                className="relative px-4 py-1.5 text-white font-medium text-sm"
                style={{
                  backgroundColor: '#4C5EF6',
                  clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)'
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2, scale: 1.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex justify-end">
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative px-6 py-3 text-white font-bold text-sm transition-all duration-200"
              style={{
                background: 'linear-gradient(to bottom, #4C5EF6, #2C3790)',
                clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)'
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View GitHub
            </motion.a>
          </div>

          <div className="aspect-video bg-gray-300 rounded-lg flex items-center justify-center">
            {project.imageUrl ? (
              <img 
                src={project.imageUrl} 
                alt={`${project.title} preview`}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="text-gray-500 text-center">
                <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                <p className="text-sm">Project Preview</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}