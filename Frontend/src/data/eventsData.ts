export interface Event {
  id: string
  title: string
  date: string
  description: string
  imageUrl?: string
  location: string
  type: 'workshop' | 'hackathon' | 'networking' | 'social' | 'competition'
}

export const eventsData: Event[] = [
  {
    id: '1',
    title: 'BYTE Kick-off Event',
    date: '2025-09-15',
    description: 'Join us for the official launch of BYTE organization. Meet fellow members, learn about upcoming projects, and network with like-minded individuals.',
    imageUrl: 'https://picsum.photos/600/338?random=1',
    location: 'TMU Student Learning Centre',
    type: 'social'
  },
  {
    id: '2',
    title: 'AI Workshop Series: Introduction to Machine Learning',
    date: '2025-09-25',
    description: 'A comprehensive workshop covering the fundamentals of machine learning, including hands-on coding exercises with Python and TensorFlow.',
    imageUrl: 'https://picsum.photos/300/169?random=2',
    location: 'Engineering Building Room 302',
    type: 'workshop'
  },
  {
    id: '3',
    title: 'SecureBYTE Hackathon',
    date: '2025-07-10',
    description: '48-hour hackathon focused on cybersecurity solutions. Build innovative security tools and compete for prizes.',
    imageUrl: 'https://picsum.photos/300/169?random=3',
    location: 'Student Campus Centre',
    type: 'hackathon'
  },
  {
    id: '4',
    title: 'Tech Industry Networking Night',
    date: '2025-10-28',
    description: 'Connect with industry professionals, alumni, and potential employers in the tech sector.',
    imageUrl: 'https://picsum.photos/300/169?random=4',
    location: 'Ryerson Theatre',
    type: 'networking'
  },
  {
    id: '5',
    title: 'Web Development Bootcamp',
    date: '2025-11-15',
    description: 'Intensive weekend bootcamp covering modern web development with React, Node.js, and cloud deployment.',
    imageUrl: 'https://picsum.photos/300/169?random=5',
    location: 'Computer Lab ENG-213',
    type: 'workshop'
  },
  {
    id: '6',
    title: 'Data Science Competition',
    date: '2025-06-05',
    description: 'Analyze real-world datasets and present insights to industry judges. Cash prizes for top performers.',
    imageUrl: 'https://picsum.photos/300/169?random=6',
    location: 'Library Building Auditorium',
    type: 'competition'
  },
  {
    id: '7',
    title: 'Mobile App Development Workshop',
    date: '2026-01-20',
    description: 'Learn to build cross-platform mobile applications using React Native and Flutter.',
    imageUrl: 'https://picsum.photos/300/169?random=7',
    location: 'Innovation Studio',
    type: 'workshop'
  },
  {
    id: '8',
    title: 'Alumni Tech Talk Series',
    date: '2025-07-10',
    description: 'Former BYTE members share their career journeys and insights from working at top tech companies.',
    imageUrl: 'https://picsum.photos/300/169?random=8',
    location: 'Virtual Event',
    type: 'networking'
  },
  {
    id: '9',
    title: 'Blockchain & Cryptocurrency Workshop',
    date: '2025-06-20',
    description: 'Deep dive into blockchain technology and cryptocurrency development with hands-on smart contract coding.',
    imageUrl: 'https://picsum.photos/300/169?random=9',
    location: 'Business Building Room 115',
    type: 'workshop'
  }
];