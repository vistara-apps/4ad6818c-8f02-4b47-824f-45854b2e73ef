# GHO Navigator

A guided bot for new users to safely supply and borrow GHO on Aave, with integrated spending and rewards.

## Features

- **Guided DeFi Setup Bot**: Step-by-step interactive bot that guides users through connecting their wallet, selecting collateral, and executing supply/borrow transactions on Aave for GHO
- **Automated Risk Mitigation**: Proactive liquidation alerts and in-app safety checks to inform users about potential risks
- **GHO Spending & Rewards**: Integrated platform to spend GHO with partnered merchants and earn rewards
- **Seamless Fiat Off-Ramps**: Convert GHO to fiat currency or popular gift cards

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (Ethereum L2)
- **Wallet Integration**: MiniKit + OnchainKit
- **Styling**: Tailwind CSS with custom design system
- **TypeScript**: Full type safety throughout

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.local.example .env.local
   ```
   Add your OnchainKit API key from [Coinbase Developer Platform](https://portal.cdp.coinbase.com/products/onchainkit)

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Architecture

### Core Components

- **AppShell**: Main application container with responsive layout
- **AgentChat**: Interactive chat interface with guided DeFi onboarding
- **WalletConnector**: Wallet connection and management
- **CollateralSelector**: Choose and configure collateral options
- **TransactionStepper**: Step-by-step transaction execution
- **MerchantOffers**: GHO spending and rewards platform

### Data Models

- **User**: Wallet address, onboarding status, rewards balance
- **Transaction**: Supply, borrow, repay, withdraw, and spend operations
- **Merchant**: Partner merchants for GHO spending
- **Offer**: Available products and services for GHO

### User Flows

1. **DeFi Onboarding**: Wallet connection → Collateral selection → Transaction simulation → Execution
2. **GHO Spending**: Browse merchants → Select offers → Pay with GHO → Earn rewards

## Design System

- **Colors**: Dark theme with accent colors for DeFi branding
- **Typography**: Clean, readable fonts with proper hierarchy
- **Components**: Modular, reusable UI components
- **Animations**: Smooth transitions and micro-interactions
- **Mobile-first**: Optimized for mobile devices and Base App

## Deployment

This app is designed to run as a Base Mini App within the Base App ecosystem.

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform** (Vercel, Netlify, etc.)

3. **Configure your Mini App manifest** for Base App integration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
