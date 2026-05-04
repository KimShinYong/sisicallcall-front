import { CTA } from "@/components/landing/cta"
import { Features } from "@/components/landing/features"
import { Footer } from "@/components/landing/footer"
import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { Logos } from "@/components/landing/logos"
import { Pricing } from "@/components/landing/pricing"
import { Stats } from "@/components/landing/stats"

export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Logos />
        <Features />
        <Stats />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
