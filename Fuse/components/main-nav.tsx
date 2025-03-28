"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Package, LogIn, Menu, ShoppingBag, UserPlus } from "lucide-react";
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
      label: "Packages",
      icon: Package,
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
        {/* Logo with SVG Sphere */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <svg
            className="h-6 w-6 text-primary"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" fill="url(#sphereGradient)" />
            <ellipse cx="8" cy="8" rx="3" ry="2" fill="white" fillOpacity="0.3" />
            <defs>
              <linearGradient id="sphereGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--primary)/0.7)" />
              </linearGradient>
            </defs>
          </svg>
          <span className="hidden font-bold sm:inline-block">SPHERE</span>
        </Link>

        <div className="flex flex-1 items-center justify-end space-x-4">
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
                  target={route.href.startsWith("http") ? "_blank" : "_self"}
                  rel={route.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center space-x-2"
                >
                  <route.icon className="h-4 w-4" />
                  <span>{route.label}</span>
                </Link>
              </Button>
            ))}
          </nav>

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
                      target={route.href.startsWith("http") ? "_blank" : "_self"}
                      rel={route.href.startsWith("http") ? "noopener noreferrer" : undefined}
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
