import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 flex items-center justify-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          {/* Heading and Description */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Create Unforgettable{" "}
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent animate-gradient">
                Moments
              </span>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Discover and book amazing events. From intimate gatherings to grand celebrations, we've got you covered.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}