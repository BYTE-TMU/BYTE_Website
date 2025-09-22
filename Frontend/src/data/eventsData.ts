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
    title: 'BYTE Kick-off 2025',
    date: '2025-01-25',
    description: 'Get to know BYTE, our team and how you can get involved in our exciting new year initiatives.',
    imageUrl: 'https://picsum.photos/320/180?random=10',
    location: 'TMU Student Learning Centre',
    type: 'social',
    recapUrl: 'https://byte.org/recaps/kickoff-2025',
    recap: {
      summary: 'Our 2025 kick-off event was a huge success! Over 200 students attended to learn about BYTE\'s mission and upcoming projects. We introduced our new SecureBYTE initiative and welcomed dozens of new members to our community. The event featured networking sessions, project demos, and an exciting roadmap presentation for the year ahead.',
      images: [
        'https://picsum.photos/800/600?random=kickoff1',
        'https://picsum.photos/800/600?random=kickoff2',
        'https://picsum.photos/800/600?random=kickoff3',
        'https://picsum.photos/800/600?random=kickoff4',
        'https://picsum.photos/800/600?random=kickoff5'
      ]
    }
  },
  {
    id: 'past-2',
    title: 'React Workshop Series',
    date: '2025-02-08',
    description: 'Learn modern React development from the basics to advanced concepts in our comprehensive workshop series.',
    imageUrl: 'https://picsum.photos/320/180?random=11',
    location: 'Engineering Building Room 302',
    type: 'workshop',
    recapUrl: 'https://byte.org/recaps/react-workshop-2025',
    recap: {
      summary: 'Our React workshop series exceeded expectations with 150+ participants across three sessions. Students built real-world applications, learned modern React patterns including hooks and context, and worked on collaborative projects. Many participants continued to contribute to our open-source projects after the workshop.',
      images: [
        'https://picsum.photos/800/600?random=react1',
        'https://picsum.photos/800/600?random=react2',
        'https://picsum.photos/800/600?random=react3',
        'https://picsum.photos/800/600?random=react4'
      ]
    }
  },
  

  // Upcoming Events (after Sept 22, 2025)
  {
    id: 'upcoming-1',
    title: 'AI Workshop Series: Introduction to Machine Learning',
    date: '2025-10-05',
    description: 'A comprehensive workshop covering the fundamentals of machine learning, including hands-on coding exercises with Python and TensorFlow.',
    imageUrl: 'https://picsum.photos/300/169?random=2',
    location: 'Engineering Building Room 302',
    type: 'workshop',
    registrationUrl: 'https://forms.google.com/ml-workshop-2025'
  },
  
  
];