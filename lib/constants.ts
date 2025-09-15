export const COLLATERAL_OPTIONS = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    apy: '3.2%',
    ltv: '80%',
    liquidationThreshold: '82.5%'
  },
  {
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    decimals: 8,
    apy: '2.8%',
    ltv: '75%',
    liquidationThreshold: '80%'
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0xA0b86a33E6441b8435b662303c0f479c7e1d5b1e',
    decimals: 6,
    apy: '4.1%',
    ltv: '85%',
    liquidationThreshold: '87%'
  }
]

export const SAMPLE_MERCHANTS = [
  {
    merchantId: '1',
    name: 'Amazon Gift Cards',
    category: 'retail',
    logoUrl: '/merchants/amazon.png',
    paymentAddress: '0x...'
  },
  {
    merchantId: '2',
    name: 'Starbucks',
    category: 'food',
    logoUrl: '/merchants/starbucks.png',
    paymentAddress: '0x...'
  },
  {
    merchantId: '3',
    name: 'Netflix',
    category: 'entertainment',
    logoUrl: '/merchants/netflix.png',
    paymentAddress: '0x...'
  }
]

export const SAMPLE_OFFERS = [
  {
    offerId: '1',
    merchantId: '1',
    description: '$25 Amazon Gift Card',
    ghoCost: '25.00',
    rewardPoints: 50
  },
  {
    offerId: '2',
    merchantId: '2',
    description: '$10 Starbucks Card',
    ghoCost: '10.00',
    rewardPoints: 25
  },
  {
    offerId: '3',
    merchantId: '3',
    description: '1 Month Netflix',
    ghoCost: '15.99',
    rewardPoints: 35
  }
]

export const AGENT_RESPONSES = {
  welcome: "👋 Welcome to GHO Navigator! I'm your DeFi guide. I'll help you safely supply collateral and borrow GHO on Aave. Ready to start your DeFi journey?",
  wallet_connect: "First, let's connect your wallet. This will allow us to check your balances and execute transactions securely.",
  collateral_select: "Great! Now let's choose what collateral you'd like to supply. Each option has different APY rates and risk levels.",
  amount_input: "How much would you like to supply as collateral? I'll show you how much GHO you can safely borrow.",
  transaction_review: "Let me prepare your transaction. I'll bundle the supply and borrow operations for gas efficiency.",
  risk_warning: "⚠️ Risk Alert: Your health factor is getting low. Consider adding more collateral or repaying some debt to avoid liquidation.",
  success: "🎉 Success! Your transaction is complete. You've successfully entered the GHO ecosystem!",
  spending_intro: "Now that you have GHO, you can spend it with our partner merchants or convert it to gift cards. Check out these offers!"
}
