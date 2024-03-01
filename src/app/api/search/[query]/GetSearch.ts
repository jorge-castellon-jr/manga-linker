import { load, Element } from "cheerio";

interface Manga {
  title: string;
  link: string;
  image: string;
}

export interface SingleGenre {
  title: string;
  mangas: Manga[];
}

export const getSearch = async (query: string): Promise<SingleGenre> => {
  if (!query) throw new Error("No genre id provided");
  const url = "https://manganato.com/search/story/" + query;
  const response = await fetch(url);
  const html = await response.text();

  const $ = load(html);
  const title = $(".panel-breadcrumb a:nth-child(3)").text();
  const allMangas: Element[] = $(
    ".panel-search-story .search-story-item"
  ).toArray();

  if (allMangas.length === 0) {
    throw new Error("No mangas found");
  }

  const mangas = allMangas.map((manga): Manga => {
    const title = $(manga).find(".item-right h3").text();
    const link = $(manga)
      .find("a")
      .attr("href")!
      .replace("https://manganato.com", "/manga")
      .replace("https://chapmanganato.to", "/manga");
    const image = $(manga).find("img").attr("src")!;
    return {
      title,
      link,
      image,
    };
  });

  return {
    title,
    mangas,
  };
};
