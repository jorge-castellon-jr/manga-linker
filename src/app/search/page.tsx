"use client";
import { FormEvent, useEffect, useState } from "react";
import { SingleGenre } from "../api/genres/[id]/GetSingleGenre";
import Image from "next/image";
import SingleGenreManga from "@/components/manga/SingleGenreManga";

export default function SearchPage({ params }: { params: { query: string } }) {
  const [search, setSearch] = useState<SingleGenre>();

  const [page, setPage] = useState(1);
  const [fetching, setFetching] = useState(false);
  const [searchDone, setSearchDone] = useState(false);

  const fetchMore = async () => {
    setFetching(true);
    try {
      const all = await fetch(`/api/search/${searchValue}?page=${page + 1}`);
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
    setSearchValue(params.query);
    handleSearch();
  }, []);

  const [searchValue, setSearchValue] = useState("");

  const handleSearch = async () => {
    const all = await fetch(
      `/api/search/${searchValue.toLowerCase().replace(/ /g, "_")}`
    );
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
          <div className="w-full px-4">
            <p className="bg-gray-600 p-4 block rounded-lg text-center">
              Loading...
            </p>
          </div>
        ) : (
          <div className="w-full px-4">
            <a
              className="bg-gray-600 p-4 rounded-md text-center w-full block cursor-pointer"
              onClick={fetchMore}
            >
              Load More
            </a>
          </div>
        )
      ) : (
        ""
      )}
    </>
  );
}
