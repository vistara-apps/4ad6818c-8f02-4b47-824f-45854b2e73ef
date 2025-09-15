// User entity
export interface User {
  userId: string
  walletAddress: string
  onboardingStatus: 'not_started' | 'in_progress' | 'completed'
  sessionData: Record<string, any>
  referralCode?: string
  rewardsBalance: number
}

// Transaction entity
export interface Transaction {
  transactionId: string
  userId: string
  type: 'supply' | 'borrow' | 'repay' | 'withdraw' | 'spend' | 'reward'
  amount: number
  status: 'pending' | 'completed' | 'failed'
  timestamp: Date
  gasUsed?: number
  gasPrice?: number
}

// Merchant entity
export interface Merchant {
  merchantId: string
  name: string
  category: string
  logoUrl: string
  paymentAddress: string
}

// Offer entity
export interface Offer {
  offerId: string
  merchantId: string
  description: string
  ghoCost: number
  rewardPoints: number
}

// Onboarding step
export interface OnboardingStep {
  id: string
  title: string
  description: string
  completed: boolean
}

// Collateral option
export interface CollateralOption {
  symbol: string
  name: string
  address: string
  balance: number
  value: number
  apy: number
}

// Transaction simulation result
export interface TransactionSimulation {
  healthFactor: number
  liquidationPrice: number
  estimatedGas: number
  estimatedTime: string
}

// Risk alert
export interface RiskAlert {
  id: string
  type: 'liquidation' | 'high_risk' | 'market_volatility'
  message: string
  severity: 'low' | 'medium' | 'high'
  timestamp: Date
}

// Chat message
export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

// Wallet connection state
export interface WalletState {
  isConnected: boolean
  address?: string
  chainId?: number
  balance?: number
}

