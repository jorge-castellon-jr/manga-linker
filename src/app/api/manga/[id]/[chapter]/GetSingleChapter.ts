import { dbUrl } from "@/lib/env";

export interface SingleChapter {
  id: string;
  mangaTitle: string;
  mangaId: string;
  title: string;
  totalImages?: number;
  downloadedImages?: number;
  images: string[];
  previous?: SingleChapter | null;
  next?: SingleChapter | null;
}

export const getSingleChapter = async (id: string): Promise<SingleChapter> => {
  if (!id) throw new Error("No chapter id provided");
  const data = await fetch(`${dbUrl()}/manga/${id}`, {
    cache: "no-cache",
  });
  const chapter = await data.json();

  return chapter;
};
