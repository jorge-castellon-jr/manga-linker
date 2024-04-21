"use client";
import { useEffect, useState } from "react";
import { SingleGenre } from "../../api/genres/[id]/GetSingleGenre";
import SingleGenreMangaButton from "@/components/manga/SingleGenreManga";
import { Button } from "@/components/ui/button";
import SpinnerIcon from "@/components/icon/spinner";

export default function SingleGenre({ params }: { params: { genre: string } }) {
  const [loading, setLoading] = useState(true);
  const [genre, setGenre] = useState<SingleGenre>();

  // fetch the data from the api
  useEffect(() => {
    const fetchData = async () => {
      const all = await fetch("/api/genres/" + params.genre);
      const allData = await all.json();
      setGenre(allData);
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [page, setPage] = useState(1);
  const [fetching, setFetching] = useState(false);
  const fetchMore = async () => {
    setFetching(true);
    const all = await fetch(`/api/genres/${params.genre}?page=${page + 1}`);
    const allData = await all.json();
    setGenre((prevGenre) => ({
      ...prevGenre!,
      mangas: [...prevGenre!.mangas, ...allData.mangas],
    }));
    setPage(page + 1);
    setFetching(false);
  };
  return (
    <>
      {loading ? (
        <div className="w-full h-screen grid items-center justify-center">
          Loading
        </div>
      ) : (
        genre && (
          <>
            <div className="grid gap-4 p-4">
              <h1>{genre.title}</h1>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {genre.mangas.map((manga) => (
                  <SingleGenreMangaButton key={manga.link} manga={manga} />
                ))}
              </div>
              {fetching ? (
                <Button disabled>
                  <SpinnerIcon className="animate-spin w-5 h-5" />
                </Button>
              ) : (
                <Button onClick={fetchMore}>Load More</Button>
              )}
            </div>
          </>
        )
      )}
    </>
  );
}
