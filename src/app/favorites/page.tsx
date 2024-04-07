"use client";
import { useEffect, useState } from "react";
import SingleGenreManga from "@/components/manga/SingleGenreManga";
import { SingleManga } from "../api/manga/[id]/GetSingleManga";
import { UserData } from "@/lib/auth";
import { Favorite } from "@/lib/favorites";

export default function Favorites({ params }: { params: { genre: string } }) {
  const [loading, setLoading] = useState(true);
  const [mangas, setMangas] = useState<Favorite[]>([]);

  // fetch the data from the api
  useEffect(() => {
    const fetchData = async () => {
      const localUser = localStorage.getItem("user");
      if (!localUser) return setLoading(false);

      const user = JSON.parse(localUser) as UserData;
      const response = await fetch(
        `http://localhost:3737/users/${user.username}/favorites`,
        {
          method: "POST",
          body: JSON.stringify({
            password: user.password,
          }),
        }
      );
      const fetchedUser: Favorite[] = await response.json();

      setMangas(fetchedUser);
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <div className="w-full h-screen grid items-center justify-center">
          Loading
        </div>
      ) : (
        <div className="grid gap-8 p-4">
          <h1>Favorites</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {!!mangas &&
              mangas.map((manga) => (
                <SingleGenreManga key={manga.link} manga={manga} />
              ))}
          </div>
        </div>
      )}
    </>
  );
}
