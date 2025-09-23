export interface Announcement {
  id: string
  date: string
  title: string
  description: string
  imageUrl?: string
}

export const announcementsData: Announcement[] = [
  {
    id: "ann-1",
    date: "Sep 12, 2025",
    title: "Join Us at the BYTE Launch Event!",
    description: "Don't miss our official launch event on September 19th! Meet the executive team, network with fellow AI enthusiasts, learn about our exciting projects including SecureBYTE, and discover how you can get involved in our student-led AI organization.",
    imageUrl: "https://picsum.photos/320/180?random=1"
  },
  {
    id: "ann-2",
    date: "Aug 28, 2025",
    title: "Find BYTE at the TMSU Campus Group Fair",
    description: "Visit our table at the TMSU Campus Group Fair on September 4th! Learn about our hands-on approach to AI development, our open-source projects, and how you can be part of TMU's premier AI student organization.",
    imageUrl: "https://picsum.photos/320/180?random=2"
  },
  {
    id: "ann-3",
    date: "Aug 18, 2025",
    title: "Meet BYTE at the USSTM Involvement Fair",
    description: "Stop by our table at the USSTM Involvement Fair on August 25th! Discover what BYTE is all about - we're a student-led AI organization focused on building real-world projects and gaining hands-on experience in artificial intelligence.",
    imageUrl: "https://picsum.photos/320/180?random=3"
  },
  {
    id: "ann-4",
    date: "Jun 9, 2025",
    title: "Welcome to BYTE!",
    description: "BYTE is a student-led, open-source AI organization at Toronto Metropolitan University. We're like a startup within a university where students don't just learn about AI - they build it through collaborative, real-world projects.",
    imageUrl: "https://picsum.photos/320/180?random=4"
  }
]