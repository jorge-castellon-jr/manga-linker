import { dbUrl } from "@/lib/env";
import { response } from "../_utils";
import { NextRequest } from "next/server";

export const GET = async () => {
  const data = await fetch(`${dbUrl()}/queue`, {
    cache: "no-cache",
  });
  return response(await data.json());
};

export const DELETE = async () => {
  const data = await fetch(`${dbUrl()}/queue`, {
    method: "DELETE",
  });
  return response(await data.json());
};
