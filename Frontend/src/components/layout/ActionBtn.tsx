import React from 'react'
import { motion } from 'framer-motion'

interface ActionBtnProps {
  text: string
  onClick: () => void
  className?: string
}

export default function ActionBtn({ text, onClick, className = "" }: ActionBtnProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative text-digital-abyss font-bold px-4 py-2 text-sm transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-green-400/50 ${className}`}
      style={{
        background: 'linear-gradient(to bottom, #B7FFB5, #31DE2B)',
        clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)'
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative z-10">{text}</span>
    </motion.button>
  )
}