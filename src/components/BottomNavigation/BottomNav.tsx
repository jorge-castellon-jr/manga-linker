"use client";

import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  CircleUserIcon,
  HomeIcon,
  LibraryBigIcon,
  MenuIcon,
  StarIcon,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { DarkModeToggle } from "../DarkModeToggle";
import { isSignedIn, signOut } from "@/lib/auth";
import { useRouter } from "next/navigation";

type Props = {};

const BottomNav = (props: Props) => {
  const router = useRouter();
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    setUserLoggedIn(isSignedIn());
  }, []);

  const logOut = () => {
    signOut();
    setUserLoggedIn(false);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const search = (e.target as HTMLFormElement)["search"].value;
    console.log(search);
    router.push(`/search?query=${search}`);
  };
  return (
    <div className="sticky bottom-0 flex h-16 items-center gap-3 border border-b-0 bg-background px-4">
      <form className="ml-auto flex-1" onSubmit={handleSearch}>
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            name="search"
            placeholder="Search manga..."
            className="pl-8"
          />
        </div>
      </form>

      <DarkModeToggle />

      {userLoggedIn && (
        <Link href="/favorites" prefetch>
          <Button variant="outline" size="icon" className="shrink-0">
            <StarIcon className="h-5 w-5" />
            <span className="sr-only">Go To Favorites</span>
          </Button>
        </Link>
      )}
      <Link href="/" prefetch>
        <Button variant="outline" size="icon" className="shrink-0">
          <HomeIcon className="h-5 w-5" />
          <span className="sr-only">Go Home</span>
        </Button>
      </Link>

      {userLoggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUserIcon className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/reset" prefetch>
                Reset Password
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <span onClick={logOut}>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/login" prefetch>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUserIcon className="h-5 w-5" />
            <span className="sr-only">Go To Login Page</span>
          </Button>
        </Link>
      )}

      {/* <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent>
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <LibraryBig className="h-6 w-6" />
              <span className="sr-only">Manga Reader</span>
            </Link>
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
          </nav>
        </SheetContent>
      </Sheet> */}
    </div>
  );
};

export default BottomNav;
