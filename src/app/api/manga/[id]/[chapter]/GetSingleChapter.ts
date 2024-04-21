import { dbUrl } from "@/lib/env";

export interface SingleChapter {
  id: string;
  mangaTitle: string;
  mangaId: string;
  title: string;
  link: string;
  downloaded: boolean;
  totalImages?: number;
  downloadedImages?: number;
  saveLocation?: string;
  images: string[];
  previous: string | null;
  next: string | null;
}

export const getSingleChapter = async (id: string): Promise<SingleChapter> => {
  if (!id) throw new Error("No chapter id provided");
  const data = await fetch(`${dbUrl()}/manga/${id}`, {
    cache: "no-cache",
  });
  const chapter = await data.json();

  return chapter;
};
