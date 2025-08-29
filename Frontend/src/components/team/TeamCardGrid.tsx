import { motion } from 'framer-motion'
import { Member } from '../../data/teamData'

interface TeamCardGridProps {
  members: Member[]
  onMemberClick: (member: Member) => void
}

export default function TeamCardGrid({ members, onMemberClick }: TeamCardGridProps) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {members.map((member, index) => (
        <motion.div
          key={member.id}
          className="relative cursor-pointer group"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          onClick={() => onMemberClick(member)}
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Card background with notched corners */}
          <div 
            className="absolute inset-0"
            style={{ 
              backgroundColor: '#48F5FE',
              clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))'
            }}
          />
          
          <div 
            className="relative p-6 m-0.5 bg-gray-800 min-h-[400px] flex flex-col"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))'
            }}
          >
            {/* Profile Image */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden border-3 border-[#48F5FE] group-hover:border-[#CEFE00] transition-colors duration-300">
                  <img
                    src={member.profilePicUrl}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                  />
                </div>
                
                {/* Rank indicator */}
                {member.rank >= 80 && (
                  <motion.div
                    className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r from-[#CEFE00] to-[#2B9398] flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
                  >
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </motion.div>
                )}
              </div>
            </div>

            {/* Name */}
            <h3 className="text-xl font-orbitron font-bold text-white text-center mb-2 group-hover:text-[#48F5FE] transition-colors duration-300">
              {member.name}
            </h3>

            {/* Position */}
            <p className="text-[#48F5FE] font-tech-mono text-sm text-center mb-4 font-bold">
              {member.position}
            </p>

            {/* Description */}
            <div className="flex-1 mb-4">
              <p className="text-white/80 font-tech-mono text-xs leading-relaxed text-center">
                A valued leader of the BYTE team, driving our mission of advancing AI innovation and technology development through strategic vision and collaborative leadership.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-auto">
              <button 
                className="flex-1 px-3 py-2 font-tech-mono text-xs text-white border border-[#48F5FE] hover:bg-[#48F5FE] hover:text-black transition-all duration-200 group-hover:border-[#CEFE00] group-hover:hover:bg-[#CEFE00]"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)'
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  // Connect functionality
                }}
              >
                Connect
              </button>
              
              <button 
                className="flex-1 px-3 py-2 font-tech-mono text-xs text-white"
                style={{
                  background: 'linear-gradient(to bottom, #4C5EF6, #2C3790)',
                  clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)'
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  // Portfolio functionality
                }}
              >
                Portfolio
              </button>
            </div>

            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
                 style={{
                   background: 'radial-gradient(circle at center, #48F5FE 0%, transparent 70%)',
                   clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))'
                 }}
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}