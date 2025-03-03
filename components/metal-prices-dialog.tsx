import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { X, Loader2 } from "lucide-react"
import { useMetalPrices } from "@/hooks/use-metal-prices"

interface MetalPricesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const DISPLAY_METALS = [
  { key: "XAG", name: "Silver" },
  { key: "XAU", name: "Gold" },
  { key: "XPD", name: "Palladium" },
  { key: "GER", name: "Germanium" },
  { key: "XCU", name: "Copper" },
  { key: "ZNC", name: "Zinc" },
  { key: "TIN", name: "Tin" },
] as const

// Fixed prices for metals not available in the API (in EUR per gram)
const FIXED_PRICES: Record<string, number> = {
  GER: 2.45,   // Germanium
  XCU: 0.007,  // Copper
  ZNC: 0.004,  // Zinc
  TIN: 0.25    // Tin
}

export default function MetalPricesDialog({ open, onOpenChange }: MetalPricesDialogProps) {
  const { prices, error, loading } = useMetalPrices()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <div className="sticky top-0 inset-x-0 bg-background/80 backdrop-blur-sm border-b">
          <div className="relative p-6 pb-4">
            <DialogHeader>
              <DialogTitle>Metal Prices</DialogTitle>
              <DialogDescription>Current market prices per gram</DialogDescription>
            </DialogHeader>
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none p-2 -m-2">
              <X className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>
        </div>
        <div className="p-6 pt-4">
          {loading ? (
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground py-8">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading price information...
            </div>
          ) : error ? (
            <div className="text-sm text-destructive">Error loading metal prices: {error}</div>
          ) : prices ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Last Updated</h4>
                <p className="text-sm text-muted-foreground">{prices.lastUpdated}</p>
                {prices.isUsingFallback && (
                  <p className="text-sm text-yellow-600 dark:text-yellow-500 mt-2">
                    Note: Using estimated prices as live market data is currently unavailable.
                  </p>
                )}
              </div>
              <div className="space-y-2">
                {DISPLAY_METALS.map(({ key, name }) => (
                  <div key={key} className="flex justify-between items-center rounded-md bg-muted p-3">
                    <span className="text-sm font-medium">{name}</span>
                    <span className="text-sm text-muted-foreground">
                      {FIXED_PRICES[key] 
                        ? `€${FIXED_PRICES[key].toFixed(2)}/g (estimated)`
                        : prices.prices[key]
                          ? `€${prices.prices[key].toFixed(2)}/g${prices.isUsingFallback ? ' (estimated)' : ''}`
                          : "N/A"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  )
} 