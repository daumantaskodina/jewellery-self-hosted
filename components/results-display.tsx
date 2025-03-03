"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InfoIcon } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface ResultsDisplayProps {
  results: {
    materialWeight: number
    weightMultiplier: number
    estimatedMetalWeight: number
    surplusPercentage: number
    totalWeightWithSurplus: number
    existingAlloyWeight: number
    additionalWeightNeeded: number
    metalComponents: {
      name: string
      percentage: number
      weight: number
      pricePerGram: number
      cost: number
    }[]
    totalCost: number
    alloyName: string
    alloyPricePerGram: number
  } | null
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  const [priceOverrides, setPriceOverrides] = useState<Record<string, number>>({})
  const [editingPrices, setEditingPrices] = useState(false)
  const [openAccordion, setOpenAccordion] = useState<string | undefined>(undefined)

  const { calculatedCosts, totalCost } = (() => {
    if (!results) {
      return { calculatedCosts: [], totalCost: 0 }
    }

    const calculatedCosts =
      results?.metalComponents.map((component) => ({
        ...component,
        pricePerGram: priceOverrides[component.name] ?? component.pricePerGram,
        cost: (priceOverrides[component.name] ?? component.pricePerGram) * component.weight,
      })) || []

    const total = calculatedCosts.reduce((sum, component) => sum + component.cost, 0)

    return { calculatedCosts, totalCost: total }
  })()

  if (!results) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Results</CardTitle>
          <CardDescription>Your calculation results will appear here</CardDescription>
        </CardHeader>
        <CardContent className="flex h-[300px] items-center justify-center text-muted-foreground">
          <div className="flex flex-col items-center gap-2 text-center">
            <InfoIcon className="h-10 w-10" />
            <p>Enter your parameters and click Calculate</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculation Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <Accordion
              type="single"
              collapsible
              value={openAccordion}
              onValueChange={setOpenAccordion}
              className="w-full"
            >
              <AccordionItem value="calculations">
                <AccordionTrigger>Calculations & Adjustments</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-muted-foreground">Wax Model Weight:</div>
                      <div className="text-right font-medium">{results.materialWeight.toFixed(2)} g</div>

                      <div className="text-muted-foreground">Weight Multiplier:</div>
                      <div className="text-right font-medium">×{results.weightMultiplier.toFixed(2)}</div>

                      <div className="text-muted-foreground">Estimated Metal Weight:</div>
                      <div className="text-right font-medium">{results.estimatedMetalWeight.toFixed(2)} g</div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-muted-foreground">Surplus Added:</div>
                      <div className="text-right font-medium">{results.surplusPercentage}%</div>

                      <div className="text-muted-foreground">Total with Surplus:</div>
                      <div className="text-right font-medium">{results.totalWeightWithSurplus.toFixed(2)} g</div>

                      <div className="text-muted-foreground">Existing Alloy:</div>
                      <div className="text-right font-medium">{results.existingAlloyWeight.toFixed(2)} g</div>

                      <div className="text-muted-foreground font-semibold">Additional Needed:</div>
                      <div className="text-right font-semibold">{results.additionalWeightNeeded.toFixed(2)} g</div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion
              type="single"
              collapsible
              value={openAccordion}
              onValueChange={setOpenAccordion}
              className="w-full"
            >
              <AccordionItem value="estimated-costs">
                <AccordionTrigger>Estimated Costs</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingPrices(!editingPrices)}
                      className="mb-2"
                    >
                      {editingPrices ? "Done editing" : "Edit metal prices"}
                    </Button>
                    {calculatedCosts.map((component, index) => (
                      <div key={index} className="grid gap-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">{component.name}:</span>
                          <div className="flex items-center gap-2">
                            {editingPrices ? (
                              <div className="flex items-center gap-1">
                                <span className="text-xs text-muted-foreground">€</span>
                                <Input
                                  type="number"
                                  value={priceOverrides[component.name] ?? component.pricePerGram}
                                  onChange={(e) => {
                                    const value = Number.parseFloat(e.target.value)
                                    setPriceOverrides((prev) => ({
                                      ...prev,
                                      [component.name]: isNaN(value) ? 0 : value,
                                    }))
                                  }}
                                  className="h-6 w-20 text-right"
                                  step="0.01"
                                />
                                <span className="text-xs text-muted-foreground">/g</span>
                              </div>
                            ) : (
                              <span className="text-muted-foreground">€{component.pricePerGram.toFixed(2)}/g</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-xs text-muted-foreground">{component.weight.toFixed(3)} g</span>
                          <span className="font-medium">€{component.cost.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}

                    <div className="rounded-lg bg-muted/50 p-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Total Material Cost:</span>
                        <div className="text-right">
                          <div className="font-bold">€{totalCost.toFixed(2)}</div>
                          <div className="text-xs text-muted-foreground">
                            for {results.additionalWeightNeeded.toFixed(2)} g total
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">Required Metal Components</h3>
            {results.metalComponents.map((component, index) => (
              <div key={index} className="grid grid-cols-2 gap-2 rounded-lg bg-muted p-3 text-sm">
                <div>
                  <div className="font-medium">{component.name}</div>
                  <div className="text-xs text-muted-foreground">{component.percentage}%</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{component.weight.toFixed(3)} g</div>
                </div>
              </div>
            ))}
          </div>

          {results.existingAlloyWeight > 0 && (
            <div className="rounded-md bg-muted p-3 text-sm">
              <p className="font-medium text-muted-foreground">
                Note: The calculations above show the additional metals needed beyond your existing{" "}
                {results.existingAlloyWeight.toFixed(2)}g of {results.alloyName}.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

