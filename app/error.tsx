'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="card p-6 max-w-md w-full text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-destructive/20 mx-auto flex items-center justify-center">
          <span className="text-2xl">⚠️</span>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Something went wrong!
          </h2>
          <p className="text-muted-foreground text-sm">
            {error.message || 'An unexpected error occurred'}
          </p>
        </div>
        <button
          onClick={reset}
          className="btn-primary w-full"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
