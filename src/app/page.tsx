"use client";
import { useEffect, useState } from "react";
import { Genre } from "./api/genres/GetGenres";

export default function Home() {
	const [loading, setLoading] = useState(true);
	const [genres, setGenres] = useState<Genre[]>([]);

	// fetch the data from the api
	useEffect(() => {
		const fetchData = async () => {
			const all = await fetch("/api/genres");
			const allData = await all.json();
			setGenres(allData);
			setLoading(false);
		};
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			{loading ? (
				<div className="w-full h-screen grid items-center justify-center">
					Loading
				</div>
			) : (
				<div className="grid grid-cols-3 gap-8 p-4">
					{genres.map((genre) => (
						<a
							key={genre.link}
							className="bg-gray-600 p-4 rounded-md text-center"
							href={genre.link}
						>
							{genre.title}
						</a>
					))}
				</div>
			)}
		</>
	);
}
