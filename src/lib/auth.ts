import { Favorite } from "./favorites";

export interface UserData {
  username: string;
  password: string;
  favorites: Favorite[];
}

export const signIn = (user: UserData) => {
  localStorage.setItem("user", JSON.stringify(user));
};
export const signOut = () => {
  localStorage.removeItem("user");
};

export const isSignedIn = () => {
  return !!localStorage.getItem("user");
};
