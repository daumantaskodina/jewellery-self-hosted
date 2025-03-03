import { alloys } from "./alloys"

const API_KEY = "8736bcfc1de4fe5031aa52cc4c906d0f"
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

export async function fetchLatestPrices(): Promise<MetalPriceResponse> {
  const currencies = ["XAU", "XAG", "USD", "EUR"] // Gold, Silver, USD, EUR
  const response = await fetch(
    `${BASE_URL}/latest?api_key=${API_KEY}&base=EUR&currencies=${currencies.join(",")}`
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch metal prices: ${response.statusText}`)
  }

  return response.json()
}

export type CachedPrices = {
  timestamp: number
  prices: {
    [key: string]: number
  }
  lastUpdated: string // Add this field for human-readable date
}

export function shouldUpdateCache(lastUpdate: number): boolean {
  const now = new Date()
  const lastUpdateDate = new Date(lastUpdate)
  
  // Check if the last update was on a different day
  return (
    lastUpdateDate.getDate() !== now.getDate() ||
    lastUpdateDate.getMonth() !== now.getMonth() ||
    lastUpdateDate.getFullYear() !== now.getFullYear()
  )
}

export function formatLastUpdated(timestamp: number): string {
  return new Date(timestamp).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  })
} 