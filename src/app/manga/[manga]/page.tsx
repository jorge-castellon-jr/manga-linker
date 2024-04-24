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
import { isFavorite } from "@/lib/favorites";
import { toast } from "sonner";
import SpinnerIcon from "@/components/icon/spinner";
import { BadgeCheckIcon, DownloadCloudIcon, DownloadIcon } from "lucide-react";
import ChapterButton from "./ChapterButton";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import MangaSkeleton from "@/components/loading/MangaSkeleton";
import { useUserStore } from "@/lib/UserStore";

export default function SingleMangaPage({
  params,
}: {
  params: { manga: string };
}) {
  const [loading, setLoading] = useState(true);
  const [manga, setManga] = useState<SingleManga>();

  const fetchData = async () => {
    const all = await fetch("/api/manga/" + params.manga, {
      cache: "no-store",
    });
    const allData = (await all.json()) as SingleManga;
    setManga(allData);
    setLoading(false);
    // if (!allChaptersDownloaded()) {
    //   setFilter("2");
    // }
  };
  // fetch the data from the api
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const allChaptersDownloaded = () => {
    if (!manga) return false;
    return manga.chapters.every(
      (chapter) => chapter.downloadedImages.length === chapter.totalImages
    );
  };

  const [filter, setFilter] = useState<string>("");
  const handleFiltering = (value: string) => {
    setFilter(value);
  };
  const allChapters = () => {
    if (!manga) return [];
    return manga.chapters.filter((chapter) => {
      if (filter === "") {
        return true;
      }
      if (filter === "1") {
        return chapter.downloadedImages.length === chapter.totalImages;
      }
      if (filter === "2") {
        return chapter.downloadedImages.length !== chapter.totalImages;
      }
    });
  };

  const downloadedChapters = () => {
    return allChapters().filter((chapter) => {
      return chapter.totalImages === chapter.downloadedImages.length;
    });
  };

  const handleRead = (chapter: SingleMangaChapter) => {
    console.log("Read");
    if (isFavorite(params.manga)) {
      console.log("isFavorite", params.manga, chapter);

      // updateRead(params.manga, chapter.id);
    }
  };

  const [downloading, setDownloading] = useState(false);
  const handleDownload = async (chapter: SingleMangaChapter) => {
    setDownloading(true);
    try {
      await fetch(`/api/queue/${params.manga}/${chapter.id}`);
      toast.success(`Added ${chapter.title} to download queue`);
      setDownloading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to download chapter");
      setDownloading(false);
    }
  };

  const handleDownloadAll = async () => {
    setDownloading(true);
    try {
      await fetch(`/api/queue/${params.manga}`);
      toast.success(`Added ${manga?.title} to download queue`);
      setDownloading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to download chapter");
      setDownloading(false);
    }
  };

  const [favorite, setFavorite] = useState(false);
  useEffect(() => {
    setFavorite(isFavorite(params.manga));
  }, []);

  const { addToFavorites, removeFromFavorites } = useUserStore();
  const addFavorite = async () => {
    setFavorite(true);
    addToFavorites({
      id: params.manga,
      title: manga!.title,
      read: [],
    });
    toast.success("Added to favorites");
  };
  const removeFavorite = async () => {
    setFavorite(false);
    removeFromFavorites(params.manga);
    toast.success("Removed from favorites");
  };

  useEffect(() => {
    if (manga?.chapters.length === downloadedChapters().length) return;
    setTimeout(() => {
      fetchData();
    }, 1000 * 5);
  }, [manga]);

  return (
    <>
      {loading ? (
        <MangaSkeleton />
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
                  <picture>
                    <img
                      src={`https://images.castellon.dev/${manga.id}/cover`}
                      alt={manga.title}
                    />
                  </picture>
                  <div className="flex flex-col gap-4">
                    {downloadedChapters().length !== manga.chapters.length && (
                      <>
                        <Button
                          className="w-full"
                          onClick={handleDownloadAll}
                          disabled={downloading}
                        >
                          {downloading ? (
                            <SpinnerIcon className="animate-spin w-5 h-5 mr-2" />
                          ) : (
                            "Download All Chapter"
                          )}
                        </Button>
                        <Button
                          className="w-full"
                          onClick={async () => {
                            await fetch(
                              `/api/manga/${params.manga}/prioritize`
                            );
                            toast.success("Prioritized download");
                          }}
                          disabled={downloading}
                        >
                          Prioritize Download
                        </Button>
                        <Button
                          className="w-full"
                          onClick={async () => {
                            await fetch(`/api/queue/${params.manga}`, {
                              method: "DELETE",
                            });
                            toast.success("Removed from queue");
                          }}
                          disabled={downloading}
                        >
                          Delete from Queue
                        </Button>
                      </>
                    )}
                    {favorite ? (
                      <Button className="w-full" onClick={removeFavorite}>
                        Remove from Favorites
                      </Button>
                    ) : (
                      <Button className="w-full" onClick={addFavorite}>
                        Add to Favorites
                      </Button>
                    )}
                    {!allChaptersDownloaded() && (
                      <ToggleGroup
                        type="single"
                        value={filter}
                        onValueChange={handleFiltering}
                      >
                        <ToggleGroupItem value="1">
                          <BadgeCheckIcon />
                        </ToggleGroupItem>
                        <ToggleGroupItem value="2">
                          <DownloadCloudIcon />
                        </ToggleGroupItem>
                      </ToggleGroup>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {allChapters().map((chapter) => {
                if (chapter.downloadedImages.length !== chapter.totalImages) {
                  return (
                    <button key={chapter.id}>
                      <ChapterButton
                        chapter={chapter}
                        onClick={() => handleDownload(chapter)}
                      />
                    </button>
                  );
                }
                return (
                  <Link
                    key={chapter.id}
                    href={`/manga/${params.manga}/${chapter.id}`}
                  >
                    <ChapterButton chapter={chapter} />
                  </Link>
                );
              })}
            </div>
          </div>
        )
      )}
    </>
  );
}
