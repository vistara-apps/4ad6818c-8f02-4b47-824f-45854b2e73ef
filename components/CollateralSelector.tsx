'use client'

import { useState } from 'react'
import { COLLATERAL_OPTIONS } from '../lib/constants'
import { CollateralOption } from '../lib/types'
import { cn, formatAmount } from '../lib/utils'
import { TrendingUp, Shield, Zap } from 'lucide-react'

interface CollateralSelectorProps {
  onSelect?: (collateral: CollateralOption) => void
  variant?: 'grid' | 'list'
  className?: string
}

export function CollateralSelector({ 
  onSelect, 
  variant = 'grid',
  className 
}: CollateralSelectorProps) {
  const [selectedOption, setSelectedOption] = useState<CollateralOption | null>(null)

  const handleSelect = (option: CollateralOption) => {
    setSelectedOption(option)
    onSelect?.(option)
  }

  const getAssetIcon = (symbol: string) => {
    switch (symbol) {
      case 'ETH':
        return '🔷'
      case 'WBTC':
        return '₿'
      case 'USDC':
        return '💵'
      default:
        return '🪙'
    }
  }

  const getRiskColor = (ltv: string) => {
    const ltvNum = parseFloat(ltv)
    if (ltvNum >= 80) return 'text-warning'
    if (ltvNum >= 70) return 'text-accent'
    return 'text-success'
  }

  if (variant === 'list') {
    return (
      <div className={cn("space-y-3 animate-slide-up", className)}>
        <h3 className="font-medium text-foreground mb-3">Choose Collateral</h3>
        {COLLATERAL_OPTIONS.map((option) => (
          <button
            key={option.symbol}
            onClick={() => handleSelect(option)}
            className={cn(
              "card p-4 w-full text-left transition-all duration-200 hover:scale-[1.02]",
              selectedOption?.symbol === option.symbol && "glow-border"
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getAssetIcon(option.symbol)}</span>
                <div>
                  <h4 className="font-medium text-foreground">{option.symbol}</h4>
                  <p className="text-sm text-muted-foreground">{option.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-accent">{option.apy}</p>
                <p className="text-xs text-muted-foreground">APY</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className={cn("space-y-4 animate-slide-up", className)}>
      <h3 className="font-medium text-foreground">Choose Your Collateral</h3>
      
      <div className="grid gap-3">
        {COLLATERAL_OPTIONS.map((option) => (
          <button
            key={option.symbol}
            onClick={() => handleSelect(option)}
            className={cn(
              "card p-4 text-left transition-all duration-200 hover:scale-[1.02]",
              selectedOption?.symbol === option.symbol && "glow-border"
            )}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getAssetIcon(option.symbol)}</span>
                <div>
                  <h4 className="font-medium text-foreground">{option.symbol}</h4>
                  <p className="text-xs text-muted-foreground">{option.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-accent">{option.apy}</p>
                <p className="text-xs text-muted-foreground">APY</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-1">
                <TrendingUp size={12} className="text-accent" />
                <span className="text-muted-foreground">LTV:</span>
                <span className={cn("font-medium", getRiskColor(option.ltv || '0%'))}>
                  {option.ltv}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Shield size={12} className="text-primary" />
                <span className="text-muted-foreground">Threshold:</span>
                <span className="font-medium text-foreground">
                  {option.liquidationThreshold}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedOption && (
        <div className="card p-4 bg-accent/10 border-accent/20">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={16} className="text-accent" />
            <h4 className="font-medium text-foreground">Selected: {selectedOption.symbol}</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            You can borrow up to {selectedOption.ltv} of your collateral value in GHO.
            Liquidation occurs at {selectedOption.liquidationThreshold} threshold.
          </p>
        </div>
      )}
    </div>
  )
}
