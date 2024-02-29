import {
	useAppData,
	useBackId,
	useHeroSelection,
	useLoading,
	useNeedsBack,
	usePageId,
	useSearch,
	useSearchResults,
} from "@/store/AppStore";
import { useAtom } from "jotai";

export const useApp = () => {
	const [loading, setLoading] = useAtom(useLoading);
	const [pageId, setPageId] = useAtom(usePageId);
	const [backId, setBackId] = useAtom(useBackId);
	const [needsBack, setNeedsBack] = useAtom(useNeedsBack);
	const [appData, setAppData] = useAtom(useAppData);
	const [heroSelected, setHeroSelected] = useAtom(useHeroSelection);
	const [search, setSearch] = useAtom(useSearch);
	const [searchResults, setSearchResults] = useAtom(useSearchResults);
	const clearSearch = () => {
		setSearch("");
		setSearchResults([]);
	};

	return {
		loading,
		setLoading,
		pageId,
		setPageId,
		backId,
		setBackId,
		needsBack,
		setNeedsBack,
		appData,
		setAppData,
		heroSelected,
		setHeroSelected,
		search,
		setSearch,
		searchResults,
		setSearchResults,
		clearSearch,
	};
};
