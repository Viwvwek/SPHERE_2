"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Cake, GlassWater, Heart, Mic2, PartyPopper, School, Stars, Users } from "lucide-react"
import { useState } from "react"

const categories = [
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

export function EventCategories() {
  const [activeCategory, setActiveCategory] = useState("all")

  return (
    <ScrollArea className="w-full py-6">
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
  )
}

