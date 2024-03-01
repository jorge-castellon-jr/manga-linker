"use client";
import { FormEvent, useEffect, useState } from "react";
import { SingleGenre } from "../api/genres/[id]/GetSingleGenre";
import Image from "next/image";
import SearchLayout from "../manga/[manga]/layout";

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

  const [searchValue, setSearchValue] = useState("");

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
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
          <a href="/">Home</a>
          <h1>{search.title}</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {search.mangas.map((manga) => (
              <a key={manga.link} href={manga.link}>
                <div className="rounded-lg relative aspect-[11/16] overflow-hidden">
                  <Image
                    src={manga.image}
                    alt={manga.title}
                    fill
                    objectFit="cover"
                  />
                </div>
                <p>{manga.title}</p>
              </a>
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
      <form onSubmit={handleSearch} className="mt-4 px-4">
        <input
          type="text"
          value={searchValue}
          className="w-full p-4 rounded-md text-black"
          placeholder="Search"
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </form>
      <div className="sticky bottom-0 p-4 text-center bg-gray-800">
        <div
          className="bg-slate-900 rounded-lg p-4 block w-full"
          onClick={handleSearch}
        >
          Search
        </div>
      </div>
    </>
  );
}
