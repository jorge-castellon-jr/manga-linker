import { response } from "../../_utils";
import { NextRequest } from "next/server";
import { getSingleManga } from "./GetSingleManga";
import { dbUrl } from "@/lib/env";

export const GET = async (
  _: NextRequest,
  { params }: { params: { id: string } }
) => {
  console.log(params, `${dbUrl()}/manga/${params.id}`);
  const { id } = params;
  const data = await fetch(`${dbUrl()}/manga/${id}`, {
    method: "GET",
    cache: "no-cache",
  });
  return response(await data.json());
};

export const POST = async (
  _: NextRequest,
  { params }: { params: { id: string } }
) => {
  console.log(params, `${dbUrl()}/manga/${params.id}`);

  const data = await fetch(`${dbUrl()}/manga/${params.id}`, {
    method: "POST",
    cache: "no-cache",
  });
  return response(await data.json());
};
