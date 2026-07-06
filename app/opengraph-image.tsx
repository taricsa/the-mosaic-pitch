import { ImageResponse } from "next/og";

export const alt = "The Mosaic Pitch — One Maple Leaf, Infinite Journeys";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090b",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(201,162,39,0.1) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "3px solid #C5202C",
            backgroundColor: "#141414",
            padding: "50px 70px",
            borderRadius: "32px",
            boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
            position: "relative",
          }}
        >
          <div style={{ fontSize: 50, marginBottom: "16px" }}>🍁</div>

          <h1
            style={{
              fontSize: 60,
              fontWeight: 900,
              color: "#ffffff",
              textTransform: "uppercase",
              letterSpacing: "-0.04em",
              margin: 0,
              textAlign: "center",
            }}
          >
            THE MOSAIC PITCH
          </h1>

          <p
            style={{
              fontSize: 22,
              color: "#C9A227",
              marginTop: "16px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            One Maple Leaf. Infinite Journeys.
          </p>

          <p
            style={{
              fontSize: 16,
              color: "#a1a1aa",
              marginTop: "8px",
              maxWidth: "500px",
              textAlign: "center",
              lineHeight: "1.4",
            }}
          >
            Celebrating the multicultural journeys and historic triumphs behind
            Canadian football.
          </p>
        </div>
      </div>
    ),
    { ...size },
  );
}
