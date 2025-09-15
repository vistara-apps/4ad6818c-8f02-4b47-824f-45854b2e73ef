'use client'

import { useState } from 'react'
import { Merchant, Offer } from '@/types'
import { MerchantCard } from './MerchantCard'

// Mock data - in real app, this would come from API
const MERCHANTS: Merchant[] = [
  {
    merchantId: '1',
    name: 'Coffee Shop',
    category: 'Food & Beverage',
    logoUrl: '/coffee-logo.png',
    paymentAddress: '0x123...',
  },
  {
    merchantId: '2',
    name: 'Book Store',
    category: 'Retail',
    logoUrl: '/book-logo.png',
    paymentAddress: '0x456...',
  },
  {
    merchantId: '3',
    name: 'Tech Gadgets',
    category: 'Electronics',
    logoUrl: '/tech-logo.png',
    paymentAddress: '0x789...',
  },
]

const OFFERS: Offer[] = [
  {
    offerId: '1',
    merchantId: '1',
    description: 'Premium Coffee - 20% off with GHO',
    ghoCost: 5,
    rewardPoints: 50,
  },
  {
    offerId: '2',
    merchantId: '2',
    description: 'Bestseller Book - $10 off',
    ghoCost: 15,
    rewardPoints: 150,
  },
  {
    offerId: '3',
    merchantId: '3',
    description: 'Wireless Headphones - Free shipping',
    ghoCost: 100,
    rewardPoints: 1000,
  },
]

export function MerchantGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = ['all', ...Array.from(new Set(MERCHANTS.map(m => m.category)))]

  const filteredMerchants = selectedCategory === 'all'
    ? MERCHANTS
    : MERCHANTS.filter(m => m.category === selectedCategory)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Spend GHO with Partners</h3>
        <p className="text-gray-600">Earn rewards while spending your GHO at partnered merchants.</p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category === 'all' ? 'All Categories' : category}
          </button>
        ))}
      </div>

      {/* Merchant grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMerchants.map((merchant) => {
          const merchantOffers = OFFERS.filter(offer => offer.merchantId === merchant.merchantId)
          return (
            <MerchantCard
              key={merchant.merchantId}
              merchant={merchant}
              offers={merchantOffers}
            />
          )
        })}
      </div>

      {filteredMerchants.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No merchants found in this category.</p>
        </div>
      )}
    </div>
  )
}

