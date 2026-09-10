import { ImageResponse } from "next/og";

export const alt = "OptiHome — óptica a domicilio, monturas y prueba virtual";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #f4f8f9 0%, #e9f6f1 52%, #ffffff 100%)",
          color: "#10212b",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#126e82",
              color: "white",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            O
          </div>
          <div style={{ fontSize: 34, fontWeight: 700 }}>OptiHome</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 900 }}>
          <div style={{ fontSize: 68, lineHeight: 1.04, fontWeight: 700 }}>
            Explora. Pruébate. Coordina.
          </div>
          <div style={{ marginTop: 24, fontSize: 30, lineHeight: 1.3, color: "#53646d" }}>
            Atención óptica a domicilio con una experiencia digital pensada para elegir desde casa.
          </div>
        </div>

        <div style={{ fontSize: 22, color: "#126e82", fontWeight: 600 }}>
          optihome-v1.vercel.app
        </div>
      </div>
    ),
    size
  );
}
