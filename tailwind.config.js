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
<<<<<<< HEAD
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
=======
        background: 'hsl(210, 30%, 8%)',
        foreground: 'hsl(210, 20%, 98%)',
        card: 'hsl(210, 30%, 12%)',
        'card-foreground': 'hsl(210, 20%, 98%)',
        primary: 'hsl(210, 70%, 50%)',
        'primary-foreground': 'hsl(0, 0%, 100%)',
        secondary: 'hsl(210, 30%, 18%)',
        'secondary-foreground': 'hsl(210, 20%, 98%)',
        accent: 'hsl(130, 60%, 45%)',
        'accent-foreground': 'hsl(0, 0%, 100%)',
        muted: 'hsl(210, 30%, 15%)',
        'muted-foreground': 'hsl(210, 20%, 70%)',
        border: 'hsl(210, 30%, 20%)',
        input: 'hsl(210, 30%, 18%)',
        ring: 'hsl(210, 70%, 50%)',
        success: 'hsl(130, 60%, 45%)',
        warning: 'hsl(45, 90%, 55%)',
        destructive: 'hsl(0, 70%, 50%)',
      },
      borderRadius: {
        lg: '16px',
        md: '12px',
        sm: '8px',
>>>>>>> origin/main
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
      boxShadow: {
<<<<<<< HEAD
        card: '0 4px 12px hsla(210, 20%, 10%, 0.08)',
        modal: '0 16px 32px hsla(210, 20%, 10%, 0.16)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
=======
        card: '0 4px 12px hsla(210, 20%, 10%, 0.3)',
        modal: '0 16px 32px hsla(210, 20%, 10%, 0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
>>>>>>> origin/main
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
<<<<<<< HEAD
=======
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px hsla(130, 60%, 45%, 0.3)' },
          '50%': { boxShadow: '0 0 30px hsla(130, 60%, 45%, 0.6)' },
        },
>>>>>>> origin/main
      },
    },
  },
  plugins: [],
}
<<<<<<< HEAD

=======
>>>>>>> origin/main
