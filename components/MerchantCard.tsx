'use client'

<<<<<<< HEAD
import { useState } from 'react'
import { Merchant, Offer } from '@/types'

interface MerchantCardProps {
  merchant: Merchant
  offers: Offer[]
}

export function MerchantCard({ merchant, offers }: MerchantCardProps) {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null)
  const [isPurchasing, setIsPurchasing] = useState(false)

  const handlePurchase = async (offer: Offer) => {
    setIsPurchasing(true)
    setSelectedOffer(offer)

    // Simulate purchase
    setTimeout(() => {
      setIsPurchasing(false)
      setSelectedOffer(null)
      alert(`✅ Purchase successful! Earned ${offer.rewardPoints} reward points.`)
    }, 2000)
  }

  return (
    <div className="card">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="font-semibold text-lg">
            {merchant.name.slice(0, 2).toUpperCase()}
          </span>
        </div>
        <div>
          <h4 className="font-semibold">{merchant.name}</h4>
          <p className="text-sm text-gray-600">{merchant.category}</p>
        </div>
      </div>

      <div className="space-y-3">
        {offers.map((offer) => (
          <div key={offer.offerId} className="border border-border rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">{offer.description}</p>
              <span className="text-accent font-semibold">
                {offer.ghoCost} GHO
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-600">
                Earn {offer.rewardPoints} points
              </p>
              <button
                onClick={() => handlePurchase(offer)}
                disabled={isPurchasing}
                className="btn-primary text-xs px-3 py-1"
              >
                {isPurchasing && selectedOffer?.offerId === offer.offerId
                  ? 'Processing...'
                  : 'Buy Now'
                }
              </button>
            </div>
          </div>
        ))}
=======
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
>>>>>>> origin/main
      </div>
    </div>
  )
}
<<<<<<< HEAD

=======
>>>>>>> origin/main
