
import { motion } from 'framer-motion'
import { Event } from '@/data/eventsData'

interface EventGridCardProps {
  event: Event
  formatDate: (date: string) => string
  index: number
  isPlaceholder?: boolean
}

export default function EventGridCard({ event, formatDate, index, isPlaceholder = false }: EventGridCardProps) {
  const currentDate = new Date()
  const eventDate = new Date(event.date)

  // Determine event status
  const isPast = eventDate < currentDate && event.date !== 'TBA'
  const isCurrent = eventDate.toDateString() === currentDate.toDateString()
  const isUpcoming = eventDate > currentDate && !isCurrent

  // Get status badge info
  const getStatusBadge = () => {
    if (isPlaceholder) return null
    if (isPast) return { text: 'PAST EVENT', color: 'bg-gray-500/80' }
    if (isCurrent) return { text: 'HAPPENING NOW', color: 'bg-gradient-to-r from-[#2B9398] to-[#48F5FE]' }
    if (isUpcoming) return { text: 'UPCOMING', color: 'bg-[#48F5FE]' }
    return null
  }

  const statusBadge = getStatusBadge()

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) }}
      viewport={{ once: true }}
    >
      {/* Gradient border wrapper for current events */}
      {isCurrent && !isPlaceholder && (
        <motion.div
          className="absolute inset-0 rounded-lg"
          style={{
            background: 'linear-gradient(135deg, #2B9398, #48F5FE, #2B9398)',
            backgroundSize: '200% 200%',
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}

      <div className={`relative space-y-1.5 ${isCurrent ? 'p-[2px]' : ''}`}>
        <div className={`relative ${isCurrent ? 'bg-[#0A0A0A] rounded-lg' : ''}`}>
          {/* Status Badge */}
          {statusBadge && (
            <div className="absolute top-2 left-2 z-10">
              <div className={`${statusBadge.color} px-2 py-0.5 rounded text-[10px] font-bold text-white shadow-lg ${isCurrent ? 'animate-pulse' : ''}`}>
                {statusBadge.text}
              </div>
            </div>
          )}

          <div className={`aspect-video flex items-center justify-center ${isPlaceholder ? 'bg-gray-500' : 'bg-gray-300'} overflow-hidden ${isCurrent ? 'rounded-t-lg' : ''}`}>
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

          <div className={isCurrent ? 'px-2 pb-2' : ''}>
            <h4 className={`text-sm font-bold mb-0.5 ${isPlaceholder ? 'text-gray-400' : isPast ? 'text-gray-400' : 'text-white'}`}>
              {event.title}
            </h4>
            <div
              className="h-0.5 mb-1"
              style={{
                backgroundColor: isPlaceholder ? '#6B7280' : isPast ? '#6B7280' : isCurrent ? '#48F5FE' : '#48f5FE'
              }}
            />
            <p className={`text-xs ${isPlaceholder ? 'text-gray-500' : isPast ? 'text-gray-500' : 'text-white/80'}`}>
              {formatDate(event.date)}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}