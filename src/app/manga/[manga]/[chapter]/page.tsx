"use client";
import { useEffect, useState } from "react";
import { SingleChapter } from "@/app/api/manga/[id]/[chapter]/GetSingleChapter";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

export default function SingleGenre({
  params,
}: {
  params: { manga: string; chapter: string };
}) {
  const [loading, setLoading] = useState(true);
  const [chapter, setChapter] = useState<SingleChapter>();
  const [imagesToLoad, setImagesToLoad] = useState<number>(100);
  const [loadedImages, setLoadedImages] = useState<number>(0);

  // fetch the data from the api
  useEffect(() => {
    const fetchData = async () => {
      const all = await fetch(`/api/manga/${params.manga}/${params.chapter}`);
      const allData = await all.json();
      setChapter(allData);
      setImagesToLoad(allData.images.length);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (imagesToLoad === loadedImages) {
      setLoading(false);
    }
  }, [loadedImages, imagesToLoad]);

  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1);
  };

  return (
    <>
      {chapter && (
        <div className="grid gap-8 p-4">
          <div>
            <h1 className="text-4xl font-black">{chapter.mangaTitle}</h1>
            <h2>{chapter.title}</h2>
          </div>
          <div
            className={`-mx-4`}
          >
            {loading && (
              <Skeleton className="h-[500px] w-full rounded-xl mb-[500px]" />
            )}

            {chapter.images.map((image, index) => (
              <div key={image} className={"relative w-full"}>
                <Image
                  src={image}
                  alt={`${chapter.title}-${index}`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                  onLoadCapture={handleImageLoad}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
