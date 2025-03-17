"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"

export function EventFilters() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Card className="sticky top-20 h-fit w-full md:w-[300px]">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Date</label>
          <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border calendar-custom w-full" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Location</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ny">New York</SelectItem>
              <SelectItem value="sf">San Francisco</SelectItem>
              <SelectItem value="la">Los Angeles</SelectItem>
              <SelectItem value="ch">Chicago</SelectItem>
              <SelectItem value="mi">Miami</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Price Range</label>
          <Slider defaultValue={[0, 1000]} max={1000} step={10} className="py-4" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>$0</span>
            <span>$1000</span>
          </div>
        </div>
        <Button className="mt-4">Apply Filters</Button>
      </CardContent>
    </Card>
  )
}

