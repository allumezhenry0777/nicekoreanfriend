/**
 * Generates brand illustration SVGs (navy line-art + taegeuk accents on cream),
 * matching the logo. Two per published article + two per category (for drafts).
 * Output: public/images/articles/*.svg and public/images/categories/*.svg
 */
import fs from "node:fs";
import path from "node:path";

const NAVY = "#13294B";
const RED = "#E8434E";
const BLUE = "#2B5BD7";
const CREAM = "#FAF7F2";

const ART_DIR = path.join(process.cwd(), "public/images/articles");
const CAT_DIR = path.join(process.cwd(), "public/images/categories");
fs.mkdirSync(ART_DIR, { recursive: true });
fs.mkdirSync(CAT_DIR, { recursive: true });

// A 16:9 card: soft cream gradient, subtle band, centered 200x200 motif slot.
function card(motif, accent = RED) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450" role="img">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="${CREAM}"/>
<stop offset="1" stop-color="#F2ECE1"/>
</linearGradient>
</defs>
<rect width="800" height="450" fill="url(#bg)"/>
<circle cx="690" cy="80" r="130" fill="${accent}" opacity="0.07"/>
<circle cx="110" cy="400" r="100" fill="${BLUE}" opacity="0.05"/>
<g transform="translate(285 100) scale(2.3)">${motif}</g>
<rect x="44" y="406" width="52" height="8" rx="4" fill="${accent}"/>
</svg>`;
}

// Small taegeuk (used as a recurring brand mark inside scenes)
const taegeuk = (cx, cy, r, rot = -18) =>
  `<g transform="rotate(${rot} ${cx} ${cy})"><circle cx="${cx}" cy="${cy}" r="${r}" fill="${BLUE}"/><path d="M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy} A ${r / 2} ${r / 2} 0 0 1 ${cx} ${cy} A ${r / 2} ${r / 2} 0 0 0 ${cx - r} ${cy} Z" fill="${RED}"/></g>`;

const S = (d, w = 5, fill = "none", stroke = NAVY) =>
  `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;

// ---- Motifs (drawn in a ~100x100 box) ----
const motifs = {
  // transit card with a tap wave
  card_tap: `${S("M12 30 h64 a6 6 0 0 1 6 6 v34 a6 6 0 0 1 -6 6 h-64 a6 6 0 0 1 -6 -6 v-34 a6 6 0 0 1 6 -6 Z", 5, CREAM)}
    <rect x="18" y="42" width="24" height="16" rx="3" fill="${BLUE}"/>${S("M60 44 a14 14 0 0 1 0 24", 4, "none", RED)}${S("M66 40 a20 20 0 0 1 0 32", 4, "none", RED)}`,
  // subway turnstile / gate
  gate: `${S("M20 78 v-40 a10 10 0 0 1 20 0 v40", 5)}${S("M60 78 v-40 a10 10 0 0 1 20 0 v40", 5)}${S("M40 58 h20", 6, "none", RED)}<circle cx="50" cy="30" r="6" fill="${BLUE}"/>`,
  // subway train front
  train: `${S("M24 22 h52 a8 8 0 0 1 8 8 v40 a6 6 0 0 1 -6 6 h-56 a6 6 0 0 1 -6 -6 v-40 a8 8 0 0 1 8 -8 Z", 5, CREAM)}<rect x="30" y="34" width="16" height="14" rx="2" fill="${BLUE}"/><rect x="54" y="34" width="16" height="14" rx="2" fill="${BLUE}"/><circle cx="36" cy="62" r="4" fill="${RED}"/><circle cx="64" cy="62" r="4" fill="${RED}"/>${S("M30 82 l-6 8 M70 82 l6 8", 4)}`,
  // exit sign with number
  exit: `${S("M18 24 h64 a6 6 0 0 1 6 6 v30 a6 6 0 0 1 -6 6 h-64 a6 6 0 0 1 -6 -6 v-30 a6 6 0 0 1 6 -6 Z", 5, NAVY, NAVY)}<text x="34" y="54" font-family="sans-serif" font-size="26" font-weight="800" fill="${CREAM}">9</text>${S("M52 45 h20 M64 37 l8 8 l-8 8", 4, "none", RED)}`,
  // smartphone with app grid
  phone: `${S("M32 12 h36 a8 8 0 0 1 8 8 v60 a8 8 0 0 1 -8 8 h-36 a8 8 0 0 1 -8 -8 v-60 a8 8 0 0 1 8 -8 Z", 5, CREAM)}<rect x="35" y="26" width="12" height="12" rx="3" fill="${BLUE}"/><rect x="53" y="26" width="12" height="12" rx="3" fill="${RED}"/><rect x="35" y="44" width="12" height="12" rx="3" fill="${RED}"/><rect x="53" y="44" width="12" height="12" rx="3" fill="${BLUE}"/><circle cx="50" cy="74" r="3" fill="${NAVY}"/>`,
  // map pin
  pin: `${S("M50 16 a24 24 0 0 1 24 24 c0 18 -24 44 -24 44 s-24 -26 -24 -44 a24 24 0 0 1 24 -24 Z", 5, CREAM)}${taegeuk(50, 40, 11)}`,
  // phone handset with 119
  phone_call: `${S("M28 20 a8 8 0 0 1 11 -1 l8 8 a6 6 0 0 1 0 8 l-4 4 a30 30 0 0 0 14 14 l4 -4 a6 6 0 0 1 8 0 l8 8 a8 8 0 0 1 -1 11 c-24 16 -60 -20 -48 -48 Z", 5, CREAM)}<text x="60" y="34" font-family="sans-serif" font-size="16" font-weight="800" fill="${RED}">119</text>`,
  // shield check
  shield: `${S("M50 14 l30 10 v22 c0 22 -16 34 -30 40 c-14 -6 -30 -18 -30 -40 v-22 Z", 5, CREAM)}${S("M38 48 l9 9 l17 -19", 6, "none", RED)}`,
  // convenience store front
  store: `${S("M18 40 l6 -18 h52 l6 18", 5)}${S("M20 40 h60 v40 h-60 Z", 5, CREAM)}<rect x="44" y="56" width="14" height="24" fill="${BLUE}" opacity="0.8"/>${S("M20 40 h60", 5, "none", RED)}<circle cx="30" cy="50" r="3" fill="${RED}"/>`,
  // triangle kimbap + cup noodle
  kimbap: `${S("M30 74 l-14 -34 a4 4 0 0 1 3 -6 h22 a4 4 0 0 1 3 6 Z", 5, CREAM)}<path d="M24 62 l6 12 l6 -12 Z" fill="${NAVY}"/>${S("M56 40 h28 l-4 34 a4 4 0 0 1 -4 4 h-12 a4 4 0 0 1 -4 -4 Z", 5, CREAM)}${S("M54 40 h32", 5, "none", RED)}<path d="M62 30 q4 -6 8 0 M72 30 q4 -6 8 0" fill="none" stroke="${BLUE}" stroke-width="3"/>`,
  // call bell
  bell: `${S("M26 66 a24 24 0 0 1 48 0 Z", 5, CREAM)}${S("M22 66 h56", 6)}<circle cx="50" cy="30" r="6" fill="${RED}"/>${S("M50 36 v6", 5)}`,
  // rice bowl with chopsticks
  bowl: `${S("M22 48 a28 28 0 0 0 56 0 Z", 5, CREAM)}${S("M18 48 h64", 6, "none", RED)}${S("M54 44 l24 -26 M60 46 l22 -20", 4, "none", NAVY)}<path d="M34 44 a12 8 0 0 1 20 0" fill="${BLUE}" opacity="0.7"/>`,
  // bibimbap (bowl with segments)
  bibimbap: `${S("M20 46 a30 30 0 0 0 60 0 Z", 5, CREAM)}${S("M16 46 h68", 6)}<path d="M50 46 l-24 0 a24 24 0 0 1 8 -16 Z" fill="${BLUE}" opacity="0.65"/><path d="M50 46 l0 -24 a24 24 0 0 1 16 8 Z" fill="${RED}" opacity="0.7"/><circle cx="50" cy="40" r="5" fill="${NAVY}"/>`,
  // chili spice scale
  chili: `${S("M32 34 q-6 -14 8 -18 q-2 10 6 12", 4, "none", NAVY)}${S("M30 36 q18 4 30 22 q10 16 -4 26 q-24 6 -30 -20 q-4 -18 4 -28 Z", 5, RED)}`,
  // shoes off (pair of shoes)
  shoes: `${S("M18 62 q0 -12 8 -12 q4 8 14 8 q10 0 14 6 q2 8 -6 8 h-24 q-6 0 -6 -10 Z", 5, CREAM)}${S("M46 62 q0 -12 8 -12 q4 8 14 8 q10 0 14 6 q2 8 -6 8 h-24 q-6 0 -6 -10 Z", 5, CREAM)}${S("M20 66 h20 M48 66 h20", 4, "none", RED)}`,
  // bow / two-hand greeting (person)
  greet: `<circle cx="50" cy="28" r="12" fill="none" stroke="${NAVY}" stroke-width="5"/>${S("M28 78 q0 -24 22 -24 q22 0 22 24", 5)}${S("M40 60 q10 8 20 0", 5, "none", RED)}`,
  // pouring drink (two cups)
  pour: `${S("M24 44 l4 30 a4 4 0 0 0 4 4 h10 a4 4 0 0 0 4 -4 l4 -30 Z", 5, CREAM)}${S("M58 40 l3 22 a3 3 0 0 0 3 3 h8 a3 3 0 0 0 3 -3 l3 -22 Z", 5, CREAM)}${S("M50 30 q6 6 8 12", 4, "none", BLUE)}<path d="M48 30 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0" fill="${RED}"/>`,
  // speech bubble with hangul-like strokes
  speech: `${S("M18 22 h64 a8 8 0 0 1 8 8 v28 a8 8 0 0 1 -8 8 h-34 l-16 14 l3 -14 h-9 a8 8 0 0 1 -8 -8 v-28 a8 8 0 0 1 8 -8 Z", 5, CREAM)}${S("M32 38 v14 M32 45 h12 M52 38 v14 M52 38 h12 M52 45 h12 M52 52 h12", 4, "none", NAVY)}`,
  // annyeong hand wave
  wave: `${S("M40 78 v-30 M40 52 v-16 a4 4 0 0 1 8 0 v14 M48 50 v-18 a4 4 0 0 1 8 0 v16 M56 50 v-14 a4 4 0 0 1 8 0 v18 q0 22 -14 24 q-18 0 -22 -18", 5, CREAM)}${S("M30 24 l6 6 M46 18 v8 M62 24 l-6 6", 4, "none", RED)}`,
  // iced americano
  iced: `${S("M30 30 h40 l-4 48 a5 5 0 0 1 -5 4 h-22 a5 5 0 0 1 -5 -4 Z", 5, CREAM)}<path d="M33 44 h34 l-3 34 a3 3 0 0 1 -3 3 h-22 a3 3 0 0 1 -3 -3 Z" fill="${NAVY}" opacity="0.82"/>${S("M40 30 v-8 h20 v8", 4, "none", RED)}<rect x="47" y="16" width="6" height="20" rx="3" fill="${BLUE}"/>`,
  // cafe cup + vibration bell
  cafe: `${S("M28 40 h30 v22 a11 11 0 0 1 -11 11 h-8 a11 11 0 0 1 -11 -11 Z", 5, CREAM)}${S("M58 44 h6 a6 6 0 0 1 0 12 h-6", 5)}${S("M40 30 q4 -6 0 -10 M48 30 q4 -6 0 -10", 4, "none", RED)}${taegeuk(74, 66, 8)}`,
  // age numbers in bubbles
  age: `${S("M20 26 h30 a6 6 0 0 1 6 6 v18 a6 6 0 0 1 -6 6 h-16 l-10 8 l2 -8 h-6 a6 6 0 0 1 -6 -6 v-18 a6 6 0 0 1 6 -6 Z", 5, CREAM)}<text x="28" y="47" font-family="sans-serif" font-size="18" font-weight="800" fill="${BLUE}">28</text>${S("M52 60 h22 a6 6 0 0 1 6 6 v14 a6 6 0 0 1 -6 6 h-14 l-8 6 l2 -6 h-2 a6 6 0 0 1 -6 -6 v-14 a6 6 0 0 1 6 -6 Z", 5, CREAM)}<text x="58" y="82" font-family="sans-serif" font-size="15" font-weight="800" fill="${RED}">99</text>`,
  // relationship / two people
  people: `<circle cx="36" cy="30" r="10" fill="none" stroke="${NAVY}" stroke-width="5"/><circle cx="66" cy="34" r="9" fill="none" stroke="${BLUE}" stroke-width="5"/>${S("M18 76 q0 -20 18 -20 q10 0 15 7", 5)}${S("M50 76 q2 -18 16 -18 q16 0 16 18", 5, "none", BLUE)}`,
  // night street lamp
  lamp: `${S("M50 82 v-56 M50 26 a12 12 0 0 1 20 0 M50 26 a12 12 0 0 0 -20 0", 5)}<path d="M30 26 h40 l-6 12 h-28 Z" fill="${RED}" opacity="0.85"/><circle cx="76" cy="20" r="6" fill="${BLUE}" opacity="0.6"/><circle cx="20" cy="30" r="4" fill="${BLUE}" opacity="0.5"/>`,
  // airplane
  plane: `${S("M18 54 l64 -22 a6 6 0 0 1 6 10 l-14 10 l-6 26 l-8 -2 l-2 -18 l-18 8 l-2 12 l-6 -2 l0 -12 l-14 -6 a4 4 0 0 1 4 -8 Z", 5, CREAM)}${taegeuk(64, 40, 6)}`,
  // passport
  passport: `${S("M26 16 h40 a4 4 0 0 1 4 4 v60 a4 4 0 0 1 -4 4 h-40 Z", 5, CREAM)}${S("M26 16 v68", 6, "none", RED)}<circle cx="48" cy="42" r="12" fill="none" stroke="${BLUE}" stroke-width="4"/>${S("M40 66 h20", 4)}`,
  // won coin
  won: `<circle cx="50" cy="48" r="30" fill="none" stroke="${NAVY}" stroke-width="5"/>${S("M36 40 l6 18 l8 -14 l8 14 l6 -18 M34 46 h32 M34 52 h32", 4, "none", RED)}`,
  // bus
  bus: `${S("M20 28 h60 a6 6 0 0 1 6 6 v36 h-72 v-36 a6 6 0 0 1 6 -6 Z", 5, CREAM)}<rect x="26" y="36" width="48" height="18" rx="3" fill="${BLUE}" opacity="0.7"/><circle cx="32" cy="76" r="6" fill="${NAVY}"/><circle cx="68" cy="76" r="6" fill="${NAVY}"/>${S("M14 60 h72", 5, "none", RED)}`,
  // SIM card
  sim: `${S("M30 18 h28 l16 16 v48 a4 4 0 0 1 -4 4 h-40 a4 4 0 0 1 -4 -4 v-60 a4 4 0 0 1 4 -4 Z", 5, CREAM)}<rect x="38" y="46" width="24" height="24" rx="4" fill="none" stroke="${BLUE}" stroke-width="4"/>${S("M50 46 v24 M38 58 h24", 3, "none", RED)}`,
  // wifi
  wifi: `${S("M22 42 a40 40 0 0 1 56 0", 5, "none", NAVY)}${S("M32 54 a26 26 0 0 1 36 0", 5, "none", BLUE)}${S("M42 66 a12 12 0 0 1 16 0", 5, "none", RED)}<circle cx="50" cy="78" r="4" fill="${NAVY}"/>`,
  // house
  house: `${S("M20 48 l30 -26 l30 26", 5)}${S("M28 44 v34 h44 v-34", 5, CREAM)}<rect x="44" y="58" width="12" height="20" fill="${BLUE}" opacity="0.75"/>${S("M20 48 l30 -26 l30 26", 5, "none", RED)}`,
  // moving box
  box: `${S("M22 40 l28 -14 l28 14 v30 l-28 14 l-28 -14 Z", 5, CREAM)}${S("M22 40 l28 14 l28 -14 M50 54 v30", 4)}${S("M38 33 l28 14", 4, "none", RED)}`,
  // medical cross
  cross: `<circle cx="50" cy="48" r="30" fill="none" stroke="${NAVY}" stroke-width="5"/><path d="M44 34 h12 v10 h10 v12 h-10 v10 h-12 v-10 h-10 v-12 h10 Z" fill="${RED}"/>`,
  // pharmacy pill
  pill: `${S("M30 40 a16 16 0 0 1 22 -22 l18 18 a16 16 0 0 1 -22 22 l-18 -18 Z", 5, CREAM)}${S("M41 29 l18 18", 5, "none", RED)}<circle cx="38" cy="60" r="10" fill="${BLUE}" opacity="0.7"/>`,
};

// ---- Article → [motifA, accentA, motifB, accentB] ----
const articleArt = {
  "t-money-card-guide": ["card_tap", RED, "gate", BLUE],
  "seoul-subway-guide": ["train", BLUE, "exit", RED],
  "essential-apps-korea": ["phone", BLUE, "pin", RED],
  "korea-emergency-numbers": ["phone_call", RED, "shield", BLUE],
  "korean-convenience-store-guide": ["store", RED, "kimbap", BLUE],
  "how-to-order-korean-restaurant": ["bell", RED, "bowl", BLUE],
  "korean-dishes-for-beginners": ["bibimbap", RED, "chili", RED],
  "korean-etiquette-basics": ["shoes", BLUE, "greet", RED],
  "korean-table-manners": ["bowl", BLUE, "pour", RED],
  "korean-phrases-for-travelers": ["speech", BLUE, "wave", RED],
  "korean-cafe-culture": ["iced", BLUE, "cafe", RED],
  "korean-age-and-honorifics": ["age", BLUE, "people", RED],
  "is-korea-safe": ["shield", BLUE, "lamp", RED],
};

// ---- Category → [motifA, accentA, motifB, accentB] ----
const categoryArt = {
  "first-72-hours": ["plane", BLUE, "passport", RED],
  "money-banking": ["won", RED, "card_tap", BLUE],
  "getting-around": ["train", BLUE, "bus", RED],
  "phone-internet": ["sim", BLUE, "wifi", RED],
  "food-dining": ["bowl", RED, "iced", BLUE],
  "living-in-korea": ["house", BLUE, "box", RED],
  "health-safety": ["cross", RED, "pill", BLUE],
  "culture-etiquette": ["greet", BLUE, "speech", RED],
};

let n = 0;
for (const [slug, [mA, aA, mB, aB]] of Object.entries(articleArt)) {
  fs.writeFileSync(path.join(ART_DIR, `${slug}-1.svg`), card(motifs[mA], aA));
  fs.writeFileSync(path.join(ART_DIR, `${slug}-2.svg`), card(motifs[mB], aB));
  n += 2;
}
for (const [slug, [mA, aA, mB, aB]] of Object.entries(categoryArt)) {
  fs.writeFileSync(path.join(CAT_DIR, `${slug}-1.svg`), card(motifs[mA], aA));
  fs.writeFileSync(path.join(CAT_DIR, `${slug}-2.svg`), card(motifs[mB], aB));
  n += 2;
}
console.log(`Generated ${n} illustration SVGs.`);
