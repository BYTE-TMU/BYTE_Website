import React, { useState, Children } from 'react'
import { motion, AnimatePresence, type PanInfo } from 'framer-motion'

interface SliderSectionProps {
  title: string
  titleColor?: string
  itemsPerPage: 2 | 4
  children: React.ReactNode
}

export default function SliderSection({ 
  title, 
  titleColor = '#ECE700', 
  itemsPerPage, 
  children 
}: SliderSectionProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [direction, setDirection] = useState(0)

  const childrenArray = Children.toArray(children)
  const totalPages = Math.ceil(childrenArray.length / itemsPerPage)
  
  const getCurrentPageItems = () => {
    const startIndex = currentPage * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return childrenArray.slice(startIndex, endIndex)
  }

  const nextPage = () => {
    setDirection(1)
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setDirection(-1)
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const handleDragEnd = (event: any, info: PanInfo) => {
    const swipeThreshold = 50
    if (info.offset.x > swipeThreshold) {
      prevPage()
    } else if (info.offset.x < -swipeThreshold) {
      nextPage()
    }
  }

  const gridCols = itemsPerPage === 2 ? 'md:grid-cols-2' : 'lg:grid-cols-4 md:grid-cols-2'

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
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 
            className="text-5xl font-orbitron font-black mb-4"
            style={{ color: titleColor }}
          >
            {title}
          </h2>
          <div className="w-24 h-1 bg-terminal-green mx-auto" />
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentPage}
              custom={direction}
              initial={(custom) => ({
                x: custom > 0 ? 1000 : -1000,
                opacity: 0
              })}
              animate={{
                x: 0,
                opacity: 1
              }}
              exit={(custom) => ({
                x: custom < 0 ? 1000 : -1000,
                opacity: 0
              })}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={handleDragEnd}
              className={`grid grid-cols-1 ${gridCols} gap-6`}
            >
              {getCurrentPageItems()}
            </motion.div>
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
              onClick={prevPage}
              className="relative p-3 bg-digital-abyss m-0.5 transition-all duration-200 hover:shadow-lg"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 16px 100%, 0 calc(100% - 16px))'
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous page"
            >
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </div>

          <span className="font-tech-mono text-ghost-white/80 text-lg">
            {currentPage + 1} of {totalPages}
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
              onClick={nextPage}
              className="relative p-3 bg-digital-abyss m-0.5 transition-all duration-200 hover:shadow-lg"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)'
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next page"
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