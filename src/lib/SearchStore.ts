import { create } from "zustand";

interface SearchStore {
  searchQuery: string;
  setSearchQuery: (search: string) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  searchQuery: "",
  setSearchQuery: (search) => set({ searchQuery: search }),
}));
