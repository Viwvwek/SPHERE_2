"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Calendar, Cake, GlassWater, Heart, MapPin, Mic2, PartyPopper, School, Share2, Stars, Users } from "lucide-react"

type Event = {
  id: string
  title: string
  category: string
  description: string
  date: string
  location: string
  price: number // Price in INR
  image: string
  featured?: boolean
}

type Category = {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
}

const categories: Category[] = [
  {
    id: "all",
    name: "All Events",
    icon: Stars,
  },
  {
    id: "weddings",
    name: "Weddings",
    icon: Heart,
  },
  {
    id: "birthdays",
    name: "Birthdays",
    icon: Cake,
  },
  {
    id: "corporate",
    name: "Corporate",
    icon: Users,
  },
  {
    id: "graduation",
    name: "Graduation",
    icon: School,
  },
  {
    id: "concerts",
    name: "Concerts",
    icon: Mic2,
  },
  {
    id: "parties",
    name: "Parties",
    icon: PartyPopper,
  },
  {
    id: "social",
    name: "Social",
    icon: GlassWater,
  },
]

const events: Event[] = [
  {
    id: "wedding-1",
    title: "Luxury Garden Wedding",
    category: "weddings",
    description: "An elegant garden wedding with full-service catering and live music",
    date: "2024-08-15",
    location: "Botanical Gardens, Kochi",
    price: 1250000, // ₹12.5 Lakhs
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
  },
  {
    id: "birthday-1",
    title: "Kids Birthday Bash",
    category: "birthdays",
    description: "A fun-filled birthday party with games, entertainment, and cake",
    date: "2024-07-20",
    location: "Fun Zone, Trivandrum",
    price: 50000, // ₹50,000
    image: "/Birthday_bash.jpg?height=400&width=600",
  },
  {
    id: "corporate-1",
    title: "Annual Tech Conference",
    category: "corporate",
    description: "A professional conference with keynote speakers and networking",
    date: "2024-09-10",
    location: "Convention Center, Kochi",
    price: 250000, // ₹2.5 Lakhs
    image: "/it.jpg?height=400&width=600",
    featured: true,
  },
  {
    id: "graduation-1",
    title: "University Graduation Party",
    category: "graduation",
    description: "Celebrate your academic achievement with friends and family",
    date: "2024-06-25",
    location: "Grand Hall, Calicut",
    price: 75000, // ₹75,000
    image: "/college.jpg?height=400&width=600",
  },
  {
    id: "concert-1",
    title: "Summer Music Festival",
    category: "concerts",
    description: "A three-day music festival featuring top artists",
    date: "2024-07-15",
    location: "Central Park, Alleppey",
    price: 3000, // ₹3,000
    image: "/concert.jpg?height=400&width=600",
    featured: true,
  },
  {
    id: "party-1",
    title: "New Year's Eve Gala",
    category: "parties",
    description: "Ring in the new year with an elegant celebration",
    date: "2024-12-31",
    location: "Luxury Hotel, Munnar",
    price: 10000, // ₹10,000
    image: "/party.jpg?height=400&width=600",
  },
]

export function EventsPage2() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [likedEvents, setLikedEvents] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]) // Range in INR
  const [selectedLocation, setSelectedLocation] = useState<string>("")

  // Format price in Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price)
  }

  const toggleLike = (eventId: string) => {
    setLikedEvents((prev) => 
      prev.includes(eventId) 
        ? prev.filter((id) => id !== eventId) 
        : [...prev, eventId]
    )
  }

  const filteredEvents = events.filter(event => {
    const matchesCategory = activeCategory === "all" || event.category === activeCategory
    const matchesPrice = event.price >= priceRange[0] && event.price <= priceRange[1]
    const matchesLocation = !selectedLocation || 
      event.location.toLowerCase().includes(selectedLocation.toLowerCase())
    
    return matchesCategory && matchesPrice && matchesLocation
  })

  return (
    <div className="container py-8">
      {/* Categories Scroll */}
      <ScrollArea className="w-full pb-6">
        <div className="flex gap-4">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className="flex-shrink-0"
              onClick={() => setActiveCategory(category.id)}
            >
              <category.icon className="mr-2 h-4 w-4" />
              {category.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar */}
        <Card className="sticky top-20 h-fit w-full md:w-[300px]">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Location</label>
              <Select 
                value={selectedLocation}
                onValueChange={setSelectedLocation}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All locations</SelectItem>
                  <SelectItem value="kochi">Kochi</SelectItem>
                  <SelectItem value="trivandrum">Trivandrum</SelectItem>
                  <SelectItem value="calicut">Calicut</SelectItem>
                  <SelectItem value="alleppey">Alleppey</SelectItem>
                  <SelectItem value="munnar">Munnar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Price Range</label>
              <Slider 
                value={priceRange}
                onValueChange={(value) => setPriceRange(value as [number, number])}
                max={100000} // ₹1 Lakh max
                step={1000} // ₹1,000 increments
                className="py-4" 
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{formatPrice(priceRange[0])}</span>
                <span>{formatPrice(priceRange[1])}</span>
              </div>
            </div>

            <Button 
              className="mt-4"
              onClick={() => {
                setActiveCategory("all")
                setPriceRange([0, 100000])
                setSelectedLocation("")
              }}
            >
              Reset Filters
            </Button>
          </CardContent>
        </Card>

        {/* Events List */}
        <div className="flex-1">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="flex flex-col overflow-hidden">
                <div className="relative">
                  <img 
                    alt={event.title} 
                    className="aspect-[2/1] object-cover" 
                    src={event.image || "/placeholder.svg"} 
                  />
                  {event.featured && (
                    <div className="absolute left-2 top-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                      Featured
                    </div>
                  )}
                  <div className="absolute right-2 top-2 flex gap-2">
                    <Button 
                      size="icon" 
                      variant="secondary" 
                      className="h-8 w-8" 
                      onClick={() => toggleLike(event.id)}
                    >
                      <Heart 
                        className={likedEvents.includes(event.id) ? "fill-current text-red-500" : ""} 
                        size={16} 
                      />
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
                      {new Date(event.date).toLocaleDateString('en-IN')} {/* Indian date format */}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4" />
                      {event.location}
                    </div>
                    <div className="font-semibold text-foreground">
                      {formatPrice(event.price)}
                    </div>
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

          {filteredEvents.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-lg font-medium">No events found</p>
              <p className="text-muted-foreground">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}