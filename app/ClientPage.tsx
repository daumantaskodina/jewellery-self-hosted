"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import Calculator from "@/components/calculator"
import QRCodeDialog from "@/components/qr-code-dialog"
import MetalPricesDialog from "@/components/metal-prices-dialog"
import { Button } from "@/components/ui/button"
import { registerServiceWorker } from "./sw-register"
import { useMetalPrices } from "@/hooks/use-metal-prices"
import { Loader2 } from "lucide-react"

// NoSSR wrapper component
function NoSSR({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted ? <>{children}</> : null
}

// Register service worker
if (typeof window !== "undefined") {
  registerServiceWorker()
}

export default function ClientPage() {
  const [qrDialogOpen, setQrDialogOpen] = useState(false)
  const [pricesDialogOpen, setPricesDialogOpen] = useState(false)
  const { prices, error, loading } = useMetalPrices()

  return (
    <div className="min-h-screen bg-background">
      <main className="container py-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 mt-4 text-center">
            <div className="mb-6 flex justify-center">
              <Image
                src="https://pr6jindruf6ikbp6.public.blob.vercel-storage.com/Metal%20Alloys%20Rounded%20%281%29-O2faxoBEymSegkQrim4oSf46r43tTo.webp"
                alt="Wax ring model"
                width={100}
                height={100}
                className="aspect-square w-[100px]"
                priority
              />
            </div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">How much metal do I need?</h1>
            <p className="mt-2 text-muted-foreground">
              Easily calculate the exact metal required for your jewellery casting.
            </p>
          </div>
          <Calculator />
        </div>
        <div className="mt-8 flex flex-col items-center gap-2 pb-4">
          <span className="text-xs text-muted-foreground/50">Made as an experiment by Daumantas Banys</span>
          <div className="text-xs text-muted-foreground/50 flex items-center justify-center gap-2 min-h-[20px]">
            <NoSSR>
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  <span>Loading price information...</span>
                </div>
              ) : error ? (
                <div>Error loading metal prices: {error}</div>
              ) : prices ? (
                <div>Metal prices last updated: {prices.lastUpdated}</div>
              ) : null}
            </NoSSR>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="h-8 mt-2" onClick={() => setQrDialogOpen(true)}>
              Share page as QR
            </Button>
            <Button variant="ghost" size="sm" className="h-8 mt-2" onClick={() => setPricesDialogOpen(true)}>
              View Metal Prices
            </Button>
          </div>
        </div>
        <NoSSR>
          <QRCodeDialog open={qrDialogOpen} onOpenChange={setQrDialogOpen} />
          <MetalPricesDialog open={pricesDialogOpen} onOpenChange={setPricesDialogOpen} />
        </NoSSR>
      </main>
    </div>
  )
}

