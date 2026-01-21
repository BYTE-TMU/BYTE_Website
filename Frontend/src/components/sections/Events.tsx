import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { eventsData, Event } from '@/data/eventsData'

export default function Events() {
  const [allEvents, setAllEvents] = useState<Event[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Auto-advance interval in milliseconds
  const AUTO_ADVANCE_INTERVAL = 5000

  // Helper functions for filtering events
  const getUpcomingEvents = (): Event[] => {
    const currentDate = new Date();
    return eventsData
      .filter(event => new Date(event.date) >= currentDate)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const getPastEvents = (): Event[] => {
    const currentDate = new Date();
    return eventsData
      .filter(event => new Date(event.date) < currentDate)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  useEffect(() => {
    const upcoming = getUpcomingEvents()
    const past = getPastEvents()

    // Combine all events: upcoming first, then past
    let events = [...upcoming, ...past]

    // Add placeholder if no events
    if (events.length === 0) {
      events = [{
        id: 'placeholder',
        title: 'Coming Soon',
        date: 'TBA',
        description: 'Stay tuned for more exciting events and workshops.',
        imageUrl: 'https://picsum.photos/600/400?random=placeholder',
        location: 'TMU Campus',
        type: 'social' as const
      }]
    }

    setAllEvents(events)
  }, [])

  // Auto-advance functionality
  useEffect(() => {
    if (isPaused || allEvents.length <= 1) return

    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % allEvents.length)
    }, AUTO_ADVANCE_INTERVAL)

    return () => clearInterval(interval)
  }, [isPaused, allEvents.length])

  const formatDate = (dateString: string) => {
    if (dateString === 'TBA') return 'TBA'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    })
  }

  const getEventStatus = (event: Event) => {
    if (event.date === 'TBA') return null
    const currentDate = new Date()
    const eventDate = new Date(event.date)

    if (eventDate.toDateString() === currentDate.toDateString()) {
      return { text: 'HAPPENING NOW', color: 'bg-gradient-to-r from-[#2B9398] to-[#48F5FE]', animate: true }
    }
    if (eventDate < currentDate) {
      return { text: 'PAST EVENT', color: 'bg-gray-500/80', animate: false }
    }
    return { text: 'UPCOMING', color: 'bg-[#48F5FE]', animate: false }
  }

  const goToNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % allEvents.length)
  }, [allEvents.length])

  const goToPrev = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + allEvents.length) % allEvents.length)
  }, [allEvents.length])

  const goToIndex = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }, [currentIndex])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrev()
      if (e.key === 'ArrowRight') goToNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToNext, goToPrev])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0
    })
  }

  const currentEvent = allEvents[currentIndex]

  if (!currentEvent) return null

  const status = getEventStatus(currentEvent)

  return (
    <section className="py-20 bg-digital-abyss relative overflow-hidden" id="events">
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-terminal-green/20" />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-5xl lg:text-6xl font-orbitron font-black mb-6 text-transparent bg-clip-text"
            style={{ background: 'linear-gradient(to right, #ffffffff, #48F5FE)', WebkitBackgroundClip: 'text' }}
          >
            Our Events
          </h2>
          <p className="text-lg lg:text-xl text-ghost-white max-w-4xl mx-auto leading-relaxed">
            We connect like-minded individuals who are passionate about AI through hackathons, events & networking opportunities
          </p>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Outer border */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: '#48f5FE',
              clipPath: 'polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 32px 100%, 0 calc(100% - 32px))'
            }}
          />

          {/* Inner container */}
          <div
            className="relative p-6 lg:p-10 m-1"
            style={{
              backgroundColor: '#4C5EF6',
              clipPath: 'polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 32px 100%, 0 calc(100% - 32px))'
            }}
          >
            {/* Navigation Arrows */}
            <button
              onClick={goToPrev}
              className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all duration-300 group"
              aria-label="Previous event"
            >
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white group-hover:text-[#48F5FE] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={goToNext}
              className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all duration-300 group"
              aria-label="Next event"
            >
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white group-hover:text-[#48F5FE] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Carousel Container */}
            <div className="relative overflow-hidden mx-8 lg:mx-16">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
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
                  onDragEnd={(_, { offset, velocity }) => {
                    const swipe = Math.abs(offset.x) * velocity.x
                    if (swipe < -10000) {
                      goToNext()
                    } else if (swipe > 10000) {
                      goToPrev()
                    }
                  }}
                  className="cursor-grab active:cursor-grabbing"
                >
                  {/* Event Card */}
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    {/* Image */}
                    <div className="relative">
                      {/* Status Badge */}
                      {status && (
                        <div className="absolute top-4 left-4 z-10">
                          <div className={`${status.color} px-4 py-1.5 rounded text-sm font-bold text-white shadow-lg ${status.animate ? 'animate-pulse' : ''}`}>
                            {status.text}
                          </div>
                        </div>
                      )}

                      <div className="aspect-video bg-gray-300 overflow-hidden rounded-lg">
                        {currentEvent.imageUrl ? (
                          <img
                            src={currentEvent.imageUrl}
                            alt={currentEvent.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-500">
                            <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <h3 className="text-3xl lg:text-4xl font-bold text-white">
                        {currentEvent.title}
                      </h3>
                      <div
                        className="h-1 w-24"
                        style={{ backgroundColor: '#48f5FE' }}
                      />
                      <p className="text-lg text-white">
                        {formatDate(currentEvent.date)}
                      </p>
                      {currentEvent.location && (
                        <p className="text-white flex items-center gap-2">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          {currentEvent.location}
                        </p>
                      )}
                      {currentEvent.description && (
                        <p className="text-white leading-relaxed">
                          {currentEvent.description}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {allEvents.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                    ? 'bg-[#48F5FE] w-8'
                    : 'bg-white/40 hover:bg-white/60'
                    }`}
                  aria-label={`Go to event ${index + 1}`}
                />
              ))}
            </div>

            {/* Event Counter */}
            <div className="text-center mt-4 text-white/60 text-sm">
              {currentIndex + 1} / {allEvents.length}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}