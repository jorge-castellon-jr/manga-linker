"use client";
import { useEffect, useState } from "react";
import { SingleGenre } from "../../api/genres/[id]/GetSingleGenre";
import Image from "next/image";

export default function SingleGenre({ params }: { params: { genre: string } }) {
	const [loading, setLoading] = useState(true);
	const [genre, setGenre] = useState<SingleGenre>();

	// fetch the data from the api
	useEffect(() => {
		const fetchData = async () => {
			const all = await fetch("/api/genres/" + params.genre);
			const allData = await all.json();
			setGenre(allData);
			setLoading(false);
		};
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [page, setPage] = useState(1);
	const fetchMore = async () => {
		const all = await fetch(`/api/genres/${params.genre}?page=${page + 1}`);
		const allData = await all.json();
		setGenre({
			...genre,
			mangas: [...genre.mangas, ...allData.mangas],
		});
		setPage(page + 1);
	};

	return (
		<>
			{loading ? (
				<div className="w-full h-screen grid items-center justify-center">
					Loading
				</div>
			) : (
				genre && (
					<div className="grid gap-8 p-4">
						<a href="/">Home</a>
						<h1>{genre.title}</h1>
						<div className="grid grid-cols-2 md:grid-cols-3 gap-8">
							{genre.mangas.map((manga) => (
								<a key={manga.link} href={manga.link}>
									<div className="rounded-lg relative aspect-[11/16] overflow-hidden">
										<Image
											src={manga.image}
											alt={manga.title}
											fill
											objectFit="cover"
										/>
									</div>
									<p>{manga.title}</p>
								</a>
							))}
							<a
								className="bg-gray-600 p-4 rounded-md text-center"
								onClick={fetchMore}
							>
								Load More
							</a>
						</div>
					</div>
				)
			)}
		</>
	);
}
