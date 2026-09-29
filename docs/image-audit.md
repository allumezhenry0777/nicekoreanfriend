# Article image audit — 2026-09-29

Audited all 47 published articles, including both hero and inline images (94 slots).
The original set had 11 groups of pixel-identical images, plus a differently cropped repeat of a currency exchange storefront. Category fallbacks caused most older repeats.

Replaced 21 slots with 11 licensed Unsplash photos and 10 newly generated illustrations. Seven retained category photos now have dedicated article paths. All 94 rendered article images are distinct after pixel-hash, perceptual-hash and contact-sheet review. Unused historical assets are not rendered and were preserved.

Run `npm run check-images` before publishing. It is also part of `prebuild` and rejects missing dedicated artwork, identical decoded pixels, and very similar difference hashes (distance <= 4/64). Perceptual checks cannot detect every crop or edit; review new images visually too. Each new article needs its own two images, including distinct images within the article. Do not copy a photo under a different filename.

See [image credits](article-photo-credits.md) and [asset source metadata](article-image-sources.json). Generated images use the built-in OpenAI image generation tool and carry an AI disclosure on the article; they are conceptual illustrations, not the author's personal travel photography.

## Generation prompt set

Shared direction: photorealistic-natural; one wide 16:9 editorial photographic illustration; natural materials and lighting, one coherent scene, no collage or watermark. Conceptual illustration, not documentary photography. Images were converted to 1200 × 675 WebP for the website.

| Article / slot | Scene prompt |
| --- | --- |
| korea-emergency-numbers / hero | Korean city sidewalk in daylight with a red public emergency assistance handset in a clean glass booth. Buildings softly blurred, phone symbol in foreground, calm practical mood. No person in distress, readable text, numbers or logos; not an actual documented location. |
| korea-emergency-numbers / inline | Tidy open travel first aid pouch on a light wood hotel desk, adhesive bandages, rolled gauze, small flashlight and smartphone face down. Overhead still life in warm daylight. No medicines, readable text or logos. |
| korean-age-and-honorifics / hero | Young Korean adult, middle-aged woman and elderly man conversing on a leafy Seoul neighborhood park bench. Respectful attentive expressions, candid medium-wide composition and afternoon natural light. No text. |
| korean-age-and-honorifics / inline | Close-up of a younger adult's two hands respectfully offering a ceramic tea cup to an older adult across a Korean family dining table. Anatomically correct hands, understated home and warm window light. |
| korean-phrases-for-travelers / hero | Traveler conversing with a Korean fruit vendor at a neighborhood outdoor market; vendor points at tangerines, traveler listens. Candid medium-wide view with fruit and awning. No readable text. |
| korean-phrases-for-travelers / inline | Open pocket notebook and pencil beside a paper cup on a cafe table; traveler's hand practicing the neatly written word 안녕하세요. Overhead close-up, cream and blue palette. No phone or passport. |
| korean-table-manners / hero | Individual Korean place setting: stainless steel rice and soup bowls, spoon and metal chopsticks lying side by side to the right, three banchan dishes on wood. Close high angle, no people or text. |
| korean-table-manners / inline | Two Korean adult friends opposite each other in a casual restaurant; one pours water from a plain pitcher held with both hands into the other's glass. Korean meal visible below, natural hands and warm light. No alcohol, text or logos. |
| korean-identity-verification-guide / inline | Conceptual verification still life: phone with a large green check on an otherwise blank screen, blank ID-sized card face down and neutral closed passport without crest or words, on a navy desk. No personal data, realistic app screenshot, numbers or text. Soft directional daylight. |
| open-bank-account-korea / hero | Foreign adult customer across from a Korean bank employee at a modern consultation desk, handing over a closed passport and blank card. Medium-wide side view, daylight, plants and privacy partitions. No readable signs, bank logos, currency exchange booth or personal data. |
