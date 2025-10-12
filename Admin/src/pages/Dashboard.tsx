import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

interface DashboardCard {
  title: string
  description: string
  path: string
  icon: string
  color: string
}

const dashboardCards: DashboardCard[] = [
  {
    title: 'Team Members',
    description: 'Manage team members, roles, and categories',
    path: '/team',
    icon: '👥',
    color: '#4C5EF6',
  },
  {
    title: 'Projects',
    description: 'Manage ongoing and completed projects',
    path: '/projects',
    icon: '🚀',
    color: '#48F5FE',
  },
  {
    title: 'Events',
    description: 'Manage events, workshops, and recaps',
    path: '/events',
    icon: '📅',
    color: '#CEFE00',
  },
  {
    title: 'Announcements',
    description: 'Manage website announcements',
    path: '/announcements',
    icon: '📢',
    color: '#2B9398',
  },
]

export default function Dashboard() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-digital-abyss">
      {/* Header */}
      <header className="border-b-2 border-[#CEFE00]/30 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-orbitron font-black text-white">
              BYTE Admin
            </h1>
            <p className="text-sm text-ghost-white/60 font-tech-mono mt-1">
              Content Management System
            </p>
          </div>

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
              onClick={logout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-400 font-tech-mono text-sm hover:bg-red-500/30 transition-colors"
            >
              Logout
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-orbitron font-black text-white mb-4">
            Welcome back, {user?.username}!
          </h2>
          <p className="text-ghost-white/60 font-tech-mono">
            Manage your BYTE website content from this dashboard.
          </p>
        </motion.div>

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardCards.map((card, index) => (
            <motion.div
              key={card.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link to={card.path}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative h-full group"
                >
                  {/* Outer border */}
                  <div
                    className="absolute inset-0 border-2 transition-colors group-hover:border-opacity-100"
                    style={{
                      borderColor: card.color,
                      opacity: 0.5,
                      clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)'
                    }}
                  />

                  {/* Card Content */}
                  <div
                    className="relative bg-gray-900/50 backdrop-blur-sm p-6 m-0.5 h-full transition-all group-hover:bg-gray-900/70"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)'
                    }}
                  >
                    {/* Icon */}
                    <div
                      className="text-5xl mb-4 opacity-80 group-hover:opacity-100 transition-opacity"
                      style={{ filter: `drop-shadow(0 0 10px ${card.color})` }}
                    >
                      {card.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-orbitron font-bold text-white mb-2">
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-ghost-white/60 font-tech-mono">
                      {card.description}
                    </p>

                    {/* Arrow indicator */}
                    <div className="mt-4 flex items-center gap-2 text-xs font-tech-mono font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity"
                         style={{ color: card.color }}>
                      Manage
                      <span className="text-lg">→</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats (Optional) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {[
            { label: 'Total Team Members', value: '0', color: '#4C5EF6' },
            { label: 'Active Projects', value: '0', color: '#48F5FE' },
            { label: 'Upcoming Events', value: '0', color: '#CEFE00' },
            { label: 'Announcements', value: '0', color: '#2B9398' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="p-6 bg-gray-900/30 border-l-4 backdrop-blur-sm"
              style={{ borderColor: stat.color }}
            >
              <p className="text-sm font-tech-mono text-ghost-white/60 mb-2">
                {stat.label}
              </p>
              <p className="text-3xl font-orbitron font-black text-white">
                {stat.value}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Background pattern */}
        <div className="fixed inset-0 opacity-5 pointer-events-none">
          <div className="grid grid-cols-12 h-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-r border-terminal-green/20" />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
