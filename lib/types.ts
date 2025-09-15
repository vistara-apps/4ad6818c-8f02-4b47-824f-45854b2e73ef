export interface User {
  userId: string
  walletAddress?: string
  onboardingStatus: 'not_started' | 'wallet_connected' | 'collateral_selected' | 'completed'
  sessionData?: Record<string, any>
  referralCode?: string
  rewardsBalance: number
}

export interface Transaction {
  transactionId: string
  userId: string
  type: 'supply' | 'borrow' | 'repay' | 'withdraw' | 'spend'
  amount: string
  status: 'pending' | 'confirmed' | 'failed'
  timestamp: number
  gasUsed?: string
  gasPrice?: string
  hash?: string
}

export interface Merchant {
  merchantId: string
  name: string
  category: string
  logoUrl: string
  paymentAddress: string
}

export interface Offer {
  offerId: string
  merchantId: string
  description: string
  ghoCost: string
  rewardPoints: number
  merchant?: Merchant
}

export interface CollateralOption {
  symbol: string
  name: string
  address: string
  decimals: number
  balance?: string
  apy?: string
  ltv?: string
  liquidationThreshold?: string
}

export interface ChatMessage {
  id: string
  type: 'user' | 'agent' | 'system'
  content: string
  timestamp: number
  metadata?: {
    action?: string
    data?: any
  }
}

export interface AgentState {
  step: 'welcome' | 'wallet_connect' | 'collateral_select' | 'amount_input' | 'transaction_review' | 'transaction_pending' | 'completed' | 'spending' | 'rewards'
  selectedCollateral?: CollateralOption
  supplyAmount?: string
  borrowAmount?: string
  estimatedGas?: string
  riskLevel?: 'low' | 'medium' | 'high'
}
