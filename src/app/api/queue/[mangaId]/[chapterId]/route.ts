import { dbUrl } from "@/lib/env";
import { response } from "../../../_utils";
import { NextRequest } from "next/server";

export const GET = async (
  _: NextRequest,
  { params }: { params: { mangaId: string; chapterId: string } }
) => {
  const { mangaId, chapterId } = params;

  await addToQueue(`${mangaId}/${chapterId}`);

  return response({ message: `Added to queue ${mangaId}/${chapterId}` });
};

const addToQueue = async (id: string): Promise<void> => {
  if (!id) throw new Error("No chapter id provided");

  await fetch(`${dbUrl()}/manga/${id}/download`, {
    cache: "no-cache",
  });
};
