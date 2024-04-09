import { Favorite } from "./favorites";
import { create } from "zustand";

interface UserStore {
  isUserSignedIn: boolean;
  signIn: (user: UserData) => void;
  signOut: () => void;
}
export interface UserData {
  username: string;
  password: string;
  favorites: Favorite[];
}

export const useUserStore = create<UserStore>((set) => ({
  isUserSignedIn: !!localStorage.getItem("user"),
  signIn: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ isUserSignedIn: true });
  },
  signOut: () => {
    localStorage.removeItem("user");
    set({ isUserSignedIn: false });
  },
}));
