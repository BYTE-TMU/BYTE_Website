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
    date: "Dec 15, 2024",
    title: "BYTE Winter Break Update",
    description: "Important updates for BYTE members during winter break and what to expect for the upcoming semester.",
    imageUrl: "https://picsum.photos/320/180?random=1"
  },
  {
    id: "ann-2", 
    date: "Nov 28, 2024",
    title: "New Partnership Announcement",
    description: "We're excited to announce our new partnership with leading tech companies to provide better opportunities for our members.",
    imageUrl: "https://picsum.photos/320/180?random=2"
  },
  {
    id: "ann-3",
    date: "Nov 10, 2024",
    title: "BYTE Scholarship Program Launch",
    description: "Introducing our new scholarship program to support aspiring developers in their educational journey.",
    imageUrl: "https://picsum.photos/320/180?random=3"
  },
  {
    id: "ann-4",
    date: "Oct 22, 2024",
    title: "Open Source Initiative",
    description: "BYTE is launching a new open source initiative to contribute to the developer community and create impactful projects.",
    imageUrl: "https://picsum.photos/320/180?random=4"
  },
  {
    id: "ann-5",
    date: "Oct 5, 2024",
    title: "Member Spotlight Series",
    description: "Starting our monthly member spotlight series to showcase the amazing work and achievements of our community.",
    imageUrl: "https://picsum.photos/320/180?random=5"
  },
  {
    id: "ann-6",
    date: "Sep 20, 2024",
    title: "Fall Semester Kickoff",
    description: "Join us for the official start of our fall semester activities with exciting new workshops and networking events.",
    imageUrl: "https://picsum.photos/320/180?random=6"
  }
]