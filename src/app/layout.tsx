import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import localFont from "next/font/local";

import { MotionProvider } from "@/components/ui/motion";
import { hours, instagramUrl, site, weekOrder } from "@/content/site";

import "./globals.css";

const cormorant = localFont({
  variable: "--font-cormorant",
  display: "swap",
  src: [
    { path: "../../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-300-normal.woff2", weight: "300", style: "normal" },
    { path: "../../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-300-italic.woff2", weight: "300", style: "italic" },
    { path: "../../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Barbería de autor en Sevilla`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "barbería Sevilla",
    "barbero Sevilla",
    "corte de pelo hombre Sevilla",
    "degradado Sevilla",
    "arreglo de barba Sevilla",
    "afeitado a navaja Sevilla",
    "toalla caliente",
    "Imperio Club",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#0c0b0a",
  colorScheme: "light",
};

const dayCodes = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** Ficha de negocio local para Google (barbería / peluquería). */
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: site.name,
  url: site.url,
  description: site.description,
  telephone: site.contact.phone,
  image: `${site.url.replace(/\/$/, "")}/opengraph-image`,
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    postalCode: site.address.postalCode,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    addressCountry: "ES",
  },
  openingHoursSpecification: weekOrder.flatMap((d) =>
    hours[d].map((slot) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${dayCodes[d]}`,
      opens: slot.open,
      closes: slot.close,
    })),
  ),
  sameAs: [instagramUrl],
};

/**
 * Se ejecuta antes del primer pintado: si el telón de entrada ya se vio en
 * esta sesión, lo oculta por CSS para que no parpadee al recargar.
 */
const introScript = `try{if(sessionStorage.getItem("imperio-intro"))document.documentElement.dataset.intro="seen"}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${GeistSans.variable} ${GeistMono.variable} ${cormorant.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <noscript>
          <style>{`#intro{display:none}`}</style>
        </noscript>
      </head>
      <body className="min-h-dvh bg-stone-50 text-ink antialiased">
        <MotionProvider>{children}</MotionProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }} />
      </body>
    </html>
  );
}
