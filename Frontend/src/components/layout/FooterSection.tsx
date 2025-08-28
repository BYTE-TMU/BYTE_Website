import React from 'react'
import { motion } from 'framer-motion'
import { FooterSection as FooterSectionType } from '@/data/footerData'
import FooterLink from './FooterLink'

interface FooterSectionProps {
  section: FooterSectionType
  index: number
  onLinkClick: (href: string) => void
}

export default function FooterSection({ section, index, onLinkClick }: FooterSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <h4 className="font-orbitron font-bold text-[#48F5FE] text-sm mb-4 text-glow">
        {section.title}
      </h4>
      <ul className="space-y-2">
        {section.links.map((link, linkIndex) => (
          <FooterLink
            key={linkIndex}
            link={link}
            onClick={() => onLinkClick(link.href)}
            index={linkIndex}
          />
        ))}
      </ul>
    </motion.div>
  )
}