export interface FAQ {
  id: number
  question: string
  answer: string
  display_order: number
}

export const faqData: FAQ[] = [
  {
    id: 1,
    question: "Who can join BYTE? Do I need prior AI experience?",
    answer: "BYTE is open to all students regardless of experience level. Whether you're a complete beginner or have advanced AI knowledge, we welcome you! We provide mentorship and learning opportunities to help members at every stage of their journey.",
    display_order: 1
  },
  {
    id: 2,
    question: "What's the difference between General Members and Team Members?",
    answer: "General Members have access to our Discord community, workshops, networking events, and can choose to contribute to our projects with mentorship from team members. Team Members additionally work on core BYTE projects like SecureBYTE, mentor the general members, and contribute to our events.",
    display_order: 2
  },
  {
    id: 3,
    question: "What types of projects does BYTE work on?",
    answer: "We focus on AI applications that solve real-world problems. Our flagship project SecureBYTE uses AI for code security analysis. We also work on machine learning models, natural language processing tools, computer vision applications, and other innovative AI solutions that benefit the developer community.",
    display_order: 3
  },
  {
    id: 4,
    question: "Does BYTE organize events?",
    answer: "Yes! We regularly host workshops, networking events, and tech talks. We organize both beginner-friendly learning sessions and advanced technical workshops. Check our Events page for upcoming activities and our Discord for real-time updates.",
    display_order: 4
  },
  {
    id: 5,
    question: "How much time commitment is expected?",
    answer: "It depends on your involvement level. General Members can participate as much or as little as they want - attend events, join Discord discussions, etc. Team Members typically commit 5-10 hours per week to project work, but this is flexible around academic schedules.",
    display_order: 5
  },
  {
    id: 6,
    question: "How can I contribute to open-source projects?",
    answer: "All our projects, including SecureBYTE, are community built. General Members can contribute to our project by signing up through the link in our instagram or click join on our website and fill out the form. We provide guidance on making your first open-source contributions and help you build a strong GitHub portfolio.",
    display_order: 6
  }
]
