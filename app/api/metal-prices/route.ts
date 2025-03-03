import { NextResponse } from "next/server"
import { fetchLatestPrices, getAllMetalPrices, shouldUpdateCache, type CachedPrices } from "@/lib/metal-price-api"

// Use a more persistent cache with timestamp
let cachedData: CachedPrices | null = null
let lastFetchAttempt = 0
const FETCH_COOLDOWN = 10 * 1000 // 10 seconds between fetch attempts
const CACHE_DURATION = 4 * 60 * 60 * 1000 // 4 hours in milliseconds

// Conversion rates
const TROY_OUNCE_TO_GRAM = 31.1035
const USD_TO_EUR = 0.92 // Approximate conversion rate, should be fetched from API

export async function GET() {
  try {
    const now = Date.now()

    // Return cached data if it exists and is recent
    if (cachedData && (now - cachedData.timestamp * 1000) < CACHE_DURATION) {
      return NextResponse.json(cachedData)
    }

    // If we're within the cooldown period and have no cache, wait a bit and try again
    if (now - lastFetchAttempt < FETCH_COOLDOWN) {
      await new Promise(resolve => setTimeout(resolve, 1000)) // Wait 1 second
      if (cachedData) {
        return NextResponse.json(cachedData)
      }
      throw new Error("Rate limit exceeded. Please try again in a few seconds.")
    }

    lastFetchAttempt = now

    // Fetch new prices
    const data = await fetchLatestPrices()
    
    if (!data.success || !data.rates) {
      throw new Error("Failed to fetch valid metal prices")
    }

    // Get all metal prices, including fixed prices
    const prices = getAllMetalPrices(data.rates)

    // Update cache
    cachedData = {
      lastUpdated: new Date(data.timestamp * 1000).toLocaleString(),
      timestamp: data.timestamp,
      prices
    }

    return NextResponse.json(cachedData)

  } catch (error) {
    console.error("Error fetching metal prices:", error)
    
    // If we have cached data, return it even if it's old
    if (cachedData) {
      return NextResponse.json({
        ...cachedData,
        isStale: true
      })
    }
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : "Failed to fetch metal prices",
        timestamp: Date.now(),
        success: false
      },
      { status: 500 }
    )
  }
} 