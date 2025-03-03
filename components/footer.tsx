"use client"

import { useMetalPrices } from "@/hooks/use-metal-prices"

export function Footer() {
  const { prices, error } = useMetalPrices()

  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{" "}
            <a
              href="https://github.com/daumantaskodina"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Daumantas Banys
            </a>
            {" · "}
            {prices ? (
              <>Metal prices last updated: {prices.lastUpdated}</>
            ) : error ? (
              <>Error loading metal prices: {error}</>
            ) : (
              <>Loading price information...</>
            )}
          </p>
        </div>
      </div>
    </footer>
  )
} 