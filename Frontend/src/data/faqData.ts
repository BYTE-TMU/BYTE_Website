export interface FAQItem {
  id: string
  question: string
  answer: string
}

export const faqData: FAQItem[] = [
  {
    id: "faq-1",
    question: "Who can join BYTE? Do I need prior AI experience?",
    answer: "BYTE is open to all students regardless of experience level. Whether you're a complete beginner or have advanced AI knowledge, we welcome you! We provide mentorship and learning opportunities to help members at every stage of their journey."
  },
  {
    id: "faq-2",
    question: "What's the difference between General Members and Team Members?",
    answer: "General Members have access to our Discord community, workshops, and networking events. Team Members additionally work on core BYTE projects like SecureBYTE, have direct mentorship from leads, and contribute to our open-source initiatives with more responsibility and learning opportunities."
  },
  {
    id: "faq-3",
    question: "What types of projects does BYTE work on?",
    answer: "We focus on AI applications that solve real-world problems. Our flagship project SecureBYTE uses AI for code security analysis. We also work on machine learning models, natural language processing tools, computer vision applications, and other innovative AI solutions that benefit the developer community."
  },
  {
    id: "faq-4",
    question: "Does BYTE organize hackathons and events?",
    answer: "Yes! We regularly host workshops, networking events, tech talks, and participate in hackathons. We organize both beginner-friendly learning sessions and advanced technical workshops. Check our Events page for upcoming activities and our Discord for real-time updates."
  },
  {
    id: "faq-5",
    question: "Are there research opportunities available?",
    answer: "Absolutely! BYTE collaborates with faculty on AI research projects and encourages members to pursue independent research. Team Members often have opportunities to co-author papers, present at conferences, and work on cutting-edge AI research alongside experienced mentors."
  },
  {
    id: "faq-6",
    question: "How much time commitment is expected?",
    answer: "It depends on your involvement level. General Members can participate as much or as little as they want - attend events, join Discord discussions, etc. Team Members typically commit 5-10 hours per week to project work, but this is flexible around academic schedules."
  },
  {
    id: "faq-7",
    question: "How can I contribute to open-source projects?",
    answer: "All our projects, including SecureBYTE, are open-source on GitHub. General Members can contribute through our public repositories, while Team Members work on core development. We provide guidance on making your first open-source contributions and help you build a strong GitHub portfolio."
  }
]