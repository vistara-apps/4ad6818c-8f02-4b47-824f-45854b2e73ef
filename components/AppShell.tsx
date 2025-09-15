'use client'

<<<<<<< HEAD
import { ReactNode } from 'react'

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-bg">
      <div className="container mx-auto px-4 py-8">
=======
import { cn } from '../lib/utils'

interface AppShellProps {
  children: React.ReactNode
  className?: string
}

export function AppShell({ children, className }: AppShellProps) {
  return (
    <div className={cn(
      "min-h-screen max-w-md mx-auto bg-card/50 backdrop-blur-sm border-x border-border",
      "flex flex-col relative overflow-hidden",
      className
    )}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-screen">
>>>>>>> origin/main
        {children}
      </div>
    </div>
  )
}
<<<<<<< HEAD

=======
>>>>>>> origin/main
