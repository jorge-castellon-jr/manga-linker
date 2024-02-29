import { load, Element } from "cheerio";

type Page = string;

export interface SingleChapter {
	title: string;
	chapter: string;
	pages: Page[];
}

export const getSingleChapter = async (id: string): Promise<SingleChapter> => {
	if (!id) throw new Error("No genre id provided");
	const url = "https://chapmanganato.to/" + id;
	const response = await fetch(url);
	const html = await response.text();

	const $ = load(html);
	const title = $(".panel-chapter-info-top h1").text();
	const chapter = $(".panel-breadcrumb a:nth-child(3)").text();
	const allPages: Element[] = $(".container-chapter-reader > img").toArray();

	if (allPages.length === 0) {
		throw new Error("No Pagess found");
	}

	const pages = allPages.map((chapter): Page => $(chapter).attr("src")!);

	return {
		title,
		chapter,
		pages,
	};
};
