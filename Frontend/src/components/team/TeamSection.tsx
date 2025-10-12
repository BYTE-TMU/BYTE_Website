import { useState } from 'react'
import { motion } from 'framer-motion'
import { TeamCategory, Member } from '../../data/teamData'
import BubbleCloud from './BubbleCloud'
import TeamNetwork from './TeamNetwork'
import TeamCardGrid from './TeamCardGrid'
import MemberModal from './MemberModal'

interface TeamSectionProps {
  title: string
  teamData: TeamCategory[]
  showPrototypes?: boolean // Optional prop to enable prototype tabs
}

interface TabConfig {
  name: string
  type: 'bubble' | 'network' | 'cards'
  data: TeamCategory | Member[]
}

export default function TeamSection({ title, teamData, showPrototypes = false }: TeamSectionProps) {
  const [activeTab, setActiveTab] = useState(0)
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  
  // Flatten all members for "All Members" tabs and deduplicate by ID
  const allMembers = Array.from(
    new Map(
      teamData.flatMap(category => category.members).map(member => [member.id, member])
    ).values()
  ).sort((a, b) => b.rank - a.rank) // Sort by rank descending

  const leadershipMembers = teamData.find(cat => cat.categoryName === 'Leadership')?.members || []
  
  // Configure tabs based on showPrototypes prop
  const tabs: TabConfig[] = [
    // Prototype tabs first (only if enabled)
    ...(showPrototypes ? [
      {
        name: 'All Members',
        type: 'bubble' as const,
        data: { categoryName: 'All Members', members: allMembers }
      },
      {
        name: 'Leadership',
        type: 'cards' as const,
        data: leadershipMembers
      }
    ] : []),
    // Original tabs after prototypes (only Strategic Team and Technical Team)
    ...teamData
      .filter(category => category.categoryName === 'Strategic Team' || category.categoryName === 'Technical Team')
      .map(category => ({
        name: category.categoryName,
        type: 'bubble' as const,
        data: category
      }))
  ]
  
  return (
    <section className="py-20 bg-digital-abyss relative overflow-hidden" id="team">
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
              <div className="flex items-center flex-wrap">
                {tabs.map((tab, index) => (
                  <motion.button
                    key={tab.name}
                    onClick={() => setActiveTab(index)}
                    className="relative px-4 py-3 font-tech-mono font-bold text-xs transition-all duration-300 group mx-1 my-1"
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
                      {tab.name}
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
          {tabs[activeTab] && (
            <TeamDisplay 
              tab={tabs[activeTab]} 
              onMemberClick={(member) => {
                setSelectedMember(member)
              }}
            />
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
            {getMemberCount(tabs[activeTab])} members in {tabs[activeTab]?.name}
          </p>
        </motion.div>
        
        {/* Floating elements for visual interest */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-[#48F5FE] rounded-full opacity-20 animate-pulse" />
        <div className="absolute top-40 right-20 w-6 h-6 bg-[#CEFE00] rounded-full opacity-15 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-20 w-3 h-3 bg-[#4C5EF6] rounded-full opacity-25 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 right-10 w-5 h-5 bg-[#2B9398] rounded-full opacity-20 animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Member Details Modal */}
      <MemberModal
        member={selectedMember}
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </section>
  )
}

// Helper function to get member count
function getMemberCount(tab: TabConfig | undefined): number {
  if (!tab) return 0
  if (Array.isArray(tab.data)) {
    return tab.data.length
  }
  return (tab.data as TeamCategory).members?.length || 0
}

// Team display component that renders the appropriate visualization
function TeamDisplay({ tab, onMemberClick }: { tab: TabConfig; onMemberClick: (member: Member) => void }) {
  switch (tab.type) {
    case 'bubble':
      const bubbleData = Array.isArray(tab.data) 
        ? { categoryName: 'All Members', members: tab.data }
        : tab.data as TeamCategory
      return <BubbleCloud members={bubbleData.members} />
      
    case 'network':
      const networkMembers = Array.isArray(tab.data) ? tab.data : []
      return <TeamNetwork members={networkMembers} onMemberClick={onMemberClick} />
      
    case 'cards':
      const cardMembers = Array.isArray(tab.data) ? tab.data : []
      return <TeamCardGrid members={cardMembers} onMemberClick={onMemberClick} />
      
    default:
      return null
  }
}

