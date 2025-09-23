
import { motion } from 'framer-motion'
import ActionBtn from '@/components/layout/ActionBtn'

interface AnnouncementCardProps {
  date: string
  title: string
  description: string
  imageUrl?: string
  buttonText?: string
  onButtonClick?: () => void
  isPlaceholder?: boolean
}

export default function AnnouncementCard({
  date,
  title,
  description,
  imageUrl,
  buttonText,
  onButtonClick,
  isPlaceholder = false
}: AnnouncementCardProps) {
  const showButton = buttonText && onButtonClick && !isPlaceholder

  return (
    <motion.div
      className={`relative ${isPlaceholder ? 'opacity-50' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: isPlaceholder ? 0.5 : 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ y: isPlaceholder ? 0 : -5 }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: isPlaceholder ? '#6B7280' : '#48F5FE',
          clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))'
        }}
      />

      <div
        className="relative p-6 m-0.5 flex flex-col h-full"
        style={{
          backgroundColor: isPlaceholder ? '#374151' : '#4C5EF6',
          clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))'
        }}
      >
        <div className="flex justify-between items-start mb-4">
          <p className="text-sm font-medium" style={{ color: isPlaceholder ? '#9CA3AF' : '#48f5FE' }}>
            {date}
          </p>

          {showButton && (
            <ActionBtn
              text={buttonText}
              onClick={onButtonClick}
              className="absolute top-4 right-4"
              variant="light"
            />
          )}
        </div>

        <h3 className={`text-xl font-bold mb-3 ${isPlaceholder ? 'text-gray-400' : 'text-white'}`}>
          {title}
        </h3>

        <p className={`text-sm leading-relaxed mb-6 flex-grow ${isPlaceholder ? 'text-gray-500' : 'text-white/80'}`}>
          {description}
        </p>

        <div className="aspect-[16/9] bg-gray-300 rounded-lg flex items-center justify-center overflow-hidden mt-auto">
          {imageUrl ? (
            <img 
              src={imageUrl}
              alt={`${title} illustration`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500 text-sm">Image placeholder</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}