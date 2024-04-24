import { dbUrl } from "@/lib/env";
import { NextRequest } from "next/server";
import { response } from "../../_utils";

export const POST = async (req: NextRequest) => {
  const userData = await req.json();

  console.log(userData);

  const data = await fetch(`${dbUrl()}/users/${userData.username}/favorites`);

  const user = await data.json();

  return response(user);
};
