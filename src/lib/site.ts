export const site = {
  name: "Nice Korean Friend",
  tagline: "Korea, explained like a friend would.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nicekoreanfriend.com",
  locale: "en",
  email: "hello@nicekoreanfriend.com",
  twitter: "@nicekoreanfriend",
  instagram: "https://www.instagram.com/nicekoreanfriend",
  adsenseEnabled: process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true",
  adsenseClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "",
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
};

export function absoluteUrl(path: string): string {
  return new URL(path, site.url).toString();
}
