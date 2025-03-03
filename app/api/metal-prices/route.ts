import { NextResponse } from "next/server"
import { fetchLatestPrices, getAllMetalPrices, type CachedPrices, DEFAULT_PRICES } from "@/lib/metal-price-api"

// Use a more persistent cache with timestamp
let cachedData: CachedPrices | null = null

function shouldUpdatePrices(): boolean {
  if (!cachedData) return true
  
  const now = new Date()
  const lastUpdate = new Date(cachedData.timestamp * 1000)
  
  // Check if it's a new day and past 7 AM
  const isNewDay = now.getDate() !== lastUpdate.getDate() ||
                  now.getMonth() !== lastUpdate.getMonth() ||
                  now.getFullYear() !== lastUpdate.getFullYear()
  const isPastSevenAM = now.getHours() >= 7
  
  return isNewDay && isPastSevenAM
}

function getFormattedUpdateTime(timestamp: number): string {
  const date = new Date(timestamp * 1000)
  // Set the time to exactly 7:00 AM
  date.setHours(7, 0, 0, 0)
  return date.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }) + ' at 7:00 AM'
}

// Conversion rates
const TROY_OUNCE_TO_GRAM = 31.1035
const USD_TO_EUR = 0.92 // Approximate conversion rate, should be fetched from API

export async function GET() {
  try {
    // Return cached data if it exists and we shouldn't update yet
    if (cachedData && !shouldUpdatePrices()) {
      return NextResponse.json(cachedData)
    }

    // Fetch new prices
    const data = await fetchLatestPrices()
    
    // Get all metal prices, including fixed prices
    const prices = getAllMetalPrices(data.rates)

    // Update cache with formatted time
    cachedData = {
      lastUpdated: data.success 
        ? getFormattedUpdateTime(data.timestamp)
        : "Using fallback prices - Unable to fetch latest prices",
      timestamp: data.timestamp,
      prices,
      isUsingFallback: !data.success
    }

    return NextResponse.json(cachedData)

  } catch (error) {
    console.error("Error in metal prices route:", error)
    
    // If we have cached data, return it even if it's old
    if (cachedData) {
      return NextResponse.json({
        ...cachedData,
        isStale: true
      })
    }
    
    // If all else fails, return default prices
    const timestamp = Math.floor(Date.now() / 1000)
    const fallbackData: CachedPrices = {
      lastUpdated: "Using fallback prices - Unable to fetch latest prices",
      timestamp,
      prices: DEFAULT_PRICES,
      isUsingFallback: true
    }
    
    return NextResponse.json(fallbackData)
  }
} 