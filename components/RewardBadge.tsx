'use client'

import { cn } from '../lib/utils'
import { Star, Trophy, Award } from 'lucide-react'

interface RewardBadgeProps {
  points: number
  variant?: 'bronze' | 'silver' | 'gold'
  className?: string
}

export function RewardBadge({ points, variant = 'bronze', className }: RewardBadgeProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'gold':
        return {
          bg: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
          text: 'text-yellow-900',
          icon: Trophy,
          border: 'border-yellow-400/30'
        }
      case 'silver':
        return {
          bg: 'bg-gradient-to-r from-gray-300 to-gray-500',
          text: 'text-gray-900',
          icon: Award,
          border: 'border-gray-400/30'
        }
      default:
        return {
          bg: 'bg-gradient-to-r from-orange-400 to-orange-600',
          text: 'text-orange-900',
          icon: Star,
          border: 'border-orange-400/30'
        }
    }
  }

  const { bg, text, icon: Icon, border } = getVariantStyles()

  return (
    <div className={cn(
      "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border",
      bg, text, border,
      className
    )}>
      <Icon size={14} />
      <span className="text-sm font-medium">
        {points.toLocaleString()} pts
      </span>
    </div>
  )
}
