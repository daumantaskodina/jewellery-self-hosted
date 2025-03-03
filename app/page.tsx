import type { Metadata } from "next"
import Calculator from "@/components/calculator"

export const metadata: Metadata = {
  title: "Metal Alloys",
  description: "Calculate required metal amounts for jewelry casting",
}

export default function Home() {
  return (
    <div className="container py-8 space-y-8">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">How much metal do I need?</h1>
        <p className="text-xl text-muted-foreground">
          Easily calculate the exact metal required for your jewellery casting.
        </p>
      </div>
      <Calculator />
    </div>
  )
}

