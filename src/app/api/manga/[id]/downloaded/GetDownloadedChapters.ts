import { dbUrl } from "@/lib/env";
import { SingleChapter } from "../[chapter]/GetSingleChapter";

export type DownloadedChapter = SingleChapter & {
  downloaded: boolean;
  saveLocation: string;
  totalImages: number;
  downloadedImages: number;
};
export const getSingleDownloadedChapter = async ({ id }: { id: string }) => {
  const data = await fetch(`${dbUrl()}/manga/${id}`, {
    cache: "no-store",
  });
  if (!data.ok) return data.text();

  const manga = await data.json();

  if (!manga) return [];

  return manga.chapters.filter(
    (chapter: { downloaded: boolean }) => chapter.downloaded
  );
};
