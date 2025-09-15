'use client'

import { useState } from 'react'
import { useMiniKit } from '@coinbase/minikit'
import { Wallet, CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '../lib/utils'

interface WalletConnectorProps {
  onConnected?: (address: string) => void
  variant?: 'connect' | 'connected' | 'error'
  className?: string
}

export function WalletConnector({ 
  onConnected, 
  variant = 'connect',
  className 
}: WalletConnectorProps) {
  const { context } = useMiniKit()
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null)

  const handleConnect = async () => {
    setIsConnecting(true)
    setError(null)

    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock address for demo
      const mockAddress = '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6'
      setConnectedAddress(mockAddress)
      onConnected?.(mockAddress)
    } catch (err) {
      setError('Failed to connect wallet. Please try again.')
    } finally {
      setIsConnecting(false)
    }
  }

  if (connectedAddress || variant === 'connected') {
    return (
      <div className={cn("card p-4 space-y-3 animate-slide-up", className)}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
            <CheckCircle size={20} className="text-success" />
          </div>
          <div>
            <h3 className="font-medium text-foreground">Wallet Connected</h3>
            <p className="text-sm text-muted-foreground">
              {connectedAddress?.slice(0, 6)}...{connectedAddress?.slice(-4)}
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (error || variant === 'error') {
    return (
      <div className={cn("card p-4 space-y-3 animate-slide-up", className)}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
            <AlertCircle size={20} className="text-destructive" />
          </div>
          <div>
            <h3 className="font-medium text-foreground">Connection Failed</h3>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </div>
        <button onClick={handleConnect} className="btn-primary w-full">
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className={cn("card p-4 space-y-4 animate-slide-up", className)}>
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
          <Wallet size={24} className="text-primary" />
        </div>
        <h3 className="font-medium text-foreground">Connect Your Wallet</h3>
        <p className="text-sm text-muted-foreground">
          Connect your wallet to start your DeFi journey with GHO
        </p>
      </div>
      
      <button
        onClick={handleConnect}
        disabled={isConnecting}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isConnecting ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Connecting...
          </div>
        ) : (
          'Connect Wallet'
        )}
      </button>
    </div>
  )
}
