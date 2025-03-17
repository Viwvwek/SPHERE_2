import { HeroSection } from "@/components/hero-section"
import { FeaturedEvents } from "@/components/featured-events"

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8">
      <HeroSection />
      <FeaturedEvents />
    </div>
  )
}

