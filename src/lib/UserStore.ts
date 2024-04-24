import {
  Favorite,
  addToFavorites,
  removeFromFavorites as removeFromFavoritesUtil,
} from "./favorites";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserStore {
  userData: UserData | null;
  isUserSignedIn: boolean;
  signIn: (user: UserData) => void;
  signOut: () => void;
  addToFavorites: (manga: Favorite) => void;
  removeFromFavorites: (mangaId: string) => void;
}
interface Folder {
  name: string;
  mangas: string[];
}
export interface UserData {
  username: string;
  password: string;
  favorites: Favorite[];
  folders: Folder[];
}

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      userData: null,
      isUserSignedIn: false,
      signIn: (user) => {
        localStorage.setItem("user", JSON.stringify(user));
        set({ userData: user, isUserSignedIn: true });
      },
      signOut: () => {
        localStorage.removeItem("user");
        set({ userData: null, isUserSignedIn: false });
      },
      addToFavorites: (manga: Favorite) => {
        set((state) => {
          if (!state.userData) return state;

          const userData = addToFavorites(manga);
          return { ...state, userData };
        });
      },
      removeFromFavorites: (mangaId: string) => {
        set((state) => {
          if (!state.userData) return state;

          const userData = removeFromFavoritesUtil(mangaId);
          return { ...state, userData };
        });
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
