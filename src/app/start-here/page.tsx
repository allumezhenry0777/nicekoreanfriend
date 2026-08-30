import type { Metadata } from "next";
import { StartHereChecklist, type ChecklistGroup } from "@/components/StartHereChecklist";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLdScript } from "@/components/JsonLdScript";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Start Here — your Korea arrival checklist",
  description:
    "Everything to sort out in your first days in Korea, in order: SIM or eSIM, T-money card, essential apps, cash and cards, and where to go next. Progress saves automatically.",
  alternates: { canonical: absoluteUrl("/start-here") },
};

const groups: ChecklistGroup[] = [
  {
    title: "Before you land",
    items: [
      {
        id: "esim",
        label: "Decide: eSIM, SIM card, or pocket WiFi",
        detail: "Ordering an eSIM before your flight means you're online the minute you land.",
        href: "/phone-internet/esim-vs-sim-vs-pocket-wifi-korea",
      },
      {
        id: "keta",
        label: "Check your entry requirements (K-ETA / visa)",
        detail: "Rules depend on your passport and change often — always check the official source.",
        href: "/first-72-hours/incheon-airport-arrival-guide",
      },
      {
        id: "apps",
        label: "Download the apps Google Maps can't replace",
        detail: "Naver Map, KakaoTalk and Papago do the heavy lifting in Korea.",
        href: "/first-72-hours/essential-apps-korea",
      },
    ],
  },
  {
    title: "At the airport",
    items: [
      {
        id: "cash",
        label: "Get some Korean won in cash",
        detail: "Korea is very card-friendly, but small shops and some machines still want cash.",
        href: "/money-banking/cash-vs-card-korea",
      },
      {
        id: "tmoney",
        label: "Buy and top up a T-money card",
        detail: "One little card for subway, bus, taxi and convenience stores nationwide.",
        href: "/getting-around/t-money-card-guide",
      },
      {
        id: "airport-transfer",
        label: "Pick your ride into the city",
        detail: "AREX express train, all-stop train, limousine bus or taxi — each has a best use case.",
        href: "/first-72-hours/incheon-to-seoul-transport",
      },
    ],
  },
  {
    title: "Your first 72 hours",
    items: [
      {
        id: "naver-map",
        label: "Learn the 10-minute basics of Naver Map",
        detail: "Search in English, save places, and read exit numbers like a local.",
        href: "/first-72-hours/essential-apps-korea",
      },
      {
        id: "convenience",
        label: "Do a convenience-store supply run",
        detail: "GS25, CU and 7-Eleven cover meals, chargers, umbrellas and banking basics.",
        href: "/food-dining/korean-convenience-store-guide",
      },
      {
        id: "etiquette",
        label: "Skim the etiquette that actually matters",
        detail: "Shoes, table manners, subway priority seats — the short list, minus the myths.",
        href: "/culture-etiquette/korean-etiquette-basics",
      },
    ],
  },
  {
    title: "If you're staying longer",
    items: [
      {
        id: "arc",
        label: "Book your residence card (ARC/RC) appointment",
        detail: "Staying past 90 days? Your immigration appointment is the key that unlocks everything else.",
        href: "/living-in-korea/arc-residence-card-guide",
      },
      {
        id: "bank",
        label: "Open a Korean bank account",
        detail: "Needed for salary, apartment contracts and Korean apps that demand local cards.",
        href: "/money-banking/open-bank-account-korea",
      },
      {
        id: "insurance",
        label: "Understand your health insurance situation",
        detail: "NHIS enrollment is automatic for some, manual for others — know which you are.",
        href: "/health-safety/korean-health-insurance-explained",
      },
    ],
  },
];

export default function StartHerePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <JsonLdScript
        data={breadcrumbJsonLd([
          { name: "Home", url: site.url },
          { name: "Start Here", url: absoluteUrl("/start-here") },
        ])}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Start Here" }]} />
      <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        Start here: your Korea checklist
      </h1>
      <p className="mt-3 text-lg leading-relaxed text-ink/70">
        Work through this in order and your first days in Korea will feel easy. Your progress is
        saved on this device — close the tab, come back, keep going.
      </p>
      <div className="mt-8">
        <StartHereChecklist groups={groups} />
      </div>
    </div>
  );
}
