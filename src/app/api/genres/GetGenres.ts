import { load, Element } from "cheerio";

export interface Genre {
	title: string;
	link: string;
}

export const getGenres = async (): Promise<Genre[]> => {
	const url = "https://manganato.com/index.php";
	const response = await fetch(url);
	const html = await response.text();

	const $ = load(html);
	const allGenres: Element[] = $(
		".panel-category .pn-category-row a:not(.ctg-select)"
	).toArray();

	const genres = allGenres.map((genre): Genre => {
		const title = $(genre).text();
		const link = $(genre)
			.attr("href")!
			.replace("https://manganato.com", "/genre");
		return {
			title,
			link,
		};
	});

	return genres;
};
