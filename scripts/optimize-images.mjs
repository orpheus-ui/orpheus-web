import sharp from "sharp";
import fs from "fs/promises";
import path from "path";

const INPUT_DIR = "public/images"; // your source images directory
const OUTPUT_DIR = "public/images/optimized/optimized"; // where optimized images will go

async function optimizeImages() {
  try {
    // Create output directory if it doesn't exist
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    // Get all files from input directory
    const files = await fs.readdir(INPUT_DIR);

    for (const file of files) {
      if (file.match(/\.(jpg|jpeg|png|gif)$/i)) {
        const inputPath = path.join(INPUT_DIR, file);
        const outputName = path.parse(file).name + ".webp";
        const outputPath = path.join(OUTPUT_DIR, outputName);

        await sharp(inputPath)
          .resize(1920, null, {
            // max width 1920px, height auto
            withoutEnlargement: true,
            fit: "inside",
          })
          .webp({
            quality: 65,
            effort: 4,
            nearLossless: false,
          }) // convert to WebP with 80% quality
          .toFile(outputPath);

        console.log(`Optimized: ${file} -> ${outputName}`);
      }
    }
  } catch (error) {
    console.error("Error optimizing images:", error);
  }
}

optimizeImages();
