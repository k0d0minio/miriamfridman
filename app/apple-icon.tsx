import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const monogram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 226 140"><path d="M 0 140 L 0 0 L 40 0 L 90 70 L 140 0 L 180 0 L 180 140 L 148 140 L 148 56 L 106 110 L 74 110 L 32 56 L 32 140 Z" fill="#ffffff"/><rect x="148" y="0" width="32" height="140" fill="#9FD0EC"/><rect x="148" y="0" width="78" height="30" fill="#9FD0EC"/><rect x="148" y="58" width="58" height="27" fill="#9FD0EC"/></svg>`;

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A3556",
          borderRadius: 40,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          width={128}
          height={79}
          src={`data:image/svg+xml,${encodeURIComponent(monogram)}`}
          alt=""
        />
      </div>
    ),
    { ...size },
  );
}
