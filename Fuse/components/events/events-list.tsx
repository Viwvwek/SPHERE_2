"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Heart, MapPin, Share2 } from "lucide-react"

const events = [
  {
    id: "wedding-1",
    title: "Luxury Garden Wedding",
    category: "weddings",
    description: "An elegant garden wedding with full-service catering and live music",
    date: "2024-08-15",
    location: "Botanical Gardens, New York",
    price: 15000,
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
  },
  {
    id: "birthday-1",
    title: "Kids Birthday Bash",
    category: "birthdays",
    description: "A fun-filled birthday party with games, entertainment, and cake",
    date: "2024-07-20",
    location: "Fun Zone, Miami",
    price: 500,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "corporate-1",
    title: "Annual Tech Conference",
    category: "corporate",
    description: "A professional conference with keynote speakers and networking",
    date: "2024-09-10",
    location: "Convention Center, San Francisco",
    price: 5000,
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
  },
  {
    id: "graduation-1",
    title: "University Graduation Party",
    category: "graduation",
    description: "Celebrate your academic achievement with friends and family",
    date: "2024-06-25",
    location: "Grand Hall, Chicago",
    price: 2000,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "concert-1",
    title: "Summer Music Festival",
    category: "concerts",
    description: "A three-day music festival featuring top artists",
    date: "2024-07-15",
    location: "Central Park, New York",
    price: 300,
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
  },
  {
    id: "party-1",
    title: "New Year's Eve Gala",
    category: "parties",
    description: "Ring in the new year with an elegant celebration",
    date: "2024-12-31",
    location: "Luxury Hotel, Las Vegas",
    price: 1000,
    image: "/placeholder.svg?height=400&width=600",
  },
]

export function EventsList() {
  const [likedEvents, setLikedEvents] = useState<string[]>([])

  const toggleLike = (eventId: string) => {
    setLikedEvents((prev) => (prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]))
  }

  return (
    <div className="flex-1">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event.id} className="flex flex-col overflow-hidden">
            <div className="relative">
              <img alt={event.title} className="aspect-[2/1] object-cover" src={event.image || "/placeholder.svg"} />
              {event.featured && (
                <div className="absolute left-2 top-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                  Featured
                </div>
              )}
              <div className="absolute right-2 top-2 flex gap-2">
                <Button size="icon" variant="secondary" className="h-8 w-8" onClick={() => toggleLike(event.id)}>
                  <Heart className={likedEvents.includes(event.id) ? "fill-current text-red-500" : ""} size={16} />
                  <span className="sr-only">Like</span>
                </Button>
                <Button size="icon" variant="secondary" className="h-8 w-8">
                  <Share2 size={16} />
                  <span className="sr-only">Share</span>
                </Button>
              </div>
            </div>
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
              <CardDescription>{event.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  {new Date(event.date).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  {event.location}
                </div>
                <div className="font-semibold text-foreground">${event.price.toLocaleString()}</div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/events/${event.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

