import { response } from "../../../_utils";
import { NextRequest } from "next/server";
import { dbUrl } from "@/lib/env";

export const GET = async (
  _: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  console.log(params, `${dbUrl()}/queue/${id}/prioritize`);

  await fetch(`${dbUrl()}/queue/${id}/prioritize`, {
    method: "GET",
    cache: "no-cache",
  });
  return response({ message: "Prioritized" });
};
