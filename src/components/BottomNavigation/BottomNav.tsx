"use client";

import React, { useEffect } from "react";
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
  ArrowLeft,
  CircleUserIcon,
  HomeIcon,
  LibraryBigIcon,
  MenuIcon,
  StarIcon,
} from "lucide-react";
import { DarkModeToggle } from "../DarkModeToggle";
import { useUserStore } from "@/lib/UserStore";
import { useRouter } from "next/navigation";
import "./BottomNav.scss";
import { useSearchStore } from "@/lib/SearchStore";

type Props = {};

const BottomNav = (props: Props) => {
  const router = useRouter();
  const { isUserSignedIn, signIn, signOut } = useUserStore();
  const { setSearchQuery: setSearch } = useSearchStore();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!!user) signIn(JSON.parse(user));
  }, []);

  const logOut = () => {
    signOut();
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const search = (e.target as HTMLFormElement)["search"].value;
    router.push("/search");
  };
  return (
    <div className="sticky bottom-0 flex h-16 items-center gap-3 border border-b-0 bg-background px-4">
      <DarkModeToggle />
      <form className="ml-auto flex-1" onSubmit={handleSearch}>
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            name="search"
            placeholder="Search manga..."
            className="pl-8"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </form>

      <Button
        variant="outline"
        size="icon"
        className="shrink-0"
        onClick={() => router.back()}
      >
        <ArrowLeft className="icon" />
        <span className="sr-only">Go To Favorites</span>
      </Button>
      {isUserSignedIn && (
        <Link href="/favorites" prefetch>
          <Button variant="outline" size="icon" className="shrink-0">
            <StarIcon className="icon" />
            <span className="sr-only">Go To Favorites</span>
          </Button>
        </Link>
      )}
      <Link href="/" prefetch>
        <Button variant="outline" size="icon" className="shrink-0">
          <HomeIcon className="icon" />
          <span className="sr-only">Go Home</span>
        </Button>
      </Link>

      {isUserSignedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUserIcon className="icon" />
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
            <CircleUserIcon className="icon" />
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
