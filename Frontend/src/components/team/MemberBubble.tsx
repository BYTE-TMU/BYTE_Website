import { motion } from 'framer-motion'
import { Member } from '../../data/teamData'

interface MemberBubbleProps {
  member: Member
  onClick: (member: Member) => void
  style?: React.CSSProperties
  maxRank: number
}

const getSizeFromRank = (rank: number, maxRank: number): number => {
  const maxSize = 120 // Maximum size for the highest ranked member in section
  const minSize = 50  // Minimum size for the lowest ranked member
  
  // Calculate proportional size based on the highest rank in this section
  const ratio = rank / maxRank
  const size = minSize + (maxSize - minSize) * ratio
  
  return Math.max(minSize, Math.min(maxSize, size))
}

export default function MemberBubble({ member, onClick, style, maxRank }: MemberBubbleProps) {
  const size = getSizeFromRank(member.rank, maxRank)
  
  return (
    <motion.div
      className="absolute cursor-pointer group"
      style={style}
      onClick={() => onClick(member)}
      whileHover={{ scale: 1.1, zIndex: 50 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <div className="relative">
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30"
          style={{
            width: size,
            height: size,
            background: 'radial-gradient(circle, #48F5FE 0%, transparent 70%)',
            filter: 'blur(8px)',
          }}
          initial={{ scale: 0.8 }}
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Profile image */}
        <div
          className="relative rounded-full overflow-hidden border-2 border-[#48F5FE] bg-gray-800"
          style={{ width: size, height: size }}
        >
          <img
            src={member.profilePicUrl}
            alt={member.name}
            className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-110"
            loading="lazy"
          />
          
        </div>
        
        {/* Rank indicator for high-ranking members */}
        {member.rank >= 80 && (
          <motion.div
            className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r from-[#CEFE00] to-[#2B9398] flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
          >
            <div className="w-2 h-2 rounded-full bg-white" />
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}