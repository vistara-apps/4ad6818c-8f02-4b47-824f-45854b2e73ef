import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAddress(address: string): string {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function formatAmount(amount: string | number, decimals: number = 2): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  if (isNaN(num)) return '0'
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  })
}

export function calculateHealthFactor(
  collateralValue: number,
  borrowValue: number,
  liquidationThreshold: number
): number {
  if (borrowValue === 0) return Infinity
  return (collateralValue * liquidationThreshold) / borrowValue
}

export function getRiskLevel(healthFactor: number): 'low' | 'medium' | 'high' {
  if (healthFactor > 2) return 'low'
  if (healthFactor > 1.5) return 'medium'
  return 'high'
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
