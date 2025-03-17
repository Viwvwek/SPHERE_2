"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart } from "@/components/shopping-cart";
import { Calendar, LogIn, Menu, Search, ShoppingBag, Sparkles, UserPlus } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import cn from "classnames";

export function MainNav() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const routes = [
    {
      href: "/events",
      label: "Events",
      icon: Calendar,
    },
    {
      href: "/explore",
      label: "Explore",
      icon: ShoppingBag,
    },
    {
      href: "/login",
      label: "Login",
      icon: LogIn,
    },
    {
      href: "/register",
      label: "Register",
      icon: UserPlus,
    },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-lg" : "bg-transparent",
      )}
    >
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="hidden font-bold sm:inline-block">SPHERE</span>
        </Link>

        {/* Search Bar */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <form className="hidden lg:flex-1 lg:max-w-sm lg:flex">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search events..."
                className="w-full pl-9 bg-background/50 border-primary/20 focus:border-primary"
              />
            </div>
          </form>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={pathname === route.href ? "default" : "ghost"}
                className={cn(
                  "transition-all duration-300",
                  pathname === route.href && "bg-primary text-primary-foreground shadow-glow",
                )}
                asChild
              >
                <Link
                  href={route.href}
                  target={route.href.startsWith("http") ? "_blank" : "_self"} // Open external links in new tab
                  rel={route.href.startsWith("http") ? "noopener noreferrer" : undefined} // Security for external links
                  className="flex items-center space-x-2"
                >
                  <route.icon className="h-4 w-4" />
                  <span>{route.label}</span>
                </Link>
              </Button>
            ))}
          </nav>

          {/* Shopping Cart */}
          <ShoppingCart />

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background/95 backdrop-blur-lg">
              <nav className="flex flex-col space-y-4">
                {routes.map((route) => (
                  <Button
                    key={route.href}
                    variant={pathname === route.href ? "default" : "ghost"}
                    className={cn(
                      "justify-start",
                      pathname === route.href && "bg-primary text-primary-foreground shadow-glow",
                    )}
                    asChild
                  >
                    <Link
                      href={route.href}
                      target={route.href.startsWith("http") ? "_blank" : "_self"} // Open external links in new tab
                      rel={route.href.startsWith("http") ? "noopener noreferrer" : undefined} // Security for external links
                      className="flex items-center space-x-2"
                    >
                      <route.icon className="h-4 w-4" />
                      <span>{route.label}</span>
                    </Link>
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}