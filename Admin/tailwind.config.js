/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'orbitron': ['Orbitron', 'monospace'],
        'tech-mono': ['Fira Code', 'Monaco', 'Consolas', 'monospace'],
        'fira-code': ['Fira Code', 'monospace'],
        'lastica': ['Lastica', 'sans-serif'],
      },
      colors: {
        'digital-abyss': '#0A0A0B',
        'terminal-green': '#39FF14',
        'ghost-white': '#F8F8FF',
        'acid-yellow': '#48F5FE',
        'glitch-cyan': '#00FFFF',
        'static-gray': '#8C8C8C',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      textShadow: {
        'glow': '0 0 10px currentColor, 0 0 20px currentColor',
      },
      clipPath: {
        'notch': 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)',
        'notch-reverse': 'polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)',
      }
    },
  },
  plugins: [],
}
