'use client'

import { OnchainKitProvider } from '@coinbase/onchainkit'
import { base } from 'viem/chains'

export function Providers({ children }: { children: React.ReactNode }) {
  const isClient = typeof window !== 'undefined'

  if (!isClient) {
    return <>{children}</>
  }

  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || 'demo-key'}
      chain={base as any}
    >
      {children}
    </OnchainKitProvider>
  )
}
