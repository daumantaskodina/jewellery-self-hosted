// Conversion matrix using wax as base (1.00) and sterling silver at 10.30
export const conversionMatrix = {
  wax: {
    wax: 1.0,
    "sterling-silver": 10.3,
    "argentium-silver": 10.25,
    "fine-silver": 10.49,
    "yellow-gold-18k": 15.6,
    "yellow-gold-14k": 13.8,
    "rose-gold-14k": 14.1,
    "white-gold-14k": 14.5,
    bronze: 8.8,
    brass: 8.5,
    shibuichi: 9.7,
  },
  "sterling-silver": {
    wax: 0.097,
    "sterling-silver": 1.0,
    "argentium-silver": 0.995,
    "fine-silver": 1.018,
    "yellow-gold-18k": 1.515,
    "yellow-gold-14k": 1.34,
    "rose-gold-14k": 1.369,
    "white-gold-14k": 1.408,
    bronze: 0.854,
    brass: 0.825,
    shibuichi: 0.942,
  },
  // Add reciprocal values for other materials
  "argentium-silver": {
    wax: 0.098,
    "sterling-silver": 1.005,
    "argentium-silver": 1.0,
    "fine-silver": 1.023,
    "yellow-gold-18k": 1.522,
    "yellow-gold-14k": 1.347,
    "rose-gold-14k": 1.376,
    "white-gold-14k": 1.415,
    bronze: 0.859,
    brass: 0.829,
    shibuichi: 0.947,
  },
  // ... similar entries for other materials
}

export const materials = [
  {
    id: "wax",
    name: "Jewelry Wax",
    description: "Standard jewelry casting wax",
  },
  {
    id: "sterling-silver",
    name: "Sterling Silver",
    description: "92.5% silver, 7.5% copper",
  },
  {
    id: "argentium-silver",
    name: "Argentium Silver",
    description: "93.5% silver, 5.5% copper, 1% germanium",
  },
  {
    id: "fine-silver",
    name: "Fine Silver",
    description: "99.9% pure silver",
  },
  {
    id: "yellow-gold-18k",
    name: "18K Yellow Gold",
    description: "75% gold, with silver and copper",
  },
  {
    id: "yellow-gold-14k",
    name: "14K Yellow Gold",
    description: "58.3% gold, with silver and copper",
  },
  {
    id: "rose-gold-14k",
    name: "14K Rose Gold",
    description: "58.3% gold, higher copper content",
  },
  {
    id: "white-gold-14k",
    name: "14K White Gold",
    description: "58.3% gold, with palladium and silver",
  },
  {
    id: "bronze",
    name: "Bronze",
    description: "88% copper, 12% tin",
  },
  {
    id: "brass",
    name: "Brass",
    description: "65% copper, 35% zinc",
  },
  {
    id: "shibuichi",
    name: "Shibuichi",
    description: "75% copper, 25% silver",
  },
]

export function getConversionMultiplier(fromMaterial: string, toMaterial: string): number {
  return conversionMatrix[fromMaterial]?.[toMaterial] || 1
}

