'use client'

import { ReactNode } from 'react'

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-bg">
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  )
}

