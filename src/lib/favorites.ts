import { SingleGenreManga } from "@/app/api/genres/[id]/GetSingleGenre";
import { UserData } from "./auth";
import { SingleMangaChapter } from "@/app/api/manga/[id]/GetSingleManga";

export interface Favorite {
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
  fetch("http://localhost:3737/users/favorites", {
    method: "POST",
    body: newUserData,
  });
};

const updateRead = (mangaLink: string, chapter: SingleMangaChapter) => {
  const user = getUser();
  const manga = user.favorites.find((fav) => fav.link === mangaLink);
  if (!manga) return;

  const newManga = {
    ...manga,
    read: [...manga.read, chapter.link],
  };
};

export const addToFavorites = (manga: Favorite) => {
  const user = getUser();
  // add if not already in favorites
  if (isFavorite(manga)) return;
  const newUserData = { ...user, favorites: [...user.favorites, manga] };
  updateFavorites(newUserData);
};

export const removeFromFavorites = (manga: SingleGenreManga) => {
  const user = getUser();
  const newFavorites = user.favorites.filter((fav) => fav.link !== manga.link);
  const newUserData = { ...user, favorites: newFavorites };

  updateFavorites(newUserData);
};

export const isFavorite = (manga: SingleGenreManga) => {
  const favorites = getFavorites();
  return favorites.some((fav) => fav.link === manga.link);
};
