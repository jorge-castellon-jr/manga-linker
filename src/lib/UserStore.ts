import { Favorite } from "./favorites";
import { create } from "zustand";

interface UserStore {
  userData: UserData | null;
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
}));
