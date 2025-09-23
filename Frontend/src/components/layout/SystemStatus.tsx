
import { motion } from 'framer-motion'

interface SystemStatusProps {
  label: string
  status: string
  color: string
}

export default function SystemStatus({ label, status, color }: SystemStatusProps) {
  return (
    <div className="flex items-center space-x-1">
      <motion.div
        className={`w-2 h-2 rounded-full bg-${color}`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <span className="text-ghost-white/60">
        {label}: <span className={`text-${color}`}>{status}</span>
      </span>
    </div>
  )
}