import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Metal Alloys",
  description: "Calculate required metal amounts for jewelry casting",
  appleWebApp: {
    capable: true,
    title: "Metal Alloys",
    statusBarStyle: "default"
  },
  icons: {
    icon: "https://pr6jindruf6ikbp6.public.blob.vercel-storage.com/Metal%20Alloys%20Rounded%20%281%29-O2faxoBEymSegkQrim4oSf46r43tTo.webp",
    apple: "https://pr6jindruf6ikbp6.public.blob.vercel-storage.com/Metal%20Alloys%20Rounded%20%281%29-O2faxoBEymSegkQrim4oSf46r43tTo.webp",
  }
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

import './globals.css'