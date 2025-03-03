// Map metal names to their API symbols
export const METAL_TO_SYMBOL = {
  "Gold": "XAU",
  "Silver": "XAG",
  "Copper": "XCU",
  "Palladium": "XPD",
  "Germanium": "GER",
  "Zinc": "ZNC",
  "Tin": "TIN"
} as const

export type Alloy = {
  id: string
  name: string
  image: string
  description: string
  uses: string
  components: {
    name: string
    percentage: number
  }[]
}

export const alloys: Alloy[] = [
  {
    id: "sterling-silver",
    name: "Sterling Silver",
    image: "https://pr6jindruf6ikbp6.public.blob.vercel-storage.com/sterling-YdB1W0voPDKBdhmAbtwjx7JFVCpn0g.webp",
    description:
      "The most common silver alloy used in jewelry making. Perfect for everyday wear jewelry due to its durability and beautiful luster.",
    uses: "Commonly used for rings, necklaces, bracelets, and decorative items. Ideal for intricate designs and filigree work.",
    components: [
      { name: "Silver", percentage: 92.5 },
      { name: "Copper", percentage: 7.5 },
    ],
  },
  {
    id: "argentium-silver",
    name: "Argentium Silver",
    image: "https://pr6jindruf6ikbp6.public.blob.vercel-storage.com/argentum-NXEzXajqYGCpI6Li9G2o5afmHi040h.webp",
    description:
      "A modern, tarnish-resistant silver alloy containing germanium. Higher purity than sterling silver with improved durability.",
    uses: "Perfect for high-end jewelry pieces where tarnish resistance is crucial. Excellent for wedding rings and premium jewelry.",
    components: [
      { name: "Silver", percentage: 93.5 },
      { name: "Copper", percentage: 5.5 },
      { name: "Germanium", percentage: 1.0 },
    ],
  },
  {
    id: "yellow-gold-18k",
    name: "18K Yellow Gold",
    image: "https://pr6jindruf6ikbp6.public.blob.vercel-storage.com/14%20k%20gold-Ytc2JSV868F3lv2NpLyAAPuNVBGAaI.jpg",
    description: "Traditional gold color with high purity (75% gold). Excellent balance between purity and durability.",
    uses: "Perfect for high-end jewelry, engagement rings, and special occasion pieces. Popular in European and Asian markets.",
    components: [
      { name: "Gold", percentage: 75.0 },
      { name: "Silver", percentage: 12.5 },
      { name: "Copper", percentage: 12.5 },
    ],
  },
  {
    id: "yellow-gold-14k",
    name: "14K Yellow Gold",
    image: "https://pr6jindruf6ikbp6.public.blob.vercel-storage.com/14%20k%20gold-Ytc2JSV868F3lv2NpLyAAPuNVBGAaI.jpg",
    description: "Most popular gold alloy in the US. Good balance between durability and gold content.",
    uses: "Versatile alloy suitable for everyday wear jewelry, engagement rings, and commercial jewelry pieces.",
    components: [
      { name: "Gold", percentage: 58.3 },
      { name: "Silver", percentage: 20.8 },
      { name: "Copper", percentage: 20.9 },
    ],
  },
  {
    id: "rose-gold-14k",
    name: "14K Rose Gold",
    image: "https://pr6jindruf6ikbp6.public.blob.vercel-storage.com/pink-61licN1akm1g1rs2sKum70MvS1mZF3.jpg",
    description: "Beautiful pink-hued gold due to higher copper content. Modern and romantic appearance.",
    uses: "Popular for engagement rings, romantic jewelry pieces, and vintage-style designs. Growing trend in contemporary jewelry.",
    components: [
      { name: "Gold", percentage: 58.3 },
      { name: "Copper", percentage: 37.5 },
      { name: "Silver", percentage: 4.2 },
    ],
  },
  {
    id: "white-gold-14k",
    name: "14K White Gold",
    image: "https://pr6jindruf6ikbp6.public.blob.vercel-storage.com/White%20Gold%20Ring%20%281%29-V98qJkgxTE9YAkbM2XiH1nZyrSMuoQ.webp",
    description:
      "Modern alternative to platinum. Bright white color achieved through palladium alloy and rhodium plating.",
    uses: "Popular for engagement rings, wedding bands, and modern jewelry designs. Good alternative to platinum.",
    components: [
      { name: "Gold", percentage: 58.3 },
      { name: "Palladium", percentage: 25.0 },
      { name: "Silver", percentage: 16.7 },
    ],
  },
  {
    id: "bronze",
    name: "Bronze",
    image: "https://pr6jindruf6ikbp6.public.blob.vercel-storage.com/bronze-9cd8QXIdxpZDxXzg296mjSv0FK1Q1P.webp",
    description: "Classic copper-tin alloy with warm, golden color. Develops beautiful patina over time.",
    uses: "Used in artistic jewelry, sculptures, and alternative metal jewelry. Popular in steampunk and rustic designs.",
    components: [
      { name: "Copper", percentage: 88.0 },
      { name: "Tin", percentage: 12.0 },
    ],
  },
  {
    id: "brass",
    name: "Brass",
    image: "https://pr6jindruf6ikbp6.public.blob.vercel-storage.com/brass-V8U0Wuv3B8TIFNtlQeZDbFm1mZeBe1.webp",
    description: "Yellow-colored copper-zinc alloy. More affordable alternative with good workability.",
    uses: "Common in costume jewelry, decorative pieces, and components. Popular in bohemian and ethnic jewelry styles.",
    components: [
      { name: "Copper", percentage: 65.0 },
      { name: "Zinc", percentage: 35.0 },
    ],
  },
  {
    id: "shibuichi",
    name: "Shibuichi",
    image: "https://pr6jindruf6ikbp6.public.blob.vercel-storage.com/shibuichi.webp",
    description: "Traditional Japanese alloy with unique gray-purple color. Changes color with patination.",
    uses: "Used in Japanese art jewelry, mokume-gane, and unique art pieces. Prized for its subtle color variations.",
    components: [
      { name: "Copper", percentage: 75.0 },
      { name: "Silver", percentage: 25.0 },
    ],
  },
]

// Calculate alloy price per gram based on current metal prices
export function calculateAlloyPrice(alloy: Alloy, metalPrices: Record<string, number>): number {
  return alloy.components.reduce((total, component) => {
    const symbol = METAL_TO_SYMBOL[component.name as keyof typeof METAL_TO_SYMBOL]
    const price = metalPrices[symbol] || 0
    return total + (price * component.percentage / 100)
  }, 0)
}

// Calculate component prices for an alloy based on current metal prices
export function calculateComponentPrices(alloy: Alloy, metalPrices: Record<string, number>) {
  return alloy.components.map(component => {
    const symbol = METAL_TO_SYMBOL[component.name as keyof typeof METAL_TO_SYMBOL]
    const pricePerGram = metalPrices[symbol] || 0
    return {
      ...component,
      pricePerGram,
    }
  })
}

