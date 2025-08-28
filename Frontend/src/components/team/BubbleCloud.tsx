import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Member } from '../../data/teamData'
import MemberBubble from './MemberBubble'
import MemberModal from './MemberModal'

interface BubbleCloudProps {
  members: Member[]
}

interface BubblePosition {
  x: number
  y: number
  size: number
  member: Member
}

const getSizeFromRank = (rank: number, maxRank: number): number => {
  const maxSize = 120 // Maximum size for the highest ranked member in section
  const minSize = 50  // Minimum size for the lowest ranked member
  
  // Calculate proportional size based on the highest rank in this section
  const ratio = rank / maxRank
  const size = minSize + (maxSize - minSize) * ratio
  
  return Math.max(minSize, Math.min(maxSize, size))
}

const calculateBubblePositions = (members: Member[], containerWidth: number, containerHeight: number): BubblePosition[] => {
  const positions: BubblePosition[] = []
  const sortedMembers = [...members].sort((a, b) => b.rank - a.rank) // Highest rank first
  const maxRank = Math.max(...members.map(m => m.rank))
  
  const centerX = containerWidth / 2
  const centerY = containerHeight / 2
  const minGap = 4 // Minimum gap between bubbles
  
  // Helper function to check if position is valid (no overlaps)
  const isValidPosition = (x: number, y: number, size: number): boolean => {
    const radius = size / 2
    const padding = 15
    
    // Check bounds
    if (x < padding || y < padding || 
        x + size > containerWidth - padding || 
        y + size > containerHeight - padding) {
      return false
    }
    
    // Check clearance from all existing bubbles
    for (const existing of positions) {
      const dx = (x + radius) - (existing.x + existing.size / 2)
      const dy = (y + radius) - (existing.y + existing.size / 2)
      const distanceBetween = Math.sqrt(dx * dx + dy * dy)
      const requiredDistance = radius + existing.size / 2 + minGap
      
      if (distanceBetween < requiredDistance) {
        return false
      }
    }
    
    return true
  }
  
  for (let i = 0; i < sortedMembers.length; i++) {
    const member = sortedMembers[i]
    const size = getSizeFromRank(member.rank, maxRank)
    const radius = size / 2
    
    let bestX = centerX - radius
    let bestY = centerY - radius
    let found = false
    
    if (i === 0) {
      // First (highest rank) bubble goes at exact center
      positions.push({ x: bestX, y: bestY, size, member })
      continue
    }
    
    // Comprehensive search with multiple strategies
    const maxSearchDistance = Math.min(containerWidth, containerHeight) * 0.48
    const strategies = [
      { distanceStep: 4, angleStep: Math.PI / 32, startDistance: size * 0.7 },
      { distanceStep: 6, angleStep: Math.PI / 24, startDistance: size * 0.9 },
      { distanceStep: 8, angleStep: Math.PI / 16, startDistance: size * 1.1 }
    ]
    
    // Try each search strategy
    for (const strategy of strategies) {
      if (found) break
      
      const startDistance = Math.max(strategy.startDistance, (i - 1) * 8)
      
      for (let distance = startDistance; distance < maxSearchDistance && !found; distance += strategy.distanceStep) {
        const angleCount = Math.ceil(2 * Math.PI / strategy.angleStep)
        const baseAngleOffset = (i * Math.PI / 12) % (2 * Math.PI) // Varied start angle per bubble
        
        for (let angleIndex = 0; angleIndex < angleCount && !found; angleIndex++) {
          const angle = baseAngleOffset + (angleIndex * strategy.angleStep)
          const testX = centerX + Math.cos(angle) * distance - radius
          const testY = centerY + Math.sin(angle) * distance - radius
          
          if (isValidPosition(testX, testY, size)) {
            bestX = testX
            bestY = testY
            found = true
          }
        }
      }
    }
    
    // Final fallback: force placement in expanding spiral
    if (!found) {
      for (let spiralStep = 0; spiralStep < 200 && !found; spiralStep++) {
        const spiralAngle = spiralStep * 0.5 // Gradual spiral
        const spiralDistance = 40 + spiralStep * 8 // Expanding distance
        const testX = centerX + Math.cos(spiralAngle) * spiralDistance - radius
        const testY = centerY + Math.sin(spiralAngle) * spiralDistance - radius
        
        // Less strict bounds check for fallback
        const padding = 5
        if (testX >= padding && testY >= padding && 
            testX + size <= containerWidth - padding && 
            testY + size <= containerHeight - padding) {
          
          // Check for severe overlaps only (allow closer placement if needed)
          let hasOverlap = false
          for (const existing of positions) {
            const dx = (testX + radius) - (existing.x + existing.size / 2)
            const dy = (testY + radius) - (existing.y + existing.size / 2)
            const distanceBetween = Math.sqrt(dx * dx + dy * dy)
            const minRequiredDistance = radius + existing.size / 2 + 1 // Very minimal gap for fallback
            
            if (distanceBetween < minRequiredDistance) {
              hasOverlap = true
              break
            }
          }
          
          if (!hasOverlap) {
            bestX = testX
            bestY = testY
            found = true
          }
        }
      }
    }
    
    positions.push({ x: bestX, y: bestY, size, member })
  }
  
  // Apply oval transformation - compress Y coordinates
  for (const pos of positions) {
    const deltaY = pos.y - centerY
    pos.y = centerY + deltaY * 0.75 // Compress Y by 25% to create oval shape
  }
  
  return positions
}

export default function BubbleCloud({ members }: BubbleCloudProps) {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [containerDimensions, setContainerDimensions] = useState({ width: 800, height: 600 })
  
  const maxRank = useMemo(() => Math.max(...members.map(m => m.rank)), [members])
  
  useEffect(() => {
    const updateDimensions = () => {
      const width = Math.min(window.innerWidth - 100, 1000)
      
      // Dynamic height based on member count
      const memberCount = members.length
      let baseHeight = 400 // Minimum height
      
      if (memberCount <= 4) {
        baseHeight = 300 // Compact for small teams
      } else if (memberCount <= 8) {
        baseHeight = 400 // Medium for mid-size teams
      } else if (memberCount <= 12) {
        baseHeight = 500 // Larger for big teams
      } else {
        baseHeight = 600 // Maximum for very large teams
      }
      
      const height = Math.min(window.innerHeight * 0.6, baseHeight)
      setContainerDimensions({ width, height })
    }
    
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [members.length])
  
  const bubblePositions = useMemo(() => {
    return calculateBubblePositions(members, containerDimensions.width, containerDimensions.height)
  }, [members, containerDimensions])
  
  const handleMemberClick = (member: Member) => {
    setSelectedMember(member)
  }
  
  const handleCloseModal = () => {
    setSelectedMember(null)
  }
  
  return (
    <div className="w-full flex justify-center">
      <motion.div
        className="relative mx-auto"
        style={{
          width: containerDimensions.width,
          height: containerDimensions.height,
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-20 h-full">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="border-r border-terminal-green/20" />
            ))}
          </div>
          <div className="absolute inset-0">
            <div className="grid grid-rows-15 h-full">
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className="border-b border-terminal-green/20" />
              ))}
            </div>
          </div>
        </div>
        
        {/* Render member bubbles */}
        {bubblePositions.map((bubble, index) => (
          <motion.div
            key={bubble.member.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1,
              type: 'spring',
              damping: 15
            }}
          >
            <MemberBubble
              member={bubble.member}
              onClick={handleMemberClick}
              maxRank={maxRank}
              style={{
                left: bubble.x,
                top: bubble.y,
              }}
            />
          </motion.div>
        ))}
        
        {/* Connection lines for visual appeal */}
        <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: -1 }}>
          {bubblePositions.slice(0, -1).map((bubble, index) => {
            const nextBubble = bubblePositions[index + 1]
            if (!nextBubble) return null
            
            const startX = bubble.x + bubble.size / 2
            const startY = bubble.y + bubble.size / 2
            const endX = nextBubble.x + nextBubble.size / 2
            const endY = nextBubble.y + nextBubble.size / 2
            
            // Only draw lines between nearby bubbles
            const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2))
            if (distance > 150) return null
            
            return (
              <motion.line
                key={`${bubble.member.id}-${nextBubble.member.id}`}
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke="#48F5FE"
                strokeWidth="1"
                strokeOpacity="0.2"
                strokeDasharray="4,4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: (index + 1) * 0.2 }}
              />
            )
          })}
        </svg>
      </motion.div>
      
      {/* Member modal */}
      <MemberModal
        member={selectedMember}
        isOpen={!!selectedMember}
        onClose={handleCloseModal}
      />
    </div>
  )
}