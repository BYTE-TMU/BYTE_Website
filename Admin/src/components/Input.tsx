import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-tech-mono font-bold text-ghost-white mb-2">
        {label}
        {props.required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <input
        className={`w-full px-4 py-3 bg-digital-abyss border-2 border-[#48F5FE]/30 text-ghost-white font-tech-mono focus:border-[#48F5FE] focus:outline-none transition-colors ${error ? 'border-red-500/50' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-red-400 font-tech-mono">{error}</p>
      )}
    </div>
  )
}

export function TextArea({ label, error, className = '', ...props }: TextAreaProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-tech-mono font-bold text-ghost-white mb-2">
        {label}
        {props.required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <textarea
        className={`w-full px-4 py-3 bg-digital-abyss border-2 border-[#48F5FE]/30 text-ghost-white font-tech-mono focus:border-[#48F5FE] focus:outline-none transition-colors resize-vertical ${error ? 'border-red-500/50' : ''} ${className}`}
        rows={4}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-red-400 font-tech-mono">{error}</p>
      )}
    </div>
  )
}

export function Select({
  label,
  error,
  children,
  className = '',
  ...props
}: InputProps & { children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-tech-mono font-bold text-ghost-white mb-2">
        {label}
        {props.required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <select
        className={`w-full px-4 py-3 bg-digital-abyss border-2 border-[#48F5FE]/30 text-ghost-white font-tech-mono focus:border-[#48F5FE] focus:outline-none transition-colors ${error ? 'border-red-500/50' : ''} ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p className="mt-1 text-xs text-red-400 font-tech-mono">{error}</p>
      )}
    </div>
  )
}
