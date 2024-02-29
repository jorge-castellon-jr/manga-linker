"use client";
import { useState } from "react";
import { useApp } from "@/app/useApp";
import { GameUniverse, PageId } from "@/store/AppStore";
import BoxCollectionSection from "./BoxCollectionSection";
import SearchInput from "../Search/SearchInput";
import { PageView } from "@/types/PageView";
import Teleport from "../App/Teleport";

export default function BoxCollectionView({ active }: PageView) {
	const {
		setPageId,
		setBackId,
		appData: { marvel_zombies, dceased },
	} = useApp();
	const [gameUniverse, setGameUniverse] = useState<GameUniverse | null>(
		GameUniverse.MarvelZombies
	);

	const isMarvelZombies = gameUniverse == GameUniverse.MarvelZombies;
	const isDCeased = gameUniverse == GameUniverse.DCeased;

	return (
		<div className={`view gap-8 ${active && "view--active"}`}>
			<div className="sticky top-0 z-50 bg-slate-800 p-2 -m-2">
				<div className="grid grid-cols-2 border-2 p-1 rounded-lg border-slate-700 gap-2">
					<a
						className={`${
							isMarvelZombies && "bg-slate-700"
						}  rounded-lg border-gray-800 text-xl text-center py-4 px-2`}
						onClick={() => setGameUniverse(GameUniverse.MarvelZombies)}
					>
						Marvel Zombies
					</a>
					<a
						className={`${
							isDCeased && "bg-slate-700"
						}  rounded-lg border-gray-800 text-xl text-center py-4 px-2`}
						onClick={() => setGameUniverse(GameUniverse.DCeased)}
					>
						DCeased
					</a>
				</div>
			</div>
			<div className="grid gap-8">
				{isMarvelZombies &&
					marvel_zombies.sets.map((set) => (
						<BoxCollectionSection
							key={set.name}
							boxSet={set}
							data={marvel_zombies}
							gameUniverse={GameUniverse.MarvelZombies}
						/>
					))}
				{isDCeased &&
					dceased.sets.map((set) => (
						<BoxCollectionSection
							key={set}
							set={set}
							data={dceased}
							gameUniverse={GameUniverse.DCeased}
						/>
					))}
			</div>
			{active && (
				<Teleport to="#teleport_main_nav" className=" grid gap-2">
					<a
						className="text-center block bg-slate-600 rounded-lg"
						onClick={() => {
							setPageId((prev) => {
								setBackId(prev);
								return PageId.Search;
							});
						}}
					>
						Search
					</a>
					<a
						className="block p-4 bg-green-900 rounded-lg text-center"
						onClick={() => {
							setPageId((prev) => {
								setBackId(prev);
								return PageId.PickTeam;
							});
						}}
					>
						Pick Your Team
					</a>
				</Teleport>
			)}
		</div>
	);
}
