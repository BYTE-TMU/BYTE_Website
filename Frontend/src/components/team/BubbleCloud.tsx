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

const getSizeFromRank = (rank: number, maxRank: number, isMobile: boolean): number => {
  // Use smaller sizes on mobile to prevent overlap
  const maxSize = isMobile ? 80 : 120
  const minSize = isMobile ? 35 : 50

  // Calculate proportional size based on the highest rank in this section
  const ratio = rank / maxRank
  const size = minSize + (maxSize - minSize) * ratio

  return Math.max(minSize, Math.min(maxSize, size))
}

const calculateBubblePositions = (members: Member[], containerWidth: number, containerHeight: number, isMobile: boolean): BubblePosition[] => {
  const positions: BubblePosition[] = []
  const sortedMembers = [...members].sort((a, b) => b.rank - a.rank) // Highest rank first
  const maxRank = Math.max(...members.map(m => m.rank))

  const centerX = containerWidth / 2
  const centerY = containerHeight / 2
  const minGap = isMobile ? 8 : 6 // Increased gap to ensure no overlap

  // Helper function to check if position is valid (no overlaps)
  // All positions are stored and compared in their FINAL display coordinates
  const isValidPosition = (x: number, y: number, size: number): boolean => {
    const radius = size / 2
    const padding = isMobile ? 5 : 10

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
    const size = getSizeFromRank(member.rank, maxRank, isMobile)
    const radius = size / 2

    let bestX = centerX - radius
    let bestY = centerY - radius
    let found = false

    if (i === 0) {
      // First (highest rank) bubble goes at exact center
      positions.push({ x: bestX, y: bestY, size, member })
      continue
    }

    // Spiral search - search outward from center
    const maxSearchDistance = Math.max(containerWidth, containerHeight)

    // Use smaller angle increments and distance steps for thorough coverage
    const angleIncrement = Math.PI / 24 // 48 angles per full rotation (7.5 degrees)
    const distanceIncrement = isMobile ? 3 : 4

    let distance = size * 0.5 // Start close to center
    const startAngle = (i * Math.PI / 5) % (2 * Math.PI) // Varied start angle per bubble
    let angle = startAngle
    let spiralIterations = 0
    const maxIterations = 10000 // Higher limit for thorough search

    while (!found && distance < maxSearchDistance && spiralIterations < maxIterations) {
      // Test position at current angle and distance
      const testX = centerX + Math.cos(angle) * distance - radius
      const testY = centerY + Math.sin(angle) * distance - radius

      if (isValidPosition(testX, testY, size)) {
        bestX = testX
        bestY = testY
        found = true
        break
      }

      // Increment angle
      angle += angleIncrement

      // After full rotation, increase distance
      if (angle >= startAngle + 2 * Math.PI) {
        distance += distanceIncrement
        angle = startAngle
      }

      spiralIterations++
    }

    // Fallback: if spiral search fails, use grid-based placement
    if (!found) {
      const gridStep = isMobile ? 8 : 10

      // Search the entire container systematically
      for (let gridY = 0; gridY < containerHeight && !found; gridY += gridStep) {
        for (let gridX = 0; gridX < containerWidth && !found; gridX += gridStep) {
          if (isValidPosition(gridX, gridY, size)) {
            bestX = gridX
            bestY = gridY
            found = true
          }
        }
      }
    }

    positions.push({ x: bestX, y: bestY, size, member })
  }

  return positions
}


export default function BubbleCloud({ members }: BubbleCloudProps) {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [containerDimensions, setContainerDimensions] = useState({ width: 800, height: 600, isMobile: false })

  const maxRank = useMemo(() => Math.max(...members.map(m => m.rank)), [members])

  useEffect(() => {
    const updateDimensions = () => {
      const isMobile = window.innerWidth < 768
      const width = Math.min(window.innerWidth - (isMobile ? 40 : 100), 1000)

      // Dynamic height based on member count - taller on mobile to prevent overlap
      const memberCount = members.length
      let baseHeight = 400 // Minimum height

      if (isMobile) {
        // Mobile: need more vertical space for bubbles
        if (memberCount <= 4) {
          baseHeight = 400
        } else if (memberCount <= 8) {
          baseHeight = 550
        } else if (memberCount <= 12) {
          baseHeight = 700
        } else {
          baseHeight = 850 // Much taller for large teams on mobile
        }
      } else {
        // Desktop: original values
        if (memberCount <= 4) {
          baseHeight = 300
        } else if (memberCount <= 8) {
          baseHeight = 400
        } else if (memberCount <= 12) {
          baseHeight = 500
        } else {
          baseHeight = 600
        }
      }

      const height = isMobile ? baseHeight : Math.min(window.innerHeight * 0.6, baseHeight)
      setContainerDimensions({ width, height, isMobile })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [members.length])

  const bubblePositions = useMemo(() => {
    return calculateBubblePositions(members, containerDimensions.width, containerDimensions.height, containerDimensions.isMobile)
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