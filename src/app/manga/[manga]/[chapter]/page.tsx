"use client";
import { useEffect, useState } from "react";
import { SingleChapter } from "@/app/api/manga/[id]/[chapter]/GetSingleChapter";
import { Button } from "@/components/ui/button";
import ChapterPage from "@/components/manga/ChapterPage";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export default function SingleChapterPage({
  params,
}: {
  params: { manga: string; chapter: string };
}) {
  const [chapter, setChapter] = useState<SingleChapter>();

  // fetch the data from the api
  useEffect(() => {
    const fetchData = async () => {
      const all = await fetch(`/api/manga/${params.manga}/${params.chapter}`, {
        cache: "no-store",
      });
      const allData = await all.json();
      setChapter(allData);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [darken, setDarken] = useState(false);
  const [darkenLevel, setDarkenLevel] = useState(1);
  const toggleDarken = () => setDarken(!darken);

  return (
    <>
      {chapter && (
        <div className="grid gap-8 p-4">
          <div className="grid gap-4 grid-cols-2">
            <div>
              <Link href={`/manga/${chapter.mangaId}`}>
                <h1 className="text-4xl font-black">{chapter.mangaTitle}</h1>
              </Link>
              <h2>{chapter.title}</h2>
            </div>
            <div className="flex flex-col gap-4 items-end">
              <Button onClick={toggleDarken}>Darken</Button>
              {darken && (
                <Slider
                  defaultValue={[darkenLevel]}
                  min={1}
                  max={5}
                  step={1}
                  onValueChange={(value) => setDarkenLevel(value[0])}
                />
              )}
            </div>
          </div>
          <div className={[`-mx-4`, darken && "invert"].join(" ")}>
            {chapter.images.map((image, index) => (
              <ChapterPage
                key={image}
                src={image}
                darken={darken}
                darkenLevel={darkenLevel}
              />
            ))}

            <div className="grid grid-cols-2 gap-4 pt-4">
              {chapter.previous ? (
                <Button>
                  <ArrowLeftIcon className="absolute left-0" />
                  <Link
                    href={`/manga/${chapter.previous.id}`}
                    className="truncate pl-3"
                  >
                    {chapter.previous.title}
                  </Link>
                </Button>
              ) : (
                <div></div>
              )}
              {chapter.next && (
                <Button>
                  <Link
                    href={`/manga/${chapter.next.id}`}
                    className="truncate pr-3"
                  >
                    {chapter.next.title}
                  </Link>
                  <ArrowRightIcon className="absolute right-0" />
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
