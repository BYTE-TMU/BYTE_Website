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
  const minGap = 2 // Reduced gap for tighter clustering
  const ovalCompressionFactor = 0.75 // Y-axis compression for oval shape

  // Helper function to check if position is valid (no overlaps)
  // Now accounts for oval compression in the validation
  const isValidPosition = (x: number, y: number, size: number, applyOvalCompression = true): boolean => {
    const radius = size / 2
    const padding = 10

    // Apply oval compression to test position if needed
    let testY = y
    if (applyOvalCompression) {
      const deltaY = (y + radius) - centerY
      testY = centerY + deltaY * ovalCompressionFactor - radius
    }

    // Check bounds
    if (x < padding || testY < padding ||
        x + size > containerWidth - padding ||
        testY + size > containerHeight - padding) {
      return false
    }

    // Check clearance from all existing bubbles
    for (const existing of positions) {
      const dx = (x + radius) - (existing.x + existing.size / 2)
      const dy = (testY + radius) - (existing.y + existing.size / 2)
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
      // Apply oval compression immediately
      const deltaY = bestY + radius - centerY
      bestY = centerY + deltaY * ovalCompressionFactor - radius
      positions.push({ x: bestX, y: bestY, size, member })
      continue
    }

    // Improved spiral search with guaranteed placement
    // Search outward from center in a continuous spiral pattern
    const maxSearchDistance = Math.max(containerWidth, containerHeight) * 0.8 // Increased search area

    // Fine-grained spiral search
    let distance = size * 0.6 // Start close to center
    const angleIncrement = Math.PI / 18 // 36 angles per full rotation (10 degrees)
    const distanceIncrement = 2 // Small steps for thorough search

    let angle = (i * Math.PI / 7) % (2 * Math.PI) // Varied start angle per bubble
    let spiralIterations = 0
    const maxIterations = 5000 // Safety limit

    while (!found && distance < maxSearchDistance && spiralIterations < maxIterations) {
      // Test position at current angle and distance
      const testX = centerX + Math.cos(angle) * distance - radius
      const testY = centerY + Math.sin(angle) * distance - radius

      if (isValidPosition(testX, testY, size, true)) {
        bestX = testX
        // Apply oval compression
        const deltaY = testY + radius - centerY
        bestY = centerY + deltaY * ovalCompressionFactor - radius
        found = true
        break
      }

      // Increment angle
      angle += angleIncrement

      // After full rotation, increase distance
      if (angle >= 2 * Math.PI + (i * Math.PI / 7) % (2 * Math.PI)) {
        distance += distanceIncrement
        angle = (i * Math.PI / 7) % (2 * Math.PI) // Reset to start angle
      }

      spiralIterations++
    }

    // Emergency fallback: grid-based search if spiral fails
    if (!found) {
      const gridStep = 5
      let searchRadius = size
      const maxRadius = Math.max(containerWidth, containerHeight)

      while (!found && searchRadius < maxRadius) {
        for (let dx = -searchRadius; dx <= searchRadius && !found; dx += gridStep) {
          for (let dy = -searchRadius; dy <= searchRadius && !found; dy += gridStep) {
            const testX = centerX + dx - radius
            const testY = centerY + dy - radius

            // Only test positions roughly at current search radius
            const distFromCenter = Math.sqrt(dx * dx + dy * dy)
            if (Math.abs(distFromCenter - searchRadius) < gridStep * 2) {
              if (isValidPosition(testX, testY, size, true)) {
                bestX = testX
                const deltaY = testY + radius - centerY
                bestY = centerY + deltaY * ovalCompressionFactor - radius
                found = true
              }
            }
          }
        }
        searchRadius += size * 0.5
      }
    }

    positions.push({ x: bestX, y: bestY, size, member })
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