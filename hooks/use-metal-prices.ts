import { useState, useEffect } from "react"
import type { CachedPrices } from "@/lib/metal-price-api"

export function useMetalPrices() {
  const [prices, setPrices] = useState<CachedPrices | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch("/api/metal-prices")
        if (!response.ok) {
          throw new Error("Failed to fetch metal prices")
        }
        const data = await response.json()
        setPrices(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch metal prices")
        setPrices(null)
      } finally {
        setLoading(false)
      }
    }

    fetchPrices()

    // Check for updates every hour, though prices update at 7:00 AM each day
    const interval = setInterval(fetchPrices, 60 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  return { prices, error, loading }
} 