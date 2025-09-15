'use client'

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
      </div>
    </div>
  )
}

