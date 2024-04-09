"use client";
import { FormEvent, useEffect, useState } from "react";
import { SingleGenre } from "../api/genres/[id]/GetSingleGenre";
import Image from "next/image";
import SingleGenreManga from "@/components/manga/SingleGenreManga";
import SpinnerIcon from "@/components/icon/spinner";
import { Button } from "@/components/ui/button";
import { useSearchStore } from "@/lib/SearchStore";

export default function SearchPage() {
  const { searchQuery: search } = useSearchStore();
  const [searchData, setSearchData] = useState<SingleGenre>();

  const [page, setPage] = useState(1);
  const [fetching, setFetching] = useState(false);
  const [searchDone, setSearchDone] = useState(false);

  const fetchMore = async () => {
    setFetching(true);
    try {
      const all = await fetch(`/api/search/${search}?page=${page + 1}`);
      const allData = await all.json();
      setSearchData((prevSearch) => ({
        ...prevSearch!,
        mangas: [...prevSearch!.mangas, ...allData.mangas],
      }));
      setFetching(false);
      console.log(allData.mangas.length);

      setPage(page + 1);
    } catch (error) {
      setSearchDone(true);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [search]);

  const handleSearch = async () => {
    const all = await fetch(`/api/search/${search.replace(/ /g, "_")}`);
    const allData = await all.json();
    setSearchData(allData);
    if (allData.mangas.length === 10) {
      setSearchDone(false);
      return;
    }
    if (allData.mangas.length < 10) {
      setSearchDone(true);
      return;
    }
  };

  return (
    <>
      {searchData && (
        <>
          <div className="grid gap-8 p-4">
            <h1 className="text-2xl">{searchData.title}</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {searchData.mangas.map((manga) => (
                <SingleGenreManga manga={manga} key={manga.link} />
              ))}
            </div>
          </div>
          {!searchDone &&
            (fetching ? (
              <Button className="w-full mx-4 mb-4">
                <SpinnerIcon className="h-5 w-5 animate-spin" />
              </Button>
            ) : (
              <Button className="w-full mx-4 mb-4" onClick={fetchMore}>
                Load More
              </Button>
            ))}
        </>
      )}
    </>
  );
}
