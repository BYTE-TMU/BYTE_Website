
import { motion } from 'framer-motion'
import { Event } from '@/data/eventsData'

interface EventGridCardProps {
  event: Event
  formatDate: (date: string) => string
  index: number
  isPlaceholder?: boolean
}

export default function EventGridCard({ event, formatDate, index, isPlaceholder = false }: EventGridCardProps) {
  const isPast = new Date(event.date) < new Date()
  const shouldDim = isPast || isPlaceholder

  return (
    <motion.div
      className={`space-y-1.5 ${shouldDim ? 'opacity-60' : 'opacity-100'}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: shouldDim ? 0.6 : 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) }}
      viewport={{ once: true }}
    >
      <div className={`aspect-video flex items-center justify-center ${isPlaceholder ? 'bg-gray-500' : 'bg-gray-300'}`}>
        {event.imageUrl ? (
          <img
            src={event.imageUrl}
            alt={event.title}
            className={`w-full h-full object-cover ${isPlaceholder ? 'opacity-50' : ''}`}
          />
        ) : (
          <div className={`text-center ${isPlaceholder ? 'text-gray-400' : 'text-gray-500'}`}>
            <svg className="w-4 h-4 mx-auto mb-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <p className="text-xs">Event Image</p>
          </div>
        )}
      </div>

      <div>
        <h4 className={`text-sm font-bold mb-0.5 ${isPlaceholder ? 'text-gray-400' : 'text-white'}`}>
          {event.title}
        </h4>
        <div
          className="h-0.5 mb-1"
          style={{ backgroundColor: isPlaceholder ? '#6B7280' : '#48f5FE' }}
        />
        <p className={`text-xs ${isPlaceholder ? 'text-gray-500' : 'text-white/80'}`}>
          {formatDate(event.date)}
        </p>
      </div>
    </motion.div>
  )
}