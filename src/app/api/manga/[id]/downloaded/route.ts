import { response } from "../../../_utils";
import { NextRequest } from "next/server";
import { getSingleDownloadedChapter } from "./GetDownloadedChapters";

export const GET = async (
  _: NextRequest,
  { params }: { params: { id: string } }
) => {
  const data = await getSingleDownloadedChapter(params);
  return response(data);
};

export const POST = async (
  _,
  { params }
) => {
  const data = await fetch(process.env.DB_URL + "/manga/" + params.id, {
    method: "POST",
    cache: "no-cache"
  })
  return response(await data.json())
}