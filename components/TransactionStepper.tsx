'use client'

import { useState } from 'react'
import { CollateralSelector } from './CollateralSelector'
import { TransactionSimulator } from './TransactionSimulator'
import { TransactionConfirm } from './TransactionConfirm'

interface TransactionStepperProps {
  currentStep: number
  onStepChange: (step: number) => void
  onComplete: () => void
}

const STEPS = [
  { id: 'connect', title: 'Connect Wallet', description: 'Link your wallet to get started' },
  { id: 'select', title: 'Choose Collateral', description: 'Pick assets to supply' },
  { id: 'simulate', title: 'Review Transaction', description: 'Check risks and rewards' },
  { id: 'confirm', title: 'Execute Transaction', description: 'Supply collateral and borrow GHO' },
]

export function TransactionStepper({ currentStep, onStepChange, onComplete }: TransactionStepperProps) {
  const [selectedCollateral, setSelectedCollateral] = useState<string | null>(null)
  const [borrowAmount, setBorrowAmount] = useState<number>(0)

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      onStepChange(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      onStepChange(currentStep - 1)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl">🔗</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Connect Your Wallet</h3>
              <p className="text-gray-600">Securely connect your wallet to start your DeFi journey.</p>
            </div>
          </div>
        )

      case 1:
        return (
          <CollateralSelector
            selectedCollateral={selectedCollateral}
            onSelect={setSelectedCollateral}
          />
        )

      case 2:
        return (
          <TransactionSimulator
            collateral={selectedCollateral}
            borrowAmount={borrowAmount}
            onAmountChange={setBorrowAmount}
          />
        )

      case 3:
        return (
          <TransactionConfirm
            collateral={selectedCollateral}
            borrowAmount={borrowAmount}
          />
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="flex items-center justify-between">
        {STEPS.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                index <= currentStep
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {index + 1}
            </div>
            {index < STEPS.length - 1 && (
              <div
                className={`w-12 h-1 mx-2 ${
                  index < currentStep ? 'bg-primary' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="card">
        {renderStepContent()}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className="btn-secondary disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="btn-primary"
        >
          {currentStep === STEPS.length - 1 ? 'Complete Setup' : 'Next'}
        </button>
      </div>
    </div>
  )
}

