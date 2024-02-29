import { HeroType } from "@/types/HeroTypes";
import Image from "next/image";

export default function BoxCollectionSectionIcon({
	name,
	type,
	image,
	inTeam,
	onClick,
}: {
	name: string;
	type: HeroType;
	image?: string;
	inTeam?: boolean;
	onClick: () => void;
}) {
	const color = type === HeroType.Hero ? "bg-sky-800" : "bg-lime-800";
	return (
		<div
			className={`${color} ${
				inTeam && "opacity-25"
			} rounded-lg shadow-lg overflow-hidden text-center flex flex-col justify-center items-center`}
			onClick={() => onClick()}
		>
			{image && <Image src={image} width={200} height={200} alt="Hero Image" />}
			<div
				className={`${
					!image ? "h-36" : ""
				} flex-grow px-2 w-full text-center grid justify-center items-center text-sm md:text-base`}
			>
				{name}
			</div>
		</div>
	);
}
