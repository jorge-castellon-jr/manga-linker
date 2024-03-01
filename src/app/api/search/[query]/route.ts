import { response } from "../../_utils";
import { NextRequest } from "next/server";
import { getSearch } from "./GetSearch";

export const GET = async (
  { nextUrl }: NextRequest,
  { params }: { params: { query: string } }
) => {
  const { query } = params;
  const page = nextUrl.searchParams.get("page");
  const url = page ? `${query}?page=${page}` : query;

  const data = await getSearch(url);
  return response(data);
};
