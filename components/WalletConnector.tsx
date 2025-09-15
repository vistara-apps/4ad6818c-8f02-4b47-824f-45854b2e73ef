'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'

interface WalletConnectorProps {
  onConnect?: () => void
}

export function WalletConnector({ onConnect }: WalletConnectorProps) {
  const { address, isConnected } = useAccount()
  const { connect, isPending } = useConnect()
  const { disconnect } = useDisconnect()

  const handleConnect = () => {
    connect({ connector: injected() }, {
      onSuccess: () => {
        onConnect?.()
      }
    })
  }

  if (isConnected && address) {
    return (
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Connected Wallet</p>
            <p className="font-mono text-sm">
              {address.slice(0, 6)}...{address.slice(-4)}
            </p>
          </div>
          <button
            onClick={() => disconnect()}
            className="btn-secondary text-sm"
          >
            Disconnect
          </button>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={handleConnect}
      disabled={isPending}
      className="btn-primary w-full"
    >
      {isPending ? 'Connecting...' : 'Connect Wallet'}
    </button>
  )
}

