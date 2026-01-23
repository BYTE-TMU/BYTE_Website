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
    date: "Jan 15, 2026",
    title: "TMU Tech Week 2026 is Coming!",
    description: "Get ready for TMU Tech Week 2026 on February 15th! BYTE is hosting this exciting week of tech events, bringing together students and industry leaders to explore AI, machine learning, and software development. Mark your calendars!",
    imageUrl: "/images/events/Tmutechweek.png"
  },
  {
    id: "ann-2",
    date: "Dec 1, 2025",
    title: "BYTE Demo Day - SecureBYTE Showcase",
    description: "We hosted an incredible Demo Day featuring our flagship SecureBYTE cybersecurity project! Thank you to everyone who attended our panel discussion on the future of security solutions and innovation at BYTE.",
    imageUrl: "/images/events/Demoday.JPG"
  },
  {
    id: "ann-3",
    date: "Nov 15, 2025",
    title: "BYTE at Google DevFest Toronto 2025",
    description: "BYTE represented at Google DevFest Toronto 2025, one of Canada's largest developer conferences! We connected with thousands of developers, showcased our SecureBYTE project, and networked with industry professionals.",
    imageUrl: "/images/events/devfestevent.JPG"
  },
  {
    id: "ann-4",
    date: "Sep 29, 2025",
    title: "BYTE Launch Event Success!",
    description: "Our official launch event was a huge success! We welcomed new members, presented our vision for the year, and introduced SecureBYTE. Thanks to everyone who joined us at the George Vari Engineering Building.",
    imageUrl: "/images/events/bytelaunch.jpeg"
  },
  {
    id: "ann-5",
    date: "Sep 10, 2025",
    title: "Find BYTE at the TMSU Street Fair",
    description: "We had an amazing time meeting students at the TMSU Campus Street Fair! Thanks to everyone who stopped by to learn about BYTE and our hands-on approach to AI development and open-source projects.",
    imageUrl: "/images/events/tmsustreetfair.jpeg"
  }
]