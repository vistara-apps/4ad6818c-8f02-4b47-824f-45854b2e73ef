'use client'

<<<<<<< HEAD
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
=======
import { useState, useEffect, useRef } from 'react'
import { useMiniKit } from '@coinbase/minikit'
import { ChatMessage, AgentState } from '../lib/types'
import { AGENT_RESPONSES } from '../lib/constants'
import { generateId, sleep } from '../lib/utils'
import { WalletConnector } from './WalletConnector'
import { CollateralSelector } from './CollateralSelector'
import { TransactionStepper } from './TransactionStepper'
import { MerchantOffers } from './MerchantOffers'
import { Send, Bot, User } from 'lucide-react'

interface AgentChatProps {
  variant?: 'withTools' | 'compact'
}

export function AgentChat({ variant = 'withTools' }: AgentChatProps) {
  const { context } = useMiniKit()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [agentState, setAgentState] = useState<AgentState>({ step: 'welcome' })
>>>>>>> origin/main
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

<<<<<<< HEAD
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
=======
  useEffect(() => {
    // Initialize with welcome message
    addAgentMessage(AGENT_RESPONSES.welcome, { action: 'start_journey' })
  }, [])

  const addMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: generateId(),
      timestamp: Date.now()
    }
    setMessages(prev => [...prev, newMessage])
    return newMessage
  }

  const addAgentMessage = async (content: string, metadata?: any) => {
    setIsTyping(true)
    await sleep(800) // Simulate typing delay
    setIsTyping(false)
    addMessage({
      type: 'agent',
      content,
      metadata
    })
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    // Add user message
    addMessage({
      type: 'user',
      content: inputValue
    })

    const userInput = inputValue.toLowerCase()
    setInputValue('')

    // Simple intent recognition
    if (userInput.includes('start') || userInput.includes('begin') || userInput.includes('yes')) {
      if (agentState.step === 'welcome') {
        setAgentState({ step: 'wallet_connect' })
        await addAgentMessage(AGENT_RESPONSES.wallet_connect, { action: 'connect_wallet' })
      }
    } else if (userInput.includes('connect') || userInput.includes('wallet')) {
      setAgentState({ step: 'wallet_connect' })
      await addAgentMessage(AGENT_RESPONSES.wallet_connect, { action: 'connect_wallet' })
    } else if (userInput.includes('spend') || userInput.includes('shop') || userInput.includes('merchant')) {
      setAgentState({ step: 'spending' })
      await addAgentMessage(AGENT_RESPONSES.spending_intro, { action: 'show_merchants' })
    } else {
      await addAgentMessage("I understand you're interested in DeFi! Let me guide you through the process step by step. Would you like to start by connecting your wallet?")
    }
  }

  const handleWalletConnected = async (address: string) => {
    setAgentState({ step: 'collateral_select' })
    await addAgentMessage(`Perfect! Wallet connected: ${address.slice(0, 6)}...${address.slice(-4)}. ${AGENT_RESPONSES.collateral_select}`, { action: 'select_collateral' })
  }

  const handleCollateralSelected = async (collateral: any) => {
    setAgentState({ 
      step: 'amount_input', 
      selectedCollateral: collateral 
    })
    await addAgentMessage(`Great choice! ${collateral.symbol} offers ${collateral.apy} APY. ${AGENT_RESPONSES.amount_input}`, { action: 'input_amount' })
  }

  const handleAmountConfirmed = async (supplyAmount: string, borrowAmount: string) => {
    setAgentState({ 
      ...agentState,
      step: 'transaction_review',
      supplyAmount,
      borrowAmount
    })
    await addAgentMessage(AGENT_RESPONSES.transaction_review, { action: 'review_transaction' })
  }

  const handleTransactionComplete = async () => {
    setAgentState({ step: 'completed' })
    await addAgentMessage(AGENT_RESPONSES.success, { action: 'show_next_steps' })
    await sleep(2000)
    await addAgentMessage(AGENT_RESPONSES.spending_intro, { action: 'show_merchants' })
    setAgentState({ step: 'spending' })
  }

  const renderActionComponent = () => {
    const lastMessage = messages[messages.length - 1]
    if (!lastMessage?.metadata?.action) return null

    switch (lastMessage.metadata.action) {
      case 'start_journey':
      case 'connect_wallet':
        return (
          <WalletConnector
            onConnected={handleWalletConnected}
            variant="connect"
          />
        )
      case 'select_collateral':
        return (
          <CollateralSelector
            onSelect={handleCollateralSelected}
            variant="grid"
          />
        )
      case 'review_transaction':
        return (
          <TransactionStepper
            collateral={agentState.selectedCollateral}
            supplyAmount={agentState.supplyAmount}
            borrowAmount={agentState.borrowAmount}
            onComplete={handleTransactionComplete}
            variant="active"
          />
        )
      case 'show_merchants':
        return <MerchantOffers variant="default" />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 animate-fade-in ${
              message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.type === 'user' 
                ? 'bg-primary' 
                : 'bg-gradient-to-r from-accent to-primary'
            }`}>
              {message.type === 'user' ? (
                <User size={16} className="text-white" />
              ) : (
                <Bot size={16} className="text-white" />
              )}
            </div>
            <div className={`max-w-[80%] ${
              message.type === 'user' ? 'text-right' : 'text-left'
            }`}>
              <div className={`inline-block p-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'glass-effect text-foreground'
              }`}>
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(message.timestamp).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
>>>>>>> origin/main
            </div>
          </div>
        ))}

<<<<<<< HEAD
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-text px-3 py-2 rounded-lg">
              <p className="text-sm">Typing...</p>
=======
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-3 animate-fade-in">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent to-primary flex items-center justify-center">
              <Bot size={16} className="text-white" />
            </div>
            <div className="glass-effect p-3 rounded-lg">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
>>>>>>> origin/main
            </div>
          </div>
        )}

<<<<<<< HEAD
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
=======
        {/* Action component */}
        {renderActionComponent()}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="input flex-1"
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="btn-primary px-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={16} />
          </button>
        </div>
>>>>>>> origin/main
      </div>
    </div>
  )
}
<<<<<<< HEAD

=======
>>>>>>> origin/main
