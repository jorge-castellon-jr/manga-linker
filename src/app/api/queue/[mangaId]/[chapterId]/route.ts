import { dbUrl } from "@/lib/env";
import { response } from "../../../_utils";
import { NextRequest } from "next/server";

export const GET = async (
  _: NextRequest,
  { params }: { params: { mangaId: string; chapterId: string } }
) => {
  const { mangaId, chapterId } = params;

  const message = await addToQueue(`${mangaId}/${chapterId}`);

  return response(message);
};

const addToQueue = async (id: string): Promise<void> => {
  if (!id) throw new Error("No chapter id provided");

  const data = await fetch(`${dbUrl()}/manga/${id}/download`, {
    cache: "no-cache",
  });

  return data.json();
};
