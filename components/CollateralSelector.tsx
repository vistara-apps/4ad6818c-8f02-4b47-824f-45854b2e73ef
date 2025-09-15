'use client'

import { CollateralOption } from '@/types'

interface CollateralSelectorProps {
  selectedCollateral: string | null
  onSelect: (symbol: string) => void
}

// Mock collateral options - in real app, these would come from API
const COLLATERAL_OPTIONS: CollateralOption[] = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    address: '0x4200000000000000000000000000000000000006',
    balance: 1.5,
    value: 3000,
    apy: 3.2,
  },
  {
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    address: '0x0555E30da8f98308EdB960aa94C0Db47230d2B9c',
    balance: 0.05,
    value: 2500,
    apy: 2.8,
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    balance: 1000,
    value: 1000,
    apy: 4.1,
  },
]

export function CollateralSelector({ selectedCollateral, onSelect }: CollateralSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Choose Your Collateral</h3>
        <p className="text-gray-600">Select assets to supply as collateral for borrowing GHO.</p>
      </div>

      <div className="space-y-3">
        {COLLATERAL_OPTIONS.map((option) => (
          <div
            key={option.symbol}
            onClick={() => onSelect(option.symbol)}
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedCollateral === option.symbol
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="font-semibold">{option.symbol.slice(0, 2)}</span>
                </div>
                <div>
                  <h4 className="font-semibold">{option.name}</h4>
                  <p className="text-sm text-gray-600">
                    Balance: {option.balance} {option.symbol} (${option.value.toLocaleString()})
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-accent">{option.apy}% APY</p>
                {selectedCollateral === option.symbol && (
                  <div className="w-4 h-4 bg-primary rounded-full mt-1" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCollateral && (
        <div className="bg-accent/10 border border-accent rounded-lg p-4">
          <p className="text-sm text-accent font-semibold">
            ✅ Selected: {COLLATERAL_OPTIONS.find(o => o.symbol === selectedCollateral)?.name}
          </p>
        </div>
      )}
    </div>
  )
}

