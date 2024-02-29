import { load, Element } from "cheerio";

interface Manga {
	title: string;
	link: string;
	image: string;
}

export interface SingleGenre {
	title: string;
	page: number;
	mangas: Manga[];
}

export const getSingleGenre = async (id: string): Promise<SingleGenre> => {
	if (!id) throw new Error("No genre id provided");
	const url = "https://manganato.com/" + id;
	const response = await fetch(url);
	const html = await response.text();

	const $ = load(html);
	const title = $(".panel-breadcrumb a:nth-child(3)").text();
	const allMangas: Element[] = $(
		".panel-content-genres .content-genres-item"
	).toArray();
	console.log(url, title);

	if (allMangas.length === 0) {
		throw new Error("No mangas found");
	}

	const mangas = allMangas.map((manga): Manga => {
		const title = $(manga).find(".genres-item-info h3").text();
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
		page: 1,
		mangas,
	};
};
