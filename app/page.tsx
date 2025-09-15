'use client'

import dynamic from 'next/dynamic'
import { AppShell } from '../components/AppShell'

const AgentChat = dynamic(() => import('../components/AgentChat').then(mod => ({ default: mod.AgentChat })), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full">Loading chat...</div>
})

export default function HomePage() {
  return (
    <AppShell>
      <div className="flex flex-col h-full">
        <header className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center">
              <span className="text-lg font-bold text-white">G</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">GHO Navigator</h1>
              <p className="text-sm text-gray-400">Unlock DeFi with GHO, simplified</p>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-hidden">
          <AgentChat />
        </main>
      </div>
    </AppShell>
  )
}
