import { response } from "../../_utils";
import { NextRequest } from "next/server";
import { getSingleManga } from "./GetSingleManga";

export const GET = async (
	_: NextRequest,
	{ params }: { params: { id: string } }
) => {
	const { id } = params;
	const data = await getSingleManga(id);
	return response(data);
};
