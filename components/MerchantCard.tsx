'use client'

import { Merchant } from '../lib/types'
import { cn } from '../lib/utils'
import { ExternalLink, Star } from 'lucide-react'

interface MerchantCardProps {
  merchant: Merchant
  variant?: 'default' | 'compact'
  className?: string
  onClick?: () => void
}

export function MerchantCard({ 
  merchant, 
  variant = 'default', 
  className,
  onClick 
}: MerchantCardProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'retail':
        return '🛍️'
      case 'food':
        return '☕'
      case 'entertainment':
        return '🎬'
      default:
        return '🏪'
    }
  }

  if (variant === 'compact') {
    return (
      <button
        onClick={onClick}
        className={cn(
          "card p-3 text-left hover:scale-[1.02] transition-transform duration-200",
          className
        )}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
            <span className="text-xl">{getCategoryIcon(merchant.category)}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-foreground truncate">{merchant.name}</h4>
            <p className="text-xs text-muted-foreground capitalize">{merchant.category}</p>
          </div>
          <ExternalLink size={14} className="text-muted-foreground" />
        </div>
      </button>
    )
  }

  return (
    <div className={cn("card p-4 space-y-3", className)}>
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
          <span className="text-2xl">{getCategoryIcon(merchant.category)}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-foreground">{merchant.name}</h4>
          <p className="text-sm text-muted-foreground capitalize">{merchant.category}</p>
          <div className="flex items-center gap-1 mt-1">
            <Star size={12} className="text-warning fill-current" />
            <Star size={12} className="text-warning fill-current" />
            <Star size={12} className="text-warning fill-current" />
            <Star size={12} className="text-warning fill-current" />
            <Star size={12} className="text-muted" />
            <span className="text-xs text-muted-foreground ml-1">4.2</span>
          </div>
        </div>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={onClick}
          className="btn-primary flex-1"
        >
          View Offers
        </button>
        <button className="btn-secondary px-3">
          <ExternalLink size={16} />
        </button>
      </div>
    </div>
  )
}
