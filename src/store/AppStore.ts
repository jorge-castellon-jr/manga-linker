import { atom } from "jotai";

export const useLoading = atom<boolean>(true);

export enum PageId {
	Home,
	BoxCollection,
	CustomHeroes,
	PickTeam,
	HeroDetails,
	Search,
}

export const usePageId = atom<PageId>(PageId.BoxCollection);
export const useBackId = atom<PageId>(PageId.BoxCollection);
export const useNeedsBack = atom<boolean>(false);

export const useAppData = atom<AppData>({} as AppData);

export enum GameUniverse {
	MarvelZombies = "Marvel Zombies",
	DCeased = "DCeased",
}

export interface HeroSelection {
	gameUniverse: GameUniverse;
	type: "heroes" | "zombies";
	hero: CharacterData;
}

export type SearchResults = CharacterData & {
	searchType: string;
	gameUniverse: GameUniverse;
};

export const useHeroSelection = atom<HeroSelection>({} as HeroSelection);

export const useSearch = atom<string>("");
export const useSearchResults = atom<SearchResults[]>([]);
