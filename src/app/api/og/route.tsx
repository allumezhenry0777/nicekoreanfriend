import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

const NAVY = "#13294B";
const RED = "#E8434E";
const BLUE = "#2B5BD7";
const CREAM = "#FAF7F2";

function Symbol({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <path
        d="M 70 10 A 20 20 0 0 1 90 30 L 90 52 A 20 20 0 0 1 70 72 L 47 72 L 32.5 88.5 C 30.2 91.1 25.9 89.3 26.3 85.9 L 28 72 A 20 20 0 0 1 10 52 L 10 30 A 20 20 0 0 1 30 10 Z"
        fill="none"
        stroke={NAVY}
        strokeWidth="7"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <g transform="rotate(-18 50 41)">
        <circle cx="50" cy="41" r="18.5" fill={BLUE} />
        <path
          d="M 31.5 41 A 18.5 18.5 0 0 1 68.5 41 A 9.25 9.25 0 0 1 50 41 A 9.25 9.25 0 0 0 31.5 41 Z"
          fill={RED}
        />
      </g>
    </svg>
  );
}

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
          backgroundColor: CREAM,
          backgroundImage: `linear-gradient(135deg, ${CREAM} 62%, #fdeaea 100%)`,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <Symbol size={56} />
          <div style={{ fontSize: 34, fontWeight: 700, color: NAVY }}>Nice Korean Friend</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {category && (
            <div
              style={{
                fontSize: 26,
                fontWeight: 700,
                color: RED,
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
              color: NAVY,
              lineHeight: 1.15,
            }}
          >
            {title}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 28, height: 6, borderRadius: 3, backgroundColor: RED }} />
          <div style={{ fontSize: 26, color: "#5b6779" }}>Korea, explained like a friend would.</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
