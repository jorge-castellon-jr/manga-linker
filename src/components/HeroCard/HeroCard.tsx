"use client";
import HeroTracker from "@/components/HeroCard/HeroTracker";
import { HeroSelection } from "@/store/AppStore";
import HeroCardSkill from "./HeroCardSkill";
import { HeroType } from "@/types/HeroTypes";

export default function HeroCard({
	hero,
	closeAction,
}: {
	hero: HeroSelection;
	closeAction?: () => void;
}) {
	const colors = [
		"bg-cyan-700",
		"bg-yellow-600",
		"bg-orange-700",
		"bg-red-700",
	];

	const isZombie = hero.type === "zombies";
	const heroName = `${isZombie ? HeroType.Zombie : HeroType.Hero} ${
		hero.hero ? hero.hero.character_name : ""
	}`;

	if (!hero.hero) return null;

	return (
		<div className="bg-cyan-200 bg-opacity-50 rounded-lg grid ">
			<div className="p-4 -mx-2 bg-red-800 border border-white sticky top-0 flex justify-between items-center shadow-lg">
				<div>{heroName}</div>
				{closeAction && (
					<div
						className="cursor-pointer bg-opacity-25 bg-black h-6 w-6 rounded-lg grid place-items-center"
						onClick={closeAction}
					>
						X
					</div>
				)}
			</div>
			<div className="grid md:grid-cols-2 py-2 gap-4">
				<div className="flex flex-col gap-4">
					<HeroTracker label="Health" max={5} start={5} />
					<HeroTracker
						label={isZombie ? "Hunger" : "Power"}
						max={4}
						start={0}
					/>
					<div className="skill">
						<div className="skill__title bg-blue-900">{hero.hero.attack}</div>
						<div className="skill__attack">
							<div className="skill__attack__slot">{hero.hero.type}</div>
							<div className="skill__attack__slot">{hero.hero.range}</div>
							<div className="skill__attack__slot">{hero.hero.dice}</div>
							<div className="skill__attack__slot">{hero.hero.to_hit}</div>
						</div>
					</div>
					{isZombie && (
						<div>
							<div className="px-4 py-2 bg-green-800 border border-white">
								Devour
							</div>
							<div className="skill__attack">
								<div className="skill__attack__slot">Melee</div>
								<div className="skill__attack__slot">0</div>
								<div className="skill__attack__slot">1</div>
								<div className="skill__attack__slot">4+</div>
							</div>
							{hero.hero.devour_effect && (
								<div className="skill__attack__desc mx-2 my-1">
									{hero.hero.devour_effect}
								</div>
							)}
						</div>
					)}
				</div>
				<div className="grid gap-4">
					<HeroCardSkill
						skillName={hero.hero.blue_skill_name}
						skillDescription={hero.hero.blue_skill_description}
						color={colors[0]}
					/>
					<HeroCardSkill
						skillName={hero.hero.yellow_skill_name}
						skillDescription={hero.hero.yellow_skill_description}
						color={colors[1]}
					/>
					<HeroCardSkill
						skillName={hero.hero.orange_skill_name}
						skillDescription={hero.hero.orange_skill_description}
						color={colors[2]}
					/>
					<HeroCardSkill
						skillName={hero.hero.red_skill_name}
						skillDescription={hero.hero.red_skill_description}
						color={colors[3]}
					/>
				</div>
			</div>
		</div>
	);
}
