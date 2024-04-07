"use client";
import { FormEvent, useEffect, useState } from "react";
import { SingleGenre } from "../api/genres/[id]/GetSingleGenre";
import Image from "next/image";
import SingleGenreManga from "@/components/manga/SingleGenreManga";
import SpinnerIcon from "@/components/icon/spinner";
import { Button } from "@/components/ui/button";

export default function SearchPage({
  searchParams: { query },
}: {
  searchParams: { query: string };
}) {
  const [search, setSearch] = useState<SingleGenre>();

  const [page, setPage] = useState(1);
  const [fetching, setFetching] = useState(false);
  const [searchDone, setSearchDone] = useState(false);

  const fetchMore = async () => {
    setFetching(true);
    try {
      const all = await fetch(`/api/search/${query}?page=${page + 1}`);
      const allData = await all.json();
      setSearch((prevSearch) => ({
        ...prevSearch!,
        mangas: [...prevSearch!.mangas, ...allData.mangas],
      }));
      setPage(page + 1);
      setFetching(false);
    } catch (error) {
      setSearchDone(true);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    const all = await fetch(`/api/search/${query.replace(/ /g, "_")}`);
    const allData = await all.json();
    setSearch(allData);
  };

  return (
    <>
      {search && (
        <div className="grid gap-8 p-4">
          <h1>{search.title}</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {search.mangas.map((manga) => (
              <SingleGenreManga manga={manga} key={manga.link} />
            ))}
          </div>
        </div>
      )}
      {search && !searchDone ? (
        fetching ? (
          <Button className="w-full mx-4 mb-4">
            <SpinnerIcon className="h-5 w-5 animate-spin" />
          </Button>
        ) : (
          <Button className="w-full mx-4 mb-4" onClick={fetchMore}>
            Load More
          </Button>
        )
      ) : (
        ""
      )}
    </>
  );
}
