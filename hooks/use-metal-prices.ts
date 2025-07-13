import { useState, useEffect, useCallback } from "react"
import type { CachedPrices } from "@/lib/metal-price-api"

const CACHE_KEY = "metal-prices-cache"
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

function getCachedData(): CachedPrices | null {
  if (typeof window === "undefined") return null
  
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (!cached) return null
    
    const data = JSON.parse(cached)
    const now = Date.now()
    
    // Check if cache is still valid (less than 24 hours old)
    if (data.cachedAt && (now - data.cachedAt) < CACHE_DURATION) {
      return data.prices
    }
    
    // Cache is stale, remove it
    localStorage.removeItem(CACHE_KEY)
    return null
  } catch (error) {
    console.error("Error reading cached prices:", error)
    localStorage.removeItem(CACHE_KEY)
    return null
  }
}

function setCachedData(prices: CachedPrices): void {
  if (typeof window === "undefined") return
  
  try {
    const cacheData = {
      prices,
      cachedAt: Date.now()
    }
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
  } catch (error) {
    console.error("Error caching prices:", error)
  }
}

export function useMetalPrices() {
  const [prices, setPrices] = useState<CachedPrices | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchPrices = useCallback(async () => {
    try {
      setLoading(true)
      
      // First, try to get cached data
      const cachedPrices = getCachedData()
      if (cachedPrices) {
        setPrices(cachedPrices)
        setError(null)
        setLoading(false)
        return
      }

      // If no valid cache, fetch from API
      const response = await fetch("/api/metal-prices")
      if (!response.ok) {
        throw new Error("Failed to fetch metal prices")
      }
      const data = await response.json()
      
      // Cache the new data
      setCachedData(data)
      
      setPrices(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch metal prices")
      setPrices(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPrices()

    // Only check for updates once per day at most
    // Since backend only updates once per day after 7 AM, we don't need frequent polling
    const checkForUpdates = () => {
      const cachedPrices = getCachedData()
      if (!cachedPrices) {
        fetchPrices()
      }
    }

    // Check for updates every 6 hours instead of every hour
    // This ensures we get updates when they're available but don't waste API calls
    const interval = setInterval(checkForUpdates, 6 * 60 * 60 * 1000)

    return () => clearInterval(interval)
  }, [fetchPrices])

  return { prices, error, loading }
} 