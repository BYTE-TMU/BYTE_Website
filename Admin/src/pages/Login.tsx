import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await login(email, password)

    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.error || 'Login failed')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-digital-abyss flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-terminal-green/20" />
          ))}
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-[#48F5FE] rounded-full opacity-20 animate-pulse" />
      <div className="absolute top-40 right-20 w-6 h-6 bg-[#CEFE00] rounded-full opacity-15 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 left-20 w-3 h-3 bg-[#4C5EF6] rounded-full opacity-25 animate-pulse" style={{ animationDelay: '2s' }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-orbitron font-black text-white mb-2">
            BYTE Admin
          </h1>
          <p className="text-ghost-white/60 font-tech-mono text-sm">
            Content Management System
          </p>
        </div>

        {/* Login Card */}
        <div className="relative">
          {/* Outer border with notch */}
          <div
            className="absolute inset-0 border-2 border-[#CEFE00]"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)'
            }}
          />

          {/* Inner background */}
          <div
            className="relative bg-gray-900/50 backdrop-blur-sm p-8 m-0.5"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)'
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-tech-mono font-bold text-ghost-white mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-digital-abyss border-2 border-[#48F5FE]/30 text-ghost-white font-tech-mono focus:border-[#48F5FE] focus:outline-none transition-colors"
                  placeholder="admin@byte.org"
                />
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-tech-mono font-bold text-ghost-white mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-digital-abyss border-2 border-[#48F5FE]/30 text-ghost-white font-tech-mono focus:border-[#48F5FE] focus:outline-none transition-colors"
                  placeholder="Enter your password"
                />
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-500/10 border border-red-500/50 text-red-400 text-sm font-tech-mono"
                >
                  {error}
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-[#4C5EF6] text-white font-tech-mono font-bold text-sm uppercase tracking-wider hover:bg-[#3D4FD8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors relative overflow-hidden group"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)'
                }}
              >
                <span className="relative z-10">
                  {loading ? 'Logging in...' : 'Login'}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </motion.button>

              {/* Demo Info */}
              <div className="mt-6 p-4 bg-[#CEFE00]/10 border border-[#CEFE00]/30">
                <p className="text-xs font-tech-mono text-[#CEFE00] mb-2">
                  <strong>Demo Credentials:</strong>
                </p>
                <p className="text-xs font-tech-mono text-ghost-white/60">
                  Email: admin@byte.org<br />
                  Password: [any password]
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center mt-8 text-xs text-ghost-white/40 font-tech-mono">
          BYTE © 2025 - Toronto Metropolitan University
        </p>
      </motion.div>
    </div>
  )
}
