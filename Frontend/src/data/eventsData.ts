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
  // Past Events (before Sept 22, 2025)
  {
    id: 'past-1',
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
        'https://picsum.photos/800/600?random=usstm1',
        'https://picsum.photos/800/600?random=usstm2',
        'https://picsum.photos/800/600?random=usstm3'
      ]
    }
  },
  {
    id: 'past-2',
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
        'https://picsum.photos/800/600?random=tmsu1',
        'https://picsum.photos/800/600?random=tmsu2',
        'https://picsum.photos/800/600?random=tmsu3',
        'https://picsum.photos/800/600?random=tmsu4'
      ]
    }
  },
  {
    id: 'past-3',
    title: 'BYTE Launch Event',
    date: '2025-09-19',
    description: 'The official launch event for BYTE! Join us to learn about our organization, meet the executive team, network with fellow AI enthusiasts, and discover how you can get involved in our projects.',
    imageUrl: 'https://picsum.photos/320/180?random=12',
    location: 'TMU Student Learning Centre',
    type: 'social',
    recapUrl: 'https://byte.org/recaps/launch-event-2025',
    recap: {
      summary: 'Our official launch event exceeded all expectations! Over 120 students attended to learn about BYTE\'s mission and vision. We presented our SecureBYTE project, conducted networking sessions, and welcomed many new members to our community. The event featured presentations from our executive team, interactive demos, and an exciting roadmap for the semester ahead.',
      images: [
        'https://picsum.photos/800/600?random=launch1',
        'https://picsum.photos/800/600?random=launch2',
        'https://picsum.photos/800/600?random=launch3',
        'https://picsum.photos/800/600?random=launch4',
        'https://picsum.photos/800/600?random=launch5'
      ]
    }
  },

  // Upcoming Events (after Sept 22, 2025)

];