"use client";
import { PageId } from "@/store/AppStore";
import SearchInput from "./SearchInput";
import { useApp } from "@/app/useApp";
import BoxCollectionSectionIcon from "../BoxCollection/BoxCollectionSectionIcon";
import { HeroType } from "@/types/HeroTypes";
import { PageView } from "@/types/PageView";
import Teleport from "../App/Teleport";
import { useEffect } from "react";

export default function SearchView({ active }: PageView) {
	const { setPageId, setBackId, search, searchResults, setHeroSelected } =
		useApp();

	return (
		<div className={`search view gap-8 ${active && "view--active"}`}>
			<div>
				{searchResults.length ? (
					<div className="grid grid-cols-4 gap-2">
						{searchResults.map((result, index) => (
							<BoxCollectionSectionIcon
								key={`${result.character_name}_${result.set}_${index}`}
								name={result.character_name}
								type={
									result.searchType == "heroes"
										? HeroType.Hero
										: HeroType.Zombie
								}
								image={result.character_thumbnail}
								onClick={() => {
									setHeroSelected({
										hero: result,
										type: result.searchType as "heroes" | "zombies",
										gameUniverse: result.gameUniverse,
									});
									setPageId((prev) => {
										setBackId(prev);
										return PageId.HeroDetails;
									});
								}}
							/>
						))}
					</div>
				) : !!search ? (
					<p className="text-white text-center grid items-center h-full">
						No Results
					</p>
				) : (
					<p className="text-white text-center grid items-center h-full">
						Enter a hero or zombie name
					</p>
				)}
			</div>
			{active && (
				<Teleport to="#teleport_main_nav">
					<SearchInput autoFocus />
				</Teleport>
			)}
		</div>
	);
}
