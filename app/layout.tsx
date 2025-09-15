import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
<<<<<<< HEAD
  title: 'GHO Navigator',
  description: 'Unlock DeFi with GHO, simplified.',
=======
  title: 'GHO Navigator - Unlock DeFi with GHO, simplified',
  description: 'A guided bot for new users to safely supply and borrow GHO on Aave, with integrated spending and rewards.',
  keywords: ['GHO', 'DeFi', 'Aave', 'Base', 'Mini App'],
  openGraph: {
    title: 'GHO Navigator',
    description: 'Unlock DeFi with GHO, simplified.',
    type: 'website',
  },
>>>>>>> origin/main
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
<<<<<<< HEAD
    <html lang="en">
      <body className={inter.className}>
=======
    <html lang="en" className="dark">
      <body className={`${inter.className} gradient-bg min-h-screen`}>
>>>>>>> origin/main
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
<<<<<<< HEAD

=======
>>>>>>> origin/main
