import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Share2, Users } from "lucide-react"
import "tailwindcss/tailwind.css"

// This would typically come from an API or database
const event = {
  id: "wedding-1",
  title: "Luxury Garden Wedding",
  category: "weddings",
  description:
    "An elegant garden wedding with full-service catering and live music. Our comprehensive wedding package includes:\n\n- Professional wedding planning services\n- Stunning botanical garden venue\n- Gourmet catering for up to 200 guests\n- Live band and DJ services\n- Professional photography and videography\n- Floral arrangements and decorations\n- Wedding cake and dessert bar\n- Full bar service\n- Valet parking",
  date: "2024-08-15",
  time: "4:00 PM - 11:00 PM",
  location: "Botanical Gardens, New York",
  address: "990 Washington Avenue, Brooklyn, NY 11225",
  price: 15000,
  capacity: 200,
  image: "/Images/luxe.jpg?height=400&width=800",
  gallery: [
    "/hooks/Images/luxe.jpg?height=400&width=600",
    "/hooks/Images/luxe.jpg?height=400&width=600",
    "/hooks/Images/luxe.jpg?height=400&width=600",
    "/hooks/Images/luxe.jpg?height=400&width=600",
  ],
}

export default function EventPage() {
  return (
    <div className="flex flex-col gap-8 py-8">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">{event.title}</h1>
              <p className="text-muted-foreground">{event.category}</p>
            </div>
            <div className="aspect-[2/1] overflow-hidden rounded-lg">
              <img alt={event.title} className="object-cover w-full h-full" src={event.image || "/placeholder.svg"} />
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {event.gallery.map((image, index) => (
                <img
                  key={index}
                  alt={`${event.title} gallery image ${index + 1}`}
                  className="aspect-[4/3] overflow-hidden rounded-lg object-cover"
                  src={image || "/placeholder.svg"}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="text-4xl font-bold">${event.price.toLocaleString()}</div>
              <Button size="icon" variant="outline">
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share</span>
              </Button>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(event.date).toLocaleDateString()}</span>
                <span className="text-muted-foreground">{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Capacity: {event.capacity} guests</span>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-lg border p-4">
              <div className="space-y-2">
                <h2 className="font-semibold">Address</h2>
                <p className="text-sm text-muted-foreground">{event.address}</p>
              </div>
              <img
                alt="Event location map"
                className="aspect-[2/1] overflow-hidden rounded-lg object-cover"
                src="/placeholder.svg?height=200&width=400"
              />
            </div>
            <div className="space-y-2">
              <h2 className="font-semibold">About this event</h2>
              <p className="whitespace-pre-wrap text-sm text-muted-foreground">{event.description}</p>
            </div>
            <Button size="lg" className="mt-4">
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

