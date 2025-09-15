'use client'

import { useState } from 'react'
import { TransactionSimulation } from '@/types'

interface TransactionSimulatorProps {
  collateral: string | null
  borrowAmount: number
  onAmountChange: (amount: number) => void
}

export function TransactionSimulator({ collateral, borrowAmount, onAmountChange }: TransactionSimulatorProps) {
  const [simulation, setSimulation] = useState<TransactionSimulation | null>(null)

  // Mock simulation - in real app, this would call an API
  const simulateTransaction = (amount: number) => {
    if (!collateral || amount <= 0) return

    // Mock calculation based on collateral type
    const baseHealthFactor = collateral === 'ETH' ? 2.1 : collateral === 'WBTC' ? 1.8 : 2.5
    const healthFactor = Math.max(1.0, baseHealthFactor - (amount / 1000))
    const liquidationPrice = collateral === 'ETH' ? 2500 - (amount * 10) : 40000 - (amount * 20)

    setSimulation({
      healthFactor,
      liquidationPrice: Math.max(0, liquidationPrice),
      estimatedGas: 0.002,
      estimatedTime: '~2 minutes',
    })
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseFloat(e.target.value) || 0
    onAmountChange(amount)
    simulateTransaction(amount)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Review Your Transaction</h3>
        <p className="text-gray-600">Simulate borrowing GHO against your {collateral} collateral.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            GHO Amount to Borrow
          </label>
          <input
            type="number"
            value={borrowAmount}
            onChange={handleAmountChange}
            placeholder="Enter amount"
            className="input"
            min="0"
            step="0.01"
          />
        </div>

        {simulation && (
          <div className="space-y-3">
            <div className="bg-surface border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-3">Transaction Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Health Factor:</span>
                  <span className={`font-semibold ${
                    simulation.healthFactor > 1.5 ? 'text-accent' :
                    simulation.healthFactor > 1.0 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {simulation.healthFactor.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Liquidation Price:</span>
                  <span>${simulation.liquidationPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Est. Gas Fee:</span>
                  <span>{simulation.estimatedGas} ETH</span>
                </div>
                <div className="flex justify-between">
                  <span>Est. Time:</span>
                  <span>{simulation.estimatedTime}</span>
                </div>
              </div>
            </div>

            {simulation.healthFactor < 1.5 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-600">⚠️</span>
                  <p className="text-sm text-yellow-800">
                    Your health factor is getting low. Consider borrowing less GHO or adding more collateral.
                  </p>
                </div>
              </div>
            )}

            {simulation.healthFactor < 1.0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <span className="text-red-600">🚨</span>
                  <p className="text-sm text-red-800">
                    Danger! Your position would be liquidated. Reduce the borrow amount.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

