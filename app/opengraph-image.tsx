import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Miri Fridman — Accounting & Finance Expert";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function svgDataUri(relPath: string) {
  const svg = await readFile(
    join(/* turbopackIgnore: true */ process.cwd(), relPath),
    "utf-8",
  );
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export default async function OpengraphImage() {
  const [lockup, monogram] = await Promise.all([
    svgDataUri("public/brand/lockup-horizontal.svg"),
    svgDataUri("public/brand/monogram-mono.svg"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 20,
            height: "100%",
            background: "#0669AB",
          }}
        />
        {/* faint monogram watermark */}
        <img
          width={620}
          height={384}
          src={monogram}
          alt=""
          style={{ position: "absolute", right: -120, bottom: -80, opacity: 0.06 }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img width={820} height={157} src={lockup} alt="" />
      </div>
    ),
    { ...size },
  );
}
