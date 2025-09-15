'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { AppShell } from './AppShell'
import { WalletConnector } from './WalletConnector'
import { AgentChat } from './AgentChat'
import { TransactionStepper } from './TransactionStepper'
import { MerchantGrid } from './MerchantGrid'
import { RewardDashboard } from './RewardDashboard'
import { RiskAlerts } from './RiskAlerts'

type AppState = 'welcome' | 'onboarding' | 'dashboard' | 'spending' | 'rewards'

export function GhoNavigator() {
  const { isConnected } = useAccount()
  const [appState, setAppState] = useState<AppState>('welcome')
  const [currentStep, setCurrentStep] = useState(0)

  const handleStartJourney = () => {
    if (isConnected) {
      setAppState('onboarding')
    } else {
      // Wallet connection will be handled by WalletConnector
    }
  }

  const handleOnboardingComplete = () => {
    setAppState('dashboard')
  }

  const renderContent = () => {
    switch (appState) {
      case 'welcome':
        return (
          <div className="text-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-primary">GHO Navigator</h1>
              <p className="text-xl text-gray-600">Unlock DeFi with GHO, simplified.</p>
              <p className="text-lg">Your guided bot for safe GHO supply, borrow, and spending.</p>
            </div>
            <WalletConnector onConnect={() => setAppState('onboarding')} />
            <button
              onClick={handleStartJourney}
              className="btn-primary text-lg px-8 py-4"
            >
              Start DeFi Journey
            </button>
          </div>
        )

      case 'onboarding':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Welcome to DeFi!</h2>
              <p className="text-gray-600">Let's get you set up safely with GHO.</p>
            </div>
            <TransactionStepper
              currentStep={currentStep}
              onStepChange={setCurrentStep}
              onComplete={handleOnboardingComplete}
            />
          </div>
        )

      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Your DeFi Dashboard</h2>
              <p className="text-gray-600">Manage your GHO positions and explore opportunities.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <button
                  onClick={() => setAppState('spending')}
                  className="btn-primary w-full"
                >
                  Shop with GHO
                </button>
                <button
                  onClick={() => setAppState('rewards')}
                  className="btn-secondary w-full"
                >
                  View Rewards
                </button>
              </div>
              <RiskAlerts />
            </div>
            <AgentChat />
          </div>
        )

      case 'spending':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Spend GHO</h2>
              <button
                onClick={() => setAppState('dashboard')}
                className="btn-secondary"
              >
                Back to Dashboard
              </button>
            </div>
            <MerchantGrid />
          </div>
        )

      case 'rewards':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Your Rewards</h2>
              <button
                onClick={() => setAppState('dashboard')}
                className="btn-secondary"
              >
                Back to Dashboard
              </button>
            </div>
            <RewardDashboard />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <AppShell>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-xl space-y-8">
          {renderContent()}
        </div>
      </div>
    </AppShell>
  )
}

