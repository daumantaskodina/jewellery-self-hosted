import sharp from "sharp"
import https from "https"
import { promises as fs } from "fs"

const sourceImageUrl =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-02%20at%2015.31.43-uFLRtWXWD4BqV54zHkp66FmUWgtoIV.png"
const sizes = [192, 512]

async function downloadImage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      const chunks = []
      response.on("data", (chunk) => chunks.push(chunk))
      response.on("end", () => resolve(Buffer.concat(chunks)))
      response.on("error", reject)
    })
  })
}

async function generateIcons() {
  try {
    // Create icons directory if it doesn't exist
    await fs.mkdir("public/icons", { recursive: true })

    // Download the source image
    const imageBuffer = await downloadImage(sourceImageUrl)

    // Generate icons for each size
    for (const size of sizes) {
      await sharp(imageBuffer)
        .resize(size, size, {
          fit: "cover",
          position: "center",
        })
        .toFile(`public/icons/icon-${size}.png`)
    }

    console.log("Icons generated successfully!")
  } catch (error) {
    console.error("Error generating icons:", error)
  }
}

generateIcons()

