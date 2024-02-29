import { response } from "../../../_utils";
import { NextRequest } from "next/server";
import { getSingleChapter } from "./GetSingleChapter";

export const GET = async (
	_: NextRequest,
	{ params }: { params: { id: string; chapter: string } }
) => {
	const { id, chapter } = params;
	const data = await getSingleChapter(`${id}/${chapter}`);
	return response(data);
};
