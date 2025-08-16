import * as React from "react"
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const Navbar = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-transparent sticky top-0 z-50 w-full">
      <div className="container mx-auto px-2 sm:px-4 flex justify-center">
        <NavigationMenu viewport={false}>
          <NavigationMenuList className="flex flex-wrap items-center justify-center py-2 sm:py-4 gap-3 sm:gap-6 text-base sm:text-lg">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Home</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b p-4 sm:p-6 no-underline outline-none select-none focus:shadow-md"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
                    to="/"
                  >
                    <div className="mt-2 mb-1 sm:mt-4 sm:mb-2 text-base sm:text-lg text-black font-medium">
                      Travel Booking
                    </div>
                    <p className="text-xs sm:text-sm text-black leading-tight">
                      Your gateway to unforgettable travel experiences worldwide.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/#about" title="About Us">
                Learn about our mission to make travel accessible and enjoyable.
              </ListItem>
              <ListItem href="/#destinations" title="Popular Destinations">
                Discover trending destinations and travel hotspots.
              </ListItem>
              <ListItem href="/#deals" title="Special Deals">
                Exclusive offers and discounts on flights and hotels.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle() + " px-2 py-2 sm:px-4 sm:py-2 rounded-md"}>
            <Link to="/destinations">Destinations</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle() + " px-2 py-2 sm:px-4 sm:py-2 rounded-md"}>
            <Link to="/bookings">My Bookings</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle() + " px-2 py-2 sm:px-4 sm:py-2 rounded-md"}>
            <Link to="/#contact">Contact us</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
       
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={navigationMenuTriggerStyle() + " px-2 py-2 sm:px-4 sm:py-2 rounded-md"}
            onClick={handleSignOut}
            role="button"
            tabIndex={0}
          >
            <span>Sign out</span>
          </NavigationMenuLink>
        </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link to={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

export default Navbar