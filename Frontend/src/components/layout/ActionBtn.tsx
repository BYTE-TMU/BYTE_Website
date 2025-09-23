import { motion } from 'framer-motion'

interface ActionBtnProps {
  text: string
  onClick: () => void
  className?: string
  variant?: 'light' | 'dark'
}

export default function ActionBtn({ text, onClick, className = "", variant = 'dark' }: ActionBtnProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative font-bold px-4 py-2 text-sm transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-green-400/50 ${variant === 'light' ? 'text-black' : 'text-white'} ${className}`}
      style={{
        background: variant === 'light' ? '#48F5FE' : 'linear-gradient(to bottom, #4C5EF6, #2C3790)',
        clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)'
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative z-10">{text}</span>
    </motion.button>
  )
}