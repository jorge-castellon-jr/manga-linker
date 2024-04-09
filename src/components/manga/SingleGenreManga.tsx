"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import { SingleGenreManga } from "@/app/api/genres/[id]/GetSingleGenre";
import { toast } from "sonner";
import Link from "next/link";
import {
  addToFavorites,
  isFavorite,
  removeFromFavorites,
} from "@/lib/favorites";
import { StarIcon, StarOffIcon } from "lucide-react";
import { useUserStore } from "@/lib/UserStore";

type Props = {
  manga: SingleGenreManga;
};

const SingleGenreManga = ({ manga }: Props) => {
  const [favorite, setFavorite] = useState(false);

  const { isUserSignedIn } = useUserStore();

  useEffect(() => {
    setFavorite(isFavorite(manga.id));
  }, []);

  const addFavorite = async (manga: SingleGenreManga) => {
    setFavorite(true);
    addToFavorites({ ...manga, read: [] });
    toast.success("Added to favorites");
  };
  const removeFavorite = async (manga: SingleGenreManga) => {
    setFavorite(false);
    removeFromFavorites(manga);
    toast.success("Removed from favorites");
  };

  return (
    <Link href={manga.link} prefetch>
      <Card className="flex flex-col h-full">
        <CardHeader className="flex-grow">
          <CardTitle>{manga.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg relative aspect-[11/16] overflow-hidden">
            <Image src={manga.image} alt={manga.title} fill objectFit="cover" />
          </div>
        </CardContent>
        {isUserSignedIn && (
          <CardFooter>
            {favorite ? (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  removeFavorite(manga);
                }}
                className="w-full"
                variant="secondary"
              >
                Remove
              </Button>
            ) : (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  addFavorite(manga);
                }}
                className="w-full"
                variant="secondary"
              >
                Add To Favorites
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
    </Link>
  );
};

export default SingleGenreManga;
