import { ethers } from 'ethers'

// Contract addresses (Base network)
export const CONTRACTS = {
  GHO: '0x057Ec652A4F150f7FF94f089A38008f77aDcE94Df', // GHO token on Base
  AAVE_POOL: '0x794a61358D6845594F94dc1DB02A252b5b4814aD', // Aave V3 Pool on Base
  WETH: '0x4200000000000000000000000000000000000006', // WETH on Base
}

// ABI fragments for common functions
export const ERC20_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
]

export const AAVE_POOL_ABI = [
  'function supply(address asset, uint256 amount, address onBehalfOf, uint16 referralCode) external',
  'function borrow(address asset, uint256 amount, uint256 interestRateMode, uint16 referralCode, address onBehalfOf) external',
  'function repay(address asset, uint256 amount, uint256 interestRateMode, address onBehalfOf) external',
  'function getUserAccountData(address user) external view returns (uint256 totalCollateralBase, uint256 totalDebtBase, uint256 availableBorrowsBase, uint256 currentLiquidationThreshold, uint256 ltv, uint256 healthFactor)',
]

// Initialize provider (for Base network)
export function getProvider() {
  return new ethers.JsonRpcProvider('https://developer-api.base.org')
}

// Get signer from wallet connection
export function getSigner(provider: ethers.Provider) {
  // In a real app, this would use the connected wallet
  // For now, return a mock signer
  return new ethers.Wallet(process.env.PRIVATE_KEY || '0x' + '0'.repeat(64), provider)
}

// Contract helpers
export function getContract(address: string, abi: any[], signer?: ethers.Signer) {
  const provider = getProvider()
  return new ethers.Contract(address, abi, signer || provider)
}

// Token utilities
export async function getTokenBalance(tokenAddress: string, userAddress: string) {
  const contract = getContract(tokenAddress, ERC20_ABI)
  const balance = await contract.balanceOf(userAddress)
  return ethers.formatEther(balance)
}

export async function approveToken(tokenAddress: string, spenderAddress: string, amount: string) {
  const signer = getSigner(getProvider())
  const contract = getContract(tokenAddress, ERC20_ABI, signer)
  const tx = await contract.approve(spenderAddress, ethers.parseEther(amount))
  return tx.wait()
}

// Aave V3 utilities
export async function getUserAccountData(userAddress: string) {
  const contract = getContract(CONTRACTS.AAVE_POOL, AAVE_POOL_ABI)
  const data = await contract.getUserAccountData(userAddress)
  return {
    totalCollateralBase: data[0],
    totalDebtBase: data[1],
    availableBorrowsBase: data[2],
    currentLiquidationThreshold: data[3],
    ltv: data[4],
    healthFactor: data[5],
  }
}

export async function supplyToAave(assetAddress: string, amount: string, userAddress: string) {
  const signer = getSigner(getProvider())
  const contract = getContract(CONTRACTS.AAVE_POOL, AAVE_POOL_ABI, signer)

  // First approve the token
  await approveToken(assetAddress, CONTRACTS.AAVE_POOL, amount)

  // Then supply
  const tx = await contract.supply(
    assetAddress,
    ethers.parseEther(amount),
    userAddress,
    0 // referral code
  )
  return tx.wait()
}

export async function borrowFromAave(assetAddress: string, amount: string, userAddress: string) {
  const signer = getSigner(getProvider())
  const contract = getContract(CONTRACTS.AAVE_POOL, AAVE_POOL_ABI, signer)

  const tx = await contract.borrow(
    assetAddress,
    ethers.parseEther(amount),
    2, // Variable interest rate mode
    0, // referral code
    userAddress
  )
  return tx.wait()
}

// GHO specific utilities
export async function getGhoBalance(userAddress: string) {
  return getTokenBalance(CONTRACTS.GHO, userAddress)
}

export async function transferGho(toAddress: string, amount: string) {
  const signer = getSigner(getProvider())
  const contract = getContract(CONTRACTS.GHO, ERC20_ABI, signer)
  const tx = await contract.transfer(toAddress, ethers.parseEther(amount))
  return tx.wait()
}

