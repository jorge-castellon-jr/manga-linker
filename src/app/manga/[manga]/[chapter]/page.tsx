"use client";
import { useEffect, useState } from "react";
import { SingleChapter } from "@/app/api/manga/[id]/[chapter]/GetSingleChapter";
import Image from "next/image";

export default function SingleGenre({
	params,
}: {
	params: { manga: string; chapter: string };
}) {
	const [loading, setLoading] = useState(true);
	const [chapter, setChapter] = useState<SingleChapter>();

	// fetch the data from the api
	useEffect(() => {
		const fetchData = async () => {
			const all = await fetch(`/api/manga/${params.manga}/${params.chapter}`);
			const allData = await all.json();
			setChapter(allData);
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
				chapter && (
					<div className="grid gap-8 p-4">
						<a href="/">Home</a>
						<h1>{chapter.title}</h1>
						<h2>{chapter.chapter}</h2>
						{chapter.pages.map((page) => (
							<div key={page} className="relative w-full">
								<img src={page} alt={chapter.title} />
							</div>
						))}
					</div>
				)
			)}
		</>
	);
}
