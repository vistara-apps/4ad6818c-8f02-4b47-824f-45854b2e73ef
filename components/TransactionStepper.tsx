'use client'

<<<<<<< HEAD
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
=======
import { useState, useEffect } from 'react'
import { CollateralOption } from '../lib/types'
import { cn, formatAmount, calculateHealthFactor, getRiskLevel } from '../lib/utils'
import { CheckCircle, Clock, AlertTriangle, DollarSign, TrendingUp } from 'lucide-react'

interface TransactionStepperProps {
  collateral?: CollateralOption
  supplyAmount?: string
  borrowAmount?: string
  onComplete?: () => void
  variant?: 'active' | 'completed' | 'disabled'
  className?: string
}

interface Step {
  id: string
  title: string
  description: string
  status: 'pending' | 'active' | 'completed' | 'failed'
}

export function TransactionStepper({
  collateral,
  supplyAmount = '1.0',
  borrowAmount = '1500',
  onComplete,
  variant = 'active',
  className
}: TransactionStepperProps) {
  const [steps, setSteps] = useState<Step[]>([
    {
      id: 'approve',
      title: 'Approve Collateral',
      description: 'Allow Aave to use your collateral',
      status: 'pending'
    },
    {
      id: 'supply',
      title: 'Supply Collateral',
      description: 'Deposit collateral to Aave',
      status: 'pending'
    },
    {
      id: 'borrow',
      title: 'Borrow GHO',
      description: 'Borrow GHO against your collateral',
      status: 'pending'
    }
  ])

  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)

  // Calculate health factor and risk
  const collateralValue = parseFloat(supplyAmount) * 2000 // Mock ETH price
  const borrowValue = parseFloat(borrowAmount)
  const healthFactor = calculateHealthFactor(collateralValue, borrowValue, 0.825)
  const riskLevel = getRiskLevel(healthFactor)

  const executeTransaction = async () => {
    setIsProcessing(true)

    for (let i = 0; i < steps.length; i++) {
      // Update current step to active
      setSteps(prev => prev.map((step, index) => ({
        ...step,
        status: index === i ? 'active' : index < i ? 'completed' : 'pending'
      })))
      setCurrentStepIndex(i)

      // Simulate transaction time
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Complete current step
      setSteps(prev => prev.map((step, index) => ({
        ...step,
        status: index <= i ? 'completed' : 'pending'
      })))
    }

    setIsProcessing(false)
    onComplete?.()
  }

  const getStepIcon = (step: Step) => {
    switch (step.status) {
      case 'completed':
        return <CheckCircle size={20} className="text-success" />
      case 'active':
        return <Clock size={20} className="text-primary animate-pulse" />
      case 'failed':
        return <AlertTriangle size={20} className="text-destructive" />
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-muted" />
    }
  }

  const getRiskBadge = () => {
    const colors = {
      low: 'bg-success/20 text-success border-success/30',
      medium: 'bg-warning/20 text-warning border-warning/30',
      high: 'bg-destructive/20 text-destructive border-destructive/30'
    }

    return (
      <div className={cn("px-2 py-1 rounded-full text-xs font-medium border", colors[riskLevel])}>
        {riskLevel.toUpperCase()} RISK
      </div>
    )
  }

  return (
    <div className={cn("space-y-4 animate-slide-up", className)}>
      {/* Transaction Summary */}
      <div className="card p-4 space-y-3">
        <h3 className="font-medium text-foreground flex items-center gap-2">
          <DollarSign size={16} className="text-accent" />
          Transaction Summary
        </h3>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Supply:</span>
            <span className="font-medium text-foreground">
              {formatAmount(supplyAmount)} {collateral?.symbol || 'ETH'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Borrow:</span>
            <span className="font-medium text-foreground">
              {formatAmount(borrowAmount)} GHO
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Health Factor:</span>
            <span className="font-medium text-foreground">
              {healthFactor === Infinity ? '∞' : formatAmount(healthFactor, 2)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Risk Level:</span>
            {getRiskBadge()}
          </div>
        </div>

        {riskLevel === 'high' && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle size={16} className="text-destructive" />
              <span className="text-sm font-medium text-destructive">High Risk Warning</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Your health factor is low. Consider reducing borrow amount or adding more collateral.
            </p>
          </div>
        )}
      </div>

      {/* Transaction Steps */}
      <div className="card p-4 space-y-4">
        <h3 className="font-medium text-foreground">Transaction Steps</h3>
        
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {getStepIcon(step)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className={cn(
                  "text-sm font-medium",
                  step.status === 'completed' ? 'text-success' :
                  step.status === 'active' ? 'text-primary' :
                  step.status === 'failed' ? 'text-destructive' :
                  'text-muted-foreground'
                )}>
                  {step.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {step.description}
                </p>
              </div>
              {step.status === 'active' && (
                <div className="flex-shrink-0">
                  <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                </div>
              )}
            </div>
          ))}
        </div>

        {!isProcessing && steps.every(step => step.status === 'pending') && (
          <button
            onClick={executeTransaction}
            className="btn-primary w-full"
          >
            Execute Transaction
          </button>
        )}

        {isProcessing && (
          <div className="text-center py-2">
            <p className="text-sm text-muted-foreground">
              Processing step {currentStepIndex + 1} of {steps.length}...
            </p>
          </div>
        )}
      </div>

      {/* Estimated Costs */}
      <div className="card p-4 space-y-2">
        <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
          <TrendingUp size={14} className="text-accent" />
          Estimated Costs
        </h4>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Gas Fee:</span>
            <span className="text-foreground">~$12.50</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Protocol Fee:</span>
            <span className="text-foreground">0.1%</span>
          </div>
        </div>
>>>>>>> origin/main
      </div>
    </div>
  )
}
<<<<<<< HEAD

=======
>>>>>>> origin/main
