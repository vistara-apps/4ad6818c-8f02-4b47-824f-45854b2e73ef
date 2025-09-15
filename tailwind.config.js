/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(210, 70%, 50%)',
        accent: 'hsl(130, 60%, 45%)',
        bg: 'hsl(210, 30%, 98%)',
        surface: 'hsl(0, 0%, 100%)',
        text: 'hsl(210, 20%, 15%)',
        border: 'hsl(210, 20%, 90%)',
      },
      fontSize: {
        display: ['text-3xl', 'font-bold'],
        heading: ['text-xl', 'font-semibold'],
        body: ['text-base', 'leading-7'],
        caption: ['text-sm', 'text-gray-600'],
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
      boxShadow: {
        card: '0 4px 12px hsla(210, 20%, 10%, 0.08)',
        modal: '0 16px 32px hsla(210, 20%, 10%, 0.16)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

