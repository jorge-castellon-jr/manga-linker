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
import { SingleGenreManga as SingleGenreMangaType } from "@/app/api/genres/[id]/GetSingleGenre";
import { toast } from "sonner";
import Link from "next/link";
import {
  Favorite,
  addToFavorites,
  isFavorite,
  removeFromFavorites,
} from "@/lib/favorites";
import { StarIcon, StarOffIcon } from "lucide-react";
import { useUserStore } from "@/lib/UserStore";

type Props = {
  manga: SingleGenreMangaType | Favorite;
};

const SingleGenreManga = ({ manga }: Props) => {
  const { isUserSignedIn } = useUserStore();

  const [favorite, setFavorite] = useState(false);
  useEffect(() => {
    setFavorite(isFavorite(manga.id));
  }, []);

  const addFavorite = async (manga: SingleGenreMangaType | Favorite) => {
    setFavorite(true);
    addToFavorites({ id: manga.id, title: manga.title, read: [] });
    toast.success("Added to favorites");
  };
  const removeFavorite = async (id: string) => {
    setFavorite(false);
    removeFromFavorites(id);
    toast.success("Removed from favorites");
  };

  return (
    <Link href={`/manga/${manga.id}`} prefetch>
      <Card className="flex flex-col h-full">
        <CardHeader className="flex-grow">
          <CardTitle>{manga.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg relative aspect-[11/16] overflow-hidden">
            <picture>
              <img
                src={`https://images.castellon.dev/${manga.id}/cover`}
                alt={manga.title}
              />
            </picture>
          </div>
        </CardContent>
        {isUserSignedIn && (
          <CardFooter>
            {favorite ? (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  removeFavorite(manga.id);
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
