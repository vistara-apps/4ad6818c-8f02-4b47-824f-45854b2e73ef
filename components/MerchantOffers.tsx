'use client'

import { useState } from 'react'
import { SAMPLE_MERCHANTS, SAMPLE_OFFERS } from '../lib/constants'
import { Offer, Merchant } from '../lib/types'
import { cn, formatAmount } from '../lib/utils'
import { ShoppingBag, Gift, Star, ExternalLink } from 'lucide-react'

interface MerchantOffersProps {
  variant?: 'default' | 'compact'
  className?: string
}

export function MerchantOffers({ variant = 'default', className }: MerchantOffersProps) {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null)
  const [isPurchasing, setIsPurchasing] = useState(false)

  // Combine offers with merchant data
  const offersWithMerchants = SAMPLE_OFFERS.map(offer => ({
    ...offer,
    merchant: SAMPLE_MERCHANTS.find(m => m.merchantId === offer.merchantId)
  }))

  const handlePurchase = async (offer: Offer) => {
    setSelectedOffer(offer)
    setIsPurchasing(true)

    try {
      // Simulate purchase transaction
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Show success state
      alert(`Successfully purchased ${offer.description}! You earned ${offer.rewardPoints} reward points.`)
    } catch (error) {
      alert('Purchase failed. Please try again.')
    } finally {
      setIsPurchasing(false)
      setSelectedOffer(null)
    }
  }

  const getMerchantIcon = (category: string) => {
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
      <div className={cn("space-y-3 animate-slide-up", className)}>
        <h3 className="font-medium text-foreground flex items-center gap-2">
          <ShoppingBag size={16} className="text-accent" />
          Quick Spend
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {offersWithMerchants.slice(0, 4).map((offer) => (
            <button
              key={offer.offerId}
              onClick={() => handlePurchase(offer)}
              disabled={isPurchasing && selectedOffer?.offerId === offer.offerId}
              className="card p-3 text-left hover:scale-[1.02] transition-transform duration-200 disabled:opacity-50"
            >
              <div className="text-center space-y-2">
                <span className="text-2xl">{getMerchantIcon(offer.merchant?.category || '')}</span>
                <div>
                  <p className="text-xs font-medium text-foreground">{offer.merchant?.name}</p>
                  <p className="text-xs text-accent">{formatAmount(offer.ghoCost)} GHO</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={cn("space-y-4 animate-slide-up", className)}>
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-foreground flex items-center gap-2">
          <ShoppingBag size={16} className="text-accent" />
          Spend Your GHO
        </h3>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star size={12} className="text-warning" />
          Earn rewards
        </div>
      </div>

      <div className="space-y-3">
        {offersWithMerchants.map((offer) => (
          <div key={offer.offerId} className="card p-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">{getMerchantIcon(offer.merchant?.category || '')}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-medium text-foreground">{offer.merchant?.name}</h4>
                    <p className="text-sm text-muted-foreground">{offer.description}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-lg font-semibold text-accent">
                      {formatAmount(offer.ghoCost)} GHO
                    </p>
                    <p className="text-xs text-muted-foreground">
                      +{offer.rewardPoints} pts
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePurchase(offer)}
                disabled={isPurchasing && selectedOffer?.offerId === offer.offerId}
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPurchasing && selectedOffer?.offerId === offer.offerId ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Gift size={16} />
                    Buy Now
                  </div>
                )}
              </button>
              <button className="btn-secondary px-3">
                <ExternalLink size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Rewards Summary */}
      <div className="card p-4 bg-accent/10 border-accent/20">
        <div className="flex items-center gap-2 mb-2">
          <Star size={16} className="text-accent" />
          <h4 className="font-medium text-foreground">Reward Points</h4>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          Earn points with every purchase. Redeem for exclusive offers and discounts.
        </p>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Your Balance:</span>
          <span className="font-semibold text-accent">1,250 points</span>
        </div>
      </div>
    </div>
  )
}
