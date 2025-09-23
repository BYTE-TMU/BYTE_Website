import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Event } from '@/data/eventsData'

interface EventRecapModalProps {
  event: Event | null
  isOpen: boolean
  onClose: () => void
}

export default function EventRecapModal({ event, isOpen, onClose }: EventRecapModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Custom scrollbar styles
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      .custom-scrollbar::-webkit-scrollbar {
        width: 8px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: #0A0E1B;
        border-radius: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #48F5FE;
        border-radius: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: #2B9398;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!event?.recap) return null

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % event.recap!.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + event.recap!.images.length) % event.recap!.images.length)
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ duration: 0.3, type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Border */}
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: '#48F5FE',
                clipPath: 'polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 32px 100%, 0 calc(100% - 32px))'
              }}
            />

            {/* Content Container */}
            <div
              className="relative m-1 bg-digital-abyss overflow-hidden"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 32px 100%, 0 calc(100% - 32px))'
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-terminal-green/20">
                <h2 className="text-2xl lg:text-3xl font-orbitron font-black text-white">
                  {event.title}
                </h2>

                {/* Close Button */}
                <motion.button
                  onClick={onClose}
                  className="relative p-2 text-white hover:text-terminal-green transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close modal"
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundColor: '#48F5FE',
                      clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)'
                    }}
                  />
                  <div
                    className="relative bg-digital-abyss m-0.5 p-1"
                    style={{
                      clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)'
                    }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </motion.button>
              </div>

              {/* Content */}
              <div
                className="max-h-[calc(90vh-120px)] overflow-y-auto custom-scrollbar"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#48F5FE #0A0E1B'
                }}
              >
                <div className="p-6 space-y-6">
                  {/* Summary */}
                  <div>
                    <h3 className="text-xl font-bold text-terminal-green mb-3 font-orbitron">
                      Event Summary
                    </h3>
                    <p className="text-ghost-white/90 leading-relaxed font-tech-mono">
                      {event.recap.summary}
                    </p>
                  </div>

                  {/* Image Carousel */}
                  {event.recap.images.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-terminal-green mb-4 font-orbitron">
                        Event Photos
                      </h3>

                      {/* Main Image */}
                      <div className="relative aspect-video mb-4 overflow-hidden bg-gray-800">
                        <motion.img
                          key={currentImageIndex}
                          src={event.recap.images[currentImageIndex]}
                          alt={`${event.title} photo ${currentImageIndex + 1}`}
                          className="w-full h-full object-cover"
                          initial={{ opacity: 0, x: 300 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -300 }}
                          transition={{ duration: 0.3 }}
                        />

                        {/* Navigation Arrows */}
                        {event.recap.images.length > 1 && (
                          <>
                            <motion.button
                              onClick={prevImage}
                              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white hover:bg-black/70 transition-colors duration-200"
                              style={{
                                clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)'
                              }}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              aria-label="Previous image"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </motion.button>

                            <motion.button
                              onClick={nextImage}
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white hover:bg-black/70 transition-colors duration-200"
                              style={{
                                clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)'
                              }}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              aria-label="Next image"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                              </svg>
                            </motion.button>
                          </>
                        )}

                        {/* Image Counter */}
                        <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/70 text-white text-sm font-tech-mono">
                          {currentImageIndex + 1} / {event.recap.images.length}
                        </div>
                      </div>

                      {/* Thumbnail Strip */}
                      {event.recap.images.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto pb-2">
                          {event.recap.images.map((image, index) => (
                            <motion.button
                              key={index}
                              onClick={() => goToImage(index)}
                              className={`flex-shrink-0 w-20 h-16 overflow-hidden border-2 transition-all duration-200 ${
                                index === currentImageIndex
                                  ? 'border-terminal-green'
                                  : 'border-gray-600 hover:border-gray-400'
                              }`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <img
                                src={image}
                                alt={`${event.title} thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </motion.button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}