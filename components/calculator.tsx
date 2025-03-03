"use client"

import { useState, useRef } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { alloys } from "@/lib/alloys"
import { getConversionMultiplier } from "@/lib/materials"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { InfoIcon } from "lucide-react"
import ResultsDisplay from "@/components/results-display"
import AlloyInfoDialog from "@/components/alloy-info-dialog"

const formSchema = z.object({
  materialWeight: z.coerce
    .number()
    .positive("Weight must be a positive number")
    .min(0.01, "Weight must be at least 0.01 grams"),
  targetAlloy: z.string().min(1, "Please select a target alloy"),
  surplusPercentage: z.coerce.number().min(0, "Surplus must be 0% or greater"),
  hasExistingAlloy: z.boolean().default(false),
  existingAlloyWeight: z.coerce.number().min(0, "Existing alloy weight must be 0 or greater").optional().default(0),
})

export default function Calculator() {
  const [results, setResults] = useState<any>(null)
  const [selectedAlloyInfo, setSelectedAlloyInfo] = useState<(typeof alloys)[0] | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      materialWeight: 1,
      targetAlloy: "sterling-silver",
      surplusPercentage: 25,
      hasExistingAlloy: false,
      existingAlloyWeight: 0,
    },
  })

  const hasExistingAlloy = form.watch("hasExistingAlloy")

  function onSubmit(values: z.infer<typeof formSchema>) {
    const selectedAlloy = alloys.find((alloy) => alloy.id === values.targetAlloy)

    if (!selectedAlloy) {
      return
    }

    // Get the weight multiplier from wax to target alloy
    const weightMultiplier = getConversionMultiplier("wax", values.targetAlloy)

    // Calculate the estimated metal weight from the wax
    const estimatedMetalWeight = values.materialWeight * weightMultiplier

    // Apply surplus
    const surplusFactor = 1 + values.surplusPercentage / 100
    const totalWeightWithSurplus = estimatedMetalWeight * surplusFactor

    const existingAlloyWeight = values.hasExistingAlloy ? values.existingAlloyWeight : 0
    const additionalWeightNeeded = Math.max(0, totalWeightWithSurplus - existingAlloyWeight)

    // Calculate metal components with pricing
    const metalComponents = selectedAlloy.components.map((component) => {
      const weight = additionalWeightNeeded * (component.percentage / 100)
      const cost = weight * component.pricePerGram
      return {
        name: component.name,
        percentage: component.percentage,
        weight,
        pricePerGram: component.pricePerGram,
        cost,
      }
    })

    // Calculate total cost
    const totalCost = metalComponents.reduce((sum, component) => sum + component.cost, 0)

    setResults({
      materialWeight: values.materialWeight,
      weightMultiplier,
      estimatedMetalWeight,
      surplusPercentage: values.surplusPercentage,
      totalWeightWithSurplus,
      existingAlloyWeight,
      additionalWeightNeeded,
      metalComponents,
      totalCost,
      alloyName: selectedAlloy.name,
      alloyPricePerGram: selectedAlloy.pricePerGram,
    })

    // Check if we're in mobile view (one column layout)
    if (window.innerWidth < 768) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        })
      }, 200) // Increased delay to ensure content is rendered
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="materialWeight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wax model weight (g)</FormLabel>
                    <FormControl>
                      <Input type="number" inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="targetAlloy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Metal alloy</FormLabel>
                    <div className="flex gap-2">
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="flex-1">
                            <SelectValue placeholder="Select an alloy" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {alloys.map((alloy) => (
                            <SelectItem key={alloy.id} value={alloy.id}>
                              {alloy.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setSelectedAlloyInfo(alloys.find((a) => a.id === field.value) || null)}
                      >
                        <InfoIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="surplusPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Surplus percentage: {field.value}%</FormLabel>
                    <FormControl>
                      <Slider
                        min={0}
                        max={50}
                        step={5}
                        defaultValue={[field.value]}
                        onValueChange={(values) => field.onChange(values[0])}
                      />
                    </FormControl>
                    <FormDescription>
                      Add extra material for shrinkage, sprues, and other losses during casting
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hasExistingAlloy"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox id="hasExistingAlloy" checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none flex-1">
                      <FormLabel htmlFor="hasExistingAlloy" className="cursor-pointer w-full">
                        I already have some alloy that I want to use
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              {hasExistingAlloy && (
                <FormField
                  control={form.control}
                  name="existingAlloyWeight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Existing alloy weight (g)</FormLabel>
                      <FormControl>
                        <Input type="number" inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" step="0.01" {...field} />
                      </FormControl>
                      <FormDescription>Enter the weight of the alloy you already have</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <Button type="submit" className="w-full">
                Calculate
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <AlloyInfoDialog
        open={!!selectedAlloyInfo}
        onOpenChange={(open) => !open && setSelectedAlloyInfo(null)}
        alloy={selectedAlloyInfo}
      />

      <div ref={resultsRef} className={`${!results ? "hidden md:block" : "block"}`}>
        <ResultsDisplay results={results} />
      </div>
    </div>
  )
}

