"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const exchangeRate = 83; // 1 USD = 83 INR

const items = [
  {
    id: 1,
    name: "Folding Chair",
    price: .09,
    image: "folding chair.jpg",
    category: "Furniture",
  },
  {
    id: 2,
    name: "Decorative Lanterns",
    price: .9,
    image: "decoartive lantern.jpg",
    category: "Decor",
  },
  {
    id: 3,
    name: "Event Tent",
    price: 25,
    image: "tent.jpg",
    category: "Outdoor",
  },
  {
    id: 4,
    name: "Table Cloth",
    price: .010,
    image: "table cloth.jpg",
    category: "Decor",
  },
  {
    id: 5,
    name: "String Lights",
    price: .99,
    image: "string lights.jpg",
    category: "Decor",
  },
  {
    id: 6,
    name: "Portable Speaker",
    price: .7,
    image: "portable speaker.jpg",
    category: "Electronics",
  },
];

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();

  // Filter items based on search, price range, and category
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;

    return matchesSearch && matchesPrice && matchesCategory;
  });

  return (
    <div className="container mx-auto p-4">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Explore Event Items</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search items..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <ShoppingCart className="mr-2 h-4 w-4" />
            View Cart
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Price Range</label>
          <Slider
            defaultValue={[0, 200]}
            max={200}
            step={10}
            onValueChange={(value) => setPriceRange([value[0], value[1]])}
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>₹{(priceRange[0] * exchangeRate).toFixed(2)}</span>
            <span>₹{(priceRange[1] * exchangeRate).toFixed(2)}</span>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Category</label>
          <Select onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Furniture">Furniture</SelectItem>
              <SelectItem value="Decor">Decor</SelectItem>
              <SelectItem value="Outdoor">Outdoor</SelectItem>
              <SelectItem value="Electronics">Electronics</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Item Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-lg">{item.name}</CardTitle>
              <p className="text-muted-foreground">{item.category}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center p-4">
              <p className="text-lg font-bold">₹{(item.price * exchangeRate).toFixed(2)}</p>
              <Button size="sm">Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}