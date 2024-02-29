import { response } from "../../_utils";
import { getSingleGenre } from "./GetSingleGenre";
import { NextRequest } from "next/server";

export const GET = async (
	{ nextUrl }: NextRequest,
	{ params }: { params: { id: string } }
) => {
	const { id } = params;
	const page = nextUrl.searchParams.get("page");
	const url = page ? `${id}/${page}` : id;
	const data = await getSingleGenre(url);
	return response(data);
};
