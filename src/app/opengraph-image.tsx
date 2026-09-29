import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { site } from "@/content/site";

export const alt = "Imperio Club. Barbería de autor en Sevilla.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const cwd = process.cwd();
  const [serif, sans, marble] = await Promise.all([
    readFile(join(cwd, "node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-300-normal.woff")),
    readFile(join(cwd, "node_modules/geist/dist/fonts/geist-sans/Geist-Medium.ttf")),
    readFile(join(cwd, "public/images/marmol-hero.jpg")),
  ]);
  const marbleSrc = `data:image/jpeg;base64,${marble.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#0c0b0a",
          color: "#f5f2ec",
        }}
      >
        <img src={marbleSrc} alt="" width={1200} height={630} style={{ position: "absolute", inset: 0, objectFit: "cover", opacity: 0.75 }} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background: "linear-gradient(0deg, #0c0b0a 8%, rgba(12,11,10,0.2) 70%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "64px 72px 56px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Geist", fontSize: 20, letterSpacing: "0.32em" }}>
            <span>BARBERÍA DE AUTOR · SEVILLA</span>
            <span style={{ color: "#b89262" }}>HISPALIS</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "Cormorant", fontSize: 250, lineHeight: 0.8, letterSpacing: "-0.01em" }}>IMPERIO</div>
            <div style={{ display: "flex", marginTop: 36, height: 1, background: "rgba(245,242,236,0.25)" }} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 24,
                fontFamily: "Geist",
                fontSize: 20,
                letterSpacing: "0.26em",
                color: "#cdc6b8",
              }}
            >
              <span>CORTE · BARBA · RITUAL</span>
              <span style={{ color: "#d9c19b" }}>{site.name.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Cormorant", data: serif, style: "normal", weight: 300 },
        { name: "Geist", data: sans, style: "normal", weight: 500 },
      ],
    },
  );
}
