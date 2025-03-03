import type { Metadata } from "next"
import ClientPage from "./ClientPage"

export const metadata: Metadata = {
  title: "Metal Alloys",
  description: "Calculate required metal amounts for jewelry casting",
}

export default function Home() {
  return <ClientPage />
}

