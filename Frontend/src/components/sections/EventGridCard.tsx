import React from 'react'
import { motion } from 'framer-motion'
import { Event } from '@/data/eventsData'

interface EventGridCardProps {
  event: Event
  formatDate: (date: string) => string
  index: number
}

export default function EventGridCard({ event, formatDate, index }: EventGridCardProps) {
  const isPast = new Date(event.date) < new Date()

  return (
    <motion.div
      className={`space-y-1.5 ${isPast ? 'opacity-60' : 'opacity-100'}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: isPast ? 0.6 : 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) }}
      viewport={{ once: true }}
    >
      <div className="aspect-video bg-gray-300 flex items-center justify-center">
        {event.imageUrl ? (
          <img 
            src={event.imageUrl} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-gray-500 text-center">
            <svg className="w-4 h-4 mx-auto mb-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <p className="text-xs">Event Image</p>
          </div>
        )}
      </div>

      <div>
        <h4 className="text-sm font-bold text-white mb-0.5">
          {event.title}
        </h4>
        <div 
          className="h-0.5 mb-1"
          style={{ backgroundColor: '#48f5FE' }}
        />
        <p className="text-white/80 text-xs">
          {formatDate(event.date)}
        </p>
      </div>
    </motion.div>
  )
}