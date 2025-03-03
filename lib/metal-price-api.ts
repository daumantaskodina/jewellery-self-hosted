import { alloys } from "./alloys"

const API_KEY = process.env.NEXT_PUBLIC_METAL_PRICE_API_KEY || "8736bcfc1de4fe5031aa52cc4c906d0f"
const BASE_URL = "https://api.metalpriceapi.com/v1"

export type MetalPriceResponse = {
  success: boolean
  timestamp: number
  base: string
  rates: {
    [key: string]: number
  }
  unit: string
}

export type CachedPrices = {
  lastUpdated: string
  timestamp: number
  prices: {
    [key: string]: number
  }
}

// Only include metals we actually use in calculations
const METAL_SYMBOLS = {
  XAU: "Gold",      // Gold
  XAG: "Silver",    // Silver
  GER: "Germanium", // Germanium (not in API, using fixed price)
  XCU: "Copper",    // Copper (using fixed price due to API plan limitations)
  XPD: "Palladium", // Palladium
  ZNC: "Zinc",      // Zinc (using fixed price)
  TIN: "Tin"        // Tin (using fixed price)
}

// Fixed prices for metals not available in the API (in EUR per gram)
const FIXED_PRICES = {
  GER: 2.45,   // Germanium
  XCU: 0.007,  // Copper (approximate market price per gram in EUR)
  ZNC: 0.004,  // Zinc (approximate market price per gram in EUR)
  TIN: 0.25    // Tin (approximate market price per gram in EUR)
}

export async function fetchLatestPrices(): Promise<MetalPriceResponse> {
  // Only fetch prices for metals available in the API
  const apiMetals = ["XAU", "XAG", "XPD"]
  
  try {
    const response = await fetch(
      `${BASE_URL}/latest?api_key=${API_KEY}&base=EUR&currencies=${apiMetals.join(",")}`
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch metal prices: ${response.statusText}`)
    }

    const data = await response.json()
    
    // Add validation for the API response
    if (!data.success || !data.rates || typeof data.rates !== 'object') {
      console.error('Invalid API response:', data)
      throw new Error('Invalid API response format')
    }

    // Extract rates and convert them to EUR per unit
    const rates: Record<string, number> = {}
    
    // Process each metal individually to avoid errors if some are missing
    apiMetals.forEach(symbol => {
      const rate = data.rates[symbol]
      if (typeof rate === 'number' && rate > 0) {
        rates[symbol] = 1 / rate // Convert to EUR per unit
      }
    })

    if (Object.keys(rates).length === 0) {
      throw new Error('No valid metal prices found in the API response')
    }

    return {
      ...data,
      rates
    }
  } catch (error) {
    console.error('Error fetching metal prices:', error)
    throw error
  }
}

export function shouldUpdateCache(lastUpdate: number): boolean {
  if (!lastUpdate) return true
  
  const now = new Date()
  const lastUpdateDate = new Date(lastUpdate)
  const hoursSinceUpdate = (now.getTime() - lastUpdateDate.getTime()) / (1000 * 60 * 60)
  
  // Update if more than 4 hours have passed
  return hoursSinceUpdate > 4
}

export function formatLastUpdated(timestamp: number): string {
  return new Date(timestamp).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  })
}

// Convert troy ounce price to gram price
export function troyOunceToGram(pricePerOunce: number): number {
  return pricePerOunce / 31.1035
}

// Get all metal prices, including fixed prices
export function getAllMetalPrices(apiRates: { [key: string]: number }): { [key: string]: number } {
  const prices: { [key: string]: number } = {}
  
  // Convert API prices from troy ounces to grams
  Object.entries(apiRates).forEach(([symbol, price]) => {
    prices[symbol] = troyOunceToGram(price)
  })
  
  // Add fixed prices
  return { ...prices, ...FIXED_PRICES }
}

// We'll use this function to store prices in a database later
export async function storePrices(prices: CachedPrices): Promise<void> {
  // TODO: Implement database storage
  console.log('Storing prices:', prices)
} 