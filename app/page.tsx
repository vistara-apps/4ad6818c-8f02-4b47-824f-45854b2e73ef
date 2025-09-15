import { AppShell } from '../components/AppShell'
import { AgentChat } from '../components/AgentChat'

export default function HomePage() {
  return (
    <AppShell>
      <div className="flex flex-col h-full">
        <header className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent to-primary flex items-center justify-center">
              <span className="text-lg font-bold text-white">G</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">GHO Navigator</h1>
              <p className="text-sm text-muted-foreground">Unlock DeFi with GHO, simplified</p>
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
