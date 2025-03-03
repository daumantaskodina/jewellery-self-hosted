export const alloys = [
  {
    id: "sterling-silver",
    name: "Sterling Silver",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/argentum-Olckop5lLUWCeX3gAWqZjOVYm1T80O.webp", // Using Argentium image as it shows similar properties
    description:
      "The most common silver alloy used in jewelry making. Perfect for everyday wear jewelry due to its durability and beautiful luster.",
    uses: "Commonly used for rings, necklaces, bracelets, and decorative items. Ideal for intricate designs and filigree work.",
    pricePerGram: 0.76,
    components: [
      { name: "Silver", percentage: 92.5, pricePerGram: 0.82 },
      { name: "Copper", percentage: 7.5, pricePerGram: 0.03 },
    ],
  },
  {
    id: "argentium-silver",
    name: "Argentium Silver",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/argentum-Olckop5lLUWCeX3gAWqZjOVYm1T80O.webp",
    description:
      "A modern, tarnish-resistant silver alloy containing germanium. Higher purity than sterling silver with improved durability.",
    uses: "Perfect for high-end jewelry pieces where tarnish resistance is crucial. Excellent for wedding rings and premium jewelry.",
    pricePerGram: 0.85,
    components: [
      { name: "Silver", percentage: 93.5, pricePerGram: 0.82 },
      { name: "Copper", percentage: 5.5, pricePerGram: 0.03 },
      { name: "Germanium", percentage: 1.0, pricePerGram: 2.45 },
    ],
  },
  {
    id: "yellow-gold-18k",
    name: "18K Yellow Gold",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/14%20k%20gold.jpg-lC8OtGV0fSXSwJarhBLPtm7zYHtSRA.jpeg",
    description: "Traditional gold color with high purity (75% gold). Excellent balance between purity and durability.",
    uses: "Perfect for high-end jewelry, engagement rings, and special occasion pieces. Popular in European and Asian markets.",
    pricePerGram: 43.5,
    components: [
      { name: "Gold", percentage: 75.0, pricePerGram: 57.2 },
      { name: "Silver", percentage: 12.5, pricePerGram: 0.78 },
      { name: "Copper", percentage: 12.5, pricePerGram: 0.01 },
    ],
  },
  {
    id: "yellow-gold-14k",
    name: "14K Yellow Gold",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/14%20k%20gold.jpg-lC8OtGV0fSXSwJarhBLPtm7zYHtSRA.jpeg",
    description: "Most popular gold alloy in the US. Good balance between durability and gold content.",
    uses: "Versatile alloy suitable for everyday wear jewelry, engagement rings, and commercial jewelry pieces.",
    pricePerGram: 34.0,
    components: [
      { name: "Gold", percentage: 58.3, pricePerGram: 57.2 },
      { name: "Silver", percentage: 20.8, pricePerGram: 0.78 },
      { name: "Copper", percentage: 20.9, pricePerGram: 0.01 },
    ],
  },
  {
    id: "rose-gold-14k",
    name: "14K Rose Gold",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pink.jpg-zUh1qBEDAmf9PGE49jJYFNIL7F7OLM.jpeg",
    description: "Beautiful pink-hued gold due to higher copper content. Modern and romantic appearance.",
    uses: "Popular for engagement rings, romantic jewelry pieces, and vintage-style designs. Growing trend in contemporary jewelry.",
    pricePerGram: 33.6,
    components: [
      { name: "Gold", percentage: 58.3, pricePerGram: 57.2 },
      { name: "Copper", percentage: 37.5, pricePerGram: 0.01 },
      { name: "Silver", percentage: 4.2, pricePerGram: 0.78 },
    ],
  },
  {
    id: "white-gold-14k",
    name: "14K White Gold",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/argentum-Olckop5lLUWCeX3gAWqZjOVYm1T80O.webp", // Using Argentium image as it shows similar white color
    description:
      "Modern alternative to platinum. Bright white color achieved through palladium alloy and rhodium plating.",
    uses: "Popular for engagement rings, wedding bands, and modern jewelry designs. Good alternative to platinum.",
    pricePerGram: 35.2,
    components: [
      { name: "Gold", percentage: 58.3, pricePerGram: 57.2 },
      { name: "Palladium", percentage: 25.0, pricePerGram: 47.5 },
      { name: "Silver", percentage: 16.7, pricePerGram: 0.78 },
    ],
  },
  {
    id: "bronze",
    name: "Bronze",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bronze-xrsxAYexYOtCqkCobEXrDCe46pjR2R.webp",
    description: "Classic copper-tin alloy with warm, golden color. Develops beautiful patina over time.",
    uses: "Used in artistic jewelry, sculptures, and alternative metal jewelry. Popular in steampunk and rustic designs.",
    pricePerGram: 0.04,
    components: [
      { name: "Copper", percentage: 88.0, pricePerGram: 0.01 },
      { name: "Tin", percentage: 12.0, pricePerGram: 0.23 },
    ],
  },
  {
    id: "brass",
    name: "Brass",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/brass-NshwaqjDJXWwDmrlNmQiR6rKdaUFtC.webp",
    description: "Yellow-colored copper-zinc alloy. More affordable alternative with good workability.",
    uses: "Common in costume jewelry, decorative pieces, and components. Popular in bohemian and ethnic jewelry styles.",
    pricePerGram: 0.03,
    components: [
      { name: "Copper", percentage: 65.0, pricePerGram: 0.01 },
      { name: "Zinc", percentage: 35.0, pricePerGram: 0.05 },
    ],
  },
  {
    id: "shibuichi",
    name: "Shibuichi",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Shibuichi%20Metal%208mm-tS93yKKIalFf33fZ6o3DBcsJ1QlHL9.webp",
    description: "Traditional Japanese alloy with unique gray-purple color. Changes color with patination.",
    uses: "Used in Japanese art jewelry, mokume-gane, and unique art pieces. Prized for its subtle color variations.",
    pricePerGram: 0.23,
    components: [
      { name: "Copper", percentage: 75.0, pricePerGram: 0.01 },
      { name: "Silver", percentage: 25.0, pricePerGram: 0.78 },
    ],
  },
]

