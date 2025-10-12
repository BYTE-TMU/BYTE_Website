import { ButtonHTMLAttributes } from 'react'
import { motion } from 'framer-motion'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success'
  isLoading?: boolean
}

const variantStyles = {
  primary: 'bg-[#4C5EF6] hover:bg-[#3D4FD8] text-white border-[#4C5EF6]',
  secondary: 'bg-gray-700 hover:bg-gray-600 text-white border-gray-700',
  danger: 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-500/50',
  success: 'bg-green-500/20 hover:bg-green-500/30 text-green-400 border-green-500/50',
}

export default function Button({
  children,
  variant = 'primary',
  isLoading = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'px-4 py-2 font-tech-mono font-bold text-sm uppercase tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed border-2'

  return (
    <motion.button
      whileHover={!disabled && !isLoading ? { scale: 1.02 } : undefined}
      whileTap={!disabled && !isLoading ? { scale: 0.98 } : undefined}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </motion.button>
  )
}
