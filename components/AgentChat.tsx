'use client'

import { useState, useRef, useEffect } from 'react'
import { ChatMessage } from '@/types'

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Hi! I\'m your GHO Navigator. I\'ll guide you through safely using GHO in DeFi. What would you like to know?',
    timestamp: new Date(),
  },
]

export function AgentChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateResponse(input),
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1000)
  }

  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes('supply') || input.includes('deposit')) {
      return 'To supply collateral on Aave, you\'ll need to: 1) Connect your wallet, 2) Choose an asset like ETH or WBTC, 3) Approve the transaction, 4) Confirm the supply. This will allow you to borrow GHO against your collateral.'
    }

    if (input.includes('borrow') || input.includes('gho')) {
      return 'Borrowing GHO is safe when you maintain a good health factor (>1.0). I\'ll help you choose the right amount and monitor your position for liquidation risks.'
    }

    if (input.includes('risk') || input.includes('liquidation')) {
      return 'Your health factor shows how close you are to liquidation. I\'ll send alerts when it drops below 1.5. Always keep some buffer for market volatility.'
    }

    if (input.includes('spend') || input.includes('merchant')) {
      return 'You can spend GHO at partnered merchants and earn rewards! Check out the merchant offers above, or I can help you find specific categories.'
    }

    return 'I\'m here to help with your DeFi journey! Ask me about supplying collateral, borrowing GHO, risk management, or spending opportunities.'
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">GHO Assistant</h3>

      <div className="h-64 overflow-y-auto space-y-3 mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-3 py-2 rounded-lg ${
                message.role === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-text'
              }`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-text px-3 py-2 rounded-lg">
              <p className="text-sm">Typing...</p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask me anything about GHO..."
          className="input flex-1"
        />
        <button
          onClick={handleSendMessage}
          disabled={!input.trim() || isTyping}
          className="btn-primary px-4"
        >
          Send
        </button>
      </div>
    </div>
  )
}

