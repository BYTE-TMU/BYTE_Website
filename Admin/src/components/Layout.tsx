import { ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

interface LayoutProps {
  children: ReactNode
  title: string
}

export default function Layout({ children, title }: LayoutProps) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-digital-abyss">
      {/* Header */}
      <header className="border-b-2 border-[#CEFE00]/30 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link to="/dashboard">
              <h1 className="text-2xl font-orbitron font-black text-white hover:text-[#CEFE00] transition-colors">
                BYTE Admin
              </h1>
            </Link>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-sm font-tech-mono text-ghost-white">
                  {user?.username}
                </p>
                <p className="text-xs text-ghost-white/60 font-tech-mono">
                  {user?.role}
                </p>
              </div>

              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-400 font-tech-mono text-sm hover:bg-red-500/30 transition-colors"
              >
                Logout
              </motion.button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex gap-4 flex-wrap">
            {[
              { label: 'Dashboard', path: '/dashboard' },
              { label: 'Team', path: '/team' },
              { label: 'Projects', path: '/projects' },
              { label: 'Events', path: '/events' },
              { label: 'Announcements', path: '/announcements' },
              { label: 'FAQs', path: '/faqs' },
              { label: 'Users', path: '/users' },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-4 py-2 font-tech-mono text-sm text-ghost-white/80 hover:text-white hover:bg-white/10 transition-colors border border-transparent hover:border-[#48F5FE]/30"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-orbitron font-black text-white mb-8"
        >
          {title}
        </motion.h2>

        {/* Page Content */}
        {children}
      </main>

      {/* Background pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none -z-10">
        <div className="grid grid-cols-12 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-terminal-green/20" />
          ))}
        </div>
      </div>
    </div>
  )
}
