import { getGenres } from "./GetGenres";
import { response } from "../_utils";

export const GET = async () => {
  const data = await getGenres();
  return response(data);
};
