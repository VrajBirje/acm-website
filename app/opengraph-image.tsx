import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "ACM Chapter"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 128,
        background: "linear-gradient(135deg, #001a33 0%, #004080 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: "bold",
        gap: 20,
      }}
    >
      <div
        style={{
          backgroundColor: "#00d9ff",
          width: 100,
          height: 100,
          borderRadius: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 60,
          color: "#001a33",
        }}
      >
        ACM
      </div>
      <div>ACM Chapter</div>
    </div>,
    {
      ...size,
    },
  )
}
