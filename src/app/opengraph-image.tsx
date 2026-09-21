import { ImageResponse } from "next/og";
export const alt = "Lenteva — Tu óptica, más cerca de ti.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: "#ede5a3",
        color: "#183e3b",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 40, fontWeight: 700 }}>
        Lenteva.
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 84,
          lineHeight: 1.06,
          fontWeight: 600,
        }}
      >
        <span>Tu óptica,</span>
        <span>más cerca de ti.</span>
      </div>
      <div style={{ display: "flex", fontSize: 27 }}>
        Monturas · Atención a domicilio · Coordina por WhatsApp
      </div>
    </div>,
    size,
  );
}
