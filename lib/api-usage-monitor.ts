// Simple API usage monitoring utility
const USAGE_KEY = "metal-api-usage"

export interface ApiUsage {
  month: string // Format: "YYYY-MM"
  count: number
  lastCall: number
  calls: { timestamp: number; success: boolean }[]
}

export function getApiUsage(): ApiUsage {
  if (typeof window === "undefined") {
    // Server-side: use in-memory storage (resets on restart)
    const currentMonth = new Date().toISOString().slice(0, 7)
    return {
      month: currentMonth,
      count: 0,
      lastCall: 0,
      calls: []
    }
  }

  try {
    const stored = localStorage.getItem(USAGE_KEY)
    if (!stored) {
      return createNewUsageRecord()
    }

    const usage: ApiUsage = JSON.parse(stored)
    const currentMonth = new Date().toISOString().slice(0, 7)

    // Reset if it's a new month
    if (usage.month !== currentMonth) {
      return createNewUsageRecord()
    }

    return usage
  } catch (error) {
    console.error("Error reading API usage:", error)
    return createNewUsageRecord()
  }
}

export function recordApiCall(success: boolean): void {
  if (typeof window === "undefined") {
    // Server-side: just log for now
    console.log(`API call recorded: ${success ? 'success' : 'failure'} at ${new Date().toISOString()}`)
    return
  }

  try {
    const usage = getApiUsage()
    const now = Date.now()
    
    usage.count += 1
    usage.lastCall = now
    usage.calls.push({ timestamp: now, success })
    
    // Keep only last 50 calls to prevent localStorage from growing too large
    if (usage.calls.length > 50) {
      usage.calls = usage.calls.slice(-50)
    }
    
    localStorage.setItem(USAGE_KEY, JSON.stringify(usage))
    
    // Log warning if approaching limit
    if (usage.count >= 80) {
      console.warn(`⚠️  API usage warning: ${usage.count}/100 calls used this month`)
    }
    
    if (usage.count >= 100) {
      console.error(`🚨 API usage limit reached: ${usage.count}/100 calls used this month`)
    }
  } catch (error) {
    console.error("Error recording API usage:", error)
  }
}

function createNewUsageRecord(): ApiUsage {
  const currentMonth = new Date().toISOString().slice(0, 7)
  return {
    month: currentMonth,
    count: 0,
    lastCall: 0,
    calls: []
  }
}

export function getUsageStats(): {
  currentMonth: string
  totalCalls: number
  successfulCalls: number
  failedCalls: number
  remainingCalls: number
  lastCallTime: string | null
} {
  const usage = getApiUsage()
  const successfulCalls = usage.calls.filter(call => call.success).length
  const failedCalls = usage.calls.filter(call => !call.success).length
  
  return {
    currentMonth: usage.month,
    totalCalls: usage.count,
    successfulCalls,
    failedCalls,
    remainingCalls: Math.max(0, 100 - usage.count),
    lastCallTime: usage.lastCall ? new Date(usage.lastCall).toLocaleString() : null
  }
} 