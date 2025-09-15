'use client'

import { cn } from '../lib/utils'

interface AppShellProps {
  children: React.ReactNode
  className?: string
}

export function AppShell({ children, className }: AppShellProps) {
  return (
    <div className={cn(
      "min-h-screen max-w-md mx-auto bg-gray-900/50 backdrop-blur-sm border-x border-gray-700",
      "flex flex-col relative overflow-hidden",
      className
    )}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-20 w-40 h-40 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -left-20 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-screen">
        {children}
      </div>
    </div>
  )
}
