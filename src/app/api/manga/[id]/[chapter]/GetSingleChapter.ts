import { dbUrl } from "@/lib/env";
import { load, Element } from "cheerio";

type Page = string;

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
}

export const getSingleChapter = async (id: string): Promise<SingleChapter> => {
  if (!id) throw new Error("No chapter id provided");
  const data = await fetch(`${dbUrl()}/manga/${id}`);
  const chapter = await data.json();

  return chapter;
};
