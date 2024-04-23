import { response } from "../../_utils";
import { getSingleGenre } from "./GetSingleGenre";
import { NextRequest } from "next/server";

export const GET = async (
  { nextUrl }: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const page = nextUrl.searchParams.get("page");
  const type = nextUrl.searchParams.get("type");
  const state = nextUrl.searchParams.get("state");

  const searchParams = new URLSearchParams();
  if (type) searchParams.set("type", type);
  if (state) searchParams.set("state", state);

  const url = page ? `${id}/${page}` : id;
  console.log(url + searchParams.toString());

  const data = await getSingleGenre(url + "?" + searchParams.toString());
  return response(data);
};
