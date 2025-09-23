
import { motion } from 'framer-motion'
import ActionBtn from '@/components/layout/ActionBtn'

interface RecapCardProps {
  title: string
  description: string
  buttonText?: string
  onButtonClick?: () => void
}

export default function RecapCard({ 
  title, 
  description, 
  buttonText, 
  onButtonClick 
}: RecapCardProps) {
  const showButton = buttonText && onButtonClick

  return (
    <motion.div
      className="relative h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div 
        className="p-6 flex flex-col justify-between h-full"
        style={{
          backgroundColor: '#48f5FE',
          clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))'
        }}
      >
        <div className="flex-grow">
          <h3 className="text-lg font-bold text-black mb-3">
            {title}
          </h3>

          <p className="text-black/80 text-sm leading-relaxed mb-4">
            {description}
          </p>
        </div>

        {showButton && (
          <div className="mt-auto pt-4">
            <ActionBtn
              text={buttonText}
              onClick={onButtonClick}
              className="w-full justify-center"
              variant="dark"
            />
          </div>
        )}
      </div>
    </motion.div>
  )
}