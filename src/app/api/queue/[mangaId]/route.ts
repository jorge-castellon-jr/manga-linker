import { dbUrl } from "@/lib/env";
import { response } from "../../_utils";
import { NextRequest } from "next/server";

export const GET = async (
  _: NextRequest,
  { params }: { params: { mangaId: string } }
) => {
  const { mangaId } = params;

  const message = await addToQueue(`${mangaId}`);

  return response(message);
};

const addToQueue = async (id: string): Promise<string> => {
  if (!id) throw new Error("No chapter id provided");

  const data = await fetch(`${dbUrl()}/queue/${id}`, {
    cache: "no-cache",
  });

  return data.text();
};
