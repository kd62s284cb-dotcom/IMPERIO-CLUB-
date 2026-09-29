import { Booking } from "@/components/sections/Booking";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { Club } from "@/components/sections/Club";
import { Gallery } from "@/components/sections/Gallery";
import { HomeHero } from "@/components/sections/HomeHero";
import { Legacy } from "@/components/sections/Legacy";
import { Marquee } from "@/components/sections/Marquee";
import { Ritual } from "@/components/sections/Ritual";
import { ServicesMenu } from "@/components/sections/ServicesMenu";
import { TriadStatement } from "@/components/sections/Statement";
import { Visit } from "@/components/sections/Visit";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Marquee />
      <TriadStatement />
      <ServicesMenu />
      <Ritual />
      <Legacy />
      <Club />
      <Gallery />
      <Booking />
      <Visit />
      <ClosingCta />
    </>
  );
}
