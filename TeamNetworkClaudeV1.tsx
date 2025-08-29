import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as d3 from 'd3'
import { members } from '../../data/mockData'

// Members already have connections defined in the data structure
const membersWithConnections = members

const teamFilters = [
  { id: 'all', label: 'ALL SYSTEMS', color: '#39FF14' },
  { id: 'leadership', label: 'LEADERSHIP', color: '#DFFF00' },
  { id: 'technical', label: 'TECHNICAL', color: '#00FFFF' },
  { id: 'strategic', label: 'STRATEGIC', color: '#9D00FF' }
]

export default function TeamNetworkClaudeV1() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedMember, setSelectedMember] = useState<any>(null)
  const [hoveredMember, setHoveredMember] = useState<any>(null)

  const filteredMembers = activeFilter === 'all' 
    ? membersWithConnections 
    : membersWithConnections.filter(member => member.team === activeFilter)

  return (
    <div className="mb-20">
      <h2 className="text-4xl font-orbitron font-black text-terminal-green mb-8 text-center">Version 1 - Team</h2>
      
      <section className="py-20 px-6 relative overflow-hidden border-2 border-terminal-green/30 rounded-lg bg-digital-abyss/30">
        {/* Team Visualization */}
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-orbitron font-bold text-acid-yellow mb-4 text-glow">
              NEURAL NETWORK TOPOLOGY
            </h3>
            <p className="text-ghost-white/70 font-tech-mono">
              Interactive visualization of BYTE's organizational structure
            </p>
          </div>

          {/* Team Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {teamFilters.map((filter) => (
              <FilterButton
                key={filter.id}
                filter={filter}
                isActive={activeFilter === filter.id}
                onClick={() => setActiveFilter(filter.id)}
              />
            ))}
          </div>

          {/* Team Network Visualization */}
          <div className="relative">
            <TeamNetwork
              members={filteredMembers}
              onMemberHover={setHoveredMember}
              onMemberClick={setSelectedMember}
              activeFilter={activeFilter}
            />
          </div>
        </div>

        {/* Member Details Modal */}
        <AnimatePresence>
          {selectedMember && (
            <MemberModal
              member={selectedMember}
              onClose={() => setSelectedMember(null)}
            />
          )}
        </AnimatePresence>

        {/* Background circuit pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full">
            <defs>
              <pattern id="circuit-team" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M20,20 L80,20 L80,80 L20,80 Z" fill="none" stroke="#39FF14" strokeWidth="1"/>
                <circle cx="20" cy="20" r="3" fill="#39FF14"/>
                <circle cx="80" cy="80" r="3" fill="#00FFFF"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit-team)"/>
          </svg>
        </div>
      </section>
    </div>
  )
}

// Team filter button
function FilterButton({ filter, isActive, onClick }: { filter: any; isActive: boolean; onClick: () => void }) {
  return (
    <motion.button
      className={`
        px-6 py-3 font-tech-mono font-bold text-sm tracking-wider
        border-2 rounded-lg transition-all duration-300
        ${isActive 
          ? 'border-terminal-green text-terminal-green bg-terminal-green/20 shadow-glow'
          : 'border-ghost-white/30 text-ghost-white/70 hover:border-ghost-white/50'
        }
      `}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {filter.label}
    </motion.button>
  )
}

// Team network visualization component
function TeamNetwork({ members, onMemberHover, onMemberClick, activeFilter }: { 
  members: any[], 
  onMemberHover: (member: any) => void, 
  onMemberClick: (member: any) => void, 
  activeFilter: string 
}) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const width = 800
    const height = 600
    
    // Create hierarchical structure
    const createHierarchy = () => {
      const hierarchy: any = {
        name: "BYTE Organization",
        children: []
      }
      
      // Find leadership members
      const leadership = members.filter(m => m.team === 'leadership')
      const president = leadership.find(m => m.role === 'President')
      
      if (president) {
        const presidentialNode = {
          ...president,
          children: []
        }
        
        // Add Chief of Staff
        const chiefOfStaff = leadership.find(m => m.role === 'Chief of Staff')
        if (chiefOfStaff) {
          presidentialNode.children.push({ ...chiefOfStaff, children: [] })
        }
        
        // Add Department Heads
        const techHead = leadership.find(m => m.role === 'Head of Technical Operations')
        const stratHead = leadership.find(m => m.role === 'Head of Strategic Operations')
        
        if (techHead) {
          const techNode = { ...techHead, children: [] }
          
          // Add technical team under tech head
          const vpTech = members.find(m => m.role === 'VP of Technology')
          const projectLead = members.find(m => m.role === 'Project Experience Lead')
          
          if (vpTech) {
            const vpTechNode = { ...vpTech, children: [] }
            
            // Add directors under VP Tech
            const directors = members.filter(m => m.role.includes('Director'))
            directors.forEach(director => {
              const directorNode = { ...director, children: [] }
              
              // Add engineers under each director
              const engineers = members.filter(m => 
                m.connections?.includes(director.id) && 
                (m.role.includes('Engineer') && !m.role.includes('Director'))
              )
              engineers.forEach(engineer => {
                directorNode.children.push({ ...engineer, children: [] })
              })
              
              vpTechNode.children.push(directorNode)
            })
            
            techNode.children.push(vpTechNode)
          }
          
          if (projectLead) {
            techNode.children.push({ ...projectLead, children: [] })
          }
          
          presidentialNode.children.push(techNode)
        }
        
        if (stratHead) {
          const stratNode = { ...stratHead, children: [] }
          
          // Add strategic team members
          const strategicMembers = members.filter(m => 
            m.team === 'strategic' && m.id !== stratHead.id
          )
          strategicMembers.forEach(member => {
            if (member.role === 'VP of Events') {
              const vpEventsNode = { ...member, children: [] }
              // Add events associates
              const associates = members.filter(m => 
                m.connections?.includes(member.id)
              )
              associates.forEach(assoc => {
                vpEventsNode.children.push({ ...assoc, children: [] })
              })
              stratNode.children.push(vpEventsNode)
            } else {
              stratNode.children.push({ ...member, children: [] })
            }
          })
          
          presidentialNode.children.push(stratNode)
        }
        
        hierarchy.children.push(presidentialNode)
      }
      
      return hierarchy
    }

    const hierarchyData = createHierarchy()
    const root = d3.hierarchy(hierarchyData)
    
    // Create tree layout
    const treeLayout = d3.tree()
      .size([width - 100, height - 100])
    
    treeLayout(root)

    // Create links
    const linkElements = svg.append('g')
      .selectAll('path')
      .data(root.links())
      .enter().append('path')
      .attr('d', d3.linkVertical()
        .x((d: any) => d.x + 50)
        .y((d: any) => d.y + 50))
      .attr('fill', 'none')
      .attr('stroke', '#39FF14')
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 0.6)

    // Create nodes
    const nodeElements = svg.append('g')
      .selectAll('g')
      .data(root.descendants())
      .enter().append('g')
      .attr('transform', (d: any) => `translate(${d.x + 50},${d.y + 50})`)
      .style('cursor', 'pointer')
      .on('mouseover', (event, d) => onMemberHover(d.data))
      .on('mouseout', () => onMemberHover(null))
      .on('click', (event, d) => onMemberClick(d.data))

    // Add circles
    nodeElements.append('circle')
      .attr('r', (d: any) => {
        if (!d.data.role) return 8 // Root node
        if (d.data.team === 'leadership') return 20
        if (d.data.role.includes('VP') || d.data.role.includes('Director')) return 16
        return 12
      })
      .attr('fill', (d: any) => {
        if (!d.data.role) return '#39FF14'
        switch(d.data.team) {
          case 'leadership': return '#DFFF00'
          case 'technical': return '#00FFFF'
          case 'strategic': return '#9D00FF'
          default: return '#39FF14'
        }
      })
      .attr('stroke', '#0A0E1B')
      .attr('stroke-width', 2)

    // Add labels
    nodeElements.append('text')
      .text((d: any) => d.data.name ? d.data.name.split(' ')[0] : d.data.name || '')
      .attr('font-family', 'Share Tech Mono')
      .attr('font-size', '10px')
      .attr('fill', '#E8E8E8')
      .attr('text-anchor', 'middle')
      .attr('dy', -25)

    // Add role labels
    nodeElements.append('text')
      .text((d: any) => d.data.role ? d.data.role.split(' ').slice(0, 2).join(' ') : '')
      .attr('font-family', 'Share Tech Mono')
      .attr('font-size', '8px')
      .attr('fill', '#888')
      .attr('text-anchor', 'middle')
      .attr('dy', 35)

  }, [members, onMemberHover, onMemberClick])

  return (
    <div className="flex justify-center">
      <svg
        ref={svgRef}
        width="800"
        height="600"
        className="border border-terminal-green/20 rounded-lg bg-digital-abyss/30"
      />
    </div>
  )
}

// Member details modal
function MemberModal({ member, onClose }: { member: any; onClose: () => void }) {
  // Handle case where member might be the root node or incomplete data
  if (!member || !member.name || !member.role) {
    return null
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-digital-abyss/90 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-dark-matter border-2 border-terminal-green/50 rounded-lg p-8 max-w-md w-full"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="text-center mb-6">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-terminal-green/20 flex items-center justify-center">
            <span className="font-orbitron font-bold text-2xl text-terminal-green">
              {member.name.split(' ').map((n: string) => n[0]).join('')}
            </span>
          </div>
          <h3 className="text-2xl font-orbitron font-bold text-acid-yellow text-glow mb-2">
            {member.name}
          </h3>
          <p className="font-tech-mono text-glitch-cyan">{member.role}</p>
          {member.team && (
            <span className="inline-block px-3 py-1 mt-2 text-xs font-tech-mono rounded-full border border-terminal-green/30 text-terminal-green bg-terminal-green/10">
              {member.team.toUpperCase()}
            </span>
          )}
        </div>
        
        <div className="mb-6">
          <p className="font-tech-mono text-ghost-white/90 leading-relaxed">
            {member.bio || 'Team member focused on driving BYTE\'s mission forward.'}
          </p>
        </div>

        <motion.button
          className="w-full py-3 font-tech-mono font-bold text-digital-abyss bg-terminal-green rounded-lg hover:bg-terminal-green/90 transition-colors"
          onClick={onClose}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          CLOSE CONNECTION
        </motion.button>
      </motion.div>
    </motion.div>
  )
}