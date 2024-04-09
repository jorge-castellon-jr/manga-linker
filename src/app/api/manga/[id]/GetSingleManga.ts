import { load, Element } from "cheerio";

export interface SingleMangaChapter {
  id: string;
  title: string;
  link: string;
}

export interface SingleManga {
  title: string;
  image: string;
  chapters: SingleMangaChapter[];
}

export const getSingleManga = async (id: string): Promise<SingleManga> => {
  if (!id) throw new Error("No genre id provided");
  const url = "https://chapmanganato.to/" + id;
  const response = await fetch(url);
  const html = await response.text();

  const $ = load(html);
  const title = $(".story-info-right h1").text();
  const image = $(".story-info-left .info-image img").attr("src")!;
  const allChapters: Element[] = $(
    ".panel-story-chapter-list .row-content-chapter li a"
  ).toArray();

  if (allChapters.length === 0) {
    throw new Error("No mangas found");
  }

  const chapters = allChapters
    .map((chapter): SingleMangaChapter => {
      const title = $(chapter).text();
      const link = $(chapter).attr("href")!;
      return {
        id: link.split("/").pop()!,
        title,
        link,
      };
    })
    .reverse();

  return {
    title,
    image,
    chapters,
  };
};
