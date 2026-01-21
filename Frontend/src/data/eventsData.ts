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
  // Past Events (ordered from newest to oldest)
  {
    id: 'upcoming-1',
    title: 'TMU Tech Week',
    date: '2026-02-15',
    description: 'BYTE is hosting TMU Tech Week 2026, bringing together students and industry leaders to explore AI, machine learning, and software development. Discover our projects, meet our team, and get involved in the Toronto AI community.',
    imageUrl: '/images/events/devfestevent.JPG',
    location: 'TMU SLC.',
    type: 'networking',
    recapUrl: 'https://byte.org/recaps/devfest-2025',
    recap: {
      summary: 'BYTE was proud to host a booth at Google DevFest Toronto 2025, one of the largest developer conferences in Canada! This premier event brought together thousands of developers, tech enthusiasts, and industry leaders to explore the latest in AI, cloud computing, and open-source technologies. Our team engaged with attendees, shared insights on our SecureBYTE project, and connected with potential collaborators and sponsors. It was an inspiring day filled with learning, networking, and celebrating the vibrant developer community.',
      images: [
        'https://picsum.photos/800/600?random=devfest1',
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
        'https://picsum.photos/800/600?random=devfest1',
      ]
    }
  },
  {
    id: 'past-2',
    title: 'BYTE Launch Event',
    date: '2025-09-19',
    description: 'The official launch event for BYTE! Join us to learn about our organization, meet the executive team, network with fellow AI enthusiasts, and discover how you can get involved in our projects.',
    imageUrl: 'https://picsum.photos/320/180?random=12',
    location: 'TMU Student Learning Centre',
    type: 'social',
    recapUrl: 'https://byte.org/recaps/launch-event-2025',
    recap: {
      summary: 'Our official launch event exceeded all expectations! Students attended to learn about BYTE\'s mission and vision. We presented our SecureBYTE project, conducted networking sessions, and welcomed many new members to our community. The event featured presentations from our executive team, interactive demos, and an exciting roadmap for the semester ahead.',
      images: [
      ]
    }
  },
  {
    id: 'past-3',
    title: 'TMSU Campus Group Fair',
    date: '2025-09-04',
    description: 'Another tabling opportunity to showcase BYTE and connect with students interested in AI development and open-source projects.',
    imageUrl: 'https://picsum.photos/320/180?random=11',
    location: 'TMU Quad',
    type: 'networking',
    recapUrl: 'https://byte.org/recaps/tmsu-fair-2025',
    recap: {
      summary: 'The TMSU Campus Group Fair provided another excellent opportunity to expand our reach. We had engaging conversations with students from various programs about AI, machine learning, and our collaborative project approach. The event helped us build momentum leading up to our official launch event.',
      images: [

      ]
    }
  },
  {
    id: 'past-4',
    title: 'USSTM Involvement Fair',
    date: '2025-08-25',
    description: 'BYTE\'s first tabling event to inform students about our AI-focused student organization and gain interest from potential members.',
    imageUrl: 'https://picsum.photos/320/180?random=10',
    location: 'TMU Student Centre',
    type: 'networking',
    recapUrl: 'https://byte.org/recaps/usstm-fair-2025',
    recap: {
      summary: 'Our debut at the USSTM Involvement Fair was a great success! We introduced BYTE to the TMU community, explaining our mission as a student-led, open-source AI organization. Many students showed interest in our hands-on approach to AI development and our upcoming SecureBYTE project. We collected contact information from over 50 interested students.',
      images: [
      ]
    }
  },

  // Upcoming Events

];