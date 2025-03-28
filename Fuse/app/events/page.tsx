//import { EventsList } from "@/components/events/events-list"
import {EventsPage2} from "@/components/events/event-categories"
//import { EventFilters } from "@/components/events/event-filters"

export default function EventsPage() {
  return (
    <div className="flex flex-col gap-8 py-8">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">All Events</h1>
          <p className="text-muted-foreground">Browse and discover amazing events for every occasion</p>
        </div>
        <EventsPage2 />
        </div>
    </div>
  )
}

