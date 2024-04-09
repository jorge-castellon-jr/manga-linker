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
