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

const getSizeFromRank = (rank: number, maxRank: number, isMobile: boolean, memberCount: number): number => {
  // Use uniform smaller sizes when there are many members
  if (memberCount > 25) {
    const maxSize = isMobile ? 55 : 70
    const minSize = isMobile ? 40 : 55
    const ratio = rank / maxRank
    return minSize + (maxSize - minSize) * ratio
  }

  // Normal sizing for smaller groups
  const maxSize = isMobile ? 80 : 120
  const minSize = isMobile ? 40 : 55
  const ratio = rank / maxRank
  return minSize + (maxSize - minSize) * ratio
}

const calculateBubblePositions = (members: Member[], containerWidth: number, containerHeight: number, isMobile: boolean): BubblePosition[] => {
  const sortedMembers = [...members].sort((a, b) => b.rank - a.rank)
  const maxRank = Math.max(...members.map(m => m.rank))
  const memberCount = members.length
  const padding = isMobile ? 15 : 30

  // For large teams, use a simple evenly-spaced grid approach
  // Calculate optimal grid dimensions to fill the space
  const availableWidth = containerWidth - padding * 2
  const availableHeight = containerHeight - padding * 2

  // Calculate the optimal number of columns and rows
  // Try to make cells as square as possible while fitting all members
  const aspectRatio = availableWidth / availableHeight
  let cols = Math.ceil(Math.sqrt(memberCount * aspectRatio))
  let rows = Math.ceil(memberCount / cols)

  // Ensure we have enough cells
  while (cols * rows < memberCount) {
    if (availableWidth / cols > availableHeight / rows) {
      cols++
    } else {
      rows++
    }
  }

  // Calculate cell dimensions - spread across the ENTIRE available space
  const cellWidth = availableWidth / cols
  const cellHeight = availableHeight / rows

  // Calculate the maximum bubble size that fits in a cell with good spacing
  const maxBubbleSize = Math.min(cellWidth, cellHeight) * 0.85

  // Create grid positions, centered in each cell
  const gridPositions: { x: number; y: number; row: number; col: number }[] = []

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = padding + col * cellWidth + cellWidth / 2
      const y = padding + row * cellHeight + cellHeight / 2
      gridPositions.push({ x, y, row, col })
    }
  }

  // Sort positions from center outward for ranking purposes
  const centerX = containerWidth / 2
  const centerY = containerHeight / 2
  gridPositions.sort((a, b) => {
    const distA = Math.sqrt(Math.pow(a.x - centerX, 2) + Math.pow(a.y - centerY, 2))
    const distB = Math.sqrt(Math.pow(b.x - centerX, 2) + Math.pow(b.y - centerY, 2))
    return distA - distB
  })

  // Place each member at a grid position
  const positions: BubblePosition[] = []

  for (let i = 0; i < sortedMembers.length && i < gridPositions.length; i++) {
    const member = sortedMembers[i]
    const gridPos = gridPositions[i]

    // Calculate size based on rank, but cap to fit in cell
    let size = getSizeFromRank(member.rank, maxRank, isMobile, memberCount)
    size = Math.min(size, maxBubbleSize)

    const radius = size / 2

    positions.push({
      x: gridPos.x - radius,
      y: gridPos.y - radius,
      size,
      member
    })
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
      // Wider container for large teams
      const memberCount = members.length
      const maxWidth = memberCount > 25 ? 1200 : 1000
      const width = Math.min(window.innerWidth - (isMobile ? 40 : 100), maxWidth)

      // Dynamic height based on member count - taller on mobile to prevent overlap
      let baseHeight = 400 // Minimum height

      if (isMobile) {
        // Mobile: need more vertical space for bubbles
        if (memberCount <= 4) {
          baseHeight = 450
        } else if (memberCount <= 8) {
          baseHeight = 600
        } else if (memberCount <= 12) {
          baseHeight = 800
        } else if (memberCount <= 25) {
          baseHeight = 1000
        } else {
          baseHeight = 1400 // Much taller for large teams on mobile
        }
      } else {
        // Desktop: larger values for wider spacing
        if (memberCount <= 4) {
          baseHeight = 350
        } else if (memberCount <= 8) {
          baseHeight = 450
        } else if (memberCount <= 12) {
          baseHeight = 550
        } else if (memberCount <= 25) {
          baseHeight = 650
        } else {
          baseHeight = 700 // Taller for 37 members to spread grid out
        }
      }

      // Don't cap height on desktop when showing many members
      const height = isMobile ? baseHeight : baseHeight
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