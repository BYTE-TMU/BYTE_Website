import React from 'react'
import { motion } from 'framer-motion'
import { InfoCard as InfoCardType } from './About'
import { BuildProjectsIcon, LearnByDoingIcon, LeadershipIcon, CommunityIcon } from '@/components/icons/AboutIcons'

interface InfoCardProps {
  card: InfoCardType
  index: number
}

const iconMap = {
  'build-projects': BuildProjectsIcon,
  'learn-by-doing': LearnByDoingIcon,
  'leadership': LeadershipIcon,
  'community': CommunityIcon,
}

export default function InfoCard({ card, index }: InfoCardProps) {
  const IconComponent = iconMap[card.iconName as keyof typeof iconMap]

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div 
        className="absolute inset-0"
        style={{ 
          backgroundColor: '#48f5FE',
          clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)'
        }}
      />
      
      <div 
        className="relative p-5 m-0.5 flex flex-col h-full"
        style={{
          backgroundColor: '#4C5EF6',
          clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)'
        }}
      >
        <div className="mb-3">
          {IconComponent && <IconComponent />}
        </div>

        <h3 className="text-lg font-bold text-white mb-2">
          {card.title}
        </h3>

        <p className="text-white/80 text-sm leading-relaxed mb-4 flex-grow">
          {card.description}
        </p>

        <div className="aspect-[4/3] bg-gray-300 flex items-center justify-center overflow-hidden mt-auto">
          <img 
            src={`https://picsum.photos/280/210?random=${card.id}`}
            alt={`${card.title} illustration`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </motion.div>
  )
}