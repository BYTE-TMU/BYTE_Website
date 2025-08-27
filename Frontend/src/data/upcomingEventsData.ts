export interface UpcomingEvent {
  id: string
  date: string
  title: string
  description: string
  imageUrl?: string
  registrationUrl?: string
}

export const upcomingEventsData: UpcomingEvent[] = [
  {
    id: "upcoming-1",
    date: "Jan 25, 2025",
    title: "BYTE Kick-off 2025",
    description: "Get to know BYTE, our team and how you can get involved in our exciting new year initiatives.",
    imageUrl: "https://picsum.photos/320/180?random=10",
    registrationUrl: "https://forms.google.com/byte-kickoff-2025"
  },
  {
    id: "upcoming-2",
    date: "Feb 8, 2025", 
    title: "React Workshop Series",
    description: "Learn modern React development from the basics to advanced concepts in our comprehensive workshop series.",
    imageUrl: "https://picsum.photos/320/180?random=11",
    registrationUrl: "https://forms.google.com/react-workshop-2025"
  },
  {
    id: "upcoming-3",
    date: "Feb 22, 2025",
    title: "Tech Career Fair",
    description: "Connect with top tech companies and explore internship and full-time opportunities in the industry.",
    imageUrl: "https://picsum.photos/320/180?random=12",
    registrationUrl: "https://forms.google.com/tech-career-fair-2025"
  },
  {
    id: "upcoming-4",
    date: "Mar 8, 2025",
    title: "AI & Machine Learning Symposium",
    description: "Join industry experts as they discuss the latest trends and innovations in AI and machine learning.",
    imageUrl: "https://picsum.photos/320/180?random=13"
  },
  {
    id: "upcoming-5",
    date: "Mar 22, 2025",
    title: "Open Source Contribution Day",
    description: "Learn how to contribute to open source projects and make your first meaningful contribution to the community.",
    imageUrl: "https://picsum.photos/320/180?random=14",
    registrationUrl: "https://forms.google.com/open-source-day-2025"
  },
  {
    id: "upcoming-6",
    date: "Apr 5, 2025",
    title: "Networking Night",
    description: "Connect with fellow developers, alumni, and industry professionals in a relaxed networking environment.",
    imageUrl: "https://picsum.photos/320/180?random=15"
  }
]