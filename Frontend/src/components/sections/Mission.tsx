
import { motion } from 'framer-motion'

export default function Mission() {
  return (
    <section className="py-20 bg-digital-abyss relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-terminal-green/20" />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header Area - Centered */}
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
            Our Mission
          </h2>
          
          <p className="text-lg lg:text-xl text-ghost-white max-w-4xl mx-auto leading-relaxed">
            We exist to empower students to gain hands-on experience in real-world AI development by working collaboratively on projects that make a difference.
          </p>
        </motion.div>

        {/* Two-Column Content Area */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <motion.p
              className="text-ghost-white text-lg leading-relaxed"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              SecureBYTE is an open-source project that helps developers detect potential security flaws and logical issues in their code using traditional static code analysis and LLMs. The AI model then offers insights and suggests remediations directly on developers' code.
            </motion.p>
            
            <motion.p
              className="text-ghost-white text-lg leading-relaxed"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Developers can publicly contribute to SecureBYTE via this GitHub repository.
            </motion.p>
          </div>

          {/* Right Column - Image Placeholder */}
          <motion.div
            className="aspect-[5/3] bg-gray-300 rounded-lg flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <img 
              src="https://picsum.photos/600/350?random=20"
              alt="SecureBYTE project illustration"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}