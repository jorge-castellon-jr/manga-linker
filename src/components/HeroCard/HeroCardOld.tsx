"use client";
import HeroTracker from "@/components/HeroCard/HeroTracker";
import { HeroSection } from "../../types/HeroTypes";

export default function Hero({
	heroInfo,
	heroName,
	closeAction,
}: {
	heroInfo: HeroSection;
	heroName: string;
	closeAction?: () => void;
}) {
	const colors = [
		"bg-cyan-700",
		"bg-yellow-600",
		"bg-orange-700",
		"bg-red-700",
	];

	return (
		<div className="bg-cyan-200 bg-opacity-50 rounded-lg grid ">
			<div className="p-4 -mx-4 bg-red-800 border border-white sticky top-0 flex justify-between items-center">
				<div>
					{heroInfo.name} {heroName}
				</div>
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
						label={heroInfo.name.includes("Zombie") ? "Hunger" : "Power"}
						max={4}
						start={0}
					/>
					<div className="skill">
						<div className="skill__title bg-blue-900">
							{heroInfo.attack.name}
						</div>
						<div className="skill__attack">
							<div className="skill__attack__slot">{heroInfo.attack.type}</div>
							<div className="skill__attack__slot">{heroInfo.attack.range}</div>
							<div className="skill__attack__slot">{heroInfo.attack.dice}</div>
							<div className="skill__attack__slot">
								{heroInfo.attack.accuracy}
							</div>
						</div>
					</div>
					{heroInfo.name.includes("Zombie") && (
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
							{!!heroInfo.devour?.effect && (
								<div className="skill__attack__desc mx-2 my-1">
									{heroInfo.devour?.effect}
								</div>
							)}
						</div>
					)}
				</div>
				<div className="grid gap-4">
					{heroInfo.levels.map((level, index) => (
						<div key={index} className="skill">
							<div className={`skill__title ${colors[index]}`}>
								{level.name}
							</div>
							{level.info && (
								<div className="skill__ability">
									<div className="skill__ability__slot">{level.info}</div>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
