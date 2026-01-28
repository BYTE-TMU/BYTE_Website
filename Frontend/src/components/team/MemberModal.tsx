import { motion, AnimatePresence } from 'framer-motion'
import { Member } from '../../data/teamData'
import { useState } from 'react'

interface MemberModalProps {
  member: Member | null
  isOpen: boolean
  onClose: () => void
}

// Default LinkedIn URL for BYTE company page
const DEFAULT_LINKEDIN_URL = 'https://www.linkedin.com/company/buildyourtechnicalexperience/?originalSubdomain=ca'

export default function MemberModal({ member, isOpen, onClose }: MemberModalProps) {
  const [copied, setCopied] = useState(false)

  if (!member) return null

  // Get email - use member's email or a default BYTE email
  const memberEmail = member.email || 'contact@bytetmu.com'

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(memberEmail)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy email:', err)
    }
  }

  const handleLinkedInClick = () => {
    const linkedInUrl = member.linkedInUrl || DEFAULT_LINKEDIN_URL
    window.open(linkedInUrl, '_blank', 'noopener,noreferrer')
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Content */}
          <motion.div
            className="relative max-w-md w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="relative">
              {/* Modal background with notched corners */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: '#48F5FE',
                  clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))'
                }}
              />

              <div
                className="relative p-8 m-1"
                style={{
                  backgroundColor: '#1a1a1a',
                  clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))'
                }}
              >
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white hover:text-[#48F5FE] transition-colors duration-200"
                  aria-label="Close modal"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Profile image */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#48F5FE]">
                      <img
                        src={member.profilePicUrl}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Rank indicator */}
                    {member.rank >= 80 && (
                      <motion.div
                        className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-[#CEFE00] to-[#2B9398] flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: 'spring' }}
                      >
                        <div className="w-3 h-3 rounded-full bg-white" />
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Member details */}
                <div className="text-center space-y-4">
                  <motion.h3
                    className="text-2xl font-orbitron font-bold text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {member.name}
                  </motion.h3>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-[#48F5FE] font-tech-mono font-bold text-lg mb-2">
                      {member.position}
                    </p>
                  </motion.div>

                  {/* Additional info section */}
                  <motion.div
                    className="mt-6 p-4 rounded-lg bg-white/5 border border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <p className="text-white/80 font-tech-mono text-sm leading-relaxed">
                      {member.roleDescription}
                    </p>
                  </motion.div>

                  {/* Action buttons */}
                  <motion.div
                    className="flex gap-4 mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {/* Email Button - Copies to clipboard */}
                    <button
                      onClick={handleCopyEmail}
                      className="flex-1 px-4 py-3 font-tech-mono text-sm font-bold transition-all duration-200 text-[#48F5FE] border-2 border-[#48F5FE] hover:bg-[#48F5FE] hover:text-black cursor-pointer hover:shadow-[0_0_20px_rgba(72,245,254,0.5)]"
                      style={{
                        clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)'
                      }}
                      title={`Copy email: ${memberEmail}`}
                    >
                      {copied ? '✓ Copied!' : 'Email'}
                    </button>

                    {/* LinkedIn Button - Opens in new tab */}
                    <button
                      onClick={handleLinkedInClick}
                      className="flex-1 px-4 py-3 font-tech-mono text-sm font-bold transition-all duration-200 cursor-pointer hover:shadow-[0_0_20px_rgba(10,102,194,0.5)] hover:scale-[1.02]"
                      style={{
                        background: 'linear-gradient(to bottom, #0A66C2, #004182)',
                        clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)',
                        color: 'white'
                      }}
                      title={member.linkedInUrl ? `View ${member.name}'s LinkedIn` : 'View BYTE on LinkedIn'}
                    >
                      LinkedIn
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}