# GHO Navigator

<<<<<<< HEAD
Unlock DeFi with GHO, simplified.

=======
>>>>>>> origin/main
A guided bot for new users to safely supply and borrow GHO on Aave, with integrated spending and rewards.

## Features

<<<<<<< HEAD
### 🏦 Guided DeFi Setup Bot
- Step-by-step interactive bot that guides users through wallet connection, collateral selection, and transaction execution
- Risk assessment and safety checks
- Transaction simulation before execution

### ⚠️ Automated Risk Mitigation
- Proactive liquidation alerts
- Real-time health factor monitoring
- Market volatility notifications

### 🛒 GHO Spending & Rewards
- Integrated platform to spend GHO with partnered merchants
- Convert GHO to gift cards
- Earn GHO-based rewards and loyalty points

### 💱 Seamless Fiat Off-Ramps
- Convert GHO to fiat currency
- Popular gift card options
- Optimized swap routing

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Blockchain**: Base Network
- **Wallet**: Farcaster Frame SDK with Wagmi
- **DeFi Protocol**: Aave V3
- **Stablecoin**: GHO

## Getting Started

1. **Install dependencies:**
=======
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
>>>>>>> origin/main
   ```bash
   npm install
   ```

<<<<<<< HEAD
2. **Set up environment variables:**
   Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_BASE_RPC_URL=https://developer-api.base.org
   PRIVATE_KEY=your_private_key_for_backend_operations
   ```

3. **Run the development server:**
=======
2. **Set up environment variables**:
   ```bash
   cp .env.local.example .env.local
   ```
   Add your OnchainKit API key from [Coinbase Developer Platform](https://portal.cdp.coinbase.com/products/onchainkit)

3. **Run the development server**:
>>>>>>> origin/main
   ```bash
   npm run dev
   ```

<<<<<<< HEAD
4. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── aave/         # Aave protocol interactions
│   │   ├── merchants/    # Merchant and spending APIs
│   │   ├── rewards/      # Rewards system APIs
│   │   └── risk/         # Risk monitoring APIs
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── providers.tsx     # Context providers
├── components/           # React components
│   ├── AgentChat.tsx    # AI assistant chat
│   ├── AppShell.tsx     # App layout wrapper
│   ├── CollateralSelector.tsx
│   ├── GhoNavigator.tsx # Main app component
│   ├── MerchantCard.tsx
│   ├── MerchantGrid.tsx
│   ├── RewardDashboard.tsx
│   ├── RiskAlerts.tsx
│   ├── TransactionConfirm.tsx
│   ├── TransactionSimulator.tsx
│   ├── TransactionStepper.tsx
│   └── WalletConnector.tsx
├── lib/                 # Utility libraries
│   └── blockchain.ts    # Blockchain interaction helpers
├── types/               # TypeScript type definitions
│   └── index.ts
└── utils/               # Utility functions
```

## API Documentation

### Aave Integration
- `POST /api/aave` - Execute supply/borrow transactions
- `GET /api/aave?action=userPosition&userAddress=...` - Get user position data

### Merchants
- `GET /api/merchants?category=...` - Get merchants by category
- `POST /api/merchants` - Process GHO payments to merchants

### Rewards
- `GET /api/rewards?userAddress=...` - Get user rewards data
- `POST /api/rewards` - Add/redeem reward points

### Risk Monitoring
- `GET /api/risk?userAddress=...` - Get risk alerts and health factor
- `POST /api/risk` - Dismiss risk alerts

## Design System

### Colors
- Primary: `hsl(210, 70%, 50%)` - Blue
- Accent: `hsl(130, 60%, 45%)` - Green
- Background: `hsl(210, 30%, 98%)` - Light blue
- Surface: `hsl(0, 0%, 100%)` - White
- Text: `hsl(210, 20%, 15%)` - Dark blue
- Border: `hsl(210, 20%, 90%)` - Light gray

### Typography
- Display: `text-3xl font-bold`
- Heading: `text-xl font-semibold`
- Body: `text-base leading-7`
- Caption: `text-sm text-gray-600`

### Components
- AppShell: Main layout wrapper
- AgentChat: AI assistant interface
- WalletConnector: Wallet connection component
- TransactionStepper: Multi-step transaction flow
- MerchantCard: Individual merchant offer display
- RewardDashboard: User rewards interface
- RiskAlerts: Risk monitoring display

## Business Model

### Micro-transactions
- **Free tier**: Basic guided setup and alerts
- **Premium tier**: $5/month for advanced analytics, simulation mode, and priority support
- **Transaction fees**: On GHO spending/swaps

### Revenue Streams
1. **Subscription revenue** from premium features
2. **Transaction fees** on merchant payments and conversions
3. **Affiliate commissions** from partnered merchants
4. **Premium features** for advanced users

## Deployment

### Environment Setup
1. Deploy to Vercel or similar platform
2. Configure Base network RPC endpoints
3. Set up wallet connections for backend operations
4. Configure Farcaster Frame metadata

### Production Checklist
- [ ] Environment variables configured
- [ ] Database connections established
- [ ] Wallet private keys secured
- [ ] API rate limits configured
- [ ] Error monitoring set up
- [ ] SSL certificates configured
- [ ] Farcaster Frame validation completed
=======
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
>>>>>>> origin/main

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

<<<<<<< HEAD
This project is licensed under the MIT License.

## Disclaimer

This application is for educational and demonstration purposes. Always do your own research and understand the risks involved in DeFi transactions. The developers are not responsible for any financial losses incurred through the use of this application.

=======
MIT License - see LICENSE file for details
>>>>>>> origin/main
