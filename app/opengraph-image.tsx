import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ravi Teja Geddada — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "#09090B",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* Ambient glow — top left */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -80,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)",
          }}
        />
        {/* Ambient glow — bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: -140,
            right: -80,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 70%)",
          }}
        />

        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(to right, #2563EB, #7C3AED)",
          }}
        />

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center", gap: 0 }}>
          {/* Status pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 32,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#22C55E",
                boxShadow: "0 0 12px #22C55E",
              }}
            />
            <span
              style={{
                fontFamily: "sans-serif",
                fontSize: 18,
                color: "#A1A1AA",
                letterSpacing: "0.05em",
              }}
            >
              Currently @ Fidelity Investments
            </span>
          </div>

          {/* Name */}
          <div
            style={{
              fontFamily: "sans-serif",
              fontWeight: 800,
              fontSize: 80,
              color: "#FAFAFA",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              marginBottom: 20,
            }}
          >
            Ravi Teja Geddada
          </div>

          {/* Role */}
          <div
            style={{
              fontFamily: "sans-serif",
              fontWeight: 400,
              fontSize: 32,
              color: "#A1A1AA",
              marginBottom: 48,
            }}
          >
            Software Engineer
          </div>

          {/* Tech pills */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {["Angular", "React", "TypeScript", "Lit Elements", "GraphQL"].map((tech) => (
              <div
                key={tech}
                style={{
                  display: "flex",
                  padding: "8px 18px",
                  borderRadius: 9999,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontFamily: "sans-serif",
                  fontSize: 18,
                  color: "#FAFAFA",
                  fontWeight: 500,
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom domain */}
        <div
          style={{
            fontFamily: "sans-serif",
            fontSize: 20,
            color: "rgba(161,161,170,0.5)",
            letterSpacing: "0.04em",
          }}
        >
          raviteja-geddada.is-a.dev
        </div>
      </div>
    ),
    { ...size }
  );
}
