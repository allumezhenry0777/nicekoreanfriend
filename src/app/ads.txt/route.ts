export const dynamic = "force-static";

/**
 * Serves /ads.txt from the ADS_TXT_CONTENT env var so publisher IDs never
 * live in the repo. Use "\n" in the env var for multiple lines.
 * Returns 404 while unset (before AdSense approval).
 */
export function GET() {
  const content = process.env.ADS_TXT_CONTENT;
  if (!content) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(content.replace(/\\n/g, "\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
