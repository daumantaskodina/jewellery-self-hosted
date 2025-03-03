"use client"

import Image from "next/image"
import { useState } from "react"
import Calculator from "@/components/calculator"
import QRCodeDialog from "@/components/qr-code-dialog"
import { Button } from "@/components/ui/button"
import { registerServiceWorker } from "./sw-register"
import { useMetalPrices } from "@/hooks/use-metal-prices"

// Register service worker
if (typeof window !== "undefined") {
  registerServiceWorker()
}

export default function ClientPage() {
  const [qrDialogOpen, setQrDialogOpen] = useState(false)
  const { prices, error } = useMetalPrices()

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 mt-4 text-center">
          <div className="mb-6 flex justify-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rounded-Ui8WzEhGncLDllkjAuLfXHquDyvAVU.png"
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
        <span className="text-xs text-muted-foreground/50">
          {prices ? (
            <>Metal prices last updated: {prices.lastUpdated}</>
          ) : error ? (
            <>Error loading metal prices: {error}</>
          ) : (
            <>Loading price information...</>
          )}
        </span>
        <Button variant="ghost" size="sm" className="h-8 mt-2" onClick={() => setQrDialogOpen(true)}>
          Share page as QR
        </Button>
      </div>
      <QRCodeDialog open={qrDialogOpen} onOpenChange={setQrDialogOpen} />
    </main>
  )
}

