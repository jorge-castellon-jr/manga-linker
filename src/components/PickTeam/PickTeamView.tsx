"use client";
import { useApp } from "@/app/useApp";
import {
	AppData,
	CharacterData,
	GameUniverse,
	PageId,
	SearchResults,
} from "@/store/AppStore";
import { PageView } from "@/types/PageView";
import { useState } from "react";
import SearchInput from "../Search/SearchInput";
import BoxCollectionSectionIcon from "../BoxCollection/BoxCollectionSectionIcon";
import { HeroType } from "@/types/HeroTypes";
import HeroCard from "../HeroCard/HeroCard";
import Teleport from "../App/Teleport";

export default function PickTeamView({ active }: PageView) {
	const {
		setPageId,
		setBackId,
		search,
		searchResults,
		appData: { marvel_zombies, dceased },
	} = useApp();
	const [gameUniverse, setGameUniverse] = useState<GameUniverse | null>(
		GameUniverse.MarvelZombies
	);
	const [team, setTeam] = useState<SearchResults[]>([]);
	const addToTeam = (result: SearchResults) => {
		setTeam((prev) => {
			if (prev.find((hero) => hero.character_name == result.character_name)) {
				return prev;
			}
			if (prev.length == 6) return prev;

			return [...prev, result];
		});
	};

	const isMarvelZombies = gameUniverse == GameUniverse.MarvelZombies;
	const isDCeased = gameUniverse == GameUniverse.DCeased;

	const mzHeroes = searchResults.filter(
		(result) =>
			result.gameUniverse == GameUniverse.MarvelZombies &&
			result.searchType == "heroes"
	);
	const mzZombies = searchResults.filter(
		(result) =>
			result.gameUniverse == GameUniverse.MarvelZombies &&
			result.searchType == "zombies"
	);

	const dceasedHeroes = searchResults.filter(
		(result) =>
			result.gameUniverse == GameUniverse.DCeased &&
			result.searchType == "heroes"
	);

	return (
		<div className={`grid gap-8 view ${active && "view--active"}`}>
			{team.length > 0 &&
				team.map((hero) => (
					<HeroCard
						key={hero.character_name}
						hero={{
							hero,
							type: hero.searchType as "heroes" | "zombies",
							gameUniverse: hero.gameUniverse,
						}}
						closeAction={() => setTeam((prev) => prev.filter((h) => h != hero))}
					/>
				))}
			<div className="sticky top-0 bg-slate-800 p-2 -m-2 z-50">
				<div className="grid grid-cols-2 border-2 p-1 rounded-lg border-slate-700 gap-2">
					<a
						className={`${
							isMarvelZombies && "bg-slate-700"
						}  rounded-lg border-gray-800 text-xl text-center py-4 px-2 relative`}
						onClick={() => setGameUniverse(GameUniverse.MarvelZombies)}
					>
						Marvel Zombies
						{(mzHeroes.length > 0 || mzZombies.length > 0) && (
							<span className="absolute -top-3 right-2 rounded-full bg-lime-800 w-6 h-6 text-xs grid justify-center items-center">
								{
									searchResults.filter(
										(result) =>
											result.gameUniverse == GameUniverse.MarvelZombies
									).length
								}
							</span>
						)}
					</a>
					<a
						className={`${
							isDCeased && "bg-slate-700"
						}  rounded-lg border-gray-800 text-xl text-center py-4 px-2 relative`}
						onClick={() => setGameUniverse(GameUniverse.DCeased)}
					>
						DCeased
						{dceasedHeroes.length > 0 && (
							<span className="absolute -top-3 right-2 rounded-full bg-cyan-800 w-6 h-6 text-xs grid justify-center items-center">
								{dceasedHeroes.length}
							</span>
						)}
					</a>
				</div>
			</div>
			{searchResults.length ? (
				<div className="grid grid-cols-4 gap-2">
					{searchResults
						.filter((result) => {
							if (result.searchType == "zombies") {
								return (
									result.gameUniverse == gameUniverse &&
									gameUniverse == GameUniverse.MarvelZombies
								);
							}
							return result.gameUniverse == gameUniverse;
						})
						.map((result, index) => (
							<BoxCollectionSectionIcon
								key={`${result.character_name}_${result.set}_${index}`}
								name={result.character_name}
								type={
									result.searchType == "heroes"
										? HeroType.Hero
										: HeroType.Zombie
								}
								inTeam={!!team.find((hero) => hero.id == result.id)}
								image={result.character_thumbnail}
								onClick={() => addToTeam(result)}
							/>
						))}
				</div>
			) : !!search ? (
				<p className="text-white text-center place-self-center">No Results</p>
			) : (
				<div className="grid grid-cols-4 gap-2">
					{isMarvelZombies && marvel_zombies && (
						<>
							{marvel_zombies.heroes.map((result, index) => (
								<BoxCollectionSectionIcon
									key={`${result.character_name}_${result.set}_${index}`}
									name={result.character_name}
									type={HeroType.Hero}
									inTeam={!!team.find((hero) => hero.id == result.id)}
									image={result.character_thumbnail}
									onClick={() => addToTeam(result as SearchResults)}
								/>
							))}
							{marvel_zombies.zombies.map((result, index) => (
								<BoxCollectionSectionIcon
									key={`${result.character_name}_${result.set}_${index}`}
									name={result.character_name}
									type={HeroType.Zombie}
									inTeam={!!team.find((hero) => hero.id == result.id)}
									image={result.character_thumbnail}
									onClick={() => addToTeam(result as SearchResults)}
								/>
							))}
						</>
					)}
					{isDCeased &&
						dceased.heroes.map((result, index) => (
							<BoxCollectionSectionIcon
								key={`${result.character_name}_${result.set}_${index}`}
								name={result.character_name}
								type={HeroType.Hero}
								inTeam={!!team.find((hero) => hero.id == result.id)}
								image={result.character_thumbnail}
								onClick={() => addToTeam(result as SearchResults)}
							/>
						))}
				</div>
			)}
			{active && (
				<Teleport to="#teleport_main_nav">
					<SearchInput />
				</Teleport>
			)}
		</div>
	);
}
