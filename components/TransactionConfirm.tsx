'use client'

import { useState } from 'react'

interface TransactionConfirmProps {
  collateral: string | null
  borrowAmount: number
}

export function TransactionConfirm({ collateral, borrowAmount }: TransactionConfirmProps) {
  const [isConfirming, setIsConfirming] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handleConfirm = async () => {
    setIsConfirming(true)

    // Simulate transaction execution
    setTimeout(() => {
      setIsConfirming(false)
      setIsComplete(true)
    }, 3000)
  }

  if (isComplete) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto">
          <span className="text-2xl">✅</span>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Transaction Complete!</h3>
          <p className="text-gray-600">
            Successfully supplied {collateral} collateral and borrowed {borrowAmount} GHO.
          </p>
        </div>
        <div className="bg-accent/10 border border-accent rounded-lg p-4">
          <p className="text-sm text-accent">
            🎉 Welcome to DeFi! Your GHO is ready to use. Check your dashboard for spending opportunities.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Confirm Transaction</h3>
        <p className="text-gray-600">Review and execute your supply & borrow transaction.</p>
      </div>

      <div className="bg-surface border border-border rounded-lg p-4 space-y-3">
        <h4 className="font-semibold">Transaction Details</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Supply Collateral:</span>
            <span>{collateral}</span>
          </div>
          <div className="flex justify-between">
            <span>Borrow GHO:</span>
            <span>{borrowAmount} GHO</span>
          </div>
          <div className="flex justify-between">
            <span>Est. Gas Fee:</span>
            <span>~0.002 ETH</span>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <span className="text-yellow-600 mt-0.5">ℹ️</span>
          <div className="text-sm">
            <p className="text-yellow-800 font-semibold">Important Reminders:</p>
            <ul className="text-yellow-700 mt-1 space-y-1">
              <li>• Monitor your health factor regularly</li>
              <li>• Add more collateral if health factor drops below 1.5</li>
              <li>• Market volatility can affect your position</li>
            </ul>
          </div>
        </div>
      </div>

      <button
        onClick={handleConfirm}
        disabled={isConfirming}
        className="btn-primary w-full text-lg py-4"
      >
        {isConfirming ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Executing Transaction...</span>
          </div>
        ) : (
          'Confirm & Execute Transaction'
        )}
      </button>
    </div>
  )
}

