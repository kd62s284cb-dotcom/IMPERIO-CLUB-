import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Intro } from "@/components/layout/Intro";
import { MobileBookingBar } from "@/components/layout/MobileBookingBar";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Intro />
      <SmoothScroll />
      <Header />
      <main id="contenido">{children}</main>
      <Footer />
      <MobileBookingBar />
    </>
  );
}
