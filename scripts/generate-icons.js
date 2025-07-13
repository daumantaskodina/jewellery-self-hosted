import sharp from "sharp"
import https from "https"
import { promises as fs } from "fs"
import path from "path"

const sourceImageUrl =
  "https://pr6jindruf6ikbp6.public.blob.vercel-storage.com/Metal%20Alloys%20Rounded%20%281%29-O2faxoBEymSegkQrim4oSf46r43tTo.webp"
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
    // Create the icons directory if it doesn't exist
    const iconsDir = path.join(process.cwd(), "public", "icons")
    await fs.mkdir(iconsDir, { recursive: true })

    // Download the source image
    console.log("Downloading source image...")
    const imageBuffer = await downloadImage(sourceImageUrl)

    // Generate icons for each size
    for (const size of sizes) {
      console.log(`Generating ${size}x${size} icon...`)
      await sharp(imageBuffer)
        .resize(size, size)
        .toFile(path.join(iconsDir, `icon-${size}.png`))
    }

    console.log("Icon generation complete!")
  } catch (error) {
    console.error("Error generating icons:", error)
    process.exit(1)
  }
}

generateIcons()

