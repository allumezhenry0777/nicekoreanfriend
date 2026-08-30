/**
 * One-shot generator for placeholder content:
 *   - 8 category hub files      → content/categories/*.mdx
 *   - 2 author profiles         → content/authors/*.mdx
 *   - 40 draft articles         → content/articles/*.mdx
 *
 * Safe to re-run: it only writes files that don't exist yet (pass --force to overwrite).
 * All article bodies are DRAFTS with [VERIFY] placeholders — no invented facts.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(process.cwd(), "content");
const FORCE = process.argv.includes("--force");
const TODAY = "2026-08-30";

const categories = [
  {
    slug: "first-72-hours",
    name: "First 72 Hours",
    emoji: "🛬",
    order: 1,
    shortDescription:
      "Airport to city, SIM to subway card — everything to sort out in your first three days in Korea, in the right order.",
    body: `Your first three days in Korea set the tone for the whole trip. This hub walks you through them in order: getting out of Incheon Airport without overpaying, getting online, loading the apps that replace Google Maps here, and dodging the classic first-day mistakes. Start with the arrival guide, or use the [Start Here checklist](/start-here) to track your progress.`,
  },
  {
    slug: "money-banking",
    name: "Money & Banking",
    emoji: "💳",
    order: 2,
    shortDescription:
      "Cards, cash, ATMs, exchange and — if you're staying — how to open a real Korean bank account as a foreigner.",
    body: `Korea is one of the most card-friendly countries on earth, yet foreigners still hit money walls: ATMs that reject overseas cards, apps that demand a local account, exchange booths with wildly different rates. These guides cover paying as a visitor and banking as a resident, without the jargon.`,
  },
  {
    slug: "getting-around",
    name: "Getting Around",
    emoji: "🚇",
    order: 3,
    shortDescription:
      "T-money, subways, taxis, KTX and buses — how to move around Seoul and cross the country cheaply and confidently.",
    body: `Korean public transport is excellent — once you know the system. One transit card works nationwide, the subway signs are in English, and taxis are app-hailed. These guides get you from “staring at the fare machine” to moving like a local, in Seoul and beyond.`,
  },
  {
    slug: "phone-internet",
    name: "Phone & Internet",
    emoji: "📱",
    order: 4,
    shortDescription:
      "eSIMs, prepaid SIMs, pocket WiFi and real phone plans — how to get (and stay) connected in Korea.",
    body: `Being offline in Korea is a bigger handicap than in most countries — maps, translation, taxis and even restaurant menus assume you're connected. These guides compare every way to get online, from a two-week eSIM to a proper resident phone plan.`,
  },
  {
    slug: "food-dining",
    name: "Food & Dining",
    emoji: "🍜",
    order: 5,
    shortDescription:
      "How to order, what to try first, convenience-store dinners and delivery apps — eating well in Korea, stress-free.",
    body: `Korean food culture has its own operating system: table-side bells, tablet ordering, side dishes that refill themselves, convenience stores that double as restaurants. These guides make your first meals easy and your later ones adventurous.`,
  },
  {
    slug: "living-in-korea",
    name: "Living in Korea",
    emoji: "🏠",
    order: 6,
    shortDescription:
      "Residence cards, renting, recycling rules and daily-life logistics for people staying longer than a holiday.",
    body: `Moving to Korea means a second arrival: the paperwork one. Residence card, housing deposits, trash rules your neighbors definitely notice. These guides handle the unglamorous parts of settling in, so the fun parts stay fun.`,
  },
  {
    slug: "health-safety",
    name: "Health & Safety",
    emoji: "🏥",
    order: 7,
    shortDescription:
      "Insurance, pharmacies, seeing a doctor in English and the emergency numbers to save before you need them.",
    body: `Korea's healthcare is fast and affordable — if you know how to use it. These guides cover the national insurance system, what pharmacists can (and can't) sell you, and exactly what to do when something goes wrong at 2 a.m.`,
  },
  {
    slug: "culture-etiquette",
    name: "Culture & Etiquette",
    emoji: "🙇",
    order: 8,
    shortDescription:
      "The customs that actually matter, the myths that don't, and the phrases that make Koreans light up.",
    body: `You don't need to be perfect — Koreans are famously forgiving of visitors. But a handful of customs really do matter, a few “rules” you read online are myths, and twenty phrases will carry you through most days. This hub separates the real from the noise.`,
  },
];

const authors = [
  {
    slug: "minji",
    name: "Minji Park",
    role: "Co-founder & Editor — Seoul native",
    shortBio:
      "Born and raised in Seoul, Minji spent years answering the same questions from foreign friends before deciding to write the answers down properly.",
    body: `Minji grew up in Seoul and has been the designated “Korean friend” for exchange students, coworkers and travel buddies for over a decade. She covers food, culture, etiquette and the little unwritten rules locals forget are unwritten.

Her editing rule: if her foreign friends would still have a follow-up question after reading a guide, the guide isn't finished.

**Beat:** food & dining, culture & etiquette, getting around
**Languages:** Korean (native), English`,
  },
  {
    slug: "jun",
    name: "Jun Lee",
    role: "Co-founder & Writer — repatriated Korean",
    shortBio:
      "Jun grew up abroad, moved back to Korea as an adult, and hit every foreigner problem himself — visa runs, bank rejections, apartment contracts — with a Korean passport and an outsider's confusion.",
    body: `Jun is Korean on paper and foreign in experience: he grew up overseas and moved to Seoul as an adult, which means he has personally stood in the wrong immigration line, been rejected for a bank account, and mistranslated a lease clause. He writes the survival-paperwork guides so you don't repeat his mistakes.

His writing rule: every step in a how-to must have actually been done, by him, recently.

**Beat:** money & banking, living in Korea, phone & internet, health & safety
**Languages:** English (native), Korean (fluent)`,
  },
];

/* 40 articles — 5 per category. author alternates by beat. */
const articles = [
  // first-72-hours
  ["first-72-hours", "incheon-airport-arrival-guide", "Landing at Incheon: A Step-by-Step Arrival Guide", "how-to", "jun", ["incheon", "airport", "arrival"]],
  ["first-72-hours", "incheon-to-seoul-transport", "Incheon Airport to Seoul: AREX, Bus or Taxi Compared", "comparison", "jun", ["incheon", "arex", "airport-bus"]],
  ["first-72-hours", "essential-apps-korea", "The 9 Apps You Actually Need in Korea", "listicle", "minji", ["apps", "naver-map", "kakaotalk"]],
  ["first-72-hours", "first-night-korea-plan", "Your First Night in Korea: A No-Stress Evening Plan", "how-to", "minji", ["jet-lag", "first-night", "convenience-store"]],
  ["first-72-hours", "korea-first-day-mistakes", "7 First-Day Mistakes Visitors Make in Korea", "listicle", "minji", ["mistakes", "tips", "arrival"]],
  // money-banking
  ["money-banking", "cash-vs-card-korea", "Cash or Card in Korea? What Actually Works Where", "explainer", "jun", ["cash", "credit-card", "payments"]],
  ["money-banking", "open-bank-account-korea", "How to Open a Korean Bank Account as a Foreigner", "how-to", "jun", ["bank-account", "arc", "residency"]],
  ["money-banking", "korea-atm-guide", "Using ATMs in Korea: Global ATMs, Fees and Limits", "explainer", "jun", ["atm", "withdrawal", "fees"]],
  ["money-banking", "currency-exchange-korea", "Where to Exchange Money in Korea (and Where Not To)", "explainer", "jun", ["exchange", "won", "myeongdong"]],
  ["money-banking", "korean-banking-apps-compared", "KakaoBank vs Toss vs Traditional Banks for Foreigners", "comparison", "jun", ["kakaobank", "toss", "banking-apps"]],
  // getting-around
  ["getting-around", "t-money-card-guide", "The T-money Card: How to Buy, Top Up and Use It", "how-to", "minji", ["t-money", "transit-card", "subway"]],
  ["getting-around", "seoul-subway-guide", "Riding the Seoul Subway Like a Local", "explainer", "minji", ["subway", "seoul", "transfers"]],
  ["getting-around", "korea-taxi-apps", "Taxis in Korea: Kakao T, International Taxi and Street Hailing", "explainer", "jun", ["taxi", "kakao-t", "apps"]],
  ["getting-around", "ktx-train-guide", "Booking KTX Trains: Routes, Prices and Seat Tips", "how-to", "jun", ["ktx", "train", "busan"]],
  ["getting-around", "ktx-vs-express-bus", "KTX vs Express Bus: Choosing How to Cross Korea", "comparison", "minji", ["ktx", "express-bus", "intercity"]],
  // phone-internet
  ["phone-internet", "esim-vs-sim-vs-pocket-wifi-korea", "eSIM vs SIM Card vs Pocket WiFi in Korea", "comparison", "jun", ["esim", "sim", "pocket-wifi"]],
  ["phone-internet", "korea-esim-setup-guide", "Setting Up a Korean eSIM Before You Fly", "how-to", "jun", ["esim", "setup", "data-plan"]],
  ["phone-internet", "korea-prepaid-sim-guide", "Buying a Prepaid SIM Card After You Land", "how-to", "jun", ["prepaid-sim", "airport", "kt"]],
  ["phone-internet", "korea-phone-plan-residents", "Getting a Real Korean Phone Plan as a Resident", "explainer", "jun", ["phone-plan", "mvno", "arc"]],
  ["phone-internet", "korea-public-wifi-guide", "Public WiFi in Korea: Where It Works and How to Stay Safe", "explainer", "minji", ["wifi", "security", "cafes"]],
  // food-dining
  ["food-dining", "korean-convenience-store-guide", "The Korean Convenience Store Survival Guide", "explainer", "minji", ["convenience-store", "gs25", "cu"]],
  ["food-dining", "how-to-order-korean-restaurant", "How to Order in a Korean Restaurant (Tablets, Bells and All)", "how-to", "minji", ["ordering", "restaurant", "etiquette"]],
  ["food-dining", "korean-dishes-for-beginners", "12 Korean Dishes to Try First (and What's In Them)", "listicle", "minji", ["food", "beginners", "spice-level"]],
  ["food-dining", "vegetarian-vegan-korea-guide", "Eating Vegetarian and Vegan in Korea", "explainer", "minji", ["vegetarian", "vegan", "temple-food"]],
  ["food-dining", "korea-food-delivery-apps", "Food Delivery in Korea: Can Foreigners Use Baemin?", "explainer", "jun", ["delivery", "baemin", "coupang-eats"]],
  // living-in-korea
  ["living-in-korea", "arc-residence-card-guide", "Your Residence Card (ARC): Booking, Documents, Pickup", "how-to", "jun", ["arc", "immigration", "hikorea"]],
  ["living-in-korea", "renting-in-korea-explained", "Renting in Korea: Jeonse, Wolse and Key Money Explained", "explainer", "jun", ["housing", "jeonse", "wolse"]],
  ["living-in-korea", "korea-trash-recycling-guide", "Korean Trash and Recycling Rules Without the Panic", "how-to", "minji", ["recycling", "trash", "food-waste"]],
  ["living-in-korea", "first-apartment-setup-korea", "Setting Up Your First Korean Apartment on a Budget", "listicle", "jun", ["apartment", "daiso", "essentials"]],
  ["living-in-korea", "korea-mail-packages-guide", "Receiving Mail and Packages in Korea", "explainer", "jun", ["mail", "packages", "delivery-lockers"]],
  // health-safety
  ["health-safety", "korean-health-insurance-explained", "Korean Health Insurance (NHIS) for Foreigners, Explained", "explainer", "jun", ["nhis", "insurance", "healthcare"]],
  ["health-safety", "korea-pharmacy-guide", "Pharmacies in Korea: What You Can Buy and How to Ask", "how-to", "minji", ["pharmacy", "medicine", "otc"]],
  ["health-safety", "seeing-a-doctor-in-korea", "Seeing a Doctor in Korea Without Speaking Korean", "how-to", "jun", ["doctor", "hospital", "english"]],
  ["health-safety", "korea-emergency-numbers", "Emergency Numbers and Help Lines in Korea", "explainer", "minji", ["emergency", "119", "1330"]],
  ["health-safety", "is-korea-safe", "Is Korea Safe? An Honest Answer for Visitors", "explainer", "minji", ["safety", "solo-travel", "night"]],
  // culture-etiquette
  ["culture-etiquette", "korean-etiquette-basics", "Korean Etiquette Basics: What Matters, What's a Myth", "explainer", "minji", ["etiquette", "customs", "myths"]],
  ["culture-etiquette", "korean-table-manners", "Korean Table Manners: The Friendly Rulebook", "explainer", "minji", ["dining", "chopsticks", "drinking"]],
  ["culture-etiquette", "korean-phrases-for-travelers", "20 Korean Phrases That Do 80% of the Work", "listicle", "minji", ["phrases", "language", "hangul"]],
  ["culture-etiquette", "korean-cafe-culture", "Korean Cafe Culture: Unwritten Rules and How to Order", "explainer", "minji", ["cafe", "coffee", "study-culture"]],
  ["culture-etiquette", "korean-age-and-honorifics", "Korean Age, Honorifics and Why Everyone Asks Your Age", "explainer", "minji", ["age", "honorifics", "language"]],
];

/* H2 outlines per template (site plan §5.2 stand-in). */
const outlines = {
  "how-to": [
    "Before you start",
    "What you need",
    "Step-by-step",
    "What it costs",
    "Common problems (and fixes)",
    "Good to know",
  ],
  explainer: [
    "The short version",
    "How it actually works",
    "What it costs",
    "Common misconceptions",
    "What locals do",
    "Good to know",
  ],
  listicle: [
    "How we chose",
    "The list",
    "Honorable mentions",
    "How to use this list",
  ],
  comparison: [
    "The quick verdict",
    "At a glance",
    "Option by option",
    "Costs compared",
    "Which should you choose?",
  ],
};

const draftPara = (topic) =>
  `> **DRAFT — placeholder text.** This section will be researched and written per the editorial policy. Factual figures will be sourced and verified before publication; unconfirmed values appear as [VERIFY] until then.\n\nPlaceholder: this section of “${topic}” will explain the details here in the friendly, specific Nice Korean Friend voice. Prices and numbers to confirm: [VERIFY] KRW, [VERIFY] minutes, [VERIFY] locations.`;

function articleMdx([category, , title, template, author, tags]) {
  const description = `${title} — a practical, honest guide for visitors and new residents in Korea. (Draft: description to be finalized before publication.)`.slice(0, 168);
  const quickAnswer = `DRAFT: a verified 2–3 sentence answer to “${title}” goes here — the single most useful takeaway a reader needs, with any key figure marked [VERIFY] until confirmed.`;
  const faqs = [
    {
      q: `What is the most important thing to know about ${title.replace(/[?:].*$/, "").trim().toLowerCase()}?`,
      a: `DRAFT: concise verified answer to be written before publication. Key figures will be sourced ([VERIFY]) per the editorial policy.`,
    },
    {
      q: `How much does it cost?`,
      a: `DRAFT: current prices will be checked against official sources immediately before publication. Placeholder value: [VERIFY] KRW.`,
    },
    {
      q: `Do I need to speak Korean for this?`,
      a: `DRAFT: this answer will explain exactly how much Korean (usually none) is needed, with the useful phrases linked from our phrases guide.`,
    },
  ];

  const fm = [
    "---",
    `title: "${title.replace(/"/g, '\\"')}"`,
    `description: "${description.replace(/"/g, '\\"')}"`,
    `category: ${category}`,
    `template: ${template}`,
    `author: ${author}`,
    `datePublished: "${TODAY}"`,
    `dateModified: "${TODAY}"`,
    `tags:`,
    ...tags.map((t) => `  - "${t}"`),
    `quickAnswer: "${quickAnswer.replace(/"/g, '\\"')}"`,
    `faqs:`,
    ...faqs.flatMap((f) => [
      `  - question: "${f.q.replace(/"/g, '\\"')}"`,
      `    answer: "${f.a.replace(/"/g, '\\"')}"`,
    ]),
    `status: draft`,
    "---",
  ].join("\n");

  const body = [
    "",
    `{/* ============================================================
    DRAFT ARTICLE — DO NOT PUBLISH AS-IS.
    Every section below is placeholder text. Replace with researched,
    verified writing and change status to "published" only after all
    [VERIFY] markers are resolved. See /editorial-policy.
   ============================================================ */}`,
    "",
    ...outlines[template].flatMap((h2) => [`## ${h2}`, "", draftPara(title), ""]),
  ].join("\n");

  return fm + "\n" + body;
}

function categoryMdx(c) {
  return [
    "---",
    `name: "${c.name}"`,
    `shortDescription: "${c.shortDescription.replace(/"/g, '\\"')}"`,
    `order: ${c.order}`,
    `emoji: "${c.emoji}"`,
    "---",
    "",
    c.body,
    "",
  ].join("\n");
}

function authorMdx(a) {
  return [
    "---",
    `name: "${a.name}"`,
    `role: "${a.role.replace(/"/g, '\\"')}"`,
    `shortBio: "${a.shortBio.replace(/"/g, '\\"')}"`,
    "---",
    "",
    a.body,
    "",
  ].join("\n");
}

function writeIfMissing(file, content) {
  if (fs.existsSync(file) && !FORCE) {
    console.log(`skip (exists): ${path.relative(process.cwd(), file)}`);
    return false;
  }
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
  console.log(`wrote: ${path.relative(process.cwd(), file)}`);
  return true;
}

let count = 0;
for (const c of categories) {
  if (writeIfMissing(path.join(ROOT, "categories", `${c.slug}.mdx`), categoryMdx(c))) count++;
}
for (const a of authors) {
  if (writeIfMissing(path.join(ROOT, "authors", `${a.slug}.mdx`), authorMdx(a))) count++;
}
for (const art of articles) {
  if (writeIfMissing(path.join(ROOT, "articles", `${art[1]}.mdx`), articleMdx(art))) count++;
}
console.log(`\nDone. ${count} file(s) written.`);
