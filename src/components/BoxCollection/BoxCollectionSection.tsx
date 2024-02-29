import {
	AppData,
	BoxSet,
	CharacterData,
	GameUniverse,
	PageId,
} from "@/store/AppStore";
import BoxCollectionSectionIcon from "./BoxCollectionSectionIcon";
import { HeroType } from "@/types/HeroTypes";
import { useApp } from "@/app/useApp";
import Image from "next/image";

export default function BoxCollectionSection({
	set,
	boxSet,
	data,
	gameUniverse,
}: {
	set?: string;
	boxSet?: BoxSet;
	data: AppData["marvel_zombies"] | AppData["dceased"];
	gameUniverse: GameUniverse;
}) {
	const getSet = (set: string, characterData: CharacterData[]) => {
		return characterData.filter((character) => character.set === set);
	};

	const { setHeroSelected, setPageId, setBackId } = useApp();

	return (
		<div key={set || boxSet?.name} className="grid gap-2">
			<div className="flex justify-center items-center w-full bg-slate-900 rounded-lg px-4 py-8   shadow-lg relative overflow-hidden">
				{boxSet?.image && (
					<Image
						src={boxSet?.image}
						alt={boxSet?.name}
						className="absolute inset-0 opacity-50 object-cover -top-4"
						width={1000}
						height={1000}
					/>
				)}
				<span className="realtive z-10 text-slate-100 font-black uppercase text-xl drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">
					{set || boxSet?.name}
				</span>
			</div>
			<div className="grid grid-cols-4 gap-2">
				{getSet(set || boxSet!.name, data.heroes).map((hero) => (
					<BoxCollectionSectionIcon
						key={hero.character_name}
						name={hero.character_name}
						type={HeroType.Hero}
						image={hero.character_thumbnail}
						onClick={() => {
							setHeroSelected({ hero, type: "heroes", gameUniverse });
							setPageId((prev) => {
								setBackId(prev);
								return PageId.HeroDetails;
							});
						}}
					/>
				))}
				{getSet(set || boxSet!.name, data.zombies).map((zombie) => (
					<BoxCollectionSectionIcon
						key={zombie.character_name}
						name={zombie.character_name}
						image={zombie.character_thumbnail}
						type={HeroType.Zombie}
						onClick={() => {
							setHeroSelected({
								hero: zombie,
								type: "zombies",
								gameUniverse,
							});
							setPageId((prev) => {
								setBackId(prev);
								return PageId.HeroDetails;
							});
						}}
					/>
				))}
			</div>
		</div>
	);
}
