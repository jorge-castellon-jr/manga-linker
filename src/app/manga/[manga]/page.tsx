"use client";
import { useEffect, useState } from "react";
import { SingleManga } from "@/app/api/manga/[id]/GetSingleManga";

export default function SingleGenre({ params }: { params: { manga: string } }) {
  const [loading, setLoading] = useState(true);
  const [manga, setManga] = useState<SingleManga>();

  // fetch the data from the api
  useEffect(() => {
    const fetchData = async () => {
      const all = await fetch("/api/manga/" + params.manga);
      const allData = await all.json();
      setManga(allData);
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
        manga && (
          <div className="grid gap-8 p-4">
            <a href="/">Home</a>
            <h1>{manga.title}</h1>
            <img src={manga.image} alt={manga.title} />

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {manga.chapters.map((chapter) => (
                <a
                  key={chapter.link}
                  className="bg-gray-600 p-4 rounded-md text-center flex justify-center items-center"
                  href={chapter.link}
                >
                  {chapter.title}
                </a>
              ))}
            </div>
          </div>
        )
      )}
    </>
  );
}
