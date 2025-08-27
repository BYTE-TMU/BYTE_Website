import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FooterLink as FooterLinkType } from '@/data/footerData'

interface FooterLinkProps {
  link: FooterLinkType
  onClick: () => void
  index: number
}

export default function FooterLink({ link, onClick, index }: FooterLinkProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.li
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      viewport={{ once: true }}
    >
      <motion.button
        onClick={onClick}
        className="font-tech-mono text-ghost-white/70 hover:text-glitch-cyan text-sm transition-all duration-300 group flex items-center space-x-2"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ x: 5 }}
      >
        <motion.span
          className="text-terminal-green opacity-0 group-hover:opacity-100"
          animate={isHovered ? {
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          } : {}}
          transition={{ duration: 0.3 }}
        >
          →
        </motion.span>
        <span>{link.label}</span>
      </motion.button>
    </motion.li>
  )
}