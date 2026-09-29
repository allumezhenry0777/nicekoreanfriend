import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import sharp from "sharp";
import { getPublishedArticles } from "../src/lib/content";

async function main() {
  const images: { label: string; hash: string; bits: number[] }[] = [];
  const errors: string[] = [];
  for (const article of getPublishedArticles()) {
    for (const [slot, url] of [["hero", article.heroImage], ["inline", article.inlineImage]]) {
      const label = `${article.slug}:${slot}`;
      if (!url || !url.startsWith(`/images/articles/${article.slug}-`)) {
        errors.push(`${label}: missing dedicated article image`);
        continue;
      }
      const file = path.join(process.cwd(), "public", url);
      if (!fs.existsSync(file)) {
        errors.push(`${label}: missing file ${url}`);
        continue;
      }
      const { data, info } = await sharp(file).rotate().ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      const hash = createHash("sha256").update(`${info.width}x${info.height}:`).update(data).digest("hex");
      // Difference hash also catches resizing/recompression under new filenames.
      // Similarity is a review flag, not proof that two images are identical.
      const small = await sharp(file).rotate().resize(9, 8, { fit: "fill" }).greyscale().removeAlpha().raw().toBuffer();
      const bits: number[] = [];
      for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) bits.push(Number(small[y * 9 + x] > small[y * 9 + x + 1]));
      }
      for (const previous of images) {
        const distance = bits.reduce((sum, bit, i) => sum + Number(bit !== previous.bits[i]), 0);
        if (hash === previous.hash) errors.push(`Duplicate: ${previous.label} / ${label}`);
        else if (distance <= 4) errors.push(`Visually similar (review required): ${previous.label} / ${label} (distance ${distance}/64)`);
      }
      images.push({ label, hash, bits });
    }
  }
  if (errors.length) throw new Error(errors.join("\n"));
  console.log(`Image audit passed: ${images.length} unique article images; no duplicate or near-duplicate pairs.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
