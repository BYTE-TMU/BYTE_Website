import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FAQItem {
  id: string
  question: string
  answer: string
}

const faqData: FAQItem[] = [
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

export default function FAQSection() {
  const [openItem, setOpenItem] = useState<string | null>(null)

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id)
  }

  return (
    <section className="py-20 bg-digital-abyss relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-terminal-green/20" />
          ))}
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto px-6">
        {/* Header Area */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 
            className="text-5xl lg:text-6xl font-orbitron font-black mb-8 text-transparent bg-clip-text"
            style={{ background: 'linear-gradient(to right, #2B9398, #48F5FE)', WebkitBackgroundClip: 'text' }}
          >
            FAQ
          </h2>
          
          <p className="text-lg lg:text-xl text-ghost-white max-w-3xl mx-auto leading-relaxed">
            Browse our most frequently asked questions to learn more about BYTE
          </p>
        </motion.div>

        {/* Accordion Items */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {faqData.map((item, index) => (
            <motion.div
              key={item.id}
              className="border border-yellow-400"
              style={{ backgroundColor: '#4C5EF6', borderColor: '#48f5FE' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
            >
              <motion.button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors duration-200"
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
              >
                <span className="text-white font-medium text-lg pr-4">
                  {item.question}
                </span>
                
                <motion.div
                  animate={{ rotate: openItem === item.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {openItem === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2">
                      <p className="text-white/90 text-base leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}