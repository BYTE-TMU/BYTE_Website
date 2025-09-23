import { useState } from 'react'
import { motion } from 'framer-motion'

interface ContactFormData {
  name: string
  email: string
  message: string
}


export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const APPS_SCRIPT_URL = import.meta.env.VITE_CONTACT_URL

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    if (!APPS_SCRIPT_URL) {
      setSubmitError('Contact form is not configured. Please try again later.')
      setIsSubmitting(false)
      return
    }

    try {
      // Use FormData for better compatibility with Google Apps Script
      const formDataPayload = new FormData()
      formDataPayload.append('name', formData.name.trim())
      formDataPayload.append('email', formData.email.trim())
      formDataPayload.append('message', formData.message.trim())

      console.log('Sending form data:', {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim()
      })

      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        body: formDataPayload,
        mode: 'no-cors' // Google Apps Script requires no-cors mode
      })

      console.log('Response:', response)
      // Since we're using no-cors mode, we can't read the response
      // We'll assume success if no error is thrown
      setIsSubmitted(true)
      setFormData({ name: '', email: '', message: '' })

    } catch (error) {
      console.error('Failed to send message:', error)
      setSubmitError('Failed to send message. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => {
        setIsSubmitted(false)
        setSubmitError(null)
      }, 5000)
    }
  }

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const contactInfo = [
    {
      label: 'GitHub',
      value: 'byte-tmu',
      href: 'https://github.com/byte-tmu',
      icon: (
    <svg className="w-6 h-6" fill="black" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    {
      label: 'Instagram',
      value: '@tmu.byte',
      href: 'https://instagram.com/tmu.byte',
      icon: (
    <svg className="w-6 h-6" fill="black" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    {
      label: 'Email',
      value: 'hello@byte-tmu.ca',
      href: 'mailto:hello@byte-tmu.ca',
      icon: (
    <svg className="w-6 h-6" fill="black" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      )
    },
  ]

  return (
    <section className="py-20 bg-digital-abyss relative overflow-hidden" id="contact">
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-terminal-green/20" />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 
            className="text-5xl lg:text-6xl font-orbitron font-black mb-8 text-white"
            style={{}}
          >
            Contact
          </h2>
          <p className="text-lg lg:text-xl text-ghost-white max-w-4xl mx-auto leading-relaxed">
            Anything from project support to general inquiry, let us know          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div 
              className="p-8"
              style={{
                backgroundColor: '#48F5FE',
                clipPath: 'polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 32px 100%, 0 calc(100% - 32px))'
              }}
            >
                <h3 className="text-2xl font-orbitron font-bold text-digital-abyss mb-6">Send a Message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-digital-abyss/80 mb-2 font-tech-mono">
                      Your Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white border border-digital-abyss/20 text-digital-abyss placeholder-digital-abyss/50 font-tech-mono focus:outline-none focus:border-digital-abyss transition-colors duration-200"
                      style={{
                        clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)'
                      }}
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-digital-abyss/80 mb-2 font-tech-mono">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-white border border-digital-abyss/20 text-digital-abyss placeholder-digital-abyss/50 font-tech-mono focus:outline-none focus:border-digital-abyss transition-colors duration-200"
                      style={{
                        clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)'
                      }}
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-digital-abyss/80 mb-2 font-tech-mono">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-3 bg-white border border-digital-abyss/20 text-digital-abyss placeholder-digital-abyss/50 font-tech-mono focus:outline-none focus:border-digital-abyss transition-colors duration-200 resize-none"
                      style={{
                        clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)'
                      }}
                      placeholder="Tell us about your project or question..."
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      required
                    />
                  </div>

                  {submitError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-500/10 border border-red-500/20 text-red-600 text-sm font-tech-mono rounded"
                    >
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        <span>{submitError}</span>
                      </div>
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                    className="w-full px-6 py-3 font-tech-mono font-bold text-sm transition-all duration-200 disabled:opacity-50 text-digital-abyss flex items-center justify-center space-x-2"
                    style={{
                      background: isSubmitted ? 'linear-gradient(to bottom, #CEFE00, #2B9398)' : submitError ? 'linear-gradient(to bottom, #EF4444, #DC2626)' : 'linear-gradient(to bottom, #4C5EF6, #2C3790)',
                      clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)'
                    }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    animate={isSubmitted ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {isSubmitted ? (
                      <>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        <span>Message Sent!</span>
                      </>
                    ) : isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-digital-abyss border-t-transparent rounded-full"
                        />
                        <span>Sending...</span>
                      </>
                    ) : submitError ? (
                      <>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        <span>Try Again</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                        </svg>
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-orbitron font-bold text-white mb-6">Connect With Us</h3>
              <p className="text-ghost-white/80 leading-relaxed mb-8 font-tech-mono">
                Join Toronto Metropolitan University's premier AI innovation lab. Whether you're interested in 
                contributing to our projects, attending events, or just want to learn more about what we do, 
                we'd love to connect with you.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  className="block"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                >
                  <div className="relative">
                    <div 
                      className="absolute inset-0"
                      style={{ 
                        backgroundColor: '#48F5FE',
                        clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)'
                      }}
                    />
                    
                    <div 
                      className="relative p-4 m-0.5 flex items-center space-x-4 hover:bg-white/5 transition-colors duration-300"
                      style={{
                        backgroundColor: '#48F5FE',
                        clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)'
                      }}
                    >
                      <div 
                        className="w-12 h-12 flex items-center justify-center"
                        style={{
                          background: '#48F5FE',
                          clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)'
                        }}
                      >
                        {info.icon}
                      </div>
                      <div>
                        <p className="text-sm text-black/60 font-tech-mono">{info.label}</p>
                        <p className="text-black font-medium font-tech-mono">{info.value}</p>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Availability Status */}
            <div className="relative">
              <div 
                className="absolute inset-0"
                style={{ 
                  backgroundColor: '#CEFE00',
                  clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)'
                }}
              />
              
              <div 
                className="relative p-6 m-0.5"
                style={{
                  backgroundColor: '#2B9398',
                  clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)'
                }}
              >
                <div className="flex items-center space-x-3">
                  <motion.div
                    className="w-3 h-3 bg-[#CEFE00] rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div>
                    <p className="text-white font-medium font-tech-mono">Always accepting new members</p>
                    <p className="text-white/80 text-sm font-tech-mono">Join our community of AI innovators</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}