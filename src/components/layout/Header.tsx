
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Heart,
  Home,
  Menu,
  MessageSquare,
  Sparkles,
  User,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { loggedInUser } from "@/lib/data";
import Logo from "./Logo";

const navItems = [
  { href: "/discover", label: "Discover", icon: Home },
  { href: "/matches", label: "Matches", icon: Heart },
  { href: "/messages", label: "Messages", icon: MessageSquare },
];

export default function Header() {
  const pathname = usePathname();

  const renderNavLinks = (isMobile = false) =>
    navItems.map((item) => (
      <Link
        key={item.label}
        href={item.href}
        className={cn(
          "flex items-center gap-2 transition-colors hover:text-foreground font-medium",
          pathname === item.href
            ? "text-foreground"
            : "text-muted-foreground",
          isMobile ? "px-4 py-3 text-lg" : "px-3 py-2 text-sm"
        )}
      >
        <item.icon className="size-5" />
        <span>{item.label}</span>
      </Link>
    ));

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-6 hidden md:flex">
          <Link href="/discover" className="flex items-center gap-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-bold">App</span>
          </Link>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="size-6" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="py-6">
                <Link href="/discover" className="mb-8 flex items-center gap-2 px-4">
                  <Logo className="h-6 w-6 text-primary" />
                  <span className="font-bold">App</span>
                </Link>
                <nav className="flex flex-col gap-2">
                  {renderNavLinks(true)}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <nav className="hidden flex-1 items-center gap-4 md:flex">
          {renderNavLinks()}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10 border-2 border-primary">
                  <AvatarImage src={loggedInUser.image.imageUrl} alt={loggedInUser.name} />
                  <AvatarFallback>{loggedInUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="font-headline text-sm font-medium leading-none">{loggedInUser.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {loggedInUser.location}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <Sparkles className="mr-2 h-4 w-4" />
                  <span>Improve Profile (AI)</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
