"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, Trash2 } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Types
type Item = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
};

type CartItem = Item & {
  quantity: number;
};

const exchangeRate = 83; // 1 USD = 83 INR

const items: Item[] = [
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
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Filter items based on search, price range, and category
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;

    return matchesSearch && matchesPrice && matchesCategory;
  });

  // Add item to cart
  const addToCart = (item: Item) => {
    setCart(prevCart => {
      // Check if item already exists in cart
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id);
      
      if (existingItemIndex > -1) {
        // If item exists, increase quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      } else {
        // If item doesn't exist, add with quantity 1
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  // Update item quantity
  const updateQuantity = (itemId: number, newQuantity: number) => {
    setCart(prevCart => 
      newQuantity > 0
        ? prevCart.map(item => 
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          )
        : prevCart.filter(item => item.id !== itemId)
    );
  };

  // Calculate total cart value
  const cartTotal = cart.reduce((total, item) => 
    total + (item.price * item.quantity), 0
  );

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
          <Button variant="outline" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Cart ({cart.length})
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
              <Button size="sm" onClick={() => addToCart(item)}>Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Cart Dialog */}
      <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Your Cart</DialogTitle>
            <DialogDescription>
              Review and manage your selected items
            </DialogDescription>
          </DialogHeader>
          
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((cartItem) => (
                <div 
                  key={cartItem.id} 
                  className="flex items-center justify-between border-b pb-2"
                >
                  <div className="flex items-center space-x-4">
                    <img 
                      src={cartItem.image} 
                      alt={cartItem.name} 
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{cartItem.name}</p>
                      <p className="text-muted-foreground">
                        ₹{(cartItem.price * exchangeRate).toFixed(2)} each
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)}
                    >
                      -
                    </Button>
                    <span>{cartItem.quantity}</span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}
                    >
                      +
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => removeFromCart(cartItem.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-between items-center pt-4">
                <p className="text-xl font-bold">Total</p>
                <p className="text-xl font-bold">
                  ₹{(cartTotal * exchangeRate).toFixed(2)}
                </p>
              </div>
              
              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}