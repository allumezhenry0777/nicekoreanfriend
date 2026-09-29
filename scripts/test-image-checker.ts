import fs from "node:fs";
import { spawnSync } from "node:child_process";
import sharp from "sharp";

// Run separately from builds: temporarily replace one asset, always restoring it.
async function main() {
  const target = "public/images/articles/korea-emergency-numbers-2.webp";
  const source = "public/images/articles/korea-emergency-numbers-1.webp";
  const original = fs.readFileSync(target);
  try {
    for (const variant of [fs.readFileSync(source), await sharp(source).resize(600, 338).webp({ quality: 75 }).toBuffer()]) {
      fs.writeFileSync(target, variant);
      const result = spawnSync(process.execPath, ["node_modules/tsx/dist/cli.mjs", "scripts/check-images.ts"], { encoding: "utf8" });
      if (result.status !== 1 || !/Duplicate:|Visually similar/.test(result.stderr)) {
        throw new Error(`Duplicate fixture was not rejected: ${result.stdout} ${result.stderr}`);
      }
    }
  } finally {
    fs.writeFileSync(target, original);
  }
  console.log("Image checker rejected identical and resized/recompressed duplicates; original asset restored.");
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
