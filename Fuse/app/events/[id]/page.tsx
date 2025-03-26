// app/events/[id]/page.tsx
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Heart, MapPin, Share2, Ticket, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Mock data - in a real app, you'd fetch this from an API
const eventDetails = {
  1: {
    id: 1,
    title: "Diwali Festival",
    description: "Celebrate the festival of lights with cultural performances and fireworks across Marine Drive in Mumbai. This annual event brings together thousands of people to enjoy traditional dances, music, and the spectacular fireworks display over the Arabian Sea.",
    date: "2024-11-04",
    time: "18:00 - 23:00",
    location: "Marine Drive, Mumbai",
    address: "Netaji Subhash Chandra Bose Road, Mumbai 400020",
    image: "diwali.jpg",
    price: "500",
    capacity: "10,000",
    organizer: "Mumbai Cultural Association",
    highlights: [
      "Grand fireworks display",
      "Traditional dance performances",
      "Food stalls with regional delicacies",
      "Cultural exhibitions",
      "Live music concerts"
    ]
  },
  2: {
    id: 2,
    title: "Tech Summit India 2024",
    description: "Join the biggest tech summit in India with industry leaders and innovators. This 3-day conference will feature keynote speeches, panel discussions, and workshops on emerging technologies like AI, Blockchain, and Quantum Computing.",
    date: "2024-12-10",
    time: "09:00 - 18:00",
    location: "Bangalore International Exhibition Centre, Bangalore",
    address: "10th Mile, Tumkur Road, Madavara, Bangalore 562123",
    image: "corporate-businessman-giving-presentation-large-audience.jpg",
    price: "1500",
    capacity: "5,000",
    organizer: "India Tech Foundation",
    highlights: [
      "Keynotes from tech industry leaders",
      "Startup pitch competitions",
      "Networking opportunities",
      "Hands-on tech workshops",
      "Career fair with top companies"
    ]
  },
  3: {
    id: 3,
    title: "Goa Carnival",
    description: "Experience the vibrant and colorful Goa Carnival with parades and music. This 4-day festival is a blend of Portuguese tradition and Goan culture featuring elaborate floats, masked dances, and non-stop music across Panaji's streets.",
    date: "2024-02-22",
    time: "16:00 - 23:00",
    location: "Panaji, Goa",
    address: "Main streets of Panaji, Goa 403001",
    image: "istockphoto-1212743133-1024x1024.jpg",
    price: "1000",
    capacity: "Unlimited",
    organizer: "Goa Tourism Department",
    highlights: [
      "Colorful parade with floats",
      "Traditional King Momo procession",
      "Street performances",
      "Live music and dance",
      "Local food and drink stalls"
    ]
  }
};

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const event = eventDetails[params.id as unknown as keyof typeof eventDetails];

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold">Event Not Found</h1>
        <Link href="/events" className="mt-6">
          <Button>Back to Events</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <div className="relative h-96 w-full">
        <Image
          src={`/${event.image}`}
          alt={event.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="container relative z-10 flex h-full items-end pb-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-white md:text-5xl">{event.title}</h1>
            <p className="mt-2 text-lg text-white/90">{event.organizer}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-12">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Event Details */}
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold">About the Event</h2>
            <p className="mt-4 text-lg">{event.description}</p>

            <div className="mt-8">
              <h3 className="text-2xl font-bold">Event Highlights</h3>
              <ul className="mt-4 space-y-2">
                {event.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-bold">Location</h3>
              <div className="mt-4 aspect-video w-full rounded-lg bg-muted">
                {/* Map would go here - you'd use a map library like Google Maps */}
                <div className="flex h-full items-center justify-center">
                  <MapPin className="h-12 w-12 text-muted-foreground" />
                </div>
              </div>
              <p className="mt-2">{event.address}</p>
            </div>
          </div>

          {/* Sidebar - Ticket Info */}
          <div className="space-y-6">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="text-xl font-bold">Date & Time</h3>
              <div className="mt-4 space-y-2">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  <span>{new Date(event.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  <span>Capacity: {event.capacity}</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="text-xl font-bold">Tickets</h3>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Ticket className="mr-2 h-5 w-5" />
                  <span>General Admission</span>
                </div>
                <span className="font-bold">₹{event.price}</span>
              </div>
              <Button className="mt-6 w-full" size="lg">
                Get Tickets
              </Button>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                <Heart className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button variant="outline" className="flex-1">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Similar Events */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold">You Might Also Like</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Object.values(eventDetails)
              .filter(e => e.id !== event.id)
              .slice(0, 3)
              .map((similarEvent) => (
                <div key={similarEvent.id} className="rounded-lg border overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={`/${similarEvent.image}`}
                      alt={similarEvent.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold">{similarEvent.title}</h3>
                    <div className="mt-2 flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-2 h-4 w-4" />
                      {new Date(similarEvent.date).toLocaleDateString()}
                    </div>
                    <Button asChild variant="link" className="mt-4 px-0">
                      <Link href={`/events/${similarEvent.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}