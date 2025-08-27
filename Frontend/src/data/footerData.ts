export interface FooterLink {
  label: string
  href: string
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export interface FooterData {
  sections: Record<string, FooterSection>
  matrixCharacters: string
  brandingInfo: {
    description: string
    status: {
      current: string
      version: string
      uptime: string
    }
  }
  copyright: string
  systemStatus: Array<{
    label: string
    status: string
    color: string
  }>
}

export const footerData: FooterData = {
  sections: {
    joinByte: {
      title: 'JOIN BYTE',
      links: [
        { label: 'Become a Member', href: '#join' },
        { label: 'Join our Team', href: '#join' }
      ]
    },
    about: {
      title: 'ABOUT',
      links: [
        { label: 'Why BYTE?', href: '#about' },
        { label: 'Core Team', href: '#about' }
      ]
    },
    projects: {
      title: 'PROJECTS',
      links: [
        { label: 'Current Project', href: '#projects' },
        { label: 'Past Projects', href: '#projects' }
      ]
    },
    events: {
      title: 'EVENTS',
      links: [
        { label: 'Upcoming Events', href: '#events' },
        { label: 'Past Events', href: '#events' }
      ]
    },
    connect: {
      title: 'CONNECT',
      links: [
        { label: 'Contact Us', href: '#contact' },
        { label: 'Social Media', href: 'https://instagram.com/byte_tmu' }
      ]
    },
    legal: {
      title: '',
      links: [
        { label: 'Terms of Service', href: '#terms' },
        { label: 'Privacy', href: '#privacy' }
      ]
    }
  },
  matrixCharacters: '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン',
  brandingInfo: {
    description: "Building Toronto Metropolitan University's premier AI innovation ecosystem through collaborative learning and cutting-edge research.",
    status: {
      current: 'ACTIVE',
      version: '2.0.1',
      uptime: '99.9%'
    }
  },
  copyright: '©2025 BYTE. All Rights Reserved.',
  systemStatus: [
    { label: 'NEURAL_NETWORK', status: 'ONLINE', color: 'terminal-green' },
    { label: 'DATABASE', status: 'SYNCED', color: 'glitch-cyan' },
    { label: 'SECURITY', status: 'ENCRYPTED', color: 'acid-yellow' }
  ]
};