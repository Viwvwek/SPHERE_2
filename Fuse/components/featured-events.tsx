import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Heart, MapPin, Share2 } from "lucide-react";

const featuredEvents = [
  {
    id: 1,
    title: "Diwali Festival",
    description: "Celebrate the festival of lights with cultural performances and fireworks",
    date: "2024-11-04",
    location: "Marine Drive, Mumbai",
    image: "diwali.jpg",
    price: "500",
  },
  {
    id: 2,
    title: "Tech Summit India 2024",
    description: "Join the biggest tech summit in India with industry leaders and innovators",
    date: "2024-12-10",
    location: "Bangalore International Exhibition Centre, Bangalore",
    image: "corporate-businessman-giving-presentation-large-audience.jpg",
    price: "1500",
  },
  {
    id: 3,
    title: "Goa Carnival",
    description: "Experience the vibrant and colorful Goa Carnival with parades and music",
    date: "2024-02-22",
    location: "Panaji, Goa",
    image: "istockphoto-1212743133-1024x1024.jpg",
    price: "1000",
  },
];

export function FeaturedEvents() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 text-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Featured Events</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl">
              Discover our handpicked selection of must-attend events happening soon.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {featuredEvents.map((event) => (
            <div
              key={event.id}
              className="group relative overflow-hidden rounded-lg glass gradient-border transition-transform duration-300 hover:scale-105 text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/0 z-10" />
              <img
                alt={event.title}
                className="aspect-[2/1] object-cover w-full"
                src={event.image || "/placeholder.svg"}
              />
              <div className="absolute right-2 top-2 flex gap-2 z-20">
                <Button size="icon" variant="secondary" className="h-8 w-8 bg-background/50 backdrop-blur-lg">
                  <Heart className="h-4 w-4" />
                  <span className="sr-only">Like</span>
                </Button>
                <Button size="icon" variant="secondary" className="h-8 w-8 bg-background/50 backdrop-blur-lg">
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>
              <div className="relative z-20 p-6">
                <h3 className="text-xl font-bold">{event.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{event.description}</p>
                <div className="mt-4 flex flex-col space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center justify-center">
                    <MapPin className="mr-2 h-4 w-4" />
                    {event.location}
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="mr-2 h-4 w-4">₹</span>
                    {event.price}
                  </div>
                </div>
                <Button asChild className="mt-6 w-full shadow-glow">
                  <Link href={`/events/${event.id}`}>View Details</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Button asChild size="lg" variant="outline" className="glass glass-hover">
            <Link href="/events">View All Events</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
