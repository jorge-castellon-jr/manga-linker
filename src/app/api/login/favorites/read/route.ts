import { dbUrl } from "@/lib/env";
import { NextRequest } from "next/server";
import { response } from "../../../_utils";

export const POST = async (req: NextRequest) => {
  const newUserData = await req.json();

  fetch(`${dbUrl()}/users/favorites`, {
    method: "POST",
    body: newUserData,
  });

  return response({ message: "Favorites updated" });
};
