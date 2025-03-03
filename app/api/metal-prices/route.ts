import { NextResponse } from "next/server"
import { fetchLatestPrices, shouldUpdateCache, formatLastUpdated, type CachedPrices } from "@/lib/metal-price-api"

let cachedData: CachedPrices | null = null

export async function GET() {
  try {
    // Check if we need to update the cache
    if (!cachedData || shouldUpdateCache(cachedData.timestamp)) {
      const data = await fetchLatestPrices()
      
      if (data.success) {
        const timestamp = Date.now()
        cachedData = {
          timestamp,
          prices: data.rates,
          lastUpdated: formatLastUpdated(timestamp)
        }
      }
    }

    if (!cachedData) {
      return NextResponse.json(
        { error: "Failed to fetch metal prices" },
        { status: 500 }
      )
    }

    return NextResponse.json(cachedData)
  } catch (error) {
    console.error("Error fetching metal prices:", error)
    return NextResponse.json(
      { error: "Failed to fetch metal prices" },
      { status: 500 }
    )
  }
} 