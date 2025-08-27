import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { eventsData, Event } from '@/data/eventsData'
import FeaturedEventCard from './FeaturedEventCard'
import EventGridCard from './EventGridCard'

export default function Events() {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([])
  const [pastEvents, setPastEvents] = useState<Event[]>([])
  const [featuredEvent, setFeaturedEvent] = useState<Event | null>(null)
  const [gridEvents, setGridEvents] = useState<Event[]>([])

  useEffect(() => {
    const currentDate = new Date()
    
    const upcoming = eventsData
      .filter(event => new Date(event.date) >= currentDate)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    
    const past = eventsData
      .filter(event => new Date(event.date) < currentDate)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    setUpcomingEvents(upcoming)
    setPastEvents(past)

    const featured = upcoming.length > 0 ? upcoming[0] : (past.length > 0 ? past[0] : null)
    setFeaturedEvent(featured)

    let grid: Event[] = []
    
    const remainingUpcoming = upcoming.slice(1)
    grid = [...remainingUpcoming]
    
    if (grid.length < 6) {
      const neededCount = 6 - grid.length
      grid = [...grid, ...past.slice(0, neededCount)]
    }
    
    setGridEvents(grid.slice(0, 6))
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    })
  }

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
            style={{ background: 'linear-gradient(to right, #2B9398, #48F5FE)', WebkitBackgroundClip: 'text' }}
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
        >
          <div 
            className="absolute inset-0"
            style={{ 
              backgroundColor: '#48f5FE',
              clipPath: 'polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 32px 100%, 0 calc(100% - 32px))'
            }}
          />
          
          <div 
            className="relative p-6 lg:p-8 m-1"
            style={{
              backgroundColor: '#4C5EF6',
              clipPath: 'polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 32px 100%, 0 calc(100% - 32px))'
            }}
          >
            <div className="grid lg:grid-cols-5 gap-8">
              <div className="lg:col-span-2">
                {featuredEvent && (
                  <FeaturedEventCard event={featuredEvent} formatDate={formatDate} />
                )}
              </div>

              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {gridEvents.map((event, index) => (
                    <EventGridCard
                      key={event.id}
                      event={event}
                      formatDate={formatDate}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}