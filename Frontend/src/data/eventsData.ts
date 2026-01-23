export interface EventRecap {
  summary: string
  images: string[]
}

export interface Event {
  id: string
  title: string
  date: string
  description: string
  imageUrl?: string
  location?: string
  type?: 'workshop' | 'hackathon' | 'networking' | 'social' | 'competition'
  registrationUrl?: string
  recapUrl?: string
  recap?: EventRecap
}

export const eventsData: Event[] = [
  {
    id: 'upcoming-1',
    title: 'TMU Tech Week',
    date: '2026-02-15',
    description: 'BYTE is hosting TMU Tech Week 2026, bringing together students and industry leaders to explore AI, machine learning, and software development. Discover our projects, meet our team, and get involved in the Toronto AI community.',
    imageUrl: '/images/events/Tmutechweek.png',
    location: 'TMU SLC.',
    type: 'networking',
    recapUrl: 'https://byte.org/recaps/devfest-2025',
    recap: {
      summary: 'BYTE was proud to host a booth at Google DevFest Toronto 2025, one of the largest developer conferences in Canada! This premier event brought together thousands of developers, tech enthusiasts, and industry leaders to explore the latest in AI, cloud computing, and open-source technologies. Our team engaged with attendees, shared insights on our SecureBYTE project, and connected with potential collaborators and sponsors. It was an inspiring day filled with learning, networking, and celebrating the vibrant developer community.',
      images: [
        '/images/events/Tmutechweek.png',
      ]
    }
  },
  {
    id: 'past-1',
    title: 'Google DevFest',
    date: '2025-11-15',
    description: 'BYTE hosted a booth at Google DevFest Toronto 2025, one of Canada\'s largest developer conferences. We connected with thousands of developers, shared our SecureBYTE project, and networked with potential collaborators and sponsors.',
    imageUrl: '/images/events/devfestevent.JPG',
    location: 'Metro Toronto Convention Centre',
    type: 'networking',
    recapUrl: 'https://byte.org/recaps/devfest-2025',
    recap: {
      summary: 'BYTE was proud to host a booth at Google DevFest Toronto 2025, one of the largest developer conferences in Canada! This premier event brought together thousands of developers, tech enthusiasts, and industry leaders to explore the latest in AI, cloud computing, and open-source technologies. Our team engaged with attendees, shared insights on our SecureBYTE project, and connected with potential collaborators and sponsors. It was an inspiring day filled with learning, networking, and celebrating the vibrant developer community.',
      images: [
        '/images/events/devfestevent.JPG',
      ]
    }
  },
  {
    id: 'past-2',
    title: 'BYTE Demo Day - SecureBYTE',
    date: '2025-12-01',
    description: 'BYTE hosted a Demo Day featuring a panel discussion where our team presented SecureBYTE, our flagship cybersecurity project. The event showcased our innovative approach to security solutions and fostered engaging conversations with attendees about the future of cybersecurity.',
    imageUrl: '/images/events/Demoday.JPG',
    location: 'Daphne Cockwell Health Sciences Complex',
    type: 'networking',
    recapUrl: 'https://byte.org/recaps/devfest-2025',
    recap: {
      summary: 'BYTE was proud to host a Demo Day featuring a panel discussion where our team presented SecureBYTE, our flagship cybersecurity project. The event showcased our innovative approach to security solutions and fostered engaging conversations with attendees about the future of cybersecurity.',
      images: [
        '/images/events/Demoday.JPG',
      ]
    }
  },
  {
    id: 'past-3',
    title: 'BYTE Launch Event',
    date: '2025-09-29',
    description: 'The official launch event for BYTE! Join us to learn about our organization, meet the executive team, network with fellow AI enthusiasts, and discover how you can get involved in our projects.',
    imageUrl: '/images/events/bytelaunch.jpeg',
    location: 'George Vari Engineering Building',
    type: 'social',
    recapUrl: 'https://byte.org/recaps/launch-event-2025',
    recap: {
      summary: 'Our official launch event exceeded all expectations! Students attended to learn about BYTE\'s mission and vision. We presented our SecureBYTE project, conducted networking sessions, and welcomed many new members to our community. The event featured presentations from our executive team, interactive demos, and an exciting roadmap for the semester ahead.',
      images: [
        '/images/events/bytelaunch.jpeg',
      ]
    }
  },
  {
    id: 'past-4',
    title: 'TMSU Campus Street Fair',
    date: '2025-09-10',
    description: 'Another tabling opportunity to showcase BYTE and connect with students interested in AI development and open-source projects.',
    imageUrl: '/images/events/tmsustreetfair.jpeg',
    location: 'Kerr Hall',
    type: 'networking',
    recapUrl: 'https://byte.org/recaps/tmsu-fair-2025',
    recap: {
      summary: 'The TMSU Campus Street Fair provided an excellent opportunity to expand our reach. We had engaging conversations with students from various programs about AI, machine learning, and our collaborative project approach. The event helped us build momentum leading up to our official launch event.',
      images: [
        '/images/events/tmsustreetfair.jpeg',
      ]
    }
  }
];