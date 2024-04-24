"use client";
import { useEffect, useState } from "react";
import { Genre } from "./api/genres/GetGenres";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import BottomNav from "@/components/BottomNavigation/BottomNav";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState<Genre[]>([]);

  // fetch the data from the api
  useEffect(() => {
    const fetchData = async () => {
      const all = await fetch("/api/genres");
      const allData = await all.json();
      setGenres(allData);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="w-full inset-0 absolute flex flex-col gap-4 p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 13 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="flex justify-center">
                    <Skeleton className="h-4 w-full" />
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4 p-4 ">
          <Link href="/genre/genre-all" prefetch>
            <Card>
              <CardHeader>
                <CardTitle className="text-center">All</CardTitle>
              </CardHeader>
            </Card>
          </Link>
          {genres.map((genre) => (
            <Link key={genre.link} href={genre.link} prefetch>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">{genre.title}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
