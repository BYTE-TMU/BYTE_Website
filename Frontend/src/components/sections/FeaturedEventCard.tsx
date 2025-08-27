import React from 'react'
import { motion } from 'framer-motion'
import { Event } from '@/data/eventsData'

interface FeaturedEventCardProps {
  event: Event
  formatDate: (date: string) => string
}

export default function FeaturedEventCard({ event, formatDate }: FeaturedEventCardProps) {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
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
            <svg className="w-20 h-20 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <p className="text-base">Event Image</p>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-2xl font-bold text-white mb-3">
          {event.title}
        </h3>
        <div 
          className="h-1 mb-4"
          style={{ backgroundColor: '#ECE700' }}
        />
        <p className="text-white/80 text-base">
          {formatDate(event.date)}
        </p>
      </div>
    </motion.div>
  )
}