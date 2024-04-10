"use client";
import { useEffect, useState } from "react";
import {
  SingleManga,
  SingleMangaChapter,
} from "@/app/api/manga/[id]/GetSingleManga";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DownloadedChapter } from "@/app/api/manga/[id]/downloaded/GetDownloadedChapters";
import {
  addToFavorites,
  isFavorite,
  removeFromFavorites,
  updateRead,
} from "@/lib/favorites";
import SingleGenreManga from "@/components/manga/SingleGenreManga";
import { toast } from "sonner";

export default function SingleManga({ params }: { params: { manga: string } }) {
  const [loading, setLoading] = useState(true);
  const [manga, setManga] = useState<SingleManga>();
  const [downloadedChapters, setDownloadedChapters] =
    useState<DownloadedChapter[]>();

  // fetch the data from the api
  useEffect(() => {
    const fetchData = async () => {
      const all = await fetch("/api/manga/" + params.manga);
      const allData = await all.json();
      setManga(allData);
      setLoading(false);
    };
    fetchData();

    const fetchDownloadedChapters = async () => {
      const downloadedChapters = await fetch(
        `/api/manga/${params.manga}/downloaded`,
        {
          cache: "no-store",
        }
      );
      const downloadedChaptersData: DownloadedChapter[] =
        await downloadedChapters.json();
      setDownloadedChapters(downloadedChaptersData);
    };
    fetchDownloadedChapters();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRead = (chapter: SingleMangaChapter) => {
    console.log("Read");
    if (isFavorite(params.manga)) {
      console.log("isFavorite", params.manga, chapter);

      updateRead(params.manga, chapter.id);
    }
  };

  const handleDownload = () => {
    const data = fetch(process.env.DB_Url + "/manga/" + params.manga)
    toast.success(await data.json())
  }

  const [favorite, setFavorite] = useState(false);
  useEffect(() => {
    setFavorite(isFavorite(params.manga));
  }, []);

  const addFavorite = async () => {
    setFavorite(true);
    addToFavorites({
      id: params.manga,
      title: manga!.title,
      link: "/manga/" + params.manga,
      image: manga!.image,
      read: [],
    });
    toast.success("Added to favorites");
  };
  const removeFavorite = async () => {
    setFavorite(false);
    removeFromFavorites({
      id: params.manga,
      title: manga!.title,
      link: "/manga/" + params.manga,
      image: manga!.image,
    });
    toast.success("Removed from favorites");
  };
  return (
    <>
      {loading ? (
        <div className="w-full h-screen grid items-center justify-center">
          Loading
        </div>
      ) : (
        manga && (
          <div className="grid gap-4 p-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  <h1>{manga.title}</h1>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  <img src={manga.image} alt={manga.title} />
                  <div className="flex flex-col gap-4">
                    <Button className="w-full" onClick={handleDownload}>Download</Button>
                    {favorite ? (
                      <Button className="w-full" onClick={removeFavorite}>
                        Remove from Favorites
                      </Button>
                    ) : (
                      <Button className="w-full" onClick={addFavorite}>
                        Add to Favorites
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            {!!downloadedChapters?.length && (
              <>
                <h2 className="text-2xl">Downloaded Chapters</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                  {downloadedChapters.map((chapter) => (
                    <Link
                      key={chapter.link}
                      href={`${chapter.saveLocation}`}
                      prefetch
                      onClick={() => handleRead(chapter)}
                    >
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-center">
                            {chapter.title}
                          </CardTitle>
                        </CardHeader>
                      </Card>
                    </Link>
                  ))}
                </div>

                <h2 className="text-2xl">Online Chapters</h2>
              </>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {manga.chapters.map((chapter) => (
                <Link
                  key={chapter.link}
                  href={chapter.link}
                  prefetch
                  onClick={() => handleRead(chapter)}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-center">
                        {chapter.title}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )
      )}
    </>
  );
}
