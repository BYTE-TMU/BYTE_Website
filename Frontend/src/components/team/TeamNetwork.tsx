import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import * as d3 from 'd3'
import { Member } from '../../data/teamData'

interface TeamNetworkMember {
  id: string
  name: string
  role: string
  team: 'leadership' | 'technical' | 'strategic'
  avatar: string
  bio: string
  connections?: string[]
}

interface TeamNetworkProps {
  members: Member[]
  onMemberClick: (member: Member) => void
}

// Transform our Member data to the format expected by the network component
const transformMemberData = (members: Member[]): TeamNetworkMember[] => {
  return members.map(member => ({
    id: member.id,
    name: member.name,
    role: member.position,
    team: member.rank >= 90 || member.position.includes('Head of') ? 'leadership' : 
          member.position.toLowerCase().includes('strategic') || 
          member.position.toLowerCase().includes('events') ||
          member.position.toLowerCase().includes('graphic') ? 'strategic' : 'technical',
    avatar: member.profilePicUrl,
    bio: `A valued member of the BYTE team, contributing to our mission of advancing AI innovation and technology development.`,
    connections: member.connections || [] // Use the actual connections from the data
  }))
}


export default function TeamNetwork({ members, onMemberClick }: TeamNetworkProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const networkMembers = transformMemberData(members)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const width = 800
    const height = 600
    
    // Create hierarchical structure using actual connections
    const createHierarchy = () => {
      const hierarchy: any = {
        name: "BYTE Organization",
        children: []
      }
      
      // Find the president as the root
      const president = networkMembers.find(m => m.role === 'President')
      if (!president) return hierarchy
      
      // Create nodes lookup
      const nodeMap = new Map()
      networkMembers.forEach(member => {
        nodeMap.set(member.id, {
          ...member,
          children: []
        })
      })
      
      // Build tree structure using connections with cycle detection
      const visited = new Set()
      const buildChildren = (parentNode: any, ancestors = new Set()) => {
        const children: any[] = []
        
        // Add current node to ancestors to detect cycles
        ancestors.add(parentNode.id)
        
        // Find all members that connect to this parent
        networkMembers.forEach(member => {
          if (member.connections?.includes(parentNode.id) && !ancestors.has(member.id)) {
            const childNode = nodeMap.get(member.id)
            if (childNode && !visited.has(member.id)) {
              visited.add(member.id)
              children.push(childNode)
            }
          }
        })
        
        // Recursively build children for each child
        children.forEach(child => {
          child.children = buildChildren(child, new Set(ancestors))
        })
        
        return children
      }
      
      const rootNode = {
        ...president,
        children: buildChildren(president, new Set())
      }
      
      // Mark president as visited
      visited.add(president.id)
      
      hierarchy.children.push(rootNode)
      return hierarchy
    }

    const hierarchyData = createHierarchy()
    const root = d3.hierarchy(hierarchyData)
    
    // Create tree layout
    const treeLayout = d3.tree()
      .size([width - 100, height - 100])
    
    treeLayout(root)

    // Create links
    svg.append('g')
      .selectAll('path')
      .data(root.links())
      .enter().append('path')
      .attr('d', d3.linkVertical<any, any>()
        .x((d: any) => d.x + 50)
        .y((d: any) => d.y + 50))
      .attr('fill', 'none')
      .attr('stroke', '#48F5FE')
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 0.6)

    // Create nodes
    const nodeElements = svg.append('g')
      .selectAll('g')
      .data(root.descendants())
      .enter().append('g')
      .attr('transform', (d: any) => `translate(${d.x + 50},${d.y + 50})`)
      .style('cursor', 'pointer')
      .on('click', (_, d) => {
        if (d.data.id) {
          const originalMember = members.find(m => m.id === d.data.id)
          if (originalMember) {
            onMemberClick(originalMember)
          }
        }
      })

    // Add circles
    nodeElements.append('circle')
      .attr('r', (d: any) => {
        if (!d.data.role) return 8 // Root node
        if (d.data.team === 'leadership') return 20
        if (d.data.role.includes('VP') || d.data.role.includes('Director')) return 16
        return 12
      })
      .attr('fill', (d: any) => {
        if (!d.data.role) return '#48F5FE'
        switch(d.data.team) {
          case 'leadership': return '#CEFE00'
          case 'technical': return '#4C5EF6'
          case 'strategic': return '#2B9398'
          default: return '#48F5FE'
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

    // Add role labels with dynamic sizing and line breaking for long roles
    nodeElements.append('text')
      .each(function(d: any) {
        const element = d3.select(this)
        const role = d.data.role || ''
        
        if (role.length > 20) {
          // For long roles, break into multiple lines
          const words = role.split(' ')
          const lines = []
          let currentLine = words[0]
          
          for (let i = 1; i < words.length; i++) {
            if (currentLine.length + words[i].length + 1 <= 15) {
              currentLine += ' ' + words[i]
            } else {
              lines.push(currentLine)
              currentLine = words[i]
            }
          }
          lines.push(currentLine)
          
          lines.forEach((line, index) => {
            element.append('tspan')
              .text(line)
              .attr('x', 0)
              .attr('dy', index === 0 ? 35 : 10)
              .attr('text-anchor', 'middle')
          })
        } else {
          // For shorter roles, show full text
          element.text(role)
            .attr('dy', 35)
            .attr('text-anchor', 'middle')
        }
      })
      .attr('font-family', 'Share Tech Mono')
      .attr('font-size', '7px')
      .attr('fill', '#888')

  }, [members, onMemberClick, networkMembers])

  return (
    <motion.div
      className="flex justify-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <svg
        ref={svgRef}
        width="800"
        height="600"
        className="rounded-lg bg-digital-abyss/30"
      />
    </motion.div>
  )
}