export default function Loading() {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-accent to-primary animate-pulse-glow mx-auto flex items-center justify-center">
          <span className="text-2xl font-bold text-white">G</span>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded w-32 mx-auto animate-pulse"></div>
          <div className="h-3 bg-muted/60 rounded w-24 mx-auto animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
