"use client";
import { useEffect, useState } from "react";
import { SingleChapter } from "@/app/api/manga/[id]/[chapter]/GetSingleChapter";
import Image from "next/image";

export default function SingleGenre({
  params,
}: {
  params: { manga: string; chapter: string };
}) {
  const [loading, setLoading] = useState(true);
  const [chapter, setChapter] = useState<SingleChapter>();

  // fetch the data from the api
  useEffect(() => {
    const fetchData = async () => {
      const all = await fetch(`/api/manga/${params.manga}/${params.chapter}`);
      const allData = await all.json();
      setChapter(allData);
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
        chapter && (
          <div className="grid gap-8 p-4">
            <div>
              <h1 className="text-4xl font-black">{chapter.mangaTitle}</h1>
              <h2>{chapter.title}</h2>
            </div>
            <div className="-mx-4">
              {chapter.images.map((image, index) => (
                <div key={image} className="relative w-full">
                  <Image
                    src={image}
                    alt={`${chapter.title}-${index}`}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }} // optional
                  />
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </>
  );
}
