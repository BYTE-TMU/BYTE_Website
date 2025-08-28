import { useState } from 'react'
import { motion } from 'framer-motion'
import { TeamCategory } from '../../data/teamData'
import BubbleCloud from './BubbleCloud'

interface TeamSectionProps {
  title: string
  teamData: TeamCategory[]
}

export default function TeamSection({ title, teamData }: TeamSectionProps) {
  const [activeTab, setActiveTab] = useState(0)
  
  return (
    <section className="py-20 bg-digital-abyss relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-terminal-green/20" />
          ))}
        </div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-orbitron font-black text-white mb-8">
            {title}
          </h2>
        </motion.div>
        
        {/* Tab Navigation */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            {/* Outer border with #CEFE00 color */}
            <div 
              className="absolute inset-0 border-2"
              style={{ 
                borderColor: '#CEFE00',
                clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)'
              }}
            />
            
            {/* Inner background with gray */}
            <div 
              className="relative flex items-center bg-gray-600 m-0.5"
              style={{ 
                clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)'
              }}
            >
              <div className="flex items-center">
                {teamData.map((category, index) => (
                  <motion.button
                    key={category.categoryName}
                    onClick={() => setActiveTab(index)}
                    className="relative px-6 py-3 font-tech-mono font-bold text-sm transition-all duration-300 group"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Selected tab background with notched corner */}
                    {activeTab === index && (
                      <div
                        className="absolute inset-0 transition-all duration-300"
                        style={{
                          backgroundColor: '#4C5EF6',
                          clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)'
                        }}
                      />
                    )}
                    
                    {/* Tab text */}
                    <span 
                      className={`relative z-10 transition-colors duration-300 ${
                        activeTab === index 
                          ? 'text-white font-bold' 
                          : 'text-ghost-white/80 hover:text-white'
                      }`}
                    >
                      {category.categoryName}
                    </span>
                    
                    {/* Hover effect for non-active tabs */}
                    {activeTab !== index && (
                      <motion.div
                        className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Team Display */}
        <motion.div
          key={activeTab} // Force re-render when tab changes
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
        >
          {teamData[activeTab] && (
            <BubbleCloud members={teamData[activeTab].members} />
          )}
        </motion.div>
        
        {/* Category info */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-ghost-white/80 font-tech-mono">
            {teamData[activeTab]?.members.length || 0} members in {teamData[activeTab]?.categoryName}
          </p>
        </motion.div>
        
        {/* Floating elements for visual interest */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-[#48F5FE] rounded-full opacity-20 animate-pulse" />
        <div className="absolute top-40 right-20 w-6 h-6 bg-[#CEFE00] rounded-full opacity-15 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-20 w-3 h-3 bg-[#4C5EF6] rounded-full opacity-25 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 right-10 w-5 h-5 bg-[#2B9398] rounded-full opacity-20 animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>
    </section>
  )
}