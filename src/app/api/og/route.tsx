import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export function GET(req: NextRequest) {
  const title = req.nextUrl.searchParams.get("title")?.slice(0, 140) ?? "Nice Korean Friend";
  const category = req.nextUrl.searchParams.get("category")?.slice(0, 60) ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          backgroundColor: "#faf7f2",
          backgroundImage: "linear-gradient(135deg, #faf7f2 60%, #fbe6e3 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 9999,
              backgroundColor: "#d94f45",
            }}
          />
          <div style={{ fontSize: 32, fontWeight: 700, color: "#1f2733" }}>
            Nice Korean Friend
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {category && (
            <div
              style={{
                fontSize: 26,
                fontWeight: 700,
                color: "#d94f45",
                textTransform: "uppercase",
                letterSpacing: 4,
              }}
            >
              {category}
            </div>
          )}
          <div
            style={{
              fontSize: title.length > 70 ? 52 : 64,
              fontWeight: 800,
              color: "#1f2733",
              lineHeight: 1.15,
            }}
          >
            {title}
          </div>
        </div>
        <div style={{ fontSize: 26, color: "#6b7280" }}>
          Korea, explained like a friend would.
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
