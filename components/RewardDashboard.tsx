'use client'

import { useState } from 'react'

// Mock reward data - in real app, this would come from API
const REWARDS_DATA = {
  balance: 250,
  tier: 'Silver',
  nextTier: 'Gold',
  pointsToNext: 750,
  recentTransactions: [
    { id: '1', description: 'Coffee purchase', points: 50, date: '2024-01-15' },
    { id: '2', description: 'Book purchase', points: 150, date: '2024-01-14' },
    { id: '3', description: 'Tech gadget purchase', points: 1000, date: '2024-01-10' },
  ],
}

const REDEEM_OPTIONS = [
  { id: '1', name: 'Amazon Gift Card', cost: 500, value: 50 },
  { id: '2', name: 'Netflix Subscription', cost: 1000, value: 15.99 },
  { id: '3', name: 'Spotify Premium Month', cost: 300, value: 9.99 },
]

export function RewardDashboard() {
  const [selectedRedemption, setSelectedRedemption] = useState<string | null>(null)

  const handleRedeem = (optionId: string) => {
    const option = REDEEM_OPTIONS.find(o => o.id === optionId)
    if (!option || REWARDS_DATA.balance < option.cost) return

    alert(`✅ Successfully redeemed ${option.name}!`)
    // In real app, this would update the balance
  }

  const progressPercentage = (REWARDS_DATA.balance / (REWARDS_DATA.balance + REWARDS_DATA.pointsToNext)) * 100

  return (
    <div className="space-y-6">
      {/* Current balance and tier */}
      <div className="card">
        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold mb-2">Your Rewards</h3>
          <div className="text-3xl font-bold text-primary mb-1">
            {REWARDS_DATA.balance} Points
          </div>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
            {REWARDS_DATA.tier} Tier
          </div>
        </div>

        {/* Progress to next tier */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress to {REWARDS_DATA.nextTier}</span>
            <span>{REWARDS_DATA.pointsToNext} points needed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Recent transactions */}
      <div className="card">
        <h4 className="font-semibold mb-4">Recent Activity</h4>
        <div className="space-y-3">
          {REWARDS_DATA.recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
              <div>
                <p className="font-medium text-sm">{transaction.description}</p>
                <p className="text-xs text-gray-600">{transaction.date}</p>
              </div>
              <div className="text-accent font-semibold">
                +{transaction.points}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Redemption options */}
      <div className="card">
        <h4 className="font-semibold mb-4">Redeem Points</h4>
        <div className="space-y-3">
          {REDEEM_OPTIONS.map((option) => (
            <div key={option.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <p className="font-medium">{option.name}</p>
                <p className="text-sm text-gray-600">Value: ${option.value}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">{option.cost} points</p>
                <button
                  onClick={() => handleRedeem(option.id)}
                  disabled={REWARDS_DATA.balance < option.cost}
                  className={`text-xs px-3 py-1 rounded ${
                    REWARDS_DATA.balance >= option.cost
                      ? 'btn-primary'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Redeem
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

