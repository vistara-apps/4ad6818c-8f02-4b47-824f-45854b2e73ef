'use client'

import { RiskAlert } from '@/types'

// Mock alerts - in real app, this would come from API
const MOCK_ALERTS: RiskAlert[] = [
  {
    id: '1',
    type: 'high_risk',
    message: 'Your health factor has dropped to 1.3. Consider adding more collateral.',
    severity: 'medium',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: '2',
    type: 'market_volatility',
    message: 'ETH price has increased 5% in the last hour. Monitor your position.',
    severity: 'low',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
  },
]

export function RiskAlerts() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getSeverityIcon = (type: string) => {
    switch (type) {
      case 'liquidation': return '🚨'
      case 'high_risk': return '⚠️'
      case 'market_volatility': return '📊'
      default: return 'ℹ️'
    }
  }

  if (MOCK_ALERTS.length === 0) {
    return (
      <div className="card">
        <h4 className="font-semibold mb-2">Risk Alerts</h4>
        <div className="text-center py-4">
          <p className="text-gray-500 text-sm">No active alerts. Your position is healthy!</p>
          <div className="text-2xl mt-2">✅</div>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <h4 className="font-semibold mb-4">Risk Alerts</h4>
      <div className="space-y-3">
        {MOCK_ALERTS.map((alert) => (
          <div
            key={alert.id}
            className={`p-3 rounded-lg border ${getSeverityColor(alert.severity)}`}
          >
            <div className="flex items-start space-x-3">
              <span className="text-lg">{getSeverityIcon(alert.type)}</span>
              <div className="flex-1">
                <p className="text-sm font-medium">{alert.message}</p>
                <p className="text-xs mt-1 opacity-75">
                  {alert.timestamp.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-border">
        <button className="btn-secondary text-sm w-full">
          View All Alerts
        </button>
      </div>
    </div>
  )
}

