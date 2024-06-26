import { dbUrl } from "@/lib/env";
import { NextRequest } from "next/server";
import { response } from "../_utils";

export const POST = async (req: NextRequest) => {
  const { username, password } = await req.json();

  const data = await fetch(`${dbUrl()}/users/login`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
  const user = await data.json();

  return response(user);
};
