import { SingleGenreManga } from "@/app/api/genres/[id]/GetSingleGenre";
import { UserData } from "./UserStore";
import { SingleMangaChapter } from "@/app/api/manga/[id]/GetSingleManga";
import { dbUrl } from "./env";

export interface Favorite {
  id: string;
  title: string;
  link: string;
  image: string;
  read: string[];
}

export const getUser = (): UserData => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : { password: "", favorites: [] };
};

export const getFavorites = (): Favorite[] => {
  const favorites = getUser().favorites;
  return favorites;
};

const updateFavorites = (user: UserData) => {
  const newUserData = JSON.stringify(user);

  localStorage.setItem("user", newUserData);
  fetch(`${dbUrl()}/users/favorites`, {
    method: "POST",
    body: newUserData,
  });
};

export const updateRead = (mangaId: string, chapterId: string) => {
  const user = getUser();
  const manga = user.favorites.find((fav) => fav.id === mangaId);
  console.log(manga);

  if (!manga) return;

  // update the specific chapter read property with the chapter link
  const newManga = {
    ...manga,
    read: [...manga.read, chapterId],
  };
  const updatedUser = {
    ...user,
    favorites: [
      ...user.favorites.filter((fav) => fav.id !== mangaId),
      newManga,
    ],
  };
  updateFavorites(updatedUser);
};

export const addToFavorites = (manga: Favorite) => {
  const user = getUser();
  // add if not already in favorites
  if (isFavorite(manga.id)) return;
  const newUserData = { ...user, favorites: [...user.favorites, manga] };
  updateFavorites(newUserData);
};

export const removeFromFavorites = (manga: SingleGenreManga) => {
  const user = getUser();
  const newFavorites = user.favorites.filter((fav) => fav.id !== manga.id);
  const newUserData = { ...user, favorites: newFavorites };

  updateFavorites(newUserData);
};

export const isFavorite = (id: string) => {
  const favorites = getFavorites();
  return favorites.some((fav) => fav.id === id);
};
