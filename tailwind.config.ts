import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      width: {
        screen: '100dvw',
      },
      height: {
        screen: '100dvh',
      },
    },
  },
  darkMode: 'class',
  plugins: [daisyui],
  daisyui: {
    themes: ['dim'],
  },
}
export default config
