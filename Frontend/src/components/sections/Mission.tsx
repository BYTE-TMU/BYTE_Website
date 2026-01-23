
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Mission() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const eventImages = [
    { src: '/images/events/Demoday.JPG', alt: 'BYTE Demo Day Event' },
    { src: '/images/events/bytelaunch.jpeg', alt: 'BYTE Launch Event' },
    { src: '/images/events/devfestevent.JPG', alt: 'DevFest Event' },
    { src: '/images/events/tmsustreetfair.jpeg', alt: 'TMU Street Fair' },
    { src: '/images/events/Tmutechweek.png', alt: 'TMU Tech Week' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % eventImages.length)
    }, 4000) // Change image every 4 seconds

    return () => clearInterval(interval)
  }, [])

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
        {/* Header Area - Centered */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-5xl lg:text-6xl font-orbitron font-black mb-8 text-transparent bg-clip-text"
            style={{ background: 'linear-gradient(to right, #2B9398, #48F5FE)', WebkitBackgroundClip: 'text' }}
          >
            Our Mission
          </h2>

          <p className="text-lg lg:text-xl text-ghost-white max-w-4xl mx-auto leading-relaxed">
            Building AI that matters, one student project at a time.
          </p>
        </motion.div>

        {/* Two-Column Content Area */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <motion.p
              className="text-ghost-white text-lg leading-relaxed"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              BYTE is a student-led organization dedicated to building innovative AI solutions that address real-world challenges. We bring together passionate developers, designers, and AI enthusiasts to collaborate on cutting-edge projects that push the boundaries of technology.
            </motion.p>

            <motion.p
              className="text-ghost-white text-lg leading-relaxed"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Through hands-on project development, workshops, and community collaboration, we create an environment where students can learn, grow, and make meaningful contributions to the AI ecosystem while building their portfolios and professional networks.
            </motion.p>
          </div>

          {/* Right Column - Image Carousel */}
          <motion.div
            className="aspect-[5/3] rounded-lg flex items-center justify-center overflow-hidden relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={eventImages[currentImageIndex].src}
                alt={eventImages[currentImageIndex].alt}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
              {eventImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex
                      ? 'bg-terminal-green w-6'
                      : 'bg-ghost-white/50 hover:bg-ghost-white/80'
                    }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}